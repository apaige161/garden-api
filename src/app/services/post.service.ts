import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Post } from '../posts/post.model'
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'
import { Router } from '@angular/router';

import { environment } from '../../environments/environment'
const BACKEND_URL = environment.apiUrl + "/posts/";

@Injectable({
  providedIn: 'root'
})
export class PostService {


  private posts: Post[] = [];

  //pass an array of posts as an event emitter
  private postsUpdated = new Subject<{posts: Post[], postCount: number}>();

  //inject htttp dependancy
  constructor(private http: HttpClient, private router: Router) {}

  //retrieve posts from backend
  getPosts(postsPerPage: number, currentPage: number) {

    const queryParams = `?pageSize=${postsPerPage}&page=${currentPage}`

    /**
     * returns post object and max post
     */

    //must listen to the response
    //specifies the type of data it expects to return
    this.http.get<{ message: string, posts: any, maxPosts: number }>(BACKEND_URL + queryParams)

      //converts id => _id for the backend communication
      .pipe(map((postData) => {
        /*return a new object for each post*/
        return { posts: postData.posts.map(post => {
          //get all info about each post
          return {
            title: post.title,
            content: post.content,
            id: post._id,
            imagePath: post.imagePath,
            //get user id of post
            creator: post.creator,
            //get user email
            creatorEmail: post.creatorEmail
          };
        }), maxPosts: postData.maxPosts};
      }))
      //returns an observable
      .subscribe((tranformedPostData) => {
        this.posts = tranformedPostData.posts;
        //grab a copy of posts and total number of posts
        this.postsUpdated.next({
          posts: [...this.posts], 
          postCount: tranformedPostData.maxPosts
        })
      });
  }

  //listens for updated posts
  getPostUpdateListener() {
    //returns an object that listens but cannot emit
    return this.postsUpdated.asObservable();
  }

  getPost(id: string) {
    //return syncronously
    return this.http.get<{ 
      _id: string, 
      title: string, 
      ingredients: string,
      content:string, 
      imagePath: string,
      creator:string,
      creatorEmail: string
    }>(BACKEND_URL + id);
  }

  addPost(title: string, ingredients: string, content: string, image: File) {
    //send form data to allow for uploading images (blob) and json
    const postData = new FormData();
    postData.append("title", title);
    postData.append("ingredients", ingredients);
    postData.append("content", content);
    postData.append("image", image, title);

    //send post request to url, json object to post
    this.http.post< {message: string, post: Post} >(BACKEND_URL, postData)
      .subscribe((responseData) => {
        
        //redirect user to posts page
        this.router.navigate(["/"])
      })
  }

  /***
   * 
   * update the post by finding the old post id,
   * create new post with the same id
   * 
   */
  updatePost(id: string, title: string, ingredients: string, content: string, image: File | string) {

    let postData: Post | FormData;
    
    //check if the payload needs to be formData or json
    if (typeof(image) === 'object') {
      //create formData
      postData = new FormData();
      postData.append("id", id);
      postData.append("title", title);
      postData.append("ingredients", ingredients);
      postData.append("content", content);
      postData.append("image", image, title);

    } else {
      //must be a string
      //send json data
      postData = {
        id: id,
        title: title,
        ingredients: ingredients,
        content: content,
        imagePath: image,
        creator: null,
        creatorEmail: null
      };
    }

    //send the updated post to the server
    this.http.put(BACKEND_URL + id, postData)
      .subscribe(res => {
        //redirect user to posts page
        this.router.navigate(["/"])
      });
    
  }

  //send the id to be deleted
  deletePost(postId: string) {
    return this.http.delete(BACKEND_URL + postId)
  }

}
