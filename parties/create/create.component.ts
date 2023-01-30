import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Party } from '../../../models/party.model';
import { PartiesService } from '../../../services/parties.service';

@Component({
  selector: 'ngx-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  creationMode: boolean = true; // true=create, false=updateOne
  partyId: string = "";
  party: Party = {
    name: "",
    motto: ""
  };

  sendingAttemp: boolean = false;

  constructor(private partiesService: PartiesService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    if(this.activatedRoute.snapshot.params.partyId){
      this.creationMode = false;
      this.partyId = this.activatedRoute.snapshot.params.partyId;
      this.getPartido(this.partyId);
    }
    else
      this.creationMode = true;
  }

  getPartido(id: string): void{
    this.partiesService.getOne(id).subscribe(
      data => {
        this.party = data;
      },
      error => {
        console.log(error);
      }
    )
  }

  validateMandatoryData(): boolean {
    this.sendingAttemp = true;
    if(this.party.name== "" || this.party.motto=="")
      return false;
    else
      return true;
  }

  create(): void{
    if(this.validateMandatoryData()){
      this.partiesService.create(this.party).subscribe(
        data => {
          Swal.fire({
            title: 'Creado',
            text: 'El partido ha sido creado correctamente',
            icon: 'success',
          });
          this.router.navigate(["pages/partidos/listar"]);
        },
        error => {
          console.log(error);
          Swal.fire({
            title: 'Falla en el servidor',
            text: 'El partido ha no ha podido ser creado, Intente mas tarde',
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
      let party_: Party = { ...this.party }
      delete party_._id
      this.partiesService.updateOne(this.party._id, party_).subscribe(
        data => { 
          Swal.fire(
            'Actualizado',
            'El partido fue actualizado',
            'success'
          );
          this.router.navigate(["pages/partidos/listar"]); 
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
