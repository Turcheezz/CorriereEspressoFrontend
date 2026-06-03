import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TrackingService {

  constructor(private http: HttpClient) { }

  tracking(dto: { chiaveConsegna: string; dataRitiro: string }){
    return this.http.post(`/api/tracking`, dto).toPromise();
  }
}
