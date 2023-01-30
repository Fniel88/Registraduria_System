import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Party } from '../../../models/party.model';
import { PartiesService } from '../../../services/parties.service';

@Component({
  selector: 'ngx-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  columnNames: String[] = ['Partido', 'Lema'];
  parties: Party[];

  constructor(private partiesService: PartiesService,
    private router: Router) { }

  ngOnInit(): void {
    this.list();
  }

  list(){
    this.partiesService.list().subscribe(
      data => {
        this.parties = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  create(){
    this.router.navigate(["pages/partidos/crear"]);
  }

  updateOne(id: string){
    this.router.navigate(["pages/partidos/actualizar/" + id]);
  }

  deleteOne(id: string): void{
    Swal.fire({
      title: 'Eliminar partido',
      text: '¿Esta seguro que quiere eliminar el partido?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085DG',
      cancelButtonColor: '#D33',
      confirmButtonText: 'Si, eliminar'
    }).then((result) => {
      if(result.isConfirmed){
        this.partiesService.deleteOne(id).subscribe(
          data => {
            Swal.fire(
              '¡Eliminado!',
              'El partido ha sido eliminado correctamente',
              'success'
            );
            this.ngOnInit();
          },
          error => {
            console.log(error);
          }
        )
      }
    })
  }

}
