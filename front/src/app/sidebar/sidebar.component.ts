import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { AuthService } from '../services/auth.service';
import { navbar } from '../constant/_nav';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  filteredMenus: any = [];
  isLoggedIn: boolean = true;
  constructor(private service: AuthService) { }

  ngOnInit(): void {

    let menu = navbar.menus
    menu.forEach((element: any) => {
      this.filteredMenus.push(element)
    })
  }

  signOut() {
    Swal.fire({
      title: 'Log Out',
      icon: 'question',
      text: 'Are you sure ?',
      // timer: 2000,
      showConfirmButton: true,
      confirmButtonText: 'Yes, Log Out',
      showCancelButton: true,
    }).then((res) => {
      if (res.isConfirmed) {
        this.service.SignOut();
        this.isLoggedIn = false
      }
    })

  }

}
