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

  async downloadImage() {
    const filePath = 'documents/img.jpg';
    const ref = this.storage.ref(filePath);

    try {
      const url = await ref.getDownloadURL().toPromise();
      this.triggerDownload(url);
    } catch (error) {
      console.error('Error downloading image:', error);
    }
  }

  private triggerDownload(url: string) {
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'blob';
    xhr.onload = (event) => {
      const blob = xhr.response;
      const a = document.createElement('a');
      a.href = window.URL.createObjectURL(blob);
      a.download = 'downloaded_image.jpg';
      a.click();
    };
    xhr.open('GET', url);
    xhr.send();
  }
}