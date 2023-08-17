import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { vaccineModel } from '../vaccine/vaccine.model';

@Injectable({
  providedIn: 'root'
})
export class VaccineserviceService {

  constructor(private http:HttpClient) { }
  baseurl: string = "http://localhost:3000/vaccine"

  
  
  postvaccine(data:any){
    return this.http.post<vaccineModel>(this.baseurl,data)
  }
  getvaccine() {
    return this.http.get<vaccineModel[]>(this.baseurl)
  }  
  deletevaccine(id: number) {
    return this.http.delete<vaccineModel>(this.baseurl + '/' + id)
      
  }
  updatevaccine(data: any, id: number) {
    return this.http.put<vaccineModel>(this.baseurl + '/' + id, data)
      
  }
  
}
