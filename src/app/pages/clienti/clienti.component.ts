import { Component, OnInit } from '@angular/core';
import { ClientiService } from '../../services/clienti.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clienti',
  standalone: false,
  templateUrl: './clienti.component.html',
  styleUrls: ['./clienti.component.scss']
})
export class ClientiComponent implements OnInit {
  clienti: any[] = [];
  loading = true;
  error = '';
  success = '';

  constructor(private clientiService: ClientiService, private router: Router) {}

  async ngOnInit(){
    await this.loadClienti();
  }

  async loadClienti(){
    this.loading = true;
    try{
      const res: any = await this.clientiService.getAll();
      this.clienti = Array.isArray(res) ? res : [];
    }catch(e: any){
      this.error = 'Errore nel caricamento clienti';
    }finally{
      this.loading = false;
    }
  }

  async elimina(id: number){
    if (!confirm('Eliminare questo cliente?')) return;
    try{
      await this.clientiService.delete(id);
      this.success = 'Cliente eliminato';
      await this.loadClienti();
    }catch(e: any){
      this.error = e?.error || 'Impossibile eliminare: il cliente ha consegne associate';
    }
  }

  modifica(id: number){
    this.router.navigate(['/clienti', id]);
  }
}
