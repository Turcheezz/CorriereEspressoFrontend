import { Component } from '@angular/core';
import { TrackingService } from '../../services/tracking.service';

@Component({
  selector: 'app-tracking',
  standalone: false,
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.scss']
})
export class TrackingComponent {
  chiaveConsegna = '';
  dataRitiro = '';
  result: any = null;
  error = '';
  loading = false;

  constructor(private trackingService: TrackingService) {}

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

  async search(){
    this.error = '';
    this.result = null;
    this.loading = true;
    try{
      this.result = await this.trackingService.tracking({
        chiaveConsegna: this.chiaveConsegna,
        dataRitiro: this.dataRitiro
      });
    }catch(e: any){
      this.error = e?.error || 'Nessuna consegna trovata';
    }finally{
      this.loading = false;
    }
  }
}
