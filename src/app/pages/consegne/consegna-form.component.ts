import { Component, OnInit } from '@angular/core';
import { ConsegneService } from '../../services/consegne.service';
import { ClientiService } from '../../services/clienti.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-consegna-form',
  standalone: false,
  templateUrl: './consegna-form.component.html',
  styleUrls: ['./consegna-form.component.scss']
})
export class ConsegnaFormComponent implements OnInit {
  isEdit = false;
  consegnaId: number | null = null;
  clienteId = 0;
  dataRitiro = '';
  stato = 'Da ritirare';
  clienti: any[] = [];
  error = '';
  loading = false;

  stati = ['Da ritirare', 'In deposito', 'In consegna', 'Consegnata', 'In giacenza'];

  constructor(
    private consegneService: ConsegneService,
    private clientiService: ClientiService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  async ngOnInit(){
    await this.loadClienti();
    const id = this.route.snapshot.paramMap.get('id');
    if (id){
      this.isEdit = true;
      this.consegnaId = Number(id);
      await this.loadConsegna();
    }
  }

  async loadClienti(){
    try{
      const res: any = await this.clientiService.getAll();
      this.clienti = Array.isArray(res) ? res : [];
    }catch(e){}
  }

  async loadConsegna(){
    this.loading = true;
    try{
      const c: any = await this.consegneService.getById(this.consegnaId!);
      this.clienteId = c.clienteId;
      this.dataRitiro = c.dataRitiro ? c.dataRitiro.substring(0, 10) : '';
      this.stato = c.stato || 'Da ritirare';
    }catch(e: any){
      this.error = 'Errore caricamento consegna';
    }finally{
      this.loading = false;
    }
  }

  async submit(){
    this.error = '';
    if (!this.clienteId || !this.dataRitiro){
      this.error = 'Cliente e data ritiro obbligatori';
      return;
    }
    try{
      const dto = {
        clienteId: this.clienteId,
        dataRitiro: this.dataRitiro,
        stato: this.stato
      };
      if (this.isEdit){
        await this.consegneService.update(this.consegnaId!, dto);
      } else {
        await this.consegneService.create(dto);
      }
      this.router.navigate(['/consegne']);
    }catch(e: any){
      this.error = e?.error || 'Errore salvataggio';
    }
  }
}
