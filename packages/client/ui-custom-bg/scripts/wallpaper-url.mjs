/** Print a CSS `url(data:...)` value embedding one local image. */

import { readFileSync } from 'node:fs'
import { extname } from 'node:path'

const MIME = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.gif': 'image/gif',
}

const [file] = process.argv.slice(2)
if (file === undefined) {
  console.error('usage: node scripts/wallpaper-url.mjs <image-file>')
  process.exit(1)
}
const mime = MIME[extname(file).toLowerCase()]
if (mime === undefined) {
  console.error(`unsupported image type: ${extname(file)}`)
  process.exit(1)
}
process.stdout.write(`url('data:${mime};base64,${readFileSync(file).toString('base64')}') center / cover no-repeat fixed`)
