import { Component, OnInit } from '@angular/core';
import { ClientiService } from '../../services/clienti.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cliente-form',
  standalone: false,
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.scss']
})
export class ClienteFormComponent implements OnInit {
  isEdit = false;
  clienteId: number | null = null;
  nominativo = '';
  via = '';
  comune = '';
  provincia = '';
  telefono = '';
  email = '';
  note = '';
  error = '';
  loading = false;

  constructor(
    private clientiService: ClientiService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  async ngOnInit(){
    const id = this.route.snapshot.paramMap.get('id');
    if (id){
      this.isEdit = true;
      this.clienteId = Number(id);
      await this.loadCliente();
    }
  }

  async loadCliente(){
    this.loading = true;
    try{
      const c: any = await this.clientiService.getById(this.clienteId!);
      this.nominativo = c.nominativo || '';
      this.via = c.via || '';
      this.comune = c.comune || '';
      this.provincia = c.provincia || '';
      this.telefono = c.telefono || '';
      this.email = c.email || '';
      this.note = c.note || '';
    }catch(e: any){
      this.error = 'Errore caricamento cliente';
    }finally{
      this.loading = false;
    }
  }

  async submit(){
    this.error = '';
    if (!this.nominativo || !this.via || !this.comune){
      this.error = 'Nominativo, indirizzo e comune sono obbligatori';
      return;
    }
    try{
      const dto = {
        nominativo: this.nominativo,
        via: this.via,
        comune: this.comune,
        provincia: this.provincia,
        telefono: this.telefono,
        email: this.email,
        note: this.note
      };
      if (this.isEdit){
        await this.clientiService.update(this.clienteId!, dto);
      } else {
        await this.clientiService.create(dto);
      }
      this.router.navigate(['/clienti']);
    }catch(e: any){
      this.error = e?.error || 'Errore salvataggio';
    }
  }
}
