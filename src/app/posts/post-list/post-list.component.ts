import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { PostService } from 'src/app/services/post.service';
import { Post } from '../post.model';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PageEvent } from '@angular/material/paginator';
import { AuthService } from 'src/app/auth/auth.service';


@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {

  //user data
  posts: Post[] = [];
  userId: string;
  userEmail: string;
  private postsSub: Subscription;
  isLoading: boolean = false;

  //auth listener
  private authStatusSub: Subscription;
  userIsAuthenticated: boolean = false;

  //pagination
  totalPosts = 0;
  postsPerPage = 5;
  pageSizeOptions = [5, 10, 15, 20];
  currentPage = 1;

  constructor(public postService: PostService, private authService: AuthService) {}

  ngOnInit(): void {
    //start spinner
    this.isLoading = true;

    //get all posts from service
    //specify how many posts per page and which page to start on
    this.postService.getPosts(this.postsPerPage, this.currentPage);

    //set userId
    this.userId = this.authService.getUserId();


    //listen to the subject
    this.postsSub = this.postService.getPostUpdateListener().subscribe((postData: { posts: Post[], postCount: number})=> {
      //stop spinner
      this.isLoading = false;
      //always be updating the posts whenever a new one is added
      //receive post count data from backend
      this.totalPosts = postData.postCount;
      this.posts = postData.posts;

    });

    //check for authorization
    this.userIsAuthenticated = this.authService.getAuth();

    //subscribe to auth status listener
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(isAuthenticated => {
      //set authenticated status
      this.userIsAuthenticated = isAuthenticated;
      //listen for switched user login, set userId again if changed
      this.userId = this.authService.getUserId();
    });
  }

  //pagination

  //get page event
  onChangedPage(pageData: PageEvent){

    //start spinner, set to false automatically when rendering updated posts
    this.isLoading = true;

    //get updated page index
    this.currentPage = pageData.pageIndex + 1;

    this.postsPerPage = pageData.pageSize;

    //specify how many posts per page and which page to start on
    this.postService.getPosts(this.postsPerPage, this.currentPage);
  }

  /**
   * 
   * fetch new posts once delete is successful
   * 
   * fixed delete bug
   */

  onDelete(postId: string) {
    //start spinner, set to false automatically when rendering updated posts
    this.isLoading = true;
    this.postService.deletePost(postId).subscribe(() => {
      this.totalPosts -= 1;
      if (this.totalPosts <= (this.postsPerPage * this.currentPage - 1)) {
        this.currentPage -= 1;
      }
      this.postService.getPosts(this.postsPerPage, this.currentPage);
    //if this fails run this code below
    }, () => {
      this.isLoading = false;
    });
  }

  ngOnDestroy() {
    //destroy observable to prevent memory leaks
    this.postsSub.unsubscribe();

    this.authStatusSub.unsubscribe();
  }

}




