import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Candidate } from '../../../models/candidate.model';
import { CandidatesService } from '../../../services/candidates.service';

@Component({
  selector: 'ngx-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  creationMode: boolean = true; // true=create, false=updateOne
  candidateId: string = "";
  candidate: Candidate = {
    personal_id: "",
    name: "",
    last_name: "",
    number_resolution: ""
  };

  sendingAttemp: boolean = false;

  constructor(private candidatesService: CandidatesService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    if(this.activatedRoute.snapshot.params.candidateId){
      this.creationMode = false;
      this.candidateId = this.activatedRoute.snapshot.params.candidateId;
      this.getCandidato(this.candidateId);
    }
    else
      this.creationMode = true;
  }

  getCandidato(id: string): void{
    this.candidatesService.getOne(id).subscribe(
      data => {
        this.candidate = data;
      },
      error => {
        console.log(error);
      }
    )
  }

  validateMandatoryData(): boolean {
    this.sendingAttemp = true;
    if(this.candidate.personal_id== "" || this.candidate.name=="" || this.candidate.last_name=="")
      return false;
    else
      return true;
  }

  create(): void{
    if(this.validateMandatoryData()){
      this.candidatesService.create(this.candidate).subscribe(
        data => {
          Swal.fire({
            title: 'Creados',
            text: 'El candidato ha sido creado correctamente',
            icon: 'success',
          });
          this.router.navigate(["pages/candidatos/listar"]);
        },
        error => {
          console.log(error);
          Swal.fire({
            title: 'Falla en el servidor',
            text: 'El candidato ha no ha podido ser creado, Intente mas tarde',
            icon: 'error',
            timer: 5000
          })
        }
      )
    }
    else{
      Swal.fire({
        title: 'Campos Obligatorios',
        text: 'Por favor diligencia todos los campos obligatorios.',
        icon: 'warning',
        timer: 5000
      })
    }
  }

  updateOne(): void{
    if(this.validateMandatoryData()){
      let candidate_: Candidate = { ...this.candidate }
      delete candidate_._id
      this.candidatesService.updateOne(this.candidate._id, candidate_).subscribe(
        data => { 
          Swal.fire(
            'Actualizado',
            'El candidato fue actualizado',
            'success'
          );
          this.router.navigate(["pages/candidatos/listar"]); 
        },
        error => {
          console.log(error);
        }
      )
    }
    else {
      Swal.fire({
        title: 'Campos Obligatorios',
        text: 'Por favor diligencia todos los campos obligatorios.',
        icon: 'warning',
        timer: 5000
      })
    }

  }
}
