import { useRef, useState } from 'react'

export default function ResponsiveImage({
  image,
  alt,
  sizes = '100vw',
  className = '',
  loading = 'lazy',
  priority = false,
  ...imgProps
}) {
  const pictureRef = useRef(null)
  const triedFallbackRef = useRef(false)
  const [failed, setFailed] = useState(false)

  if (!image) return null

  const handleError = (event) => {
    const img = event.currentTarget

    if (!triedFallbackRef.current && image.jpgSrc) {
      triedFallbackRef.current = true
      const picture = pictureRef.current
      if (picture) {
        picture.querySelectorAll('source').forEach((source) => source.remove())
      }
      if (img.src !== image.jpgSrc) {
        img.src = image.jpgSrc
        return
      }
    }

    setFailed(true)
  }

  return (
    <picture ref={pictureRef} className="contents">
      {image.srcSet ? <source type="image/webp" srcSet={image.srcSet} sizes={sizes} /> : null}
      <img
        {...imgProps}
        src={image.jpgSrc || image.src}
        width={image.width}
        height={image.height}
        alt={alt}
        sizes={sizes}
        loading={priority ? 'eager' : loading}
        fetchpriority={priority ? 'high' : undefined}
        decoding="async"
        draggable={false}
        onError={handleError}
        data-image-failed={failed ? '' : undefined}
        className={`${className}${failed ? ' opacity-0' : ''}`}
      />
    </picture>
  )
}
