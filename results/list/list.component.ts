import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ResultsService } from '../../../services/results.service';
import { Result } from '../../../models/result.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'ngx-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  columnNames: string[] = ['Candidato', 'Mesa', 'Votos']
  results: Result[]; 

  constructor(private resultsService: ResultsService,
              private router: Router) { }

  ngOnInit(): void {
    this.list();
  }

  list(): void {
    this.resultsService.list().subscribe(
      data => {
        this.results = data;
      },
      error => {
        console.log(error);
      }
    )
  }

  create(): void {
    this.router.navigate(["pages/resultados/crear"]);
  }

  edit(id: string): void {
    this.router.navigate(["pages/resultados/actualizar/"+id]);
  }

  delete(id: string): void {
    Swal.fire({
      title: 'Eliminar Inscripcion',
      text: '¿Esta seguro que quiere eliminar este resultado?',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#D33',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#30885D6',
      confirmButtonText: 'Si, eliminar',
    }).then((result)  => {
      if(result.isConfirmed){
        this.resultsService.deleteOne(id).subscribe(
          data => {
            Swal.fire(
              '¡Eliminado!',
              'El resultado ha sido eliminado correctamente',
              'success'
            ),
            error => {
              console.log(error);
            }
          }
        )
      }
    }
    )
  }

}
