import { Component, OnInit } from '@angular/core';
import { Party } from '../../../models/party.model';
import { PartiesService } from '../../../services/parties.service';
import { ReportsService } from '../../../services/reports.service';

@Component({
  selector: 'ngx-parties',
  templateUrl: './parties.component.html',
  styleUrls: ['./parties.component.scss']
})
export class PartiesComponent implements OnInit {

  dataParties: Object;
  parties: Party[];
  columnNames: String[] = ['Nombre Partido', 'Votos'];

  constructor(private reportsService: ReportsService,
              private partieservice: PartiesService) { }

  ngOnInit(): void {
    this.getDataFull();
  }

  getParties(): void {
    this.partieservice.list().subscribe(
      data => {
        this.parties = data;
      },
      error => {
        console.log(error);
      }
      
    )
  }

  getDataFull(): void{
    this.reportsService.partiesReport().subscribe(
      data => {
        this.dataParties = data;
        console.log(data);
      },
      error => {
        console.log(error); 
      }
    )
  }

}
