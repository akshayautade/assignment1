import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CharactersOnlyValidator, MobileNumberValidator } from '../../Helper/customValidators';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {
  id: any;
  project: any;
  myReactiveForm: FormGroup | any;
  constructor(private route: ActivatedRoute, private service: ProjectService, private router: Router) { }

  ngOnInit(): void {
    this.myReactiveForm = new FormGroup({
      'projectName': new FormControl(null, [Validators.required, CharactersOnlyValidator]),
      'reason': new FormControl(null, [Validators.required]),
      'type': new FormControl(null, [Validators.required]),
      'division': new FormControl(null, [Validators.required]),
      'catagory': new FormControl(null, [Validators.required]),
      'priority': new FormControl(null, [Validators.required]),
      'dept': new FormControl(null, [Validators.required]),
      'startDate': new FormControl(null, [Validators.required]),
      'endDate': new FormControl(null, [Validators.required]),
      'location': new FormControl(null, [Validators.required]),
      'status': new FormControl('Registered', [Validators.required]),
    })

    this.route.params.subscribe(params => {
      if (typeof params['id'] !== 'undefined') {
        this.id = params['id'];
        this.service.getSingleProject(this.id).subscribe(project => {
          this.project = project;
          this.myReactiveForm.patchValue(project)
        })
      } else {
        this.id = '';
      }
    })
  }

  onSubmit() {
    this.myReactiveForm.markAllAsTouched();
    console.log(this.myReactiveForm);
    if (this.myReactiveForm.valid)
      if (this.id != '') {
        this.service.updateProject(this.id, this.myReactiveForm.value).subscribe(res => {
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Updated Successfully...!',
            timer: 2000
          })
          this.router.navigate(['/project']);
        }, err => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: err,
            timer: 2000
          })
        })
      }
      else {
        this.service.createProject(this.myReactiveForm.value).subscribe(res => {
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Project Created Successfully...!',
            timer: 2000
          })
          this.router.navigate(['/project']);
        }, err => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: err,
            timer: 2000
          })
        })
      }
  }
}

