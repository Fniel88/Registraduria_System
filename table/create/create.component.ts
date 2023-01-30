import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Table } from '../../../models/table.model';
import { TablesService } from '../../../services/tables.service';

@Component({
  selector: 'ngx-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  creationMode: boolean = true;
  sendingAttemp: boolean = false;
  tableId: string = "";
  table: Table = {
    number_table: "",
    registered_cards: 0,
  }
  /**
   * 
   * @param tableServices 
   * @param activedRoute 
   * @param router 
   */

  constructor(private tableServices: TablesService,
              private activedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    if(this.activedRoute.snapshot.params.tableId){
      this.creationMode = false;
      this.tableId = this.activedRoute.snapshot.params.tableId;
      this.getTable(this.tableId)
    }
    else
      this.creationMode = true;
  }

  /**
   * 
   * @param id 
   */

  getTable(id: string): void {
    this.tableServices.getOne(id).subscribe(
      data => {
        this.table = data;
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

  validateManadatoryData(): boolean {
    this.sendingAttemp = true;
    if(this.table.number_table=="" && this.table.registered_cards==0)
      return false;
    else
      return true;
  }

  /**
   * 
   */

  create(): void {
    if(this.validateManadatoryData){
      this.tableServices.create(this.table).subscribe(
        data => {
          Swal.fire(
            'Creada',
            'La tabla fue creada exitosamente',
            'success'
          );
          this.router.navigate(['pages/mesas/listar']);
        },
        error => {
          Swal.fire({
            title: 'Falla en el servidor',
            text: 'La mesa no se ha podido crear',
            icon: 'warning',
            timer: 5000
          });
        }
      )
    }
    else{
      Swal.fire({
        title: 'Campos Obligatorios',
        text: 'Hay campós vacios obligatorios',
        icon: 'warning',
        timer: 5000
      });
    }
  }

  /**
   * 
   */

  edit(): void {
    if(this.validateManadatoryData){
      delete this.table._id;
      this.tableServices.updateOne(this.tableId, this.table).subscribe(
        data => {
          Swal.fire(
            'Actualizado',
            'La mesa ha sido actualizada',
            'success'
          );
          this.router.navigate(['pages/mesas/listar']);
        },
        error => {
          Swal.fire({
            title: 'Falla en el servidor',
            text: 'No se ha podido actualizar la mesa. Intente de nuevo',
            icon: 'error',
            timer: 5000
          });
        }
      )
    }
    else{
      Swal.fire({
        title: 'Hay campos obligatorios',
        text: 'Por favor diligencia los campos faltantes',
        icon: 'warning',
        timer: 5000
      });
    }
  }
  /**
   * 
   */
}
