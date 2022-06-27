import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search.component';
import { CatalogService } from '../services/catalog.service';

@NgModule({
  declarations: [SearchComponent],
  imports: [CommonModule],
  exports: [SearchComponent],
  providers: [CatalogService],
})
export class SearchModule {}
