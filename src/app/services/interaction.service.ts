import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';

import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class InteractionService {

  votesUrl = "https://api.thecatapi.com/v1/votes";
  favouritesUrl = "https://api.thecatapi.com/v1/favourites";
  constructor(public httpService: HttpService) { }

  getCatsList(): Observable<any> {
    const url = 'https://api.thecatapi.com/v1/images/'
    return this.httpService.get(url)

  }

  uploadTheCat(file: any): Observable<any> {
    const data = new FormData();
    // Store form name as "file" with file data
    data.append("file", file);
    data.append("sub_id", environment.userName)
    const url = "https://api.thecatapi.com/v1/images/upload"
    return this.httpService.post(url, data)
  }

  addMyFavourite(id: any): Observable<any> {
    const data = {
      "image_id": id,
      "sub_id": environment.userName
    }

    const url = this.favouritesUrl
    return this.httpService.post(url, data)
  }

  deleteMyFavourite(id: any): Observable<any> {
    const url = this.favouritesUrl + '/' + id
    return this.httpService.delete(url)
  }

  getMyFavList() {
    const url = this.favouritesUrl
    return this.httpService.get(url)
  }

  upVote(id: any) : Observable<any> {
    const data = {
      "image_id": id,
      "sub_id": environment.userName,
      "value": 1
    }
    const url = this.votesUrl
    return this.httpService.post(url, data)
  }

  downVote(id:any): Observable<any> {
    const data = {
      "image_id": id,
      "sub_id": environment.userName,
      "value": 0
    }
    const url = this.votesUrl
    return this.httpService.post(url, data)
  }

      
      
  getMyVotes():Observable<any>{
    const url = this.votesUrl
    return this.httpService.get(url)
  }

}
