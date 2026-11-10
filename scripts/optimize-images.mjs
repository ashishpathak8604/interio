import { mkdir, readdir, stat } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const sourceDir = path.join(root, 'assets', 'img')
const outDir = path.join(sourceDir, 'opt')

const WIDTHS = [480, 800, 1200, 1600, 2200]
const QUALITY = 72
const EFFORT = 4
const force = process.argv.includes('--force')

async function isStale(target, source) {
  if (force || !existsSync(target)) return true
  const [targetStat, sourceStat] = await Promise.all([stat(target), stat(source)])
  return targetStat.mtimeMs < sourceStat.mtimeMs
}

async function run() {
  await mkdir(outDir, { recursive: true })

  const files = (await readdir(sourceDir)).filter((file) => /\.jpe?g$/i.test(file))

  let generated = 0
  let skipped = 0
  let originalBytes = 0
  let fallbackBytes = 0

  for (const file of files) {
    const sourcePath = path.join(sourceDir, file)
    const name = path.parse(file).name
    const sourceStat = await stat(sourcePath)
    originalBytes += sourceStat.size

    const metadata = await sharp(sourcePath).metadata()
    let largestTarget = null

    for (const width of WIDTHS) {
      if (width > metadata.width) continue

      const targetPath = path.join(outDir, `${name}-${width}.webp`)
      largestTarget = targetPath

      if (!(await isStale(targetPath, sourcePath))) {
        skipped += 1
        continue
      }

      await sharp(sourcePath)
        .rotate()
        .resize({ width, withoutEnlargement: true })
        .webp({ quality: QUALITY, effort: EFFORT })
        .toFile(targetPath)

      generated += 1
    }

    if (largestTarget) fallbackBytes += (await stat(largestTarget)).size
  }

  const mb = (bytes) => `${(bytes / (1024 * 1024)).toFixed(2)} MB`
  const saved = originalBytes - fallbackBytes
  const pct = originalBytes ? Math.round((saved / originalBytes) * 100) : 0

  console.log(`Optimized ${files.length} images (${generated} generated, ${skipped} up to date)`)
  console.log(`Original JPGs: ${mb(originalBytes)}  |  Largest WebP each: ${mb(fallbackBytes)}`)
  console.log(`Reduction on the served fallback: ${pct}%`)
}

run().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
