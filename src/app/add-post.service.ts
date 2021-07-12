import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PostPayload} from './add-post/post-payload';
import {Observable} from 'rxjs';
import 'rxjs/Rx';
import {DomSanitizer} from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class AddPostService {

  constructor(private httpClient: HttpClient, private sanitizer: DomSanitizer) {
  }
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;

  addPost(imageId: any, postPayload: PostPayload){
    return this.httpClient.post('http://localhost:8080/api/posts/create/'+ imageId, postPayload);
  }

  getAllPosts(): Observable<Array<PostPayload>>{
    return this.httpClient.get<Array<PostPayload>>("http://localhost:8080/api/posts/all");
  }

  getPost(permaLink: Number):Observable<PostPayload>{
    return this.httpClient.get<PostPayload>('http://localhost:8080/api/posts/get/' + permaLink);
  }

  // getImage(imageUrl: String){
  //   return this.httpClient.get('http://localhost:8080/image/get/' + imageUrl)
  //     .subscribe(
  //       res => {
  //         this.retrieveResonse = res;
  //         this.base64Data = this.retrieveResonse.picByte;
  //         this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
  //       }
  //     );

  // }

  getImage(imageUrl: String) {
    // return this.httpClient.get('http://localhost:8080/api/image/' + imageUrl, {responseType: "blob"});
    return this.httpClient.get('http://localhost:8080/api/image/' + imageUrl, {responseType: 'blob'}).map(blob => {
      var urlCreator = window.URL;
      return this.sanitizer.bypassSecurityTrustUrl(urlCreator.createObjectURL(blob));
    })
  }

  deletePost(id: any) {
    return this.httpClient.delete('http://localhost:8080/api/posts/delete/' + id);
  }

  upload(formDat: FormData){
    return this.httpClient.post('http://localhost:8080/api/image/upload', formDat);
  }

}

