import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import TheFooter from '@/components/TheFooter'

describe('TheFooter', () => {
  it('renders footer element', () => {
    render(<TheFooter />)
    const footer = screen.getByRole('contentinfo')
    expect(footer).toBeInTheDocument()
  })

  it('contains GitHub link', () => {
    render(<TheFooter />)
    const link = screen.getByRole('link', { name: /love and NuxtJS/i })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', 'https://github.com/bupaev/bupaev.github.io')
  })

  it('renders GoToTop components', () => {
    render(<TheFooter />)
    const goToTopElements = screen.getAllByRole('generic').filter(
      el => el.className.includes('goToTop')
    )
    expect(goToTopElements.length).toBeGreaterThanOrEqual(2)
  })
})
