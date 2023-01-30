import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Candidate } from '../../../models/candidate.model';
import { CandidatesService } from '../../../services/candidates.service';

@Component({
  selector: 'ngx-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  columnNames: String[] = ['Cedula', 'Nombres', 'Apellidos', 'Numero de Resolucion', 'Opciones'];
  candidates: Candidate[];

  constructor(private candidatesService: CandidatesService,
              private router: Router) { }

  ngOnInit(): void {
    this.list();
  }

  list(){
    this.candidatesService.list().subscribe(
      data => {
        this.candidates = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  create(){
    this.router.navigate(["pages/candidatos/crear"]);
  }

  updateOne(id: string){
    this.router.navigate(["pages/candidatos/actualizar/" + id]);
  }

  deleteOne(id: string): void{
    Swal.fire({
      title: 'Eliminar candidato',
      text: '¿Esta seguro que quiere eliminar al candidato?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085DG',
      cancelButtonColor: '#D33',
      confirmButtonText: 'Si, eliminar'
    }).then((result) => {
      if(result.isConfirmed){
        this.candidatesService.deleteOne(id).subscribe(
          data => {
            Swal.fire(
              '¡Eliminado!',
              'El candidato ha sido eliminado correctamente',
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
