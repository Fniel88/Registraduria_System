import { Component, OnInit } from '@angular/core';
import { Candidate } from '../../../models/candidate.model';
import { CandidatesService } from '../../../services/candidates.service';
import { ReportsService } from '../../../services/reports.service';

@Component({
  selector: 'ngx-candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.scss']
})
export class CandidatesComponent implements OnInit {

  dataCandidates: Object;
  candidates: Candidate[];
  columnNames: String[] = ['Nombres', 'Apellidos', 'Votos'];

  constructor(private reportsService: ReportsService,
              private candidateservice: CandidatesService) { }

  ngOnInit(): void {
    this.getDataFull();
  }

  getCandidates(): void {
    this.candidateservice.list().subscribe(
      data => {
        this.candidates = data;
      },
      error => {
        console.log(error);
      }
      
    )
  }

  getDataFull(): void{
    this.reportsService.candidatesReport().subscribe(
      data => {
        this.dataCandidates = data;
        console.log(data);
      },
      error => {
        console.log(error);
        
      }
    )
  }

}
