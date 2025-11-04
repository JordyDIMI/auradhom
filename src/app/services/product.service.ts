import { Injectable, signal } from '@angular/core';
import { of } from 'rxjs';
import { Product } from '../models/product';

// Mappe les images locales placées dans src/app/* en URLs servies par Angular
const IMG_BLANC = new URL('../blanc.png', import.meta.url).toString();
const IMG_NOIR = new URL('../noir.png', import.meta.url).toString();
const IMG_BEIGE = new URL('../biege.png', import.meta.url).toString(); // fichier nommé "biege.png"
const IMG_MARRON = new URL('../marron.png', import.meta.url).toString();
const IMG_GRIS = new URL('../gris.png', import.meta.url).toString();

const PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'T-shirt Blanc',
    slug: 't-shirt-blanc',
    price: 10000,
    description: 'Coton 180 g/m². Coupe droite. Essentiel.',
    image: IMG_BLANC,
    gallery: [IMG_BLANC],
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
    image: IMG_NOIR,
    gallery: [IMG_NOIR],
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
    image: IMG_BEIGE,
    gallery: [IMG_BEIGE],
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
    image: IMG_MARRON,
    gallery: [IMG_MARRON],
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
    image: IMG_GRIS,
    gallery: [IMG_GRIS],
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
