import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  HttpClient, HttpHeaders, HttpParams,
  HttpResponse, HttpEvent
} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {
  basePath = 'http://localhost:3000/';
  constructor(private httpClient: HttpClient) { }

  getUsers(): Observable<any> {

    return this.httpClient.get<any>(`${this.basePath}` + 'api/users');
  }
  addUser(data): Observable<any> {
    return this.httpClient.post<any>(`${this.basePath}` + 'api/createUser',
    data);
  }
  updateUser(data): Observable<any> {
    return this.httpClient.put<any>(`${this.basePath}` + 'api/updateUser',
    data);
  }
  delete(id): Observable<any> {
    return this.httpClient.delete<any>(`${this.basePath}` + 'api/delete/' + id);
  }
}
