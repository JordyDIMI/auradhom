import { Injectable, signal } from '@angular/core';
import { of } from 'rxjs';
import { Product } from '../models/product';

const PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'T-shirt Silence',
    slug: 't-shirt-silence',
    price: 45000,
    description: 'Coton 280 g/m². Coupe droite. Essence pure.',
    image: 'https://img-wrapper.vercel.app/image?url=https://placehold.co/800x800/000000/FFFFFF.png?text=Silence',
    gallery: ['https://img-wrapper.vercel.app/image?url=https://placehold.co/400x400/1C1C1C/FFFFFF.png?text=Texture', 'https://img-wrapper.vercel.app/image?url=https://placehold.co/400x400/1C1C1C/FFFFFF.png?text=Couture'],
    details: { composition: '100% Coton Organique', maintenance: 'Lavage à 30°. Ne pas sécher en machine.', origin: 'Portugal' },
    stock: 18,
    type: 'T-shirt',
    material: 'Coton lourd',
    colors: [{ name: 'Noir', hex: '#000000' }, { name: 'Blanc cassé', hex: '#F5F5DC' }],
    sizes: ['XS', 'S', 'M', 'L', 'XL']
  },
  {
    id: 2,
    name: 'Hoodie Aura',
    slug: 'hoodie-aura',
    price: 95000,
    description: 'Coton 480 g/m². Coupe architecturale. Présence.',
    image: 'https://img-wrapper.vercel.app/image?url=https://placehold.co/800x800/000000/FFFFFF.png?text=Aura',
    gallery: ['https://img-wrapper.vercel.app/image?url=https://placehold.co/400x400/1C1C1C/FFFFFF.png?text=Texture', 'https://img-wrapper.vercel.app/image?url=https://placehold.co/400x400/1C1C1C/FFFFFF.png?text=Couture'],
    details: { composition: '85% Coton, 15% Polyester recyclé', maintenance: 'Lavage à froid. Séchage à plat.', origin: 'Portugal' },
    type: 'Hoodie',
    material: 'Coton lourd',
    colors: [{ name: 'Noir', hex: '#000000' }, { name: 'Gris anthracite', hex: '#36454F' }],
    sizes: ['S', 'M', 'L', 'XL', 'XXL']
  },
  {
    id: 3,
    name: 'Pantalon Équilibre',
    slug: 'pantalon-equilibre',
    price: 110000,
    description: 'Laine froide. Ligne impeccable. Stature.',
    image: 'https://img-wrapper.vercel.app/image?url=https://placehold.co/800x800/000000/FFFFFF.png?text=Equilibre',
    gallery: ['https://img-wrapper.vercel.app/image?url=https://placehold.co/400x400/1C1C1C/FFFFFF.png?text=Texture', 'https://img-wrapper.vercel.app/image?url=https://placehold.co/400x400/1C1C1C/FFFFFF.png?text=Couture'],
    details: { composition: '100% Laine vierge', maintenance: 'Nettoyage à sec uniquement.', origin: 'Portugal' },
    stock: 12,
    type: 'Pantalon',
    material: 'Laine',
    colors: [{ name: 'Noir', hex: '#000000' }],
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    id: 4,
    name: 'Surchemise Minimal',
    slug: 'surchemise-minimal',
    price: 135000,
    description: 'Cuir végétal souple. Structure affirmée. Contrôle.',
    image: 'https://img-wrapper.vercel.app/image?url=https://placehold.co/800x800/000000/FFFFFF.png?text=Minimal',
    gallery: ['https://img-wrapper.vercel.app/image?url=https://placehold.co/400x400/1C1C1C/FFFFFF.png?text=Texture', 'https://img-wrapper.vercel.app/image?url=https://placehold.co/400x400/1C1C1C/FFFFFF.png?text=Couture'],
    details: { composition: '60% PU, 40% Polyester', maintenance: 'Nettoyage avec un chiffon humide.', origin: 'Portugal' },
    type: 'Surchemise',
    material: 'Cuir végétal',
    colors: [{ name: 'Noir', hex: '#000000' }],
    sizes: ['M', 'L', 'XL']
  },
  {
    id: 5,
    name: 'Casquette Unité',
    slug: 'casquette-unite',
    price: 35000,
    description: 'Coton sergé. Logo brodé ton sur ton. Focus.',
    image: 'https://img-wrapper.vercel.app/image?url=https://placehold.co/800x800/000000/FFFFFF.png?text=Unite',
    gallery: ['https://img-wrapper.vercel.app/image?url=https://placehold.co/400x400/1C1C1C/FFFFFF.png?text=Texture', 'https://img-wrapper.vercel.app/image?url=https://placehold.co/400x400/1C1C1C/FFFFFF.png?text=Couture'],
    details: { composition: '100% Coton', maintenance: 'Lavage à la main.', origin: 'Portugal' },
    type: 'Casquette',
    material: 'Coton lourd',
    colors: [{ name: 'Noir', hex: '#000000' }, { name: 'Beige sable', hex: '#D8D2C9' }],
    sizes: ['Unique']
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
      silhouette: ['X', 'S', 'M', 'L', 'XL', 'XXL', '3XL'],
      type: ['T-shirt',],
      matiere: ['Coton lourd', 'Laine', ],
      teinte: ['Noir', 'Blanc', 'Gris', 'Beige']
    };
  }
}
