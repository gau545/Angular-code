import { Injectable } from '@angular/core';
import { HttpClient } from  '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CrudServicesService {

  constructor(private http: HttpClient) { }

  getAllData(){
    return this.http.get<any>('https://localhost:44337/api/CrudOperation/GetAllData');
  }

  getById(id:any){
    return this.http.get<any>('https://localhost:44337/api/CrudOperation/GetById/'+ id);
  }

  updateData(id:any, updateUserDto:any){
    return this.http.put<any>('https://localhost:44337/api/CrudOperation/UpdateById/'+id , updateUserDto);
  }

  DeleteById(id:any){
    return this.http.delete('https://localhost:44337/api/CrudOperation/DeleteById/'+id);
  }

  CreateNewUser(data:any){
    return this.http.post<any>('https://localhost:44337/api/CrudOperation/Create',data);
  }
}
