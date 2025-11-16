import { mount } from '@vue/test-utils'
import VennDiagramProfessions from '@/components/CvOverview/VennDiagramProfessions.vue'

// ResizeObserver is mocked globally in test/setup.js

describe('VennDiagramProfessions', () => {
  let wrapper

  afterEach(() => {
    if (wrapper) {
      wrapper.destroy()
    }
  })

  test('renders correctly', () => {
    wrapper = mount(VennDiagramProfessions)
    expect(wrapper.exists()).toBe(true)
  })

  test('has venn-diagram-professions class', () => {
    wrapper = mount(VennDiagramProfessions)
    expect(wrapper.find('.venn-diagram-professions').exists()).toBe(true)
  })

  test('has wrapper element', () => {
    wrapper = mount(VennDiagramProfessions)
    expect(wrapper.find('.wrapper').exists()).toBe(true)
  })

  test('renders three circles', () => {
    wrapper = mount(VennDiagramProfessions)
    expect(wrapper.find('.circle-left').exists()).toBe(true)
    expect(wrapper.find('.circle-top').exists()).toBe(true)
    expect(wrapper.find('.circle-right').exists()).toBe(true)
  })

  test('circle titles have correct text', () => {
    wrapper = mount(VennDiagramProfessions)
    expect(wrapper.text()).toContain('Back End')
    expect(wrapper.text()).toContain('Front End')
    expect(wrapper.text()).toContain('UI/UX Design')
  })

  test('renders center area with Unicorn text', () => {
    wrapper = mount(VennDiagramProfessions)
    expect(wrapper.find('.center-area').exists()).toBe(true)
    expect(wrapper.text()).toContain('Unicorn')
    expect(wrapper.text()).toContain('Area')
  })

  test('renders me-area section', () => {
    wrapper = mount(VennDiagramProfessions)
    expect(wrapper.find('.me-area').exists()).toBe(true)
  })

  test('me-area contains pin and speech bubble', () => {
    wrapper = mount(VennDiagramProfessions)
    expect(wrapper.find('.pin').exists()).toBe(true)
    expect(wrapper.find('.speech-bubble').exists()).toBe(true)
  })

  test('speech bubble has greeting text', () => {
    wrapper = mount(VennDiagramProfessions)
    const speechBubble = wrapper.find('.speech-bubble')
    expect(speechBubble.text()).toBe("Hi! It's me!")
  })

  test('initializes and ResizeObserver sets basicFontSize', () => {
    wrapper = mount(VennDiagramProfessions)
    // ResizeObserver mock sets width to 400, so basicFontSize = 400/20 = 20
    expect(wrapper.vm.basicFontSize).toBe(20)
  })

  test('fontSizeCss computed returns empty string when basicFontSize is manually set to null', () => {
    wrapper = mount(VennDiagramProfessions)
    wrapper.vm.basicFontSize = null
    expect(wrapper.vm.fontSizeCss).toBe('')
  })

  test('fontSizeCss computed returns font-size style when basicFontSize is set', () => {
    wrapper = mount(VennDiagramProfessions)
    wrapper.vm.basicFontSize = 20
    expect(wrapper.vm.fontSizeCss).toBe('font-size:20px')
  })

  test('ResizeObserver updates basicFontSize on mount', async () => {
    wrapper = mount(VennDiagramProfessions)

    // Wait for ResizeObserver to trigger
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.basicFontSize).toBe(20) // 400 / 20
  })

  test('component applies calculated font size to root element', async () => {
    wrapper = mount(VennDiagramProfessions)

    await wrapper.vm.$nextTick()

    const rootElement = wrapper.find('.venn-diagram-professions')
    const style = rootElement.attributes('style')

    expect(style).toContain('font-size')
    expect(style).toContain('20px')
  })

  test('font size calculation is correct', () => {
    wrapper = mount(VennDiagramProfessions)

    // Simulate different widths
    const testWidths = [200, 400, 600, 800]

    testWidths.forEach((width) => {
      const expectedFontSize = width / 20
      wrapper.vm.basicFontSize = expectedFontSize
      expect(wrapper.vm.fontSizeCss).toBe(`font-size:${expectedFontSize}px`)
    })
  })

  test('renders HeadIcon component in pin', () => {
    wrapper = mount(VennDiagramProfessions)
    const pin = wrapper.find('.pin')
    expect(pin.exists()).toBe(true)
  })

  test('all circle titles have circle-title class', () => {
    wrapper = mount(VennDiagramProfessions)
    const titles = wrapper.findAll('.circle-title')
    expect(titles.length).toBeGreaterThanOrEqual(4) // 3 circles + center + me area
  })
})
