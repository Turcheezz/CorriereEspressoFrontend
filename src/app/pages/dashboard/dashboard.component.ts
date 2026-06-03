import { Component, OnInit } from '@angular/core';
import { ConsegneService } from '../../services/consegne.service';
import { ClientiService } from '../../services/clienti.service';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  stats = {
    totaleConsegne: 0,
    daRitirare: 0,
    inConsegna: 0,
    consegnate: 0,
    totaleClienti: 0
  };
  loading = true;

  constructor(
    private consegneService: ConsegneService,
    private clientiService: ClientiService
  ) {}

  async ngOnInit(){
    try{
      const [consegne, clienti]: any = await Promise.all([
        this.consegneService.getAll(),
        this.clientiService.getAll()
      ]);
      const arr = Array.isArray(consegne) ? consegne : [];
      this.stats.totaleConsegne = arr.length;
      this.stats.daRitirare = arr.filter((c: any) => c.stato === 'Da ritirare').length;
      this.stats.inConsegna = arr.filter((c: any) => c.stato === 'In consegna').length;
      this.stats.consegnate = arr.filter((c: any) => c.stato === 'Consegnata').length;
      this.stats.totaleClienti = Array.isArray(clienti) ? clienti.length : 0;
    }catch(e){
      console.error(e);
    }finally{
      this.loading = false;
    }
  }
}
