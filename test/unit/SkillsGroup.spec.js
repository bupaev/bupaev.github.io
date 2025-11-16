import { mount } from '@vue/test-utils'
import SkillsGroup from '@/components/CvSkills/SkillsGroup.vue'
import SkillBar from '@/components/CvSkills/SkillBar.vue'

describe('SkillsGroup', () => {
  const defaultProps = {
    title: 'Programming Languages',
    items: [
      { title: 'JavaScript', level: 3, info: 'Expert level' },
      { title: 'TypeScript', level: 2 },
      { title: 'Python', level: 1, info: 'Basic knowledge' }
    ]
  }

  test('renders correctly with required props', () => {
    const wrapper = mount(SkillsGroup, {
      propsData: defaultProps
    })
    expect(wrapper.exists()).toBe(true)
  })

  test('displays the title', () => {
    const wrapper = mount(SkillsGroup, {
      propsData: defaultProps
    })
    expect(wrapper.text()).toContain('Programming Languages')
  })

  test('renders all skill items', () => {
    const wrapper = mount(SkillsGroup, {
      propsData: defaultProps
    })
    const skillItems = wrapper.findAll('.skill-item')
    expect(skillItems.length).toBe(3)
  })

  test('displays skill item titles', () => {
    const wrapper = mount(SkillsGroup, {
      propsData: defaultProps
    })
    expect(wrapper.text()).toContain('JavaScript')
    expect(wrapper.text()).toContain('TypeScript')
    expect(wrapper.text()).toContain('Python')
  })

  test('renders SkillBar for each item', () => {
    const wrapper = mount(SkillsGroup, {
      propsData: defaultProps
    })
    const skillBars = wrapper.findAllComponents(SkillBar)
    expect(skillBars.length).toBe(3)
  })

  test('passes correct level prop to SkillBar', () => {
    const wrapper = mount(SkillsGroup, {
      propsData: defaultProps
    })
    const skillBars = wrapper.findAllComponents(SkillBar)
    expect(skillBars.at(0).props('level')).toBe(3)
    expect(skillBars.at(1).props('level')).toBe(2)
    expect(skillBars.at(2).props('level')).toBe(1)
  })

  test('displays info text when item has info', () => {
    const wrapper = mount(SkillsGroup, {
      propsData: defaultProps
    })
    expect(wrapper.text()).toContain('Expert level')
    expect(wrapper.text()).toContain('Basic knowledge')
  })

  test('does not show info icon when item has no info', () => {
    const wrapper = mount(SkillsGroup, {
      propsData: defaultProps
    })
    const items = wrapper.findAll('.skill-item')
    const typescriptItem = items.at(1)
    expect(typescriptItem.find('.info-icon').exists()).toBe(false)
  })

  test('shows info icon when item has info', () => {
    const wrapper = mount(SkillsGroup, {
      propsData: defaultProps
    })
    const items = wrapper.findAll('.skill-item')
    const javascriptItem = items.at(0)
    expect(javascriptItem.find('.info-icon').exists()).toBe(true)
  })

  test('renders with optional info prop', () => {
    const wrapper = mount(SkillsGroup, {
      propsData: {
        ...defaultProps,
        info: 'Group description'
      }
    })
    expect(wrapper.text()).toContain('Group description')
  })

  test('renders without info prop', () => {
    const wrapper = mount(SkillsGroup, {
      propsData: defaultProps
    })
    expect(wrapper.exists()).toBe(true)
  })

  test('has interactive-area class', () => {
    const wrapper = mount(SkillsGroup, {
      propsData: defaultProps
    })
    expect(wrapper.find('.interactive-area').exists()).toBe(true)
  })

  test('has skills-section class', () => {
    const wrapper = mount(SkillsGroup, {
      propsData: defaultProps
    })
    expect(wrapper.find('.skills-section').exists()).toBe(true)
  })

  test('hasAnyInfo computed property returns true when group has info', () => {
    const wrapper = mount(SkillsGroup, {
      propsData: {
        ...defaultProps,
        info: 'Group info'
      }
    })
    expect(wrapper.vm.hasAnyInfo).toBe(true)
  })

  test('hasAnyInfo computed property returns true when any item has info', () => {
    const wrapper = mount(SkillsGroup, {
      propsData: defaultProps
    })
    expect(wrapper.vm.hasAnyInfo).toBe(true)
  })

  test('hasAnyInfo computed property returns false when no info exists', () => {
    const wrapper = mount(SkillsGroup, {
      propsData: {
        title: 'Test',
        items: [
          { title: 'Skill 1', level: 1 },
          { title: 'Skill 2', level: 2 }
        ]
      }
    })
    expect(wrapper.vm.hasAnyInfo).toBe(false)
  })

  test('renders item-title for each skill', () => {
    const wrapper = mount(SkillsGroup, {
      propsData: defaultProps
    })
    const itemTitles = wrapper.findAll('.item-title')
    expect(itemTitles.length).toBe(3)
  })

  test('info section exists when item has info', () => {
    const wrapper = mount(SkillsGroup, {
      propsData: defaultProps
    })
    const infoElements = wrapper.findAll('.info')
    expect(infoElements.length).toBeGreaterThan(0)
  })
})
