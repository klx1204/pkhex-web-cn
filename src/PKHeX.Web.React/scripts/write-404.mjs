import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

// GitHub Pages has no rewrites: a deep link falls through to 404.html, which sends
// the browser back to the app's base path after remembering where it was going.
const base = process.env.BASE_PATH ?? '/'
const basePath = base.endsWith('/') ? base : `${base}/`

const dist = join(dirname(fileURLToPath(import.meta.url)), '..', 'dist')

const html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>正在跳转…</title>
<script>
  sessionStorage.redirect = location.href;
  location.replace(${JSON.stringify(basePath)});
</script>
</head>
<body>
<p>正在跳转… 如果没有自动跳转，请<a href="${basePath}">点这里</a>。</p>
</body>
</html>
`

writeFileSync(join(dist, '404.html'), html)
console.log(`wrote dist/404.html for base ${basePath}`)
