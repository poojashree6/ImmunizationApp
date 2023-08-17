import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { childModel } from '../childvaccine/child.model';

@Injectable({
  providedIn: 'root'
})
export class ChildvaccineserviceService {

  constructor(private http:HttpClient) { }
  baseurl: string = "http://localhost:3000/childvaccine"

  
  
  postchild(data:any){
    return this.http.post<childModel>(this.baseurl,data)
  }
  getchild() {
    return this.http.get<childModel[]>(this.baseurl)
  }  
  deletechild(id: number) {
    return this.http.delete<childModel>(this.baseurl + '/' + id)
      
  }
  updatechild(data: any, id: number) {
    return this.http.put<childModel>(this.baseurl + '/' + id, data)
      
  }
}
