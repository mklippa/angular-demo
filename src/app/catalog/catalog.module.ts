import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogComponent } from './catalog.component';
import { CardModule } from '../card/card.module';
import { ToggleModule } from '../toggle/toggle.module';
import { CatalogRoutingModule } from './catalog-routing.module';
import { CatalogService } from '../services/catalog.service';
import { IconModule } from '../icon/icon.module';

@NgModule({
  declarations: [CatalogComponent],
  imports: [
    CommonModule,
    CardModule,
    ToggleModule,
    CatalogRoutingModule,
    IconModule,
  ],
  exports: [CatalogComponent],
  providers: [CatalogService],
})
export class CatalogModule {}
