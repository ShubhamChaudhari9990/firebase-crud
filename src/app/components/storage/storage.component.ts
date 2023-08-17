import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
  selector: 'app-storage',
  templateUrl: './storage.component.html',
  styleUrls: ['./storage.component.css']
})
export class StorageComponent {

  selectedFile!: File;

  constructor(public storage: AngularFireStorage) { }

  onFileSelect(event: any) {
    this.selectedFile = event.target.files[0];
  }

  upload() {
    if (this.selectedFile) {
      this.uploadImage(this.selectedFile)
        .subscribe((url: any) => {
          console.log('Image uploaded:', url);
        });
    }
  }

  uploadImage(file: File): Observable<string> {
    const filePath = `documents/img.jpg`;
    const storageRef = this.storage.ref(filePath);

    const uploadTask = this.storage.upload(filePath, file);

    return new Observable(observer => {
      // uploadTask.percentageChanges().subscribe(percentage => {
      //   observer.next(`${percentage!.toFixed(2)}%`);
      // });

      uploadTask.snapshotChanges().subscribe(snapshot => {
        if (snapshot!.state === 'success') {
          storageRef.getDownloadURL().subscribe(url => {
            observer.next(url);
            observer.complete();
          });
        }
      });
    });
  }

  downloadImage(): void {
    // const imagePath = 'documents/img.jpg';
    const storageRef = this.storage.storage.ref();

    storageRef.child('documents/img.jpg').getDownloadURL()
      .then((url) => {
        debugger
        var xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';
        // xhr.onload = (event) => {
        //   var blob = xhr.response;
        // };
        xhr.open('GET', url);
        xhr.send();
      })

    // ref.getDownloadURL().subscribe((url) => {
    //   const link = document.createElement('a');
    //   link.href = url;
    //   // link.target = '_blank'; // Open in a new tab
    //   link.download = 'downloaded-image.jpg'; // Specify the desired filename
    //   link.click();
      
    // });
  }
}
