import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Rol } from '../../../models/rol.model';
import { RolesService } from '../../../services/roles.service';

@Component({
  selector: 'ngx-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  columnNames: String[] = ['Nombre del Rol', "Descripcion"];
  roles: Rol[];

  constructor(private rolesService: RolesService,
              private router: Router) { }

  ngOnInit(): void {
    this.list();
  }

  list(){
    this.rolesService.list().subscribe(
      data => {
        this.roles = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  create(){
    this.router.navigate(["pages/roles/crear"]);
  }

  updateOne(id: string){
    this.router.navigate(["pages/roles/actualizar/" + id]);
  }

  deleteOne(id: string): void{
    Swal.fire({
      title: 'Eliminar rol',
      text: '¿Esta seguro que quiere eliminar el rol?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085DG',
      cancelButtonColor: '#D33',
      confirmButtonText: 'Si, eliminar'
    }).then((result) => {
      if(result.isConfirmed){
        this.rolesService.deleteOne(id).subscribe(
          data => {
            Swal.fire(
              '¡Eliminado!',
              'El rol ha sido eliminado correctamente',
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
