import { images, imageSet } from './images'

export const collections = {
  dream: {
    title: 'Dream Collection',
    hero: images.dream,
    heroAlt: 'A cinematic, softly lit luxury interior from the Dream Collection',
    gallery: [
      {
        src: imageSet('collection-01'),
        alt: 'Interior design study 01 from the Dream Collection',
        aspect: 'aspect-[3/2]',
        layout: 'lg:col-span-7 lg:self-end',
      },
      {
        src: imageSet('collection-05'),
        alt: 'Interior design study 02 from the Dream Collection',
        aspect: 'aspect-[4/5]',
        layout: 'lg:col-span-5',
      },
      {
        src: imageSet('collection-03'),
        alt: 'Interior design study 03 from the Dream Collection',
        aspect: 'aspect-[4/3]',
        layout: 'lg:col-span-4 lg:self-end',
      },
      {
        src: imageSet('collection-09'),
        alt: 'Interior design study 04 from the Dream Collection',
        aspect: 'aspect-[4/3]',
        layout: 'lg:col-span-5 lg:mt-16',
      },
      {
        src: imageSet('collection-12'),
        alt: 'Interior design study 05 from the Dream Collection',
        aspect: 'aspect-[3/4]',
        layout: 'lg:col-span-3 lg:mt-8',
      },
      {
        src: imageSet('collection-14'),
        alt: 'Interior design study 06 from the Dream Collection',
        aspect: 'aspect-[16/9]',
        layout: 'lg:col-span-8',
      },
      {
        src: imageSet('collection-07'),
        alt: 'Interior design study 07 from the Dream Collection',
        aspect: 'aspect-[3/4]',
        layout: 'lg:col-span-4',
      },
      {
        src: imageSet('collection-16'),
        alt: 'Interior design study 08 from the Dream Collection',
        aspect: 'aspect-[2/1]',
        layout: 'lg:col-span-8 lg:col-start-3 lg:mt-8',
      },
    ],
  },
  signature: {
    title: 'Signature Collection',
    hero: images.signature,
    heroAlt: 'A refined, architectural interior from the Signature Collection',
    gallery: [
      {
        src: imageSet('collection-04'),
        alt: 'Interior design study 01 from the Signature Collection',
        aspect: 'aspect-square',
        layout: 'lg:col-span-5 lg:self-end',
      },
      {
        src: imageSet('collection-13'),
        alt: 'Interior design study 02 from the Signature Collection',
        aspect: 'aspect-[4/5]',
        layout: 'lg:col-span-4 lg:mt-16',
      },
      {
        src: imageSet('collection-06'),
        alt: 'Interior design study 03 from the Signature Collection',
        aspect: 'aspect-square',
        layout: 'lg:col-span-3 lg:self-end',
      },
      {
        src: imageSet('collection-08'),
        alt: 'Interior design study 04 from the Signature Collection',
        aspect: 'aspect-[16/9]',
        layout: 'lg:col-span-8',
      },
      {
        src: imageSet('collection-02'),
        alt: 'Interior design study 05 from the Signature Collection',
        aspect: 'aspect-square',
        layout: 'lg:col-span-4 lg:mt-16',
      },
      {
        src: imageSet('collection-11'),
        alt: 'Interior design study 06 from the Signature Collection',
        aspect: 'aspect-[4/3]',
        layout: 'lg:col-span-6',
      },
      {
        src: imageSet('collection-10'),
        alt: 'Interior design study 07 from the Signature Collection',
        aspect: 'aspect-[4/5]',
        layout: 'lg:col-span-3 lg:mt-10',
      },
      {
        src: imageSet('collection-15'),
        alt: 'Interior design study 08 from the Signature Collection',
        aspect: 'aspect-[3/4]',
        layout: 'lg:col-span-3 lg:self-end',
      },
    ],
  },
}
