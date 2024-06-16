import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { CrudServicesService } from '../services/crud-services.service';
import { Router } from '@angular/router';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { compileDeclareInjectableFromMetadata } from '@angular/compiler';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit{

  gridData:any;
  allGridData:any;
  service = inject(CrudServicesService);
  CurrentData:any;

  constructor(private router: Router){}

  ngOnInit() {  
    this.GetAllData();
  } 

  Search(data:any){
    let value = data.target.value;
    if(value != ''){
      let gridValues = [...this.gridData]
      this.gridData = gridValues.filter((x:any) =>  x.text.toLowerCase().includes(value) || x.username.toLowerCase().includes(value));
    }
    else{
      this.gridData = this.allGridData;
    }
  }


  GetAllData(){
    this.service.getAllData().subscribe({
      next:(data)=>{
        if(data){
          this.gridData = data;
          this.allGridData = data;
          this.updateGridData();
        }
      },
      error:()=>{},
      complete:()=>{},
    })
  }


  Edit(data:any){
    // this.router.navigate(['/Update', data.id]); 
    this.CurrentData = data;
  }

  deleteData(data:any){
    this.service.DeleteById(data.id).subscribe({
      next:(data)=>{ },
      error:()=>{},
      complete:()=>{alert("Data Deleted");this.GetAllData();},
    })
  }

  New(){
    this.router.navigate(['/Create']); 
  }

  receiveData(data:any){
    let updatedData = {username: data.username, text: data.text};
    this.service.updateData(data.id, updatedData).subscribe({
      next:(data)=>{},
      error:()=>{},
      complete:()=>{ 
        alert('Data updated Successfully'); 
        document.getElementById('close')?.click();
        this.GetAllData();
      },
    })
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
