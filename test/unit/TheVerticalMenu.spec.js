import { mount } from '@vue/test-utils'
import TheVerticalMenu from '@/components/CvVerticalMenu/TheVerticalMenu.vue'

// Mock SVG imports
jest.mock('@/components/CvVerticalMenu/TheVerticalMenu.vue', () => ({
  ...jest.requireActual('@/components/CvVerticalMenu/TheVerticalMenu.vue'),
  __esModule: true
}))

describe('TheVerticalMenu', () => {
  let wrapper

  beforeEach(() => {
    // Mock DOM properties
    Object.defineProperty(HTMLElement.prototype, 'clientHeight', {
      configurable: true,
      value: 80
    })

    Object.defineProperty(HTMLElement.prototype, 'offsetTop', {
      configurable: true,
      value: 100
    })

    // Mock getElementsByClassName to return array-like object
    document.getElementsByClassName = jest.fn(() => {
      return [
        { clientHeight: 500, offsetTop: 0 },
        { clientHeight: 400, offsetTop: 500 },
        { clientHeight: 600, offsetTop: 900 },
        { clientHeight: 500, offsetTop: 1500 },
        { clientHeight: 400, offsetTop: 2000 }
      ]
    })

    // Mock window properties
    Object.defineProperty(window, 'scrollY', {
      configurable: true,
      writable: true,
      value: 0
    })

    Object.defineProperty(window, 'innerHeight', {
      configurable: true,
      writable: true,
      value: 800
    })

    Object.defineProperty(document.body, 'clientHeight', {
      configurable: true,
      writable: true,
      value: 3000
    })

    window.addEventListener = jest.fn()
    window.removeEventListener = jest.fn()
    window.scrollTo = jest.fn()
  })

  afterEach(() => {
    if (wrapper) {
      wrapper.destroy()
    }
  })

  test('renders correctly', () => {
    wrapper = mount(TheVerticalMenu)
    expect(wrapper.exists()).toBe(true)
  })

  test('has vertical-menu class', () => {
    wrapper = mount(TheVerticalMenu)
    expect(wrapper.find('.vertical-menu').exists()).toBe(true)
  })

  test('renders all 5 menu items', () => {
    wrapper = mount(TheVerticalMenu)
    const items = wrapper.findAll('.item')
    expect(items.length).toBe(5)
  })

  test('has correct menu item titles', () => {
    wrapper = mount(TheVerticalMenu)
    expect(wrapper.vm.items).toHaveLength(5)
    expect(wrapper.vm.items[0].title).toBe('Hello!')
    expect(wrapper.vm.items[1].title).toBe('Overview')
    expect(wrapper.vm.items[2].title).toBe('Skills')
    expect(wrapper.vm.items[3].title).toBe('Experience')
    expect(wrapper.vm.items[4].title).toBe('Education')
  })

  test('menu items have correct IDs', () => {
    wrapper = mount(TheVerticalMenu)
    expect(wrapper.vm.items[0].id).toBe('hero-area')
    expect(wrapper.vm.items[1].id).toBe('synopsis')
    expect(wrapper.vm.items[2].id).toBe('skills')
    expect(wrapper.vm.items[3].id).toBe('experience')
    expect(wrapper.vm.items[4].id).toBe('education')
  })

  test('menu items have icon references', () => {
    wrapper = mount(TheVerticalMenu)
    wrapper.vm.items.forEach((item) => {
      expect(item.icon).toBeDefined()
      expect(item.icon).toContain('.svg')
    })
  })

  test('renders visible area marker', () => {
    wrapper = mount(TheVerticalMenu)
    expect(wrapper.find('.visible-area-marker').exists()).toBe(true)
  })

  test('visible area marker has dynamic style', () => {
    wrapper = mount(TheVerticalMenu)
    wrapper.vm.markerOffset = 100
    wrapper.vm.markerHeight = 50

    wrapper.vm.$nextTick(() => {
      const marker = wrapper.find('.visible-area-marker')
      const style = marker.attributes('style')
      expect(style).toContain('translateY(100px)')
      expect(style).toContain('height: 50px')
    })
  })

  test('initializes data properties correctly', () => {
    wrapper = mount(TheVerticalMenu)
    expect(wrapper.vm.menuItemHeight).toBe(0)
    expect(Array.isArray(wrapper.vm.contentSectionsHeightArray)).toBe(true)
    expect(Array.isArray(wrapper.vm.contentSectionsOffsetArray)).toBe(true)
    expect(Array.isArray(wrapper.vm.scaleCoefficients)).toBe(true)
    expect(wrapper.vm.markerOffset).toBe(0)
    expect(wrapper.vm.markerHeight).toBe(0)
  })

  test('adds scroll and resize event listeners on mount', () => {
    wrapper = mount(TheVerticalMenu)
    expect(window.addEventListener).toHaveBeenCalledWith('scroll', expect.any(Function))
    expect(window.addEventListener).toHaveBeenCalledWith('resize', expect.any(Function))
  })

  test('removes event listeners on destroy', () => {
    wrapper = mount(TheVerticalMenu)
    wrapper.destroy()
    expect(window.removeEventListener).toHaveBeenCalledWith('scroll', expect.any(Function))
    expect(window.removeEventListener).toHaveBeenCalledWith('resize', expect.any(Function))
  })

  test('onMenuItemClick scrolls to correct section', () => {
    wrapper = mount(TheVerticalMenu)
    wrapper.vm.contentSectionsOffsetArray = [0, 500, 900, 1500, 2000]

    wrapper.vm.onMenuItemClick(2) // Click on Skills

    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 900,
      left: 0,
      behavior: 'smooth'
    })
  })

  test('getSectionsProp returns array of section properties', () => {
    wrapper = mount(TheVerticalMenu)
    const heights = wrapper.vm.getSectionsProp('clientHeight')
    const offsets = wrapper.vm.getSectionsProp('offsetTop')

    expect(Array.isArray(heights)).toBe(true)
    expect(Array.isArray(offsets)).toBe(true)
    expect(heights.length).toBe(5)
    expect(offsets.length).toBe(5)
  })

  test('getRescaledOffset calculates offset correctly', () => {
    wrapper = mount(TheVerticalMenu)
    wrapper.vm.menuItemHeight = 80
    wrapper.vm.contentSectionsOffsetArray = [0, 500, 900, 1500, 2000]
    wrapper.vm.contentSectionsHeightArray = [500, 400, 600, 500, 400]
    wrapper.vm.scaleCoefficients = [0.16, 0.2, 0.133, 0.16, 0.2]

    const offset = wrapper.vm.getRescaledOffset(600)
    expect(typeof offset).toBe('number')
    expect(offset).toBeGreaterThanOrEqual(0)
  })

  test('getRescaledOffset handles scroll at beginning', () => {
    wrapper = mount(TheVerticalMenu)
    wrapper.vm.menuItemHeight = 80
    wrapper.vm.contentSectionsOffsetArray = [0, 500, 900, 1500, 2000]
    wrapper.vm.scaleCoefficients = [0.16, 0.2, 0.133, 0.16, 0.2]

    const offset = wrapper.vm.getRescaledOffset(0)
    expect(offset).toBeCloseTo(0, 0)
  })

  test('getRescaledOffset handles scroll past last section', () => {
    wrapper = mount(TheVerticalMenu)
    wrapper.vm.menuItemHeight = 80
    wrapper.vm.contentSectionsOffsetArray = [0, 500, 900, 1500, 2000]
    wrapper.vm.scaleCoefficients = [0.16, 0.2, 0.133, 0.16, 0.2]

    const offset = wrapper.vm.getRescaledOffset(3000)
    expect(typeof offset).toBe('number')
  })

  test('setAreaMarkerPosition updates marker properties', () => {
    wrapper = mount(TheVerticalMenu)
    wrapper.vm.menuItemHeight = 80
    wrapper.vm.contentSectionsOffsetArray = [0, 500, 900, 1500, 2000]
    wrapper.vm.scaleCoefficients = [0.16, 0.2, 0.133, 0.16, 0.2]

    Object.defineProperty(window, 'scrollY', { value: 100, configurable: true })
    Object.defineProperty(window, 'innerHeight', { value: 800, configurable: true })

    wrapper.vm.setAreaMarkerPosition()

    expect(typeof wrapper.vm.markerOffset).toBe('number')
    expect(typeof wrapper.vm.markerHeight).toBe('number')
  })

  test('setAreaMarkerPosition sets marker height to menuItemHeight at end of page', () => {
    wrapper = mount(TheVerticalMenu)
    wrapper.vm.menuItemHeight = 80
    wrapper.vm.contentSectionsOffsetArray = [0, 500, 900, 1500, 2000]
    wrapper.vm.scaleCoefficients = [0.16, 0.2, 0.133, 0.16, 0.2]

    // Scroll to bottom of page
    Object.defineProperty(window, 'scrollY', { value: 2200, configurable: true })
    Object.defineProperty(window, 'innerHeight', { value: 800, configurable: true })
    Object.defineProperty(document.body, 'clientHeight', { value: 3000, configurable: true })

    wrapper.vm.setAreaMarkerPosition()

    expect(wrapper.vm.markerHeight).toBe(80)
  })

  test('menu item click triggers onMenuItemClick', async () => {
    wrapper = mount(TheVerticalMenu)
    wrapper.vm.contentSectionsOffsetArray = [0, 500, 900, 1500, 2000]

    const items = wrapper.findAll('.item')
    await items.at(2).trigger('click')

    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 900,
      left: 0,
      behavior: 'smooth'
    })
  })

  test('renders item text and icon', () => {
    wrapper = mount(TheVerticalMenu)
    const items = wrapper.findAll('.item')

    items.wrappers.forEach((item) => {
      expect(item.find('.item-text').exists()).toBe(true)
      expect(item.find('.item-icon').exists()).toBe(true)
    })
  })

  test('scale coefficients are calculated correctly', () => {
    wrapper = mount(TheVerticalMenu)
    wrapper.vm.menuItemHeight = 80
    wrapper.vm.contentSectionsHeightArray = [500, 400, 600, 500, 400]

    wrapper.vm.scaleCoefficients = wrapper.vm.contentSectionsHeightArray.map((height) => {
      return wrapper.vm.menuItemHeight / height
    })

    expect(wrapper.vm.scaleCoefficients[0]).toBeCloseTo(0.16, 2)
    expect(wrapper.vm.scaleCoefficients[1]).toBeCloseTo(0.2, 2)
    expect(wrapper.vm.scaleCoefficients[2]).toBeCloseTo(0.133, 2)
  })
})
