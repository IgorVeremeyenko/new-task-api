import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Assigned } from 'src/app/interfaces/assigned';
import { Custom } from 'src/app/interfaces/custom';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements AfterViewInit, OnInit {

  displayedColumns: string[] = ['wo id', 'description', 'received date', 'assigned to', 'status', 'priority'];
  displayedColumnsAssigned: string[] = ['person name', 'status']; //for child table
  dataSource!: MatTableDataSource<Custom>;
  datasourceForAssigned!: MatTableDataSource<Assigned>; //for child table
  data: Custom[] = [];
  dataForAssigned: Assigned[] = []; //for child table

  isLoadingResults: boolean = true;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dataService: DataService, private _snackBar: MatSnackBar) {

  }
  ngOnInit(): void {
    this.dataService.getData().subscribe(res => {
      res.response.data.map(items => {
        this.data.push(items);
        this.dataSource = new MatTableDataSource(this.data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.openSnackBar('Data loaded!', 'Ok')
        items.assigned_to.forEach((element) => {
          this.data.map(() => {
            this.dataForAssigned.push(element);
            this.datasourceForAssigned = new MatTableDataSource(this.dataForAssigned);
          })
        })
      }
      );

    }, error => this.openSnackBar(error, 'Close'))

  }

  ngAfterViewInit() {
    
  }

  applyFilter(event: Event) {
    let filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

}
