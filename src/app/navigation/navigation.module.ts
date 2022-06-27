import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './navigation.component';
import { RouterModule } from '@angular/router';
import { SearchModule } from '../search/search.module';
import { CartModule } from '../cart/cart.module';

@NgModule({
  declarations: [NavigationComponent],
  imports: [CommonModule, RouterModule, SearchModule, CartModule],
  exports: [NavigationComponent],
})
export class NavigationModule {}
