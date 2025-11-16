import { mount } from '@vue/test-utils'
import CvEducation from '@/components/CvEducation.vue'

describe('CvEducation', () => {
  test('renders correctly', () => {
    const wrapper = mount(CvEducation)
    expect(wrapper.exists()).toBe(true)
  })

  test('has education class', () => {
    const wrapper = mount(CvEducation)
    expect(wrapper.find('.education').exists()).toBe(true)
  })

  test('has container class', () => {
    const wrapper = mount(CvEducation)
    expect(wrapper.find('.container').exists()).toBe(true)
  })

  test('displays Education title', () => {
    const wrapper = mount(CvEducation)
    expect(wrapper.find('.title').text()).toBe('Education')
  })

  test('title is h2 element', () => {
    const wrapper = mount(CvEducation)
    const title = wrapper.find('h2')
    expect(title.exists()).toBe(true)
    expect(title.text()).toBe('Education')
  })

  test('has content section', () => {
    const wrapper = mount(CvEducation)
    expect(wrapper.find('.content').exists()).toBe(true)
  })

  test('mentions professional self-development', () => {
    const wrapper = mount(CvEducation)
    expect(wrapper.text()).toContain('Endless professional self-development')
  })

  test('lists online learning platforms', () => {
    const wrapper = mount(CvEducation)
    expect(wrapper.text()).toContain('Udemy')
    expect(wrapper.text()).toContain('Coursera')
    expect(wrapper.text()).toContain('Skillbox')
    expect(wrapper.text()).toContain('JavaScript.Ninja')
    expect(wrapper.text()).toContain('Refactoring.Guru')
  })

  test('mentions PhD studies', () => {
    const wrapper = mount(CvEducation)
    expect(wrapper.text()).toContain('Doctor of Philosophy')
    expect(wrapper.text()).toContain('postgraduate student')
    expect(wrapper.text()).toContain('Computer science')
    expect(wrapper.text()).toContain('unfinished')
  })

  test('PhD period is 2013-2015', () => {
    const wrapper = mount(CvEducation)
    expect(wrapper.text()).toContain('2013 - 2015')
  })

  test('mentions Master of Science degree', () => {
    const wrapper = mount(CvEducation)
    expect(wrapper.text()).toContain('Master of Science, Computer science')
  })

  test('Master degree period and GPA', () => {
    const wrapper = mount(CvEducation)
    expect(wrapper.text()).toContain('2009-2011')
    expect(wrapper.text()).toContain('GPA 4.9/5.0')
  })

  test('mentions Bachelor of Science degree', () => {
    const wrapper = mount(CvEducation)
    expect(wrapper.text()).toContain('Bachelor of Science, Computer science')
  })

  test('Bachelor degree period and GPA', () => {
    const wrapper = mount(CvEducation)
    expect(wrapper.text()).toContain('2005-2009')
    expect(wrapper.text()).toContain('GPA 4.6/5.0')
  })

  test('mentions Omsk State Technical University', () => {
    const wrapper = mount(CvEducation)
    const text = wrapper.text()
    // University should be mentioned multiple times (PhD, Master, Bachelor)
    const universityMatches = (text.match(/Omsk State Technical University/g) || []).length
    expect(universityMatches).toBeGreaterThanOrEqual(3)
  })

  test('has multiple h3 headings for different degrees', () => {
    const wrapper = mount(CvEducation)
    const headings = wrapper.findAll('h3')
    expect(headings.length).toBeGreaterThanOrEqual(4) // Self-dev + PhD + Master + Bachelor
  })

  test('paragraphs follow h3 headings', () => {
    const wrapper = mount(CvEducation)
    const content = wrapper.find('.content')

    // Check that we have both h3 and p elements
    expect(content.findAll('h3').length).toBeGreaterThan(0)
    expect(content.findAll('p').length).toBeGreaterThan(0)
  })

  test('degrees are listed in reverse chronological order', () => {
    const wrapper = mount(CvEducation)
    const text = wrapper.text()

    // Self-development should come first
    const selfDevIndex = text.indexOf('Endless professional self-development')
    const phdIndex = text.indexOf('Doctor of Philosophy')
    const masterIndex = text.indexOf('Master of Science')
    const bachelorIndex = text.indexOf('Bachelor of Science')

    expect(selfDevIndex).toBeLessThan(phdIndex)
    expect(phdIndex).toBeLessThan(masterIndex)
    expect(masterIndex).toBeLessThan(bachelorIndex)
  })
})
