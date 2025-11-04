import { Component, Input, computed, inject, signal, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import { FormatFcfaPipe } from '../../pipes/format-fcfa.pipe';
import { LucideAngularModule } from 'lucide-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, FormatFcfaPipe, LucideAngularModule],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnChanges {
  @Input() slug = '';
  
  private productService = inject(ProductService);
  private router = inject(Router);

  product = signal<Product | undefined>(undefined);
  selectedSize = signal<string | undefined>(undefined);
  selectedColor = signal<{ name: string; hex: string } | undefined>(undefined);
  quantity = signal(1);
  imageFade = signal(false);

  openAccordion = signal<string | null>(null);

  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['slug'] && this.slug) {
      this.productService.getProductBySlug(this.slug).subscribe(p => {
        this.product.set(p);
        if (p?.sizes.length === 1) this.selectedSize.set(p.sizes[0]);
        if (p?.colors.length === 1) this.selectedColor.set(p.colors[0]);
      });
    }
  }

  currentImage = computed(() => {
    const p = this.product();
    const size = this.selectedSize();
    const color = this.selectedColor();
    if (!p || !size || !color) return p?.image;
    const dir = (size === 'S' || size === 'M') ? '1' : '2';
    const colorFile = this.normalizeColorToFilename(color.name);
    return `assets/infos-T/${dir}/${colorFile}.jpg`;
  });

  private normalizeColorToFilename(colorName: string) {
    const key = colorName.toLowerCase().replace(/é/g, 'e').replace(/\s+/g, '');
    // mapping explicite pour robustesse
    const map: Record<string, string> = {
      'blanc': 'blanc',
      'noir': 'noir',
      'beige': 'beige',
      'marron': 'marron',
      'gris': 'gris'
    };
    return map[key] ?? key;
  }

  selectSize(size: string) {
    this.selectedSize.set(size);
    this.triggerImageFade();
  }

  selectColor(color: { name: string; hex: string }) {
    this.selectedColor.set(color);
    this.triggerImageFade();
  }

  toggleAccordion(section: string) {
    this.openAccordion.set(this.openAccordion() === section ? null : section);
  }

  private triggerImageFade() {
    this.imageFade.set(true);
    setTimeout(() => this.imageFade.set(false), 200);
  }

  orderOnWhatsApp() {
    const p = this.product();
    if (!p || !this.selectedSize() || !this.selectedColor()) {
      alert('Veuillez sélectionner une taille et une couleur.');
      return;
    }

    const price = p.price;
    const qty = this.quantity();
    const formatFCFA = (n: number) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' FCFA';

    const message = `Bonjour AuraDhom,

Je commande :

• ${p.name} – Taille ${this.selectedSize()}
• Couleur : ${this.selectedColor()?.name}
• Quantité : ${qty}

Prix unitaire : ${formatFCFA(price)}
Total : ${formatFCFA(price * qty)}

Livraison : [à préciser]

Prénom :
Adresse complète :
Code postal / Ville :
Téléphone :

Merci.
`;
    const whatsappNumber = '237000000000'; // Replace with actual number
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    
    window.open(url, '_blank');
    this.router.navigate(['/envoye']);
  }
}
