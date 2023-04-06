import { NgModule } from '@angular/core';

import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

const MATERIAL = [
	MatDialogModule,
    MatFormFieldModule,
    MatInputModule
]

@NgModule({
	declarations: [],
	imports: [...MATERIAL],
	exports: [...MATERIAL]
})

export class SharedModule {}