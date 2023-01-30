import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Rol } from '../../../models/rol.model';
import { User } from '../../../models/user.model';
import { RolesService } from '../../../services/roles.service';
import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'ngx-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  creationMode: boolean = true;
  sendingAttemp: boolean= false;
  userId: number;
  roles: Rol[];
  user: User = {
    nickname: "",
    email: "",
    password: "",
    rol: {
      idRol: null,
    }
  }

  constructor(private userService: UsersService,
              private rolesService: RolesService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getRoles();
    if(this.activatedRoute.snapshot.params.userId){
      this.creationMode = false;
      this.userId = this.activatedRoute.snapshot.params.userId;
      this.getUser(this.userId);
    }
    else
      this.creationMode = true;
  }

  getRoles(): void {
    this.rolesService.list().subscribe(
      data => {
        this.roles = data;
      },
      error => {
        console.log(error)
      }
    );
  }

  getUser(id: number): void {
    this.userService.getOne(id).subscribe(
      data => {
        this.user = data;
      },
      error => {
        console.log(error)
      }
    );
  }

  validateMandatoryData(): boolean {
    this.sendingAttemp = true;
    if(this.user.email=="" || this.user.nickname=="" || this.user.rol.idRol==null)
      return false;
    else
      return true;
  }

  create(): void {
    if(this.validateMandatoryData()){
      this.userService.create(this.user).subscribe(
        data => {
          Swal.fire({
            title: 'Creado',
            text: 'El usuario ha sido creado exitosamente',
            icon: 'success',
          });
          this.router.navigate(["pages/usuarios/listar"]);
        },
        error => {
          console.log(error);
          Swal.fire({
            title: 'Falla en el servidor',
            text: 'El usuario no ha sido creado, intente nuevamente',
            icon: 'error',
            timer: 5000
          })
        } 
      )
    }
    else {
      Swal.fire({
        title: 'Hay campos obligatorios',
        text: 'Por favor diligencie los campos obligatorios',
        icon: 'warning',
        timer: 5000
      })
    }
  }

  edit(): void {
    if(this.validateMandatoryData()){
      delete this.user.id
      let rol_: Rol = {
        idRol: this.user.rol.idRol,
      }
      this.user.rol = rol_;
      this.userService.updateOne(this.userId, this.user).subscribe(
        data => {
          Swal.fire(
            'Actualizado',
            'El usuario ha sido actualizado correctamente',
            'success'
          );
          this.router.navigate(["pages/usuarios/listar"]);
        },
        error => {
          console.log(error)
        }
      )
    }
    else {
      Swal.fire({
        title: 'Campos Obligatorios',
        text: 'Por favor diligencie los campos obligatorios',
        icon: 'warning',
        timer: 5000
      })
    }
  }
}
