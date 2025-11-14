import { mount } from '@vue/test-utils'
import GoToTop from '@/components/GoToTop.vue'

describe('GoToTop', () => {
  // Mock window.scrollTo
  const mockScrollTo = jest.fn()
  beforeEach(() => {
    window.scrollTo = mockScrollTo
    mockScrollTo.mockClear()
  })

  test('renders correctly', () => {
    const wrapper = mount(GoToTop)
    expect(wrapper.exists()).toBe(true)
  })

  test('has go-to-top class', () => {
    const wrapper = mount(GoToTop)
    expect(wrapper.find('.go-to-top').exists()).toBe(true)
  })

  test('renders 3 arrow elements', () => {
    const wrapper = mount(GoToTop)
    const arrows = wrapper.findAll('.arrow')
    expect(arrows).toHaveLength(3)
  })

  test('calls window.scrollTo when clicked', async () => {
    const wrapper = mount(GoToTop)

    await wrapper.trigger('click')

    expect(mockScrollTo).toHaveBeenCalledTimes(1)
    expect(mockScrollTo).toHaveBeenCalledWith({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })
  })

  test('goToTop method scrolls to top of page', () => {
    const wrapper = mount(GoToTop)

    wrapper.vm.goToTop()

    expect(mockScrollTo).toHaveBeenCalledWith({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })
  })
})
