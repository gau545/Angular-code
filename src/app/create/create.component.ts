import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CrudServicesService } from '../services/crud-services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  createForm!: FormGroup;
  isSubmitted = false;

  constructor(
    private fb: FormBuilder,
    private service: CrudServicesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createForm = this.fb.group({
      UserName: ['', Validators.required],
      Text: ['', Validators.required],
      CreatedDate: ['', Validators.required]
    });
  }

 
  onSubmit() {
    this.isSubmitted = true;
    if (this.createForm.valid) {
      const { UserName, Text, CreatedDate } = this.createForm.value;
      const createdDate = new Date(CreatedDate).toISOString();
      const data = { username: UserName, text: Text, createdDate: createdDate };

      this.service.CreateNewUser(data).subscribe({
        next: (data) => {},
        error: (err) => {alert(err)},
        complete: () => {
          alert('Data Added Successfully');
          this.createForm.reset();
          this.isSubmitted = false;
          this.router.navigate(['/Home']);
        }
      });
    }
  }

  GoBack() {
    this.router.navigate(['/Home']);
  }
}
