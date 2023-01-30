import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { User } from '../../../models/user.model';
import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'ngx-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  columnNames: string[] = ['Username', 'Correo', 'Rol']
  users: User[];

  constructor(private usersService: UsersService,
              private router: Router) { }

  ngOnInit(): void {
    this.list();
  }

  list(): void {
    this.usersService.list().subscribe(
      data => {
        this.users = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  create(): void {
    this.router.navigate(["pages/usuarios/crear"]);
  }

  edit(id: number): void {
    this.router.navigate(["pages/usuarios/actualizar"+id]);
  }

  delete(id: number): void {
    Swal.fire({
      title: 'Eliminar Usuario',
      text: '¿Seguro que desea eliminar el usuario?',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#D33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Si, eliminar',
      confirmButtonColor: '#3085D6',
    }).then((result) => {
      if(result.isConfirmed){
        this.usersService.deleteOne(id).subscribe(
          data => {
            Swal.fire({
              title: '¡Eliminado!',
              text: 'El usuario fue eliminado exitosamente',
              icon: 'success'
            });
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
