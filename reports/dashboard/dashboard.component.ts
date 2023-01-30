import { Component, OnInit } from '@angular/core';
import { Party } from '../../../models/party.model';
import { PartiesService } from '../../../services/parties.service';
import { ReportsService } from '../../../services/reports.service';

@Component({
  selector: 'ngx-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  dataGeneral: Object;
  general: Party[];
  columnNames: String[] = ['Partido Politico', 'Votos'];

  constructor(private reportsService: ReportsService,
              private generalservice: PartiesService) { }

  ngOnInit(): void {
    this.getDataFull();
  }

  getGeneral(): void {
    this.generalservice.list().subscribe(
      data => {
        this.general = data;
      },
      error => {
        console.log(error);
      }
      
    )
  }

  getDataFull(): void{
    this.reportsService.partiesPercentageReport().subscribe(
      data => {
        this.dataGeneral = data;
        console.log(data);
      },
      error => {
        console.log(error);
        
      }
    )
  }

}
