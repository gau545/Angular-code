import { Injectable } from '@angular/core';
import { HttpClient } from  '@angular/common/http';
import { Observable } from 'rxjs';

interface User {
  id: number;
  username: string;
  text: string;
  createdDate: Date;
}

@Injectable({
  providedIn: 'root'
})
export class CrudServicesService {

  private baseUrl = 'https://localhost:44337/api/CrudOperation'; 

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}`);
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/${id}`);
  }

  addUser(user: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}`, user);
  }

  updateUser(id: number, user: User): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, user);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  // getAllData(){
  //   return this.http.get<any>('https://localhost:44337/api/CrudOperation/GetAllData');
  // }

  // getById(id:any){
  //   return this.http.get<any>('https://localhost:44337/api/CrudOperation/GetById/'+ id);
  // }

  // updateData(id:any, updateUserDto:any){
  //   return this.http.put<any>('https://localhost:44337/api/CrudOperation/UpdateById/'+id , updateUserDto);
  // }

  // DeleteById(id:any){
  //   return this.http.delete('https://localhost:44337/api/CrudOperation/DeleteById/'+id);
  // }

  // CreateNewUser(data:any){
  //   return this.http.post<any>('https://localhost:44337/api/CrudOperation/Create',data);
  // }
}
