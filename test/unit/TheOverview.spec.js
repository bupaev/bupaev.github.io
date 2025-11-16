import { mount } from '@vue/test-utils'
import TheOverview from '@/components/CvOverview/TheOverview.vue'
import VennDiagramProfessions from '@/components/CvOverview/VennDiagramProfessions.vue'

describe('TheOverview', () => {
  test('renders correctly', () => {
    const wrapper = mount(TheOverview)
    expect(wrapper.exists()).toBe(true)
  })

  test('has overview class', () => {
    const wrapper = mount(TheOverview)
    expect(wrapper.find('.overview').exists()).toBe(true)
  })

  test('has container class', () => {
    const wrapper = mount(TheOverview)
    expect(wrapper.find('.container').exists()).toBe(true)
  })

  test('displays Overview title', () => {
    const wrapper = mount(TheOverview)
    expect(wrapper.find('.title').text()).toBe('Overview')
  })

  test('title has correct heading level', () => {
    const wrapper = mount(TheOverview)
    expect(wrapper.find('h2').exists()).toBe(true)
  })

  test('renders VennDiagramProfessions component', () => {
    const wrapper = mount(TheOverview)
    expect(wrapper.findComponent(VennDiagramProfessions).exists()).toBe(true)
  })

  test('diagram-container exists', () => {
    const wrapper = mount(TheOverview)
    const container = wrapper.find('.diagram-container')
    expect(container.exists()).toBe(true)
  })

  test('has content section', () => {
    const wrapper = mount(TheOverview)
    expect(wrapper.find('.content').exists()).toBe(true)
  })

  test('has columns layout', () => {
    const wrapper = mount(TheOverview)
    expect(wrapper.find('.columns').exists()).toBe(true)
  })

  test('displays professional summary text', () => {
    const wrapper = mount(TheOverview)
    expect(wrapper.text()).toContain("I've been doing front-end development for over a decade")
    expect(wrapper.text()).toContain('deliver a first-class user experience')
  })

  test('mentions Bandlab project', () => {
    const wrapper = mount(TheOverview)
    expect(wrapper.text()).toContain('multitrack audio workstation')
  })

  test('has link to Bandlab', () => {
    const wrapper = mount(TheOverview)
    const bandlabLink = wrapper.find('a[href="https://www.bandlab.com/creation-features"]')
    expect(bandlabLink.exists()).toBe(true)
    expect(bandlabLink.attributes('target')).toBe('_blank')
  })

  test('mentions Holmusk project', () => {
    const wrapper = mount(TheOverview)
    expect(wrapper.text()).toContain('electronic health record system')
  })

  test('has link to Holmusk', () => {
    const wrapper = mount(TheOverview)
    const holmuskLink = wrapper.find('a[href="https://www.holmusk.com/solutions"]')
    expect(holmuskLink.exists()).toBe(true)
    expect(holmuskLink.attributes('target')).toBe('_blank')
  })

  test('describes front-end engineering expertise', () => {
    const wrapper = mount(TheOverview)
    const text = wrapper.text()
    expect(text).toContain('Front-end engineering')
    expect(text).toContain('building scalable')
    expect(text).toContain('maintainable front-end architectures')
  })

  test('describes visual design expertise', () => {
    const wrapper = mount(TheOverview)
    expect(wrapper.text()).toContain('Visual design and user experience')
  })

  test('has section-with-delimiter', () => {
    const wrapper = mount(TheOverview)
    expect(wrapper.find('.section-with-delimiter').exists()).toBe(true)
  })

  test('mentions photography and behavioral psychology', () => {
    const wrapper = mount(TheOverview)
    expect(wrapper.text()).toContain('photography and behavioral psychology')
  })

  test('has multiple paragraphs', () => {
    const wrapper = mount(TheOverview)
    const paragraphs = wrapper.findAll('p')
    expect(paragraphs.length).toBeGreaterThan(3)
  })

  test('external links open in new tab', () => {
    const wrapper = mount(TheOverview)
    const externalLinks = wrapper.findAll('a[target="_blank"]')
    expect(externalLinks.length).toBeGreaterThanOrEqual(2)
  })
})
