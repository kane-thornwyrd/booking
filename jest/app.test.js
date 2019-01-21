const path = require('path')

const ROOTURL = 'http://0.0.0.0:1234'

describe('app', () => {
  beforeEach(async () => {
    await page.goto(ROOTURL)
  })

  it('should stay the same at first', async () => {
    const screenshot = await page.screenshot()
    expect(screenshot).toMatchImageSnapshot()
  })

  it('should serve a page for the non-existent url', async () => {
    await page.goto(`${ROOTURL}/non-existent-url`)
    const screenshot = await page.screenshot()
    expect(screenshot).toMatchImageSnapshot({
      failureThreshold: '0.01',
      failureThresholdType: 'percent'
    })
  })

  // it('should increment the counter when button is clicked', async () => {
  //   await expect(page).toClick('button', { text: 'Click me' })
  //   const screenshot = await page.screenshot()
  //   expect(screenshot).toMatchImageSnapshot()
  // })
})
