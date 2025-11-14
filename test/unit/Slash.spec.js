import { mount } from '@vue/test-utils'
import Slash from '@/components/Slash.vue'

describe('Slash', () => {
  test('renders correctly', () => {
    const wrapper = mount(Slash)
    expect(wrapper.exists()).toBe(true)
  })

  test('displays pipe character', () => {
    const wrapper = mount(Slash)
    expect(wrapper.text()).toBe('|')
  })

  test('has slash class', () => {
    const wrapper = mount(Slash)
    expect(wrapper.find('.slash').exists()).toBe(true)
  })

  test('renders as span element', () => {
    const wrapper = mount(Slash)
    expect(wrapper.element.tagName).toBe('SPAN')
  })
})
