import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  nome = '';
  cognome = '';
  email = '';
  password = '';
  confermaPassword = '';
  error = '';
  success = '';
  constructor(private auth: AuthService, private router: Router) {}

  async submit(){
    this.error = '';
    this.success = '';
    if (this.password !== this.confermaPassword) {
      this.error = 'Password e conferma password non coincidono';
      return;
    }
    try{
      await this.auth.register({
        nome: this.nome,
        cognome: this.cognome,
        email: this.email,
        password: this.password,
        confermaPassword: this.confermaPassword
      });
      this.success = 'Registrazione completata! Reindirizzamento al login...';
      setTimeout(() => this.router.navigate(['/login']), 1500);
    }catch(e: any){
      this.error = e?.error || 'Errore registrazione';
    }
  }
}
