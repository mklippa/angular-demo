import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card.component';
import { CardImageComponent } from './components/card-image/card-image.component';
import { CardRatingComponent } from './components/card-rating/card-rating.component';
import { CardTitleComponent } from './components/card-title/card-title.component';
import { CardPriceComponent } from './components/card-price/card-price.component';
import { CardQtyComponent } from './components/card-qty/card-qty.component';
import { CardButtonComponent } from './components/card-button/card-button.component';
import { IconModule } from '../icon/icon.module';

@NgModule({
  declarations: [
    CardComponent,
    CardImageComponent,
    CardRatingComponent,
    CardTitleComponent,
    CardPriceComponent,
    CardQtyComponent,
    CardButtonComponent,
  ],
  imports: [CommonModule, IconModule],
  exports: [
    CardComponent,
    CardImageComponent,
    CardRatingComponent,
    CardTitleComponent,
    CardPriceComponent,
    CardQtyComponent,
    CardButtonComponent,
  ],
})
export class CardModule {}
