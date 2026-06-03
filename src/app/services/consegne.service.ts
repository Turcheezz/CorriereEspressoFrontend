import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConsegneService {

  constructor(private http: HttpClient) { }

  getAll(clienteId?: number, stato?: string){
    let params = new HttpParams();
    if (clienteId) params = params.set('clienteId', String(clienteId));
    if (stato) params = params.set('stato', stato);
    return this.http.get(`/api/consegne`, { params }).toPromise();
  }

  getById(id: number){
    return this.http.get(`/api/consegne/${id}`).toPromise();
  }

  create(dto: any){
    return this.http.post(`/api/consegne`, dto).toPromise();
  }

  update(id: number, dto: any){
    return this.http.put(`/api/consegne/${id}`, dto).toPromise();
  }

  delete(id: number){
    return this.http.delete(`/api/consegne/${id}`, { responseType: 'text' as 'json' }).toPromise();
  }

  aggiornaStato(id: number, stato: string){
    return this.http.put(`/api/consegne/${id}/stato`, { stato }).toPromise();
  }
}
