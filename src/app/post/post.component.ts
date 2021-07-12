import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AddPostService} from '../add-post.service';
import {PostPayload} from '../add-post/post-payload';
import {Router} from '@angular/router';
import {AuthService} from '../auth/auth.service';

// @ts-ignore
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  post: PostPayload;
  permaLink: Number;
  imageToShow: any;
  id: any;

  constructor(private router: ActivatedRoute, private postService: AddPostService, private routerRed: Router,private authService: AuthService) {
  }

  ngOnInit() {
    this.router.params.subscribe(params => {
      this.permaLink = params['id'];
    });

    this.postService.getPost(this.permaLink).subscribe((data:PostPayload) => {
      this.post = data;
      // this.postService.getImage(data.imageUrl).subscribe((imaged:Blob)=>{
      //   this.image = imaged;
      // });
      this.loadImage(data.imageUrl);
    },(err: any) => {
      console.log('Failure Response');
    })
  }

  loadImage(imageUrl: String) {
    this.postService.getImage(imageUrl).subscribe(result => {
      console.log(result);
      this.imageToShow = result;
    });
  }

   functionToDeleteItem(){
    this.postService.deletePost(this.permaLink).subscribe(data => {
      this.routerRed.navigateByUrl('/home');
    }, error => {
      console.log(error);
    });
   }

}
