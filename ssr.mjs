import fs from 'fs'
import puppeteer from 'puppeteer'
import beautify from 'js-beautify'
import { cmd } from './utils.mjs'
import { getElement, switchBody } from './process-html.mjs'

const browser = await puppeteer.launch()
const page = await browser.newPage()

const src = 'http://localhost:8080/index.html'

await page.goto(src, { waitUntil: 'networkidle0' })

await page.waitForSelector('#app')

const html = await page.content()

await browser.close()

const body = await getElement({ tag: 'body', html })

await cmd('cp public/index.html public/index-ssr.html').catch(console.log)

const indexHTML = fs.readFileSync('public/index.html').toString()

const newIndexHTML = await switchBody({ html: indexHTML, body })

fs.writeFileSync('public/index-ssr.html', beautify.html(newIndexHTML))
