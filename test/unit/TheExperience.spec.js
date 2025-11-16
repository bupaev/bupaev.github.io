import { mount } from '@vue/test-utils'
import TheExperience from '@/components/CvExperience/TheExperience.vue'
import Timeline from '@/components/CvExperience/Timeline.vue'
import Slash from '@/components/Slash.vue'

describe('TheExperience', () => {
  test('renders correctly', () => {
    const wrapper = mount(TheExperience)
    expect(wrapper.exists()).toBe(true)
  })

  test('has experience class', () => {
    const wrapper = mount(TheExperience)
    expect(wrapper.find('.experience').exists()).toBe(true)
  })

  test('has container class', () => {
    const wrapper = mount(TheExperience)
    expect(wrapper.find('.container').exists()).toBe(true)
  })

  test('displays Experience title', () => {
    const wrapper = mount(TheExperience)
    expect(wrapper.find('.title').text()).toBe('Experience')
  })

  test('title is h2 element', () => {
    const wrapper = mount(TheExperience)
    const title = wrapper.find('h2')
    expect(title.exists()).toBe(true)
  })

  test('renders Timeline component', () => {
    const wrapper = mount(TheExperience)
    expect(wrapper.findComponent(Timeline).exists()).toBe(true)
  })

  test('renders Slash components', () => {
    const wrapper = mount(TheExperience)
    const slashes = wrapper.findAllComponents(Slash)
    expect(slashes.length).toBeGreaterThan(0)
  })

  test('has content section', () => {
    const wrapper = mount(TheExperience)
    expect(wrapper.find('.content').exists()).toBe(true)
  })

  test('has job-record sections', () => {
    const wrapper = mount(TheExperience)
    const jobRecords = wrapper.findAll('.job-record')
    expect(jobRecords.length).toBeGreaterThan(0)
  })

  test('EPAM job section exists', () => {
    const wrapper = mount(TheExperience)
    const epamSection = wrapper.find('#epam')
    expect(epamSection.exists()).toBe(true)
    expect(epamSection.text()).toContain('Lead Front-end engineer')
    expect(epamSection.text()).toContain('EPAM')
    expect(epamSection.text()).toContain('2022 - Now')
  })

  test('Holmusk job section exists', () => {
    const wrapper = mount(TheExperience)
    const holmuskSection = wrapper.find('#holmusk')
    expect(holmuskSection.exists()).toBe(true)
    expect(holmuskSection.text()).toContain('Lead Front-end developer')
    expect(holmuskSection.text()).toContain('Holmusk')
    expect(holmuskSection.text()).toContain('2018 - 2021')
  })

  test('Codenetix job section exists', () => {
    const wrapper = mount(TheExperience)
    const codenetixSection = wrapper.find('#codenetix')
    expect(codenetixSection.exists()).toBe(true)
    expect(codenetixSection.text()).toContain('Lead UI/Front-end developer')
    expect(codenetixSection.text()).toContain('Codenetix')
    expect(codenetixSection.text()).toContain('2016 - 2018')
  })

  test('Bandlab job section exists', () => {
    const wrapper = mount(TheExperience)
    const bandlabSection = wrapper.find('#bandlab')
    expect(bandlabSection.exists()).toBe(true)
    expect(bandlabSection.text()).toContain('Front-end developer')
    expect(bandlabSection.text()).toContain('Bandlab')
    expect(bandlabSection.text()).toContain('2014 - 2016')
  })

  test('DXC Luxoft job section exists', () => {
    const wrapper = mount(TheExperience)
    const luxoftSection = wrapper.find('#luxoft')
    expect(luxoftSection.exists()).toBe(true)
    expect(luxoftSection.text()).toContain('DXC Luxoft')
    expect(luxoftSection.text()).toContain('2012 - 2014')
  })

  test('Mir IT job section exists', () => {
    const wrapper = mount(TheExperience)
    const mirItSection = wrapper.find('#mirIt')
    expect(mirItSection.exists()).toBe(true)
    expect(mirItSection.text()).toContain('Mir IT')
    expect(mirItSection.text()).toContain('2011 - 2012')
  })

  test('OMSTU teaching position exists', () => {
    const wrapper = mount(TheExperience)
    const omstuSection = wrapper.find('#omstu')
    expect(omstuSection.exists()).toBe(true)
    expect(omstuSection.text()).toContain('Teaching Assistant')
    expect(omstuSection.text()).toContain('Omsk State Technical University')
    expect(omstuSection.text()).toContain('2009 – 2014')
  })

  test('Freelance section exists', () => {
    const wrapper = mount(TheExperience)
    const freelanceSection = wrapper.find('#freelance')
    expect(freelanceSection.exists()).toBe(true)
    expect(freelanceSection.text()).toContain('Freelance')
    expect(freelanceSection.text()).toContain('2008 – 2011')
  })

  test('job sections have h3 headings', () => {
    const wrapper = mount(TheExperience)
    const headings = wrapper.findAll('.job-record h3')
    expect(headings.length).toBeGreaterThanOrEqual(7)
  })

  test('job sections have job-title class', () => {
    const wrapper = mount(TheExperience)
    const jobTitles = wrapper.findAll('.job-title')
    expect(jobTitles.length).toBeGreaterThanOrEqual(7)
  })

  test('job sections have company class', () => {
    const wrapper = mount(TheExperience)
    const companies = wrapper.findAll('.company')
    expect(companies.length).toBeGreaterThan(0)
  })

  test('job sections have interval class', () => {
    const wrapper = mount(TheExperience)
    const intervals = wrapper.findAll('.interval')
    expect(intervals.length).toBeGreaterThanOrEqual(7)
  })

  test('Holmusk section has Used Skills heading', () => {
    const wrapper = mount(TheExperience)
    const holmuskSection = wrapper.find('#holmusk')
    expect(holmuskSection.text()).toContain('Used Skills')
    expect(holmuskSection.text()).toContain('VueJS')
    expect(holmuskSection.text()).toContain('TypeScript')
    expect(holmuskSection.text()).toContain('FHIR API')
  })

  test('Holmusk section has Responsibilities heading', () => {
    const wrapper = mount(TheExperience)
    const holmuskSection = wrapper.find('#holmusk')
    expect(holmuskSection.text()).toContain('Responsibilities')
  })

  test('Holmusk section has Challenges heading', () => {
    const wrapper = mount(TheExperience)
    const holmuskSection = wrapper.find('#holmusk')
    expect(holmuskSection.text()).toContain('Challenges')
    expect(holmuskSection.text()).toContain('FHIR')
  })

  test('company links open in new tab', () => {
    const wrapper = mount(TheExperience)
    const companyLinks = wrapper.findAll('.company a')

    companyLinks.wrappers.forEach((link) => {
      expect(link.attributes('target')).toBe('_blank')
    })
  })

  test('has link to Holmusk website', () => {
    const wrapper = mount(TheExperience)
    const holmuskLink = wrapper.find('a[href="https://www.holmusk.com/"]')
    expect(holmuskLink.exists()).toBe(true)
  })

  test('has link to Bandlab website', () => {
    const wrapper = mount(TheExperience)
    const bandlabLink = wrapper.find('a[href="https://www.bandlab.com/"]')
    expect(bandlabLink.exists()).toBe(true)
  })

  test('has link to EPAM website', () => {
    const wrapper = mount(TheExperience)
    const epamLink = wrapper.find('a[href="https://www.epam.com/"]')
    expect(epamLink.exists()).toBe(true)
  })
})
