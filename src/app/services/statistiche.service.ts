import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StatisticheService {

  constructor(private http: HttpClient) { }

  getStatistiche(dal: string, al: string, stato?: string){
    let params = new HttpParams()
      .set('dal', dal)
      .set('al', al);
    if (stato) params = params.set('stato', stato);
    return this.http.get(`/api/statistiche/consegne`, { params }).toPromise();
  }
}
