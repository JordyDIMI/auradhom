import { Injectable, signal } from '@angular/core';
import { of } from 'rxjs';
import { Product } from '../models/product';

const PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'T-shirt Blanc',
    slug: 't-shirt-blanc',
    price: 10000,
    description: 'Coton 180 g/m². Coupe droite. Essentiel.',
    image: 'https://img-wrapper.vercel.app/image?url=https://placehold.co/800x800/FFFFFF/000000.png?text=Blanc',
    gallery: [
      'https://img-wrapper.vercel.app/image?url=https://placehold.co/400x400/FFFFFF/000000.png?text=Blanc+Face',
      'https://img-wrapper.vercel.app/image?url=https://placehold.co/400x400/FFFFFF/000000.png?text=Blanc+Dos'
    ],
    details: { composition: '100% Coton', maintenance: 'Lavage à 30°.', origin: 'Sénégal' },
    type: 'T-shirt',
    material: 'Coton lourd',
    colors: [{ name: 'Blanc', hex: '#FFFFFF' }],
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    id: 2,
    name: 'T-shirt Noir',
    slug: 't-shirt-noir',
    price: 10000,
    description: 'Coton 180 g/m². Coupe droite. Essentiel.',
    image: 'https://img-wrapper.vercel.app/image?url=https://placehold.co/800x800/000000/FFFFFF.png?text=Noir',
    gallery: [
      'https://img-wrapper.vercel.app/image?url=https://placehold.co/400x400/000000/FFFFFF.png?text=Noir+Face',
      'https://img-wrapper.vercel.app/image?url=https://placehold.co/400x400/000000/FFFFFF.png?text=Noir+Dos'
    ],
    details: { composition: '100% Coton', maintenance: 'Lavage à 30°.', origin: 'Sénégal' },
    type: 'T-shirt',
    material: 'Coton lourd',
    colors: [{ name: 'Noir', hex: '#000000' }],
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    id: 3,
    name: 'T-shirt Beige',
    slug: 't-shirt-beige',
    price: 10000,
    description: 'Coton 180 g/m². Coupe droite. Essentiel.',
    image: 'https://img-wrapper.vercel.app/image?url=https://placehold.co/800x800/D8D2C9/000000.png?text=Beige',
    gallery: [
      'https://img-wrapper.vercel.app/image?url=https://placehold.co/400x400/D8D2C9/000000.png?text=Beige+Face',
      'https://img-wrapper.vercel.app/image?url=https://placehold.co/400x400/D8D2C9/000000.png?text=Beige+Dos'
    ],
    details: { composition: '100% Coton', maintenance: 'Lavage à 30°.', origin: 'Sénégal' },
    type: 'T-shirt',
    material: 'Coton lourd',
    colors: [{ name: 'Beige', hex: '#D8D2C9' }],
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    id: 4,
    name: 'T-shirt Marron',
    slug: 't-shirt-marron',
    price: 10000,
    description: 'Coton 180 g/m². Coupe droite. Essentiel.',
    image: 'https://img-wrapper.vercel.app/image?url=https://placehold.co/800x800/6B4423/FFFFFF.png?text=Marron',
    gallery: [
      'https://img-wrapper.vercel.app/image?url=https://placehold.co/400x400/6B4423/FFFFFF.png?text=Marron+Face',
      'https://img-wrapper.vercel.app/image?url=https://placehold.co/400x400/6B4423/FFFFFF.png?text=Marron+Dos'
    ],
    details: { composition: '100% Coton', maintenance: 'Lavage à 30°.', origin: 'Sénégal' },
    type: 'T-shirt',
    material: 'Coton lourd',
    colors: [{ name: 'Marron', hex: '#6B4423' }],
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    id: 5,
    name: 'T-shirt Gris',
    slug: 't-shirt-gris',
    price: 10000,
    description: 'Coton 180 g/m². Coupe droite. Essentiel.',
    image: 'https://img-wrapper.vercel.app/image?url=https://placehold.co/800x800/808080/FFFFFF.png?text=Gris',
    gallery: [
      'https://img-wrapper.vercel.app/image?url=https://placehold.co/400x400/808080/FFFFFF.png?text=Gris+Face',
      'https://img-wrapper.vercel.app/image?url=https://placehold.co/400x400/808080/FFFFFF.png?text=Gris+Dos'
    ],
    details: { composition: '100% Coton', maintenance: 'Lavage à 30°.', origin: 'Sénégal' },
    type: 'T-shirt',
    material: 'Coton lourd',
    colors: [{ name: 'Gris', hex: '#808080' }],
    sizes: ['S', 'M', 'L', 'XL']
  }
];

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products = signal<Product[]>(PRODUCTS);

  getProducts() {
    return of(this.products());
  }

  getProductBySlug(slug: string) {
    const product = this.products().find(p => p.slug === slug);
    return of(product);
  }

  getFilterOptions() {
    return {
      silhouette: ['S', 'M', 'L', 'XL'],
      type: ['T-shirt'],
      matiere: ['Coton lourd'],
      teinte: ['Noir', 'Blanc', 'Beige', 'Marron', 'Gris']
    };
  }
}
