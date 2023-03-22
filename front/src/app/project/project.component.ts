import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { AuthService } from '../services/auth.service';
import { ProjectService } from '../services/project.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  term: string | any;
  sortBy: string | any;
  page: number = 1;  //pagination //Current Page
  DataCount = 7;  //pagination
  projects: Array<any> = [];
  totalRecords: number = 0;
  constructor(private service: ProjectService, private authService: AuthService) { }

  ngOnInit(): void {
    this.getAllProjects();
  }

  signOut() {
    this.authService.SignOut();
  }

  sortByFn(event: any) {
    this.sortBy = event.target.value;
    this.getAllProjects()
  }

  changePage(page: number) {
    this.page = page;
    this.getAllProjects()
  }
  getAllProjects() {
    let params: any = {};
    params['page'] = this.page;
    if (this.sortBy)
      params['sortBy'] = this.sortBy;
    this.service.getProject(params).subscribe(res => {
      if (res) {
        this.totalRecords = res.totalRecords
        this.projects = res.project;
      }
    }, err => {
      if (err.status == 401)
        Swal.fire({
          icon: 'error',
          title: 'Unauthorized',
          text: 'Please login to access this page',
        })
      else
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: "Something went wrong",
        })
    })
  }

  delete(id: string) {
    Swal.fire({
      title: 'Are you sure?',
      text: "Delete User?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.service.deleteProject(id).subscribe(res => {
          if (res) {
            Swal.fire({
              icon: 'success',
              title: 'Success',
              text: 'Project Deleted Successfully...!',
            })
            this.getAllProjects()
          }
        })
      }
    })
  }


  onStatusChange(id:string,status:string){
    let obj={projectStatus:status}
    this.service.updateProject(id, obj).subscribe(res => {
      if (res.acknowledged)
        this.getAllProjects()
    })
  }

}
