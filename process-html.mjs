import { HTML2JSON, JSON2HTML } from './utils.mjs'

export const getElement = async ({ tag, html }) => {
  const json = HTML2JSON({ html })
  const _html = json.child[0].child

  let jsonNew

  _html.forEach(child => {
    if (child.node === 'element' && child.tag === tag) {
      jsonNew = child
    }
  })

  return JSON2HTML({ json: jsonNew })
}

export const switchBody = async ({ html, body }) => {
  const htmlJson = HTML2JSON({ html })
  const bodyJson = HTML2JSON({ html: body })
  const _html = htmlJson.child[0].child
  const _body = bodyJson.child[0].child

  _html.forEach(child => {
    if (child.node === 'element' && child.tag === 'body') {
      child.child = _body
    }
  })

  return JSON2HTML({ json: htmlJson })
}
