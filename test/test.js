import { setupTest, createPage } from '@nuxt/test-utils'
import { mount } from '@vue/test-utils'
import CV from '@/pages/cv.vue'
import 'core-js'

describe.skip('browser', () => {
  setupTest({
    testDir: __dirname,
    fixture: 'example',
    browser: true
  })

  test('should render page', async () => {
    const page = await createPage('/')
    const body = await page.innerHTML('body')
    expect(body).toContain('Failed')
  })
})

describe('CV', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(CV)
    expect(wrapper.vm).toBeTruthy()
  })
})
