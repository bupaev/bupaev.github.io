import { mount } from '@vue/test-utils'
import DarkModeToggle from '@/components/DarkModeToggle/DarkModeToggle.vue'

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn()
  }))
})

describe('DarkModeToggle', () => {
  beforeEach(() => {
    // Clear cookies before each test
    document.cookie = 'color-scheme=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
    // Reset document attribute
    document.documentElement.removeAttribute('data-color-scheme')
  })

  test('renders correctly', () => {
    const wrapper = mount(DarkModeToggle)
    expect(wrapper.exists()).toBe(true)
  })

  test('has dark-mode-toggle class', () => {
    const wrapper = mount(DarkModeToggle)
    expect(wrapper.find('.dark-mode-toggle').exists()).toBe(true)
  })

  test('initializes with isDark as false by default', () => {
    const wrapper = mount(DarkModeToggle)
    expect(wrapper.vm.isDark).toBe(false)
  })

  test('toggles dark mode when clicked', async () => {
    const wrapper = mount(DarkModeToggle)
    const toggle = wrapper.find('.dark-mode-toggle')

    // Initial state should be light
    expect(wrapper.vm.isDark).toBe(false)

    // Click to toggle
    await toggle.trigger('click')

    // Should be dark now
    expect(wrapper.vm.isDark).toBe(true)
  })

  test('adds dark-mode-enabled class when isDark is true', async () => {
    const wrapper = mount(DarkModeToggle)
    const toggle = wrapper.find('.dark-mode-toggle')

    await toggle.trigger('click')

    expect(wrapper.find('.dark-mode-enabled').exists()).toBe(true)
  })

  test('sets data-color-scheme attribute on document when toggled', async () => {
    const wrapper = mount(DarkModeToggle)
    const toggle = wrapper.find('.dark-mode-toggle')

    await toggle.trigger('click')

    expect(document.documentElement.getAttribute('data-color-scheme')).toBe('dark')

    await toggle.trigger('click')

    expect(document.documentElement.getAttribute('data-color-scheme')).toBe('light')
  })

  test('sets cookie when theme is changed', async () => {
    const wrapper = mount(DarkModeToggle)
    const toggle = wrapper.find('.dark-mode-toggle')

    await toggle.trigger('click')

    expect(document.cookie).toContain('color-scheme=dark')
  })

  test('displays correct icons based on theme', async () => {
    const wrapper = mount(DarkModeToggle)
    const toggle = wrapper.find('.dark-mode-toggle')

    // Initial state (light mode)
    expect(wrapper.find('.icon-light').exists()).toBe(true)
    expect(wrapper.find('.icon-dark').exists()).toBe(true)

    // After toggling to dark mode
    await toggle.trigger('click')
    expect(wrapper.find('.dark-mode-enabled').exists()).toBe(true)
  })

  test('shows Dark and Light labels', () => {
    const wrapper = mount(DarkModeToggle)
    expect(wrapper.text()).toContain('Dark')
    expect(wrapper.text()).toContain('Light')
  })

  test('setCompactState method sets isCompact based on scroll position', () => {
    const wrapper = mount(DarkModeToggle)

    // Mock scrollY
    window.scrollY = 0
    wrapper.vm.setCompactState()
    expect(wrapper.vm.isCompact).toBe(false)

    window.scrollY = 10
    wrapper.vm.setCompactState()
    expect(wrapper.vm.isCompact).toBe(true)
  })

  test('adds compact class when scrolled', async () => {
    const wrapper = mount(DarkModeToggle)

    window.scrollY = 10
    wrapper.vm.setCompactState()
    await wrapper.vm.$nextTick()

    expect(wrapper.find('.compact').exists()).toBe(true)
  })

  test('getCookie method returns correct cookie value', () => {
    const wrapper = mount(DarkModeToggle)

    document.cookie = 'color-scheme=dark'
    expect(wrapper.vm.getCookie('color-scheme')).toBe('dark')

    document.cookie = 'color-scheme=light'
    expect(wrapper.vm.getCookie('color-scheme')).toBe('light')
  })

  test('getCookie returns undefined for non-existent cookie', () => {
    const wrapper = mount(DarkModeToggle)
    expect(wrapper.vm.getCookie('non-existent')).toBeUndefined()
  })

  test('setDarkMode method correctly updates state and DOM', () => {
    const wrapper = mount(DarkModeToggle)

    wrapper.vm.setDarkMode(true)
    expect(wrapper.vm.isDark).toBe(true)
    expect(document.documentElement.getAttribute('data-color-scheme')).toBe('dark')

    wrapper.vm.setDarkMode(false)
    expect(wrapper.vm.isDark).toBe(false)
    expect(document.documentElement.getAttribute('data-color-scheme')).toBe('light')
  })

  test('removes scroll listener on destroy', () => {
    const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener')
    const wrapper = mount(DarkModeToggle)

    wrapper.destroy()

    expect(removeEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function))
  })
})
