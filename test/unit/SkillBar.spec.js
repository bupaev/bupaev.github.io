import { mount } from '@vue/test-utils'
import SkillBar from '@/components/CvSkills/SkillBar.vue'

describe('SkillBar', () => {
  test('renders correctly with level prop', () => {
    const wrapper = mount(SkillBar, {
      propsData: {
        level: 2
      }
    })
    expect(wrapper.exists()).toBe(true)
  })

  test('renders 3 segments', () => {
    const wrapper = mount(SkillBar, {
      propsData: {
        level: 2
      }
    })
    const segments = wrapper.findAll('.segment')
    expect(segments).toHaveLength(3)
  })

  test('fills correct number of segments based on level prop', () => {
    const wrapper = mount(SkillBar, {
      propsData: {
        level: 2
      }
    })
    const filledSegments = wrapper.findAll('.segment.filled')
    expect(filledSegments).toHaveLength(2)
  })

  test('fills all segments when level is 3', () => {
    const wrapper = mount(SkillBar, {
      propsData: {
        level: 3
      }
    })
    const filledSegments = wrapper.findAll('.segment.filled')
    expect(filledSegments).toHaveLength(3)
  })

  test('fills no segments when level is 0', () => {
    const wrapper = mount(SkillBar, {
      propsData: {
        level: 0
      }
    })
    const filledSegments = wrapper.findAll('.segment.filled')
    expect(filledSegments).toHaveLength(0)
  })

  test('fills one segment when level is 1', () => {
    const wrapper = mount(SkillBar, {
      propsData: {
        level: 1
      }
    })
    const filledSegments = wrapper.findAll('.segment.filled')
    expect(filledSegments).toHaveLength(1)
  })

  test('has skill-bar class', () => {
    const wrapper = mount(SkillBar, {
      propsData: {
        level: 2
      }
    })
    expect(wrapper.find('.skill-bar').exists()).toBe(true)
  })
})
