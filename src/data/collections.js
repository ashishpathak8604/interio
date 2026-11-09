import collection01 from '../../assets/img/collection-01.jpg'
import collection02 from '../../assets/img/collection-02.jpg'
import collection03 from '../../assets/img/collection-03.jpg'
import collection04 from '../../assets/img/collection-04.jpg'
import collection05 from '../../assets/img/collection-05.jpg'
import collection06 from '../../assets/img/collection-06.jpg'
import collection07 from '../../assets/img/collection-07.jpg'
import collection08 from '../../assets/img/collection-08.jpg'
import collection09 from '../../assets/img/collection-09.jpg'
import collection10 from '../../assets/img/collection-10.jpg'
import collection11 from '../../assets/img/collection-11.jpg'
import collection12 from '../../assets/img/collection-12.jpg'
import collection13 from '../../assets/img/collection-13.jpg'
import collection14 from '../../assets/img/collection-14.jpg'
import collection15 from '../../assets/img/collection-15.jpg'
import collection16 from '../../assets/img/collection-16.jpg'
import { images } from './images'

export const collections = {
  dream: {
    title: 'Dream Collection',
    hero: images.dream,
    heroAlt: 'A cinematic, softly lit luxury interior from the Dream Collection',
    gallery: [
      {
        src: collection01,
        alt: 'Interior design study 01 from the Dream Collection',
        aspect: 'aspect-[3/2]',
        layout: 'lg:col-span-7 lg:self-end',
      },
      {
        src: collection05,
        alt: 'Interior design study 02 from the Dream Collection',
        aspect: 'aspect-[4/5]',
        layout: 'lg:col-span-5',
      },
      {
        src: collection03,
        alt: 'Interior design study 03 from the Dream Collection',
        aspect: 'aspect-[4/3]',
        layout: 'lg:col-span-4 lg:self-end',
      },
      {
        src: collection09,
        alt: 'Interior design study 04 from the Dream Collection',
        aspect: 'aspect-[4/3]',
        layout: 'lg:col-span-5 lg:mt-16',
      },
      {
        src: collection12,
        alt: 'Interior design study 05 from the Dream Collection',
        aspect: 'aspect-[3/4]',
        layout: 'lg:col-span-3 lg:mt-8',
      },
      {
        src: collection14,
        alt: 'Interior design study 06 from the Dream Collection',
        aspect: 'aspect-[16/9]',
        layout: 'lg:col-span-8',
      },
      {
        src: collection07,
        alt: 'Interior design study 07 from the Dream Collection',
        aspect: 'aspect-[3/4]',
        layout: 'lg:col-span-4',
      },
      {
        src: collection16,
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
        src: collection04,
        alt: 'Interior design study 01 from the Signature Collection',
        aspect: 'aspect-square',
        layout: 'lg:col-span-5 lg:self-end',
      },
      {
        src: collection13,
        alt: 'Interior design study 02 from the Signature Collection',
        aspect: 'aspect-[4/5]',
        layout: 'lg:col-span-4 lg:mt-16',
      },
      {
        src: collection06,
        alt: 'Interior design study 03 from the Signature Collection',
        aspect: 'aspect-square',
        layout: 'lg:col-span-3 lg:self-end',
      },
      {
        src: collection08,
        alt: 'Interior design study 04 from the Signature Collection',
        aspect: 'aspect-[16/9]',
        layout: 'lg:col-span-8',
      },
      {
        src: collection02,
        alt: 'Interior design study 05 from the Signature Collection',
        aspect: 'aspect-square',
        layout: 'lg:col-span-4 lg:mt-16',
      },
      {
        src: collection11,
        alt: 'Interior design study 06 from the Signature Collection',
        aspect: 'aspect-[4/3]',
        layout: 'lg:col-span-6',
      },
      {
        src: collection10,
        alt: 'Interior design study 07 from the Signature Collection',
        aspect: 'aspect-[4/5]',
        layout: 'lg:col-span-3 lg:mt-10',
      },
      {
        src: collection15,
        alt: 'Interior design study 08 from the Signature Collection',
        aspect: 'aspect-[3/4]',
        layout: 'lg:col-span-3 lg:self-end',
      },
    ],
  },
}
