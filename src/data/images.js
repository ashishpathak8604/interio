const optimized = import.meta.glob('../../assets/img/opt/*.webp', {
  eager: true,
  query: '?url',
  import: 'default',
})

const originals = import.meta.glob('../../assets/img/*.jpg', {
  eager: true,
  query: '?url',
  import: 'default',
})

const WIDTHS = [480, 800, 1200, 1600, 2200]

const DIMENSIONS = {
  hero: [2200, 1496],
  dream: [2200, 1160],
  signature: [2200, 1467],
  studio: [2200, 1467],
  philosophy: [2200, 1473],
  contact: [2200, 1467],
  'collection-01': [2200, 1467],
  'collection-02': [2200, 2200],
  'collection-03': [2200, 1650],
  'collection-04': [2200, 2200],
  'collection-05': [2200, 2933],
  'collection-06': [2200, 1467],
  'collection-07': [2200, 1941],
  'collection-08': [2200, 1467],
  'collection-09': [2200, 1469],
  'collection-10': [2200, 2200],
  'collection-11': [2200, 1467],
  'collection-12': [2200, 1238],
  'collection-13': [2200, 3911],
  'collection-14': [2200, 1467],
  'collection-15': [2200, 1238],
  'collection-16': [2200, 1467],
}

const setCache = new Map()
const preloadedSources = new Map()

function buildImageSet(name) {
  if (setCache.has(name)) return setCache.get(name)

  const variants = WIDTHS.map((width) => {
    const key = `../../assets/img/opt/${name}-${width}.webp`
    return optimized[key] ? { width, url: optimized[key] } : null
  }).filter(Boolean)

  const fallback = originals[`../../assets/img/${name}.jpg`]
  const [width, height] = DIMENSIONS[name] ?? [2200, 1467]

  if (!variants.length) {
    if (!fallback) throw new Error(`No image asset found for "${name}"`)
    const single = {
      src: fallback,
      srcSet: undefined,
      jpgSrc: fallback,
      width,
      height,
      aspectRatio: width / height,
    }
    setCache.set(name, single)
    return single
  }

  const largest = variants[variants.length - 1]
  const set = {
    src: largest.url,
    srcSet: variants.map((variant) => `${variant.url} ${variant.width}w`).join(', '),
    jpgSrc: fallback ?? largest.url,
    width,
    height,
    aspectRatio: width / height,
  }

  setCache.set(name, set)
  return set
}

export function imageSet(name) {
  return buildImageSet(name)
}

export const images = {
  hero: buildImageSet('hero'),
  dream: buildImageSet('dream'),
  signature: buildImageSet('signature'),
  studio: buildImageSet('studio'),
  philosophy: buildImageSet('philosophy'),
  contact: buildImageSet('contact'),
}

export function preloadImage(set, { priority = false, sizes = '100vw' } = {}) {
  if (!set || !set.src || typeof document === 'undefined') return

  const key = `${priority ? 'high' : 'auto'}:${set.src}`
  if (preloadedSources.has(key)) return

  const image = new Image()
  image.decoding = 'async'
  if (set.srcSet) {
    image.sizes = sizes
    image.srcset = set.srcSet
  }
  image.src = set.src
  preloadedSources.set(key, image)

  if (!priority) return

  const exists = document.querySelector(
    `link[rel="preload"][as="image"][href="${set.src}"]`,
  )
  if (exists) return

  const link = document.createElement('link')
  link.rel = 'preload'
  link.as = 'image'
  link.href = set.src
  link.fetchPriority = 'high'
  if (set.srcSet) {
    link.imageSrcset = set.srcSet
    link.imageSizes = sizes
  }
  document.head.appendChild(link)
}
