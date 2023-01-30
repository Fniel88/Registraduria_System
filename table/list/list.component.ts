import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Table } from '../../../models/table.model';
import { TablesService } from '../../../services/tables.service';

@Component({
  selector: 'ngx-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  tables: Table[];
  columNames: string[] = ['Numero de mesa', 'Cedulas registradas']

  constructor(private tableServices: TablesService,
              private router: Router) { }

  ngOnInit(): void {
    this.list();
  }

  list(): void {
    this.tableServices.list().subscribe(
      data => {
        this.tables = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  create(): void {
    this.router.navigate(["pages/mesas/crear"]);
  }

  edit(id: string): void {
    this.router.navigate(["pages/mesas/actualizar"+id]);
  }

  delete(id: string): void {
    Swal.fire({
      title: 'Eliminar Mesa',
      text: '¿Esta seguro que desea eliminar esta mesa?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085D6',
      cancelButtonColor: '#D33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Si, eliminar',
    }).then((result) => {
      if(result.isConfirmed){
        this.tableServices.deleteOne(id).subscribe(
          data => {
            Swal.fire(
              '!Eliminado¡',
              'La mesa ha sido eliminada',
              'success'
            ),
            this.ngOnInit();
          },
          error => {
            console.log(error);
          }
        )
      }
    }
    )
  }
}
