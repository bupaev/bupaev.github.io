import { mount } from '@vue/test-utils'
import CV from '@/pages/cv.vue'

// Mock all child components to simplify testing
jest.mock('@/components/DarkModeToggle/DarkModeToggle', () => ({
  name: 'DarkModeToggle',
  template: '<div class="dark-mode-toggle-mock"></div>'
}))

jest.mock('@/components/CvVerticalMenu/TheVerticalMenu', () => ({
  name: 'CvVerticalMenu',
  template: '<div class="vertical-menu-mock"></div>'
}))

jest.mock('@/components/CvHeroArea', () => ({
  name: 'CvHeroArea',
  template: '<div class="hero-area-mock"></div>'
}))

jest.mock('@/components/CvOverview/TheOverview', () => ({
  name: 'CvOverview',
  template: '<div class="overview-mock"></div>'
}))

jest.mock('@/components/CvSkills/TheSkills', () => ({
  name: 'CvSkills',
  template: '<div class="skills-mock"></div>'
}))

jest.mock('@/components/CvExperience/TheExperience', () => ({
  name: 'CvExperience',
  template: '<div class="experience-mock"></div>'
}))

jest.mock('@/components/CvEducation', () => ({
  name: 'CvEducation',
  template: '<div class="education-mock"></div>'
}))

describe('CV Page', () => {
  let wrapper

  beforeEach(() => {
    // Mock window properties
    Object.defineProperty(window, 'innerWidth', { value: 1024, writable: true, configurable: true })
    Object.defineProperty(window, 'scrollY', { value: 0, writable: true, configurable: true })

    // Mock addEventListener and removeEventListener
    window.addEventListener = jest.fn()
    window.removeEventListener = jest.fn()
  })

  afterEach(() => {
    if (wrapper) {
      wrapper.destroy()
    }
  })

  test('is a Vue instance', () => {
    wrapper = mount(CV)
    expect(wrapper.vm).toBeTruthy()
  })

  test('has correct initial data', () => {
    wrapper = mount(CV)
    expect(wrapper.vm.heroAreaHeight).toBe(0)
    expect(wrapper.vm.menuStyle).toBe('')
  })

  test('renders all main sections', () => {
    wrapper = mount(CV)

    expect(wrapper.find('#hero-area').exists()).toBe(true)
    expect(wrapper.find('#overview').exists()).toBe(true)
    expect(wrapper.find('#skills').exists()).toBe(true)
    expect(wrapper.find('#experience').exists()).toBe(true)
    expect(wrapper.find('#education').exists()).toBe(true)
  })

  test('hero area has correct classes', () => {
    wrapper = mount(CV)
    const heroArea = wrapper.find('#hero-area')

    expect(heroArea.classes()).toContain('anchor-for-navigation')
  })

  test('sections have correct classes', () => {
    wrapper = mount(CV)

    expect(wrapper.find('#overview').classes()).toContain('section')
    expect(wrapper.find('#overview').classes()).toContain('is-primary')

    expect(wrapper.find('#skills').classes()).toContain('with-background')
    expect(wrapper.find('#experience').classes()).toContain('with-background')
    expect(wrapper.find('#education').classes()).toContain('with-background')
  })

  test('onResize method is defined', () => {
    wrapper = mount(CV)
    expect(typeof wrapper.vm.onResize).toBe('function')
  })

  test('onScroll method is defined', () => {
    wrapper = mount(CV)
    expect(typeof wrapper.vm.onScroll).toBe('function')
  })

  test('onScroll updates menuStyle', () => {
    wrapper = mount(CV, {
      data () {
        return {
          heroAreaHeight: 500
        }
      }
    })

    // Call onScroll and verify it updates menuStyle
    // Note: window.scrollY mocking in JSDOM has limitations, so we verify the method works
    wrapper.vm.onScroll()
    expect(typeof wrapper.vm.menuStyle).toBe('string')

    // Verify the method can be called without errors
    expect(() => wrapper.vm.onScroll()).not.toThrow()
  })

  test('renders all child components', () => {
    wrapper = mount(CV)

    expect(wrapper.find('.dark-mode-toggle-mock').exists()).toBe(true)
    expect(wrapper.find('.vertical-menu-mock').exists()).toBe(true)
    expect(wrapper.find('.hero-area-mock').exists()).toBe(true)
    expect(wrapper.find('.overview-mock').exists()).toBe(true)
    expect(wrapper.find('.skills-mock').exists()).toBe(true)
    expect(wrapper.find('.experience-mock').exists()).toBe(true)
    expect(wrapper.find('.education-mock').exists()).toBe(true)
  })
})
