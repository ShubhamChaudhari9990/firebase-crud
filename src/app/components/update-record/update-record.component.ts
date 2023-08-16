import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-update-record',
  templateUrl: './update-record.component.html',
  styleUrls: ['./update-record.component.css']
})
export class UpdateRecordComponent implements OnInit {

  student = {
    name: null,
    address: null,
    contact: null,
    qualification: null,
  }

  constructor(private matDailogRef: MatDialogRef<UpdateRecordComponent>,@Inject(MAT_DIALOG_DATA) public data: any) { 
  }

  public productForm: FormGroup = new FormGroup({
    name: new FormControl('')
  });



  ngOnInit(): void {
    // this.productForm.get('name').patchValue(this.data.row.name);
    this.productForm.patchValue(this.data.row.name)    
  }
  
  onSubmit() {
    
    this.matDailogRef.close(this.student)
  }

}
