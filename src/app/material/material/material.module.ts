import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'; 
import {MatGridListModule} from '@angular/material/grid-list';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    MatProgressSpinnerModule,
    MatGridListModule
  ]
})
export class MaterialModule { }
