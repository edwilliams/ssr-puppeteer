import util from 'util'
import _html2json from 'html2json'
import beautify from 'js-beautify'
import { exec } from 'child_process'

export const HTML2JSON = ({ html }) => _html2json.html2json(beautify.html(html))

export const JSON2HTML = ({ json }) => beautify.html(_html2json.json2html(json))

export const log = val => console.log(util.inspect(val, { depth: 256 }))

export const cmd = cmd => {
  return new Promise((resolve, reject) => {
    exec(cmd, (error, stdout, stderr) => {
      if (error) reject(error)
      if (stderr) reject(stderr)
      resolve(stdout)
    })
  })
}
