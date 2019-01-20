const path = require('path')

describe('app', () => {
  beforeEach(async () => {
    await page.goto('http://0.0.0.0:1234')
  })

  it('should stay the same at first', async () => {
    const screenshot = await page.screenshot()
    expect(screenshot).toMatchImageSnapshot()
  })

  it('should increment the counter when button is clicked', async () => {
    await expect(page).toClick('button', { text: 'Click me' })
    const screenshot = await page.screenshot()
    expect(screenshot).toMatchImageSnapshot()
  })
})
