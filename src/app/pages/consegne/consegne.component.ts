import { Component, OnInit } from '@angular/core';
import { ConsegneService } from '../../services/consegne.service';
import { ClientiService } from '../../services/clienti.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-consegne',
  standalone: false,
  templateUrl: './consegne.component.html',
  styleUrls: ['./consegne.component.scss']
})
export class ConsegneComponent implements OnInit {
  consegne: any[] = [];
  clienti: any[] = [];
  loading = true;
  error = '';
  success = '';

  filtroCliente = '';
  filtroStato = '';

  stati = ['Da ritirare', 'In deposito', 'In consegna', 'Consegnata', 'In giacenza'];
  nuovoStato: { [key: number]: string } = {};

  constructor(
    private consegneService: ConsegneService,
    private clientiService: ClientiService,
    private router: Router
  ) {}

  async ngOnInit(){
    await Promise.all([
      this.loadConsegne(),
      this.loadClienti()
    ]);
  }

  async loadConsegne(){
    this.loading = true;
    try{
      const res: any = await this.consegneService.getAll(
        this.filtroCliente ? Number(this.filtroCliente) : undefined,
        this.filtroStato || undefined
      );
      this.consegne = Array.isArray(res) ? res : [];
    }catch(e: any){
      this.error = 'Errore nel caricamento consegne';
    }finally{
      this.loading = false;
    }
  }

  async loadClienti(){
    try{
      const res: any = await this.clientiService.getAll();
      this.clienti = Array.isArray(res) ? res : [];
    }catch(e){}
  }

  async filtra(){
    await this.loadConsegne();
  }

  resetFiltri(){
    this.filtroCliente = '';
    this.filtroStato = '';
    this.loadConsegne();
  }

  async aggiornaStato(id: number){
    const stato = this.nuovoStato[id];
    if (!stato) return;
    try{
      await this.consegneService.aggiornaStato(id, stato);
      this.success = 'Stato aggiornato';
      this.nuovoStato[id] = '';
      await this.loadConsegne();
    }catch(e: any){
      this.error = e?.error || 'Errore aggiornamento stato';
    }
  }

  async elimina(id: number){
    if (!confirm('Eliminare questa consegna?')) return;
    try{
      await this.consegneService.delete(id);
      this.success = 'Consegna eliminata';
      await this.loadConsegne();
    }catch(e: any){
      this.error = e?.error || 'Impossibile eliminare la consegna';
    }
  }

  modifica(id: number){
    this.router.navigate(['/consegne', id]);
  }

  getStatoBadge(stato: string): string{
    const map: any = {
      'Da ritirare': 'badge bg-warning text-dark',
      'In deposito': 'badge bg-info text-dark',
      'In consegna': 'badge bg-primary',
      'Consegnata': 'badge bg-success',
      'In giacenza': 'badge bg-secondary'
    };
    return map[stato] || 'badge bg-secondary';
  }

  getClienteNome(clienteId: number): string{
    const c = this.clienti.find(cl => cl.clienteId === clienteId);
    return c ? c.nominativo : '--';
  }
}
