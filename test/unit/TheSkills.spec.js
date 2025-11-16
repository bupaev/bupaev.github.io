import { mount } from '@vue/test-utils'
import TheSkills from '@/components/CvSkills/TheSkills.vue'
import SkillsGroup from '@/components/CvSkills/SkillsGroup.vue'

describe('TheSkills', () => {
  test('renders correctly', () => {
    const wrapper = mount(TheSkills)
    expect(wrapper.exists()).toBe(true)
  })

  test('has skills class', () => {
    const wrapper = mount(TheSkills)
    expect(wrapper.find('.skills').exists()).toBe(true)
  })

  test('has container class', () => {
    const wrapper = mount(TheSkills)
    expect(wrapper.find('.container').exists()).toBe(true)
  })

  test('displays Skills title', () => {
    const wrapper = mount(TheSkills)
    expect(wrapper.find('.title').text()).toBe('Skills')
  })

  test('title is h2 with bold styling', () => {
    const wrapper = mount(TheSkills)
    const title = wrapper.find('h2')
    expect(title.exists()).toBe(true)
    expect(title.classes()).toContain('has-text-weight-bold')
  })

  test('has "What I can do" section', () => {
    const wrapper = mount(TheSkills)
    expect(wrapper.text()).toContain('What I can do:')
  })

  test('displays skill descriptions', () => {
    const wrapper = mount(TheSkills)
    expect(wrapper.text()).toContain('develop and maintain complex web apps with modern JS frameworks')
    expect(wrapper.text()).toContain('create reasonably pixel-perfect, adaptive, rich-media web interfaces')
    expect(wrapper.text()).toContain('make wireframes and user flows')
    expect(wrapper.text()).toContain('manage a small team of developers in Agile process')
  })

  test('has "Detailed list" section', () => {
    const wrapper = mount(TheSkills)
    expect(wrapper.text()).toContain('Detailed list:')
  })

  test('renders SkillsGroup components', () => {
    const wrapper = mount(TheSkills)
    const skillsGroups = wrapper.findAllComponents(SkillsGroup)
    expect(skillsGroups.length).toBeGreaterThan(0)
  })

  test('has skills data array', () => {
    const wrapper = mount(TheSkills)
    expect(Array.isArray(wrapper.vm.skills)).toBe(true)
    expect(wrapper.vm.skills.length).toBeGreaterThan(0)
  })

  test('skills data contains expected categories', () => {
    const wrapper = mount(TheSkills)
    const titles = wrapper.vm.skills.map(group => group.title)

    expect(titles).toContain('Programming/Markup languages')
    expect(titles).toContain('JavaScript Frameworks and SSR')
    expect(titles).toContain('Browser APIs')
    expect(titles).toContain('UX/UI design tools')
    expect(titles).toContain('Infrastructure')
  })

  test('Programming languages group has expected skills', () => {
    const wrapper = mount(TheSkills)
    const programmingGroup = wrapper.vm.skills.find(g => g.title === 'Programming/Markup languages')

    expect(programmingGroup).toBeDefined()
    expect(programmingGroup.items).toBeDefined()

    const skillTitles = programmingGroup.items.map(item => item.title)
    expect(skillTitles).toContain('Javascript')
    expect(skillTitles).toContain('TypeScript')
    expect(skillTitles).toContain('CSS, SCSS, LESS, JSS')
    expect(skillTitles).toContain('HTML5')
  })

  test('JavaScript Frameworks group includes Vue and React', () => {
    const wrapper = mount(TheSkills)
    const frameworksGroup = wrapper.vm.skills.find(g => g.title === 'JavaScript Frameworks and SSR')

    const skillTitles = frameworksGroup.items.map(item => item.title)
    expect(skillTitles).toContain('Vue')
    expect(skillTitles).toContain('React')
    expect(skillTitles).toContain('NuxtJS')
  })

  test('all skill items have level property', () => {
    const wrapper = mount(TheSkills)

    wrapper.vm.skills.forEach((group) => {
      group.items.forEach((item) => {
        expect(item).toHaveProperty('level')
        expect(typeof item.level).toBe('number')
        expect(item.level).toBeGreaterThanOrEqual(1)
        expect(item.level).toBeLessThanOrEqual(3)
      })
    })
  })

  test('Languages group exists with Russian and English', () => {
    const wrapper = mount(TheSkills)
    const languagesGroup = wrapper.vm.skills.find(g => g.title === 'Languages')

    expect(languagesGroup).toBeDefined()
    const skillTitles = languagesGroup.items.map(item => item.title)
    expect(skillTitles).toContain('Russian')
    expect(skillTitles).toContain('English')
  })

  test('renders correct number of skill groups', () => {
    const wrapper = mount(TheSkills)
    const skillsGroupComponents = wrapper.findAllComponents(SkillsGroup)
    expect(skillsGroupComponents.length).toBe(wrapper.vm.skills.length)
  })

  test('passes props to SkillsGroup components', () => {
    const wrapper = mount(TheSkills)
    const firstGroup = wrapper.findComponent(SkillsGroup)

    expect(firstGroup.props('title')).toBeDefined()
    expect(firstGroup.props('items')).toBeDefined()
    expect(Array.isArray(firstGroup.props('items'))).toBe(true)
  })

  test('has flex layout for skill groups', () => {
    const wrapper = mount(TheSkills)
    const flexContainer = wrapper.find('.is-flex')
    expect(flexContainer.exists()).toBe(true)
    expect(flexContainer.classes()).toContain('is-flex-wrap-wrap')
  })
})
