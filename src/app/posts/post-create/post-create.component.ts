import { _DisposeViewRepeaterStrategy } from '@angular/cdk/collections';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { PostService } from 'src/app/services/post.service';
import { Post } from '../post.model';

import { mimeType } from './mime-type.validator'
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit, OnDestroy {

  /***************************************************************************************
   * 
   * To add to create post
   *  add new form control to the form group
   *  add new values to onSave method
   *  add new values to postData on line ~125
   * 
   * 
   * NEED:
   *  Ingrediant list (string for now, array of strings down the road)
   *  Instructions
   *  Time requirement
   *  
   * 
  ***************************************************************************************/

  enteredContent = '';
  enteredTitle = '';
  private mode = 'create';
  private postId: string;
  form: FormGroup;
  imgPrev: string;
  userEmail: string;
  private authStatusSub: Subscription;

  post: Post;
  isLoading: boolean = false;

  constructor(public postService:PostService, public route: ActivatedRoute, private authService: AuthService) { }

  //send post to parent
  onSAvePost() {

    //error handling
    if(this.form.invalid) {
      return;
    }

    //start spinner
    this.isLoading = true;
    
    //check for edit
    if (this.mode === 'create') {
      //send post to be handled by service
      this.postService.addPost(this.form.value.title, this.form.value.content, this.form.value.image);
    } else {
      //use update post in the post service
      //send new contents to service
      this.postService.updatePost(
        this.postId, 
        this.form.value.title, 
        this.form.value.content,
        this.form.value.image
      )
    }

    this.form.reset();
  }

  onImagePicked(event: Event) {
    //extract file
    const file = (event.target as HTMLInputElement).files[0];

    /*store in form control */
    //patch in the file(image) to the form control
    this.form.patchValue({image: file});
    //store value and validate that it is there
    this.form.get('image').updateValueAndValidity();

    /* convert image to data url */
    //instantiate new file reader
    const reader = new FileReader();
    //do this when done loading
    reader.onload = () => {
      this.imgPrev = reader.result as string
    }
    //then read the file
    reader.readAsDataURL(file);

  }

  ngOnInit() {

    //store logged in boolean
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(authStatus => {
      //update logged in state
      this.isLoading = false;
    });

    //create form group with validators
    this.form = new FormGroup({
      title: new FormControl(null, {validators: [Validators.required, Validators.minLength(3)]}),
      content: new FormControl(null, {validators: [Validators.required, Validators.minLength(5)]}),
      //only accept images
      image: new FormControl(null, {validators: [Validators.required], asyncValidators: [mimeType]}),
    });

    //look for a postId
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if(paramMap.has('postId')) {
        this.mode = 'edit';
        //get postId
        this.postId = paramMap.get('postId');

        //start spinner
        this.isLoading = true;
        this.postService.getPost(this.postId).subscribe(postData => {

          //stop spinner
          this.isLoading = false;
          //set post data
          this.post = {
            id:postData._id, 
            title: postData.title, 
            content: postData.content,
            imagePath: postData.imagePath,
            creator: postData.creator,
            creatorEmail: postData.creatorEmail
          };

          //overrides values from form controls so user can see a post on edit
          this.form.setValue({
            title: this.post.title, 
            content: this.post.content,
            image: this.post.imagePath
          })
        });
      } else {
        this.mode = 'create';
        //remove value from postId in create mode
        this.postId = null;
      }
    });
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }

}
