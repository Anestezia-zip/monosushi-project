import { NgModule } from '@angular/core';

import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

const MATERIAL = [
	MatDialogModule,
    MatFormFieldModule,
    MatInputModule
]

// other modules

import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { SortPipe } from './pipes/sort.pipe';

@NgModule({
	declarations: [
    SortPipe
  ],
	imports: [
    ...MATERIAL,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    ...MATERIAL,
    FormsModule,
    ReactiveFormsModule,
    SortPipe,
  ]
})

export class SharedModule {}
