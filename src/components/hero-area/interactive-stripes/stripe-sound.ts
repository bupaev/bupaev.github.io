/**
 * Melodic ripple sound generator for stripe interactions.
 *
 * Maps stripe position to a pentatonic scale (always consonant) and plays
 * a short "water drop" tone using the Web Audio API. Left stripes produce
 * low pitches, right stripes produce high pitches — like piano keys.
 */

/** Pentatonic intervals within one octave (in semitones) */
const PENTATONIC = [0, 2, 4, 7, 9] as const;

/** Lowest note: C3 ≈ 130.81 Hz */
const BASE_FREQUENCY_HZ = 130.81;

/** How many octaves the stripe keyboard spans */
const OCTAVE_SPAN = 3;

const TOTAL_NOTES = PENTATONIC.length * OCTAVE_SPAN;

/** Sound envelope */
const ATTACK_S = 0.01;
const DECAY_S = 3.5;
const HARMONIC_GAIN = 0.006;
const FUNDAMENTAL_GAIN = 0.009;

let audioContext: AudioContext | null = null;
let masterBus: DynamicsCompressorNode | null = null;

function ensureAudioContext(): boolean {
  if (typeof AudioContext === "undefined") return false;

  if (!audioContext) {
    audioContext = new AudioContext();
    masterBus = audioContext.createDynamicsCompressor();
    masterBus.threshold.value = -18;
    masterBus.knee.value = 12;
    masterBus.ratio.value = 12;
    masterBus.attack.value = 0.002;
    masterBus.release.value = 0.15;
    masterBus.connect(audioContext.destination);
  }
  if (audioContext.state === "suspended") {
    void audioContext.resume();
  }
  return true;
}

/**
 * Converts a stripe index (0 … totalStripes-1) to a pentatonic frequency.
 */
function indexToFrequency(stripeIndex: number, totalStripes: number): number {
  const normalized = totalStripes <= 1 ? 0.5 : stripeIndex / (totalStripes - 1);
  const noteIndex = Math.round(normalized * (TOTAL_NOTES - 1));
  const octave = Math.floor(noteIndex / PENTATONIC.length);
  const degree = noteIndex % PENTATONIC.length;
  const semitones = octave * 12 + PENTATONIC[degree];
  return BASE_FREQUENCY_HZ * 2 ** (semitones / 12);
}

/**
 * Creates an oscillator with a gain envelope that ramps down over time.
 */
function createTone(
  ctx: AudioContext,
  destination: AudioNode,
  frequency: number,
  peakGain: number,
  startTime: number,
): void {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = "sine";
  osc.frequency.setValueAtTime(frequency, startTime);
  // Slight downward pitch bend for a "drop" feel
  osc.frequency.exponentialRampToValueAtTime(frequency * 0.97, startTime + DECAY_S);

  // With timeConstant = DECAY_S / 6, after DECAY_S the gain has gone through
  // 6 time constants → peak × e^-6 ≈ 0.25% — effectively silent.
  const timeConstant = DECAY_S / 6;

  gain.gain.setValueAtTime(0, startTime);
  gain.gain.linearRampToValueAtTime(peakGain, startTime + ATTACK_S);
  gain.gain.setTargetAtTime(0, startTime + ATTACK_S, timeConstant);

  osc.connect(gain).connect(destination);
  osc.start(startTime);
  osc.stop(startTime + DECAY_S + timeConstant);
}

/**
 * Plays a melodic ripple sound mapped to the stripe's position.
 *
 * Call this on user-initiated splashes only (not idle animations).
 */
export function playRippleSound(stripeIndex: number, totalStripes: number): void {
  if (!ensureAudioContext() || !audioContext || !masterBus) return;

  const ctx = audioContext;
  const bus = masterBus;

  const schedule = () => {
    const freq = indexToFrequency(stripeIndex, totalStripes);
    const now = ctx.currentTime;
    createTone(ctx, bus, freq, FUNDAMENTAL_GAIN, now);
    createTone(ctx, bus, freq * 2, HARMONIC_GAIN, now);
  };

  // When the context is already running, play immediately. On the very first
  // user gesture the context is still resuming — defer scheduling so the tone
  // starts at the real currentTime instead of time 0 (which would be in the
  // past by the time audio output begins, cutting the attack).
  if (ctx.state === "running") {
    schedule();
  } else {
    void ctx.resume().then(schedule);
  }
}
