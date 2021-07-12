import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {PostPayload} from './post-payload';
import {AddPostService} from '../add-post.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {

  addPostForm: FormGroup;
  postPayload: PostPayload;
  title = new FormControl('');
  body = new FormControl('');
  name: String;
  public formData = new FormData();
  imageId: any;

  constructor(private addpostService: AddPostService, private router: Router) {
    this.addPostForm = new FormGroup({
      title: this.title,
      body: this.body
    });
    this.postPayload = {
      id: '',
      content: '',
      title: '',
      username: '',
      imageUrl: ''
    }
  }

  ngOnInit() {
  }

  addPost() {
    this.postPayload.content = this.addPostForm.get('body').value;
    this.postPayload.title = this.addPostForm.get('title').value;
    console.log("order", this.imageId);
    this.addpostService.addPost(this.imageId, this.postPayload).subscribe(data => {
      this.router.navigateByUrl('/');
    }, error => {
      console.log('Failure Response');
    })
  }

  uploadFiles( file:any ) {
      console.log( 'file', file )
        for ( let i = 0; i < file.length; i++ ) {
          this.formData.append("file", file[i], file[i]['name'] );
      }
      this.imageId = file[0].name;
  }
  
  RequestUpload() {
        this.addpostService.upload(this.formData).subscribe(data => {              
        });     
    }
}
