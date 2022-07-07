import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError} from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  headers= new HttpHeaders().set("x-api-key", environment.apikey)
  params = new HttpParams().set('sub_id',environment.userName).set('limit','100').set('include_vote','1')
  constructor(private http: HttpClient) { }

  get(url:any) :Observable<any>{
    return this.http.get(url,{'headers':this.headers, 'params':this.params})
  }

  

  post(url :any,data:any) :Observable<any>{
    let options ={
      headers: this.headers
    }  
    return this.http.post(url, data, options)
  }

  delete(url:any):Observable<any>{
    let options ={
      headers: this.headers
    } 
    return this.http.delete(url,{'headers':this.headers})
  }
}

export interface fileType {
  file : File
  sub_id: string

}
