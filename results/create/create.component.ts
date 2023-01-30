import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Candidate } from '../../../models/candidate.model';
import { Result } from '../../../models/result.model';
import { Table } from '../../../models/table.model';
import { CandidatesService } from '../../../services/candidates.service';
import { ResultsService } from '../../../services/results.service';
import { TablesService } from '../../../services/tables.service';

@Component({
  selector: 'ngx-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  creationMode: boolean = true;
  resultId: string = "";
  sendigAttemp: boolean = false;
  result: Result = {
    votes: null,
    table: {
      _id: null
    },
    candidate: {
      _id: null
    }
  }
  tables: Table[];
  candidates: Candidate[];

  /**
   * 
   * @param resultServices 
   * @param candidatesServices 
   * @param tablesServices 
   * @param activatedRoute 
   * @param router 
   */

  constructor(private resultServices: ResultsService,
              private candidatesServices: CandidatesService,
              private tablesServices: TablesService,
              private activatedRoute: ActivatedRoute,
              private router: Router) { }
/**
 * 
 */
  ngOnInit(): void {
    this.getTables()
    this.getCandidates();
    if(this.activatedRoute.snapshot.params.resultId){
      this.creationMode = false;
      this.resultId = this.activatedRoute.snapshot.params.resultId;
      this.getResult(this.resultId);
    }
    else
      this.creationMode = true;
  }
/**
 * 
 * @param id 
 */
  getResult(id: string): void {
    this.resultServices.getOne(id).subscribe(
      data => {
        this.result = data;
      },
      error => {
        console.log(error);
      }
    );
  }
/**
 * 
 */
  getTables(): void {
    this.tablesServices.list().subscribe(
      data => {
        this.tables = data;
      },
      error => {
        console.log(error);
      }
    );
  }
/**
 * 
 */
  getCandidates(): void {
    this.candidatesServices.list().subscribe(
      data => {
        this.candidates = data;
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
    this.sendigAttemp = true;
    if(this.result.votes==null || this.result.candidate==null || this.result.table==null)
      return false;
    else
      return true;
  }
/**
 * 
 */
  create(): void {
    if(this.validateMandatoryData){
      console.log(this.result);
      this.resultServices.create(this.result).subscribe(
        data => {
          Swal.fire(
            'Creado',
            'El resultado ha sido creado correctamente',
            'success'
          );
          this.router.navigate(['pages/resultados/listar']);
        },
        error => {
          Swal.fire({
            title: 'Falla en el Servidor',
            text: 'El resultado no pudo ser creado, intente nuevamente',
            icon: 'error',
            timer: 5000
          });
        }
      )
    }
    else{
      Swal.fire({
        title: 'Hay campos obligatorios',
        text: 'Por favor diligenciar todos los campos',
        icon: 'warning',
        timer: 5000
      });
    }
  }
/**
 * 
 */
  edit(): void {
    if(this.validateMandatoryData){
      delete this.result._id;
      console.log(this.resultId);
      console.log(this.result);
      this.resultServices.updateOne(this.resultId, this.result).subscribe(
        data => {
          Swal.fire(
            'Actualizada',
            'El resultado ha sido actualizado correctamente.',
            'success'
          );
          this.router.navigate(['pages/resultados/listar']);
        },
        error => {
          console.log(error);
          Swal.fire({
            title: 'Falla en el Servidor',
            text: 'El resultado no se ha podido actualizar',
            icon: 'error',
            timer: 5000
          });
        }
      )
    }
    else{
      Swal.fire({
        title: 'Hay campos obligatorios',
        text: 'Por favor diligencie todos los campos obligatorios',
        icon: 'warning',
        timer: 5000
      });
    }
  }
  /**
   * 
   */
}
