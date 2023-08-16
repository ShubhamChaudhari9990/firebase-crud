import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-records',
  templateUrl: './add-records.component.html',
  styleUrls: ['./add-records.component.css']
})
export class AddRecordsComponent {
  student = {
    name: null,
    address: null,
    contact: null,
    qualification: null,
  }
  constructor(private matDailogRef: MatDialogRef<AddRecordsComponent>) {

  }
  onSubmit() {
    this.matDailogRef.close(this.student)
  }
}
