import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }

  async login(credentials: { email: string; password: string }) {
    const res: any = await this.http.post<any>(`/api/operatori/login`, credentials).toPromise();
    if (res?.token) {
      localStorage.setItem('token', res.token);
    }
    return res;
  }

  async register(dto: any){
    return this.http.post(`/api/operatori/register`, dto).toPromise();
  }

  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  getToken(){
    return localStorage.getItem('token');
  }

  private getPayload(): any {
    const token = this.getToken();
    if (!token) return null;
    try{
      const parts = token.split('.');
      if (parts.length < 2) return null;
      const base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
      const payload = JSON.parse(atob(base64));
      return payload;
    }catch{
      return null;
    }
  }

  isAuthenticated(): boolean{
    return !!this.getToken();
  }

  getUserName(): string | null{
    const p = this.getPayload();
    if (!p) return null;
    return p['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'] || p['name'] || null;
  }

  getUserId(): number | null{
    const p = this.getPayload();
    if (!p) return null;
    const id = p['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'] || p['nameid'] || p['sub'];
    return id ? parseInt(String(id), 10) : null;
  }
}
