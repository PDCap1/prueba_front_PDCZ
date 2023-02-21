import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogComponent } from '../dialog/dialog.component';
import { HeroService } from '../service/hero.service';
import { Heroes } from '../service/heroes.model';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})

export class TableComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name','edit','delete'];
  dataSource = new MatTableDataSource<Heroes>;
  data: any = [];


  constructor(public dialog: MatDialog, private _snackBar: MatSnackBar, private heroService: HeroService) {}
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  ngOnInit(): void {
    let heroes = this.heroService.getHeroes();
    heroes.subscribe((res: any) => {
      this.dataSource = new MatTableDataSource<Heroes>(res.data);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  newElement() {
    const dialogRef = this.dialog.open(DialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        let data = this.dataSource.data as Heroes[];
        data.push(result);
        data.sort((a, b) => (a.id < b.id ? -1 : 1));
        this.dataSource.data = data;
      }
    });
  }

  editRowData(index: number, element: Heroes) {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: element
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        let data = this.dataSource.data as Heroes[];
        data.splice(index, 1);
        data.push(result);
        data.sort(function(a, b) {
          return a.id - b.id;
        });
        this.dataSource.data = data;
      }
    });
  }

  deleteRowData(index: number, element: Heroes) {
    const snackBarRef = this._snackBar.open('¿Seguro que desea eliminar: ' + element.name + ' ? ', 'Eliminar', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 3000,
    });
    snackBarRef.onAction().subscribe(info => {
        this.data = this.dataSource.data;
        this.data.splice(index, 1);
        this.dataSource.data = this.data;
    });
  }
}
