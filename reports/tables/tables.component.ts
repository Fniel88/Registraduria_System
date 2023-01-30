import { Component, OnInit } from '@angular/core';
import { Table } from '../../../models/table.model';
import { ReportsService } from '../../../services/reports.service';
import { TablesService } from '../../../services/tables.service';

@Component({
  selector: 'ngx-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss'],
})
export class TablesComponent implements OnInit {

  dataTables: Object;
  tables: Table[];
  columnNames: String[] = ['Numero Mesa', 'Votos'];

  constructor(private reportsService: ReportsService,
              private tableservice: TablesService) { }

  ngOnInit(): void {
    this.getDataFull();
  }

  getTables(): void {
    this.tableservice.list().subscribe(
      data => {
        this.tables = data;
      },
      error => {
        console.log(error);
      }
      
    )
  }

  getDataFull(): void{
    this.reportsService.tablesReport().subscribe(
      data => {
        this.dataTables = data;
        console.log(data);
      },
      error => {
        console.log(error);
        
      }
    )
  }
}
