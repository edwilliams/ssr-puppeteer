import fs from 'fs'
import puppeteer from 'puppeteer'
import beautify from 'js-beautify'
import { cmd } from './utils.mjs'
import { getElement, switchBody } from './process-html.mjs'

// launch browser / new page
const browser = await puppeteer.launch()
const page = await browser.newPage()

// allows request interception; must appear before first page.goto()
await page.setRequestInterception(true)

// prevent certain scripts from firing
page.on('request', (req) => {
  const blocklist = ['analytics.js']
  if (blocklist.find((regex) => req.url().match(regex))) {
    return req.abort()
  }
  req.continue()
})

// goto page and wait to load
const src = 'http://localhost:8080/index.html'

await page.goto(src, { waitUntil: 'networkidle0' })

await page.waitForSelector('#app')

// store page content and close browser
const html = await page.content()

await browser.close()

// extract just <body> element from HTML
const body = await getElement({ tag: 'body', html })

// create index-ssr.html w/ new populated <body> element
await cmd('cp public/index.html public/index-ssr.html').catch(console.log)

const indexHTML = fs.readFileSync('public/index.html').toString()

const newIndexHTML = await switchBody({ html: indexHTML, body })

fs.writeFileSync('public/index-ssr.html', beautify.html(newIndexHTML))
