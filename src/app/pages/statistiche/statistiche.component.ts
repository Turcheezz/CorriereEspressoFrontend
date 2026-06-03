import { Component, OnInit } from '@angular/core';
import { StatisticheService } from '../../services/statistiche.service';

@Component({
  selector: 'app-statistiche',
  standalone: false,
  templateUrl: './statistiche.component.html',
  styleUrls: ['./statistiche.component.scss']
})
export class StatisticheComponent implements OnInit {
  dal = '';
  al = '';
  stato = '';
  result: any = null;
  error = '';
  loading = false;

  stati = ['', 'Da ritirare', 'In deposito', 'In consegna', 'Consegnata', 'In giacenza'];

  constructor(private statisticheService: StatisticheService) {}

  ngOnInit(){
    const now = new Date();
    this.al = now.toISOString().substring(0, 10);
    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
    this.dal = firstDay.toISOString().substring(0, 10);
  }

  async search(){
    this.error = '';
    this.result = null;
    this.loading = true;
    try{
      const res: any = await this.statisticheService.getStatistiche(
        this.dal,
        this.al,
        this.stato || undefined
      );
      const arr = Array.isArray(res) ? res : [];
      this.result = arr.length > 0 ? arr[0] : null;
    }catch(e: any){
      this.error = 'Errore caricamento statistiche';
    }finally{
      this.loading = false;
    }
  }

  getTempoMedio(ore: number): string{
    if (!ore) return '--';
    if (ore < 24) return `${Math.round(ore)} ore`;
    const giorni = Math.floor(ore / 24);
    const oreResidue = Math.round(ore % 24);
    return `${giorni}g ${oreResidue}h`;
  }
}
