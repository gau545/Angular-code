import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { CrudServicesService } from '../services/crud-services.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  @Input() currentData: any;
  @Output() messageEvent = new EventEmitter<Object>();
  service = inject(CrudServicesService);
  userData: any;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {  
    this.getUserById();
  } 

  getUserById() {
    this.service.getUserById(this.currentData.id).subscribe({
      next: (data) => {
        if (data) {
          this.userData = data;
        }
      },
      error: () => {},
      complete: () => {},
    });
  }

  save() {
    const updatedData = {
      username: this.userData.username,
      text: this.userData.text,
      id: this.currentData.id
    };
    this.messageEvent.emit(updatedData);
  }
}
