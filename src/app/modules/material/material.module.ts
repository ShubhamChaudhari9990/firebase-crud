import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {MatTableModule} from "@angular/material/table";
import {MatDialogModule} from "@angular/material/dialog";
import { MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field"
@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    MatTableModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule
   ],

})
export class MaterialModule { }
