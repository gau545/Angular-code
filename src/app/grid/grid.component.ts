import { Component, OnInit } from '@angular/core';
import { CrudServicesService } from '../services/crud-services.service';
import { Router } from '@angular/router';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {
  gridData: any;
  allGridData: any;
  currentData: any;

  constructor(private service: CrudServicesService, private router: Router) {}

  ngOnInit(): void {
    this.getAllData();
  }

  search(data: any) {
    let value = data.target.value.toLowerCase();
    if (value !== '') {
      this.gridData = this.allGridData.filter((x: any) => 
        x.text.toLowerCase().includes(value) || x.username.toLowerCase().includes(value)
      );
    } else {
      this.gridData = this.allGridData;
    }
  }

  getAllData() {
    this.service.getAllUsers().subscribe({
      next: (data) => {
        if (data) {
          this.gridData = data;
          this.allGridData = data;
          this.updateGridData();
        }
      },
      error: () => {},
      complete: () => {},
    });
  }

  edit(data: any) {
    // Navigate to update page
    // this.router.navigate(['/Update', data.id]);
    this.currentData = data;
  }

  deleteData(data: any) {
    this.service.deleteUser(data.id).subscribe({
      next: (data) => {},
      error: () => {},
      complete: () => {
        alert("Data Deleted");
        this.getAllData();
      },
    });
  }

  new() {
    this.router.navigate(['/Create']);
  }

  receiveData(data: any) {
    let updatedData = {
      id: data.id,
      username: data.username,
      text: data.text,
      createdDate: data.createdDate
    };
    this.service.updateUser(data.id, updatedData).subscribe({
      next: () => {},
      error: () => {},
      complete: () => {
        alert('Data updated Successfully');
        document.getElementById('close')?.click();
        this.getAllData();
      },
    });
  }

  updateGridData() {
    this.gridData = this.allGridData.slice(0, 2);
  }

  onPageChange(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    this.gridData = this.allGridData.slice(startIndex, endIndex);
  }
}
