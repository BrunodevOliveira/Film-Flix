import { Injectable } from '@angular/core';
import { Storage } from '@angular/fire/storage';
import { getDownloadURL, ref, uploadBytes } from '@firebase/storage';
import { from, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadImageService {

  constructor(private storage: Storage) { }

  private createFilename(f: File) {
    const ext = f.name.split('.').pop()
    const name = `${Date.now()}${Math.floor(Math.random() * 1000)}`

    return `${name}.${ext}`
  }

  upload(image: File, folder:string = 'users/') {
    const filename = this.createFilename(image)
    const profile = ref(this.storage, folder + filename)

    return from(uploadBytes(profile, image)).pipe(
      switchMap((_) => {
        return from(getDownloadURL(profile))
        //retorna a url da minha imagem. por isso o a função upload retorna um Observable de string
      })
    )
  }
}
