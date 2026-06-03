import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClientiService {

  constructor(private http: HttpClient) { }

  getAll(){
    return this.http.get(`/api/clienti`).toPromise();
  }

  getById(id: number){
    return this.http.get(`/api/clienti/${id}`).toPromise();
  }

  create(dto: any){
    return this.http.post(`/api/clienti`, dto).toPromise();
  }

  update(id: number, dto: any){
    return this.http.put(`/api/clienti/${id}`, dto).toPromise();
  }

  delete(id: number){
    return this.http.delete(`/api/clienti/${id}`, { responseType: 'text' as 'json' }).toPromise();
  }
}
