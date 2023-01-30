import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Rol } from '../../../models/rol.model';
import { RolesService } from '../../../services/roles.service';

@Component({
  selector: 'ngx-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  creationMode: boolean = true;
  sendingAttemp: boolean = false;
  rolId: number = null;
  rol: Rol = {
    name: "",
    description: ""
  }

  /**
   * 
   * @param rolService 
   * @param activatedRoute 
   * @param router 
   */

  constructor(private rolService: RolesService,
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    if(this.activatedRoute.snapshot.params.rolId){
      this.creationMode = false;
      this.rolId = this.activatedRoute.snapshot.params.rolId;
      this.getRol(this.rolId);
    }
    else
      this.creationMode = true;
  }

  /**
   * 
   * @param id 
   */

  getRol(id: number): void {
    this.rolService.getOne(id).subscribe(
      data => {
        this.rol = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  /**
   * 
   * @returns 
   */

  validateMandatoryData(): boolean {
    this.sendingAttemp = true;
    if(this.rol.name=="")
      return false;
    else
      return true;
  }

  /**
   * 
   */

  create(): void{
    if(this.validateMandatoryData){
      this.rolService.create(this.rol).subscribe(
        data => {
          Swal.fire(
            'Creado',
            'El rol ha sido creado correctamente.',
            'success'
          );
          this.router.navigate(['pages/roles/listar']);
        },
        error => {
          Swal.fire({
            title: 'Falla en el Servidor',
            text: 'El rol no ha podido ser creado. Intente de nuevo.',
            icon: 'error',
            timer: 5000
          });
        }
      )
    }
    else{
      Swal.fire({
        title: 'Campos Obligatorios',
        text: 'Por favor diligencie todos los campos obligatorios.',
        icon: 'warning',
        timer: 5000
      });
    }
  }

  /**
   * 
   */

  edit(): void{
    if(this.validateMandatoryData){
      delete this.rol.idRol;
      this.rolService.updateOne(this.rolId, this.rol).subscribe(
        data => {
          Swal.fire(
            'Actualizado',
            'El rol ha sido actualizado correctamente.',
            'success'
          );
          this.router.navigate(['pages/roles/listar']);
        },
        error => {
          console.log(error);
          Swal.fire({
            title: 'Falla en el Servidor',
            text: 'El rol no ha podido ser actualizado. Intente de nuevo.',
            icon: 'error',
            timer: 5000
          });
        }
      )
    }
    else{
      Swal.fire({
        title: 'Campos Obligatorios',
        text: 'Por favor diligencie todos los campos obligatorios.',
        icon: 'warning',
        timer: 5000
      });
    }
  }

  /**
   * 
   */
}
