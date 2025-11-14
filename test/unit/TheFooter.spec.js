import { mount } from '@vue/test-utils'
import TheFooter from '@/components/TheFooter.vue'
import GoToTop from '@/components/GoToTop.vue'

describe('TheFooter', () => {
  test('renders correctly', () => {
    const wrapper = mount(TheFooter)
    expect(wrapper.exists()).toBe(true)
  })

  test('is a footer element', () => {
    const wrapper = mount(TheFooter)
    expect(wrapper.element.tagName).toBe('FOOTER')
  })

  test('has footer class', () => {
    const wrapper = mount(TheFooter)
    expect(wrapper.classes()).toContain('footer')
  })

  test('contains text about NuxtJS', () => {
    const wrapper = mount(TheFooter)
    expect(wrapper.text()).toContain('Made with')
    expect(wrapper.text()).toContain('love and NuxtJS')
  })

  test('has link to GitHub repository', () => {
    const wrapper = mount(TheFooter)
    const link = wrapper.find('a[href*="github.com"]')
    expect(link.exists()).toBe(true)
    expect(link.attributes('href')).toBe('https://github.com/bupaev/bupaev.github.io')
  })

  test('GitHub link opens in new tab', () => {
    const wrapper = mount(TheFooter)
    const link = wrapper.find('a[href*="github.com"]')
    expect(link.attributes('target')).toBe('_blank')
  })

  test('renders GoToTop components', () => {
    const wrapper = mount(TheFooter)
    const goToTopComponents = wrapper.findAllComponents(GoToTop)
    expect(goToTopComponents).toHaveLength(2)
  })

  test('has left and right GoToTop components', () => {
    const wrapper = mount(TheFooter)
    expect(wrapper.find('.go-to-top-left').exists()).toBe(true)
    expect(wrapper.find('.go-to-top-right').exists()).toBe(true)
  })
})
