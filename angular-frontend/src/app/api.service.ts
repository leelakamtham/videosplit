import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  path = 'http://localhost:3000/api/upload';
  path2='http://localhost:3000/api/splitfiles/';


  constructor(private http: HttpClient)
  {

  }

  uploadFile(data: any){

   return  this.http.post(this.path, data);
  }

  getFile(file: string){

    //return  this.http.get(`${this.path2}/${file}`);
    return  this.http.get("http://localhost:3000/api/splitfiles/" +file);
   }


/*
   getVideos(): Observable<[]> {
    return this.http.get<[]>(this.path2)
    
  }

  */
}
