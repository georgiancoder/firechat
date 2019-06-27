import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import {RouterModule} from '@angular/router';
import { SimpleLayoutComponent } from './simple-layout/simple-layout.component';


@NgModule({
  declarations: [
    MainLayoutComponent,
    SimpleLayoutComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    MainLayoutComponent,
    SimpleLayoutComponent
  ]
})
export class SharedContainersModule { }
