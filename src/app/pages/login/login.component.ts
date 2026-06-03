import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email = '';
  password = '';
  error = '';
  constructor(private auth: AuthService, private router: Router) {}

  async submit(){
    try{
      await this.auth.login({ email: this.email, password: this.password });
      await this.router.navigateByUrl('/dashboard', { replaceUrl: true });
    }catch(e: any){
      this.error = e?.error || 'Errore login';
    }
  }
}
