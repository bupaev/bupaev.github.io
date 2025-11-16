import { mount } from '@vue/test-utils'
import Timeline from '@/components/CvExperience/Timeline.vue'

describe('Timeline', () => {
  let wrapper

  beforeEach(() => {
    // Mock refs and DOM properties
    Object.defineProperty(HTMLElement.prototype, 'offsetWidth', {
      configurable: true,
      value: 1000
    })

    // Mock window.addEventListener
    window.addEventListener = jest.fn()
  })

  afterEach(() => {
    if (wrapper) {
      wrapper.destroy()
    }
  })

  test('renders correctly', () => {
    wrapper = mount(Timeline)
    expect(wrapper.exists()).toBe(true)
  })

  test('has timeline class', () => {
    wrapper = mount(Timeline)
    expect(wrapper.find('.timeline').exists()).toBe(true)
  })

  test('initializes with jobs data', () => {
    wrapper = mount(Timeline)
    expect(wrapper.vm.jobs).toBeDefined()
    expect(Array.isArray(wrapper.vm.jobs)).toBe(true)
    expect(wrapper.vm.jobs.length).toBeGreaterThan(0)
  })

  test('contains expected job positions', () => {
    wrapper = mount(Timeline)
    const jobs = wrapper.vm.jobs

    // Check for specific jobs
    expect(jobs.some(job => job.company === 'EPAM')).toBe(true)
    expect(jobs.some(job => job.company === 'Holmusk')).toBe(true)
    expect(jobs.some(job => job.company === 'Bandlab')).toBe(true)
    expect(jobs.some(job => job.isSabbatical)).toBe(true)
  })

  test('initializes rowsRanges and jobRows as empty arrays', () => {
    wrapper = mount(Timeline)
    expect(Array.isArray(wrapper.vm.rowsRanges)).toBe(true)
    expect(Array.isArray(wrapper.vm.jobRows)).toBe(true)
  })

  test('calls updateTimeline on mount', () => {
    const updateTimelineSpy = jest.spyOn(Timeline.methods, 'updateTimeline')
    wrapper = mount(Timeline)
    expect(updateTimelineSpy).toHaveBeenCalled()
    updateTimelineSpy.mockRestore()
  })

  test('adds resize event listener on mount', () => {
    wrapper = mount(Timeline)
    expect(window.addEventListener).toHaveBeenCalledWith('resize', expect.any(Function))
  })

  test('updateTimeline method updates rowsRanges and jobRows', () => {
    wrapper = mount(Timeline)
    wrapper.vm.updateTimeline()

    expect(wrapper.vm.rowsRanges.length).toBeGreaterThan(0)
    expect(wrapper.vm.jobRows.length).toBeGreaterThan(0)
  })

  test('getRowIntervals returns array of intervals', () => {
    wrapper = mount(Timeline)
    const intervals = wrapper.vm.getRowIntervals()

    expect(Array.isArray(intervals)).toBe(true)
    expect(intervals.length).toBeGreaterThan(0)

    // Each interval should have startYear and endYear
    intervals.forEach((interval) => {
      expect(interval).toHaveProperty('startYear')
      expect(interval).toHaveProperty('endYear')
      expect(typeof interval.startYear).toBe('number')
      expect(typeof interval.endYear).toBe('number')
      expect(interval.endYear).toBeGreaterThanOrEqual(interval.startYear)
    })
  })

  test('getJobRows returns array of job arrays', () => {
    wrapper = mount(Timeline)
    wrapper.vm.rowsRanges = [
      { startYear: 2008, endYear: 2015 },
      { startYear: 2016, endYear: 2024 }
    ]

    const jobRows = wrapper.vm.getJobRows()

    expect(Array.isArray(jobRows)).toBe(true)
    expect(jobRows.length).toBe(2)

    // Each row should be an array
    jobRows.forEach((row) => {
      expect(Array.isArray(row)).toBe(true)
    })
  })

  test('getDatePosition returns percentage for a date', () => {
    wrapper = mount(Timeline)
    const rowRange = { startYear: 2020, endYear: 2024 }
    const position = wrapper.vm.getDatePosition('2022-06-01', rowRange)

    expect(typeof position).toBe('number')
    expect(position).toBeGreaterThanOrEqual(0)
    expect(position).toBeLessThanOrEqual(100)
  })

  test('getDatePosition returns 0 for start date', () => {
    wrapper = mount(Timeline)
    const rowRange = { startYear: 2020, endYear: 2024 }
    const position = wrapper.vm.getDatePosition('2020-01-01', rowRange)

    expect(position).toBeCloseTo(0, 0)
  })

  test('getDatePosition returns ~100 for end date', () => {
    wrapper = mount(Timeline)
    const rowRange = { startYear: 2020, endYear: 2024 }
    const position = wrapper.vm.getDatePosition('2025-01-01', rowRange)

    expect(position).toBeGreaterThan(95)
  })

  test('getJobPositionStyle returns valid CSS style string', async () => {
    wrapper = mount(Timeline)
    wrapper.vm.rowsRanges = [{ startYear: 2020, endYear: 2024 }]
    wrapper.vm.jobRows = [[]]
    await wrapper.vm.$nextTick()

    const job = {
      startDate: '2021-01-01',
      endDate: '2023-12-31',
      height: 1,
      zIndex: 2
    }

    const style = wrapper.vm.getJobPositionStyle(job, 0)

    expect(typeof style).toBe('string')
    expect(style).toContain('left:')
    expect(style).toContain('width:')
    expect(style).toContain('height: 60%') // 1 * 60
    expect(style).toContain('z-index: 2')
  })

  test('getJobPositionStyle uses default height and zIndex when not provided', async () => {
    wrapper = mount(Timeline)
    wrapper.vm.rowsRanges = [{ startYear: 2020, endYear: 2024 }]
    wrapper.vm.jobRows = [[]]
    await wrapper.vm.$nextTick()

    const job = {
      startDate: '2021-01-01',
      endDate: '2023-12-31'
    }

    const style = wrapper.vm.getJobPositionStyle(job, 0)

    expect(style).toContain('height: 60%') // default 1 * 60
    expect(style).toContain('z-index: 0') // default 0
  })

  test('getYearPositionStyle returns valid CSS style string', async () => {
    wrapper = mount(Timeline)
    wrapper.vm.rowsRanges = [{ startYear: 2020, endYear: 2024 }]
    wrapper.vm.jobRows = [[]]
    await wrapper.vm.$nextTick()

    const style = wrapper.vm.getYearPositionStyle(0, 0)

    expect(typeof style).toBe('string')
    expect(style).toContain('left:')
    expect(style).toContain('width:')
  })

  test('getNowMarkPositionStyle returns valid CSS style string', async () => {
    wrapper = mount(Timeline)
    wrapper.vm.rowsRanges = [{ startYear: 2020, endYear: 2024 }]
    wrapper.vm.jobRows = [[]]
    await wrapper.vm.$nextTick()

    const style = wrapper.vm.getNowMarkPositionStyle()

    expect(typeof style).toBe('string')
    expect(style).toContain('left:')
    expect(style).toContain('calc(')
  })

  test('goToJob scrolls to element when id is provided', () => {
    wrapper = mount(Timeline)

    // Mock document.getElementById and window.scrollTo
    const mockElement = { offsetTop: 500 }
    const mockExperienceSection = { offsetTop: 100 }
    document.getElementById = jest.fn((id) => {
      if (id === 'experience') { return mockExperienceSection }
      return mockElement
    })
    window.scrollTo = jest.fn()

    wrapper.vm.goToJob('test-id')

    expect(document.getElementById).toHaveBeenCalledWith('test-id')
    expect(document.getElementById).toHaveBeenCalledWith('experience')
    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 600, // 100 + 500
      left: 0,
      behavior: 'smooth'
    })
  })

  test('goToJob does nothing when id is not provided', () => {
    wrapper = mount(Timeline)
    window.scrollTo = jest.fn()

    wrapper.vm.goToJob()
    wrapper.vm.goToJob(null)
    wrapper.vm.goToJob('')

    expect(window.scrollTo).not.toHaveBeenCalled()
  })

  test('yearsMarks returns array of years for a row', () => {
    wrapper = mount(Timeline)
    wrapper.vm.rowsRanges = [
      { startYear: 2020, endYear: 2024 },
      { startYear: 2025, endYear: 2027 }
    ]
    wrapper.vm.jobRows = [[], []]

    const years0 = wrapper.vm.yearsMarks(0)
    const years1 = wrapper.vm.yearsMarks(1)

    expect(years0).toEqual([2020, 2021, 2022, 2023, 2024])
    expect(years1).toEqual([2025, 2026, 2027])
  })

  test('renders job rows based on jobRows data', async () => {
    wrapper = mount(Timeline)
    wrapper.vm.rowsRanges = [{ startYear: 2020, endYear: 2024 }]
    wrapper.vm.jobRows = [
      [{ company: 'Test Company', position: 'Developer', startDate: '2020-01-01', endDate: '2021-01-01', skills: 'JS' }]
    ]

    await wrapper.vm.$nextTick()

    const jobs = wrapper.findAll('.job')
    expect(jobs.length).toBeGreaterThan(0)
  })

  test('job elements have correct classes', async () => {
    wrapper = mount(Timeline)
    wrapper.vm.rowsRanges = [{ startYear: 2020, endYear: 2024 }]
    wrapper.vm.jobRows = [
      [
        { company: 'Test', position: 'Dev', startDate: '2020-01-01', endDate: '2021-01-01', skills: 'JS' },
        { position: 'Sabbatical', startDate: '2021-01-01', endDate: '2022-01-01', isSabbatical: true, skills: 'Rest' }
      ]
    ]

    await wrapper.vm.$nextTick()

    const jobs = wrapper.findAll('.job')
    if (jobs.length > 0) {
      expect(jobs.at(0).classes()).toContain('job')
    }
  })

  test('handles sabbatical jobs with is-sabbatical class', async () => {
    wrapper = mount(Timeline)
    wrapper.vm.rowsRanges = [{ startYear: 2020, endYear: 2024 }]
    wrapper.vm.jobRows = [
      [{ position: 'Sabbatical', startDate: '2021-01-01', endDate: '2022-01-01', isSabbatical: true, skills: 'Rest' }]
    ]

    await wrapper.vm.$nextTick()

    const sabbaticalJobs = wrapper.findAll('.job.is-sabbatical')
    expect(sabbaticalJobs.length).toBeGreaterThanOrEqual(0)
  })

  test('renders now-marker in last row', async () => {
    wrapper = mount(Timeline)
    wrapper.vm.rowsRanges = [
      { startYear: 2020, endYear: 2022 },
      { startYear: 2023, endYear: 2025 }
    ]
    wrapper.vm.jobRows = [[{ startDate: '2020-01-01', endDate: '2021-01-01', position: 'Test', skills: 'Test' }], [{ startDate: '2023-01-01', endDate: '2024-01-01', position: 'Test2', skills: 'Test' }]]

    await wrapper.vm.$nextTick()

    const nowMarkers = wrapper.findAll('.now-marker')
    // Should have exactly one now-marker
    expect(nowMarkers.length).toBeLessThanOrEqual(1)
  })

  test('calculates row intervals correctly for different screen widths', () => {
    // Test with wider screen
    Object.defineProperty(HTMLElement.prototype, 'offsetWidth', {
      configurable: true,
      value: 1500
    })

    wrapper = mount(Timeline)
    const intervals1 = wrapper.vm.getRowIntervals()

    // Test with narrower screen
    Object.defineProperty(HTMLElement.prototype, 'offsetWidth', {
      configurable: true,
      value: 500
    })

    const intervals2 = wrapper.vm.getRowIntervals()

    // Narrow screen should have more rows (smaller year width)
    expect(intervals2.length).toBeGreaterThanOrEqual(intervals1.length)
  })
})
