import { mount } from '@vue/test-utils'
import CvHeroArea from '@/components/CvHeroArea.vue'

// Mock v-lazy-image component
jest.mock('v-lazy-image/v2/v-lazy-image.es', () => ({
  name: 'VLazyImage',
  template: '<img />'
}))

describe('CvHeroArea', () => {
  test('renders correctly', () => {
    const wrapper = mount(CvHeroArea)
    expect(wrapper.exists()).toBe(true)
  })

  test('has hero-area class', () => {
    const wrapper = mount(CvHeroArea)
    expect(wrapper.find('.hero-area').exists()).toBe(true)
  })

  test('has hero class', () => {
    const wrapper = mount(CvHeroArea)
    expect(wrapper.find('.hero').exists()).toBe(true)
  })

  test('displays main heading with name', () => {
    const wrapper = mount(CvHeroArea)
    expect(wrapper.text()).toContain('Pavel Buramensky')
  })

  test('displays tagline', () => {
    const wrapper = mount(CvHeroArea)
    expect(wrapper.text()).toContain('front-end developer who cares about user experience')
    expect(wrapper.text()).toContain('make the world a better place')
  })

  test('has email contact link', () => {
    const wrapper = mount(CvHeroArea)
    const emailLink = wrapper.find('a[href="mailto:mail@paulbu.com"]')
    expect(emailLink.exists()).toBe(true)
    expect(emailLink.text()).toContain('Email')
  })

  test('has Telegram contact link', () => {
    const wrapper = mount(CvHeroArea)
    const telegramLink = wrapper.find('a[href="https://t.me/bupaev"]')
    expect(telegramLink.exists()).toBe(true)
    expect(telegramLink.text()).toContain('Telegram')
  })

  test('has LinkedIn contact link', () => {
    const wrapper = mount(CvHeroArea)
    const linkedinLink = wrapper.find('a[href="https://www.linkedin.com/in/pavel-buramensky/"]')
    expect(linkedinLink.exists()).toBe(true)
    expect(linkedinLink.text()).toContain('LinkedIn')
  })

  test('has CV download link', () => {
    const wrapper = mount(CvHeroArea)
    const cvLink = wrapper.find('a[href="/pavel-buramensky-cv.pdf"]')
    expect(cvLink.exists()).toBe(true)
    expect(cvLink.text()).toContain('Download my CV')
  })

  test('CV download link opens in new tab', () => {
    const wrapper = mount(CvHeroArea)
    const cvLink = wrapper.find('a[href="/pavel-buramensky-cv.pdf"]')
    expect(cvLink.attributes('target')).toBe('_blank')
  })

  test('renders container and columns', () => {
    const wrapper = mount(CvHeroArea)
    expect(wrapper.find('.container').exists()).toBe(true)
    expect(wrapper.find('.columns').exists()).toBe(true)
  })

  test('has hero-body section', () => {
    const wrapper = mount(CvHeroArea)
    expect(wrapper.find('.hero-body').exists()).toBe(true)
  })

  test('has left column', () => {
    const wrapper = mount(CvHeroArea)
    expect(wrapper.find('.left-column').exists()).toBe(true)
  })

  test('has title element', () => {
    const wrapper = mount(CvHeroArea)
    expect(wrapper.find('.title').exists()).toBe(true)
  })

  test('has contacts section', () => {
    const wrapper = mount(CvHeroArea)
    expect(wrapper.find('.contacts').exists()).toBe(true)
  })

  test('has parallelogram-image-container', () => {
    const wrapper = mount(CvHeroArea)
    const containers = wrapper.findAll('.parallelogram-image-container')
    expect(containers.length).toBeGreaterThan(0)
  })

  test('renders icon-text spans for contact links', () => {
    const wrapper = mount(CvHeroArea)
    const iconTexts = wrapper.findAll('.icon-text')
    expect(iconTexts.length).toBeGreaterThanOrEqual(4) // Email, Telegram, LinkedIn, Download CV
  })

  test('all external links have correct structure', () => {
    const wrapper = mount(CvHeroArea)
    const links = wrapper.findAll('a[href^="http"]')

    links.wrappers.forEach((link) => {
      const iconText = link.find('.icon-text')
      if (iconText.exists()) {
        expect(link.find('.icon').exists()).toBe(true)
      }
    })
  })
})
