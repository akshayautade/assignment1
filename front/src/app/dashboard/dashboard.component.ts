import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../services/project.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  Registered: number = 0;
  Closed: number = 0;
  Running: number = 0;
  Cancelled: number = 0;
  closureDelay: number = 0;
  deptWiseDataCount: any;

  type = 'bar';
  options = {
    responsive: true,
    maintainAspectRatio: true,
    scales: {
      yAxes: [{
        ticks: {
          // max: 100,
          min: 0
        }
      }]
    }
  };
  data: any;
  barchart: any;

  constructor(private service: ProjectService) { }

  ngOnInit(): void {
    this.getProjectCount();
    this.closureDelayCount();
    this.deptWiseCount();
  }

  getProjectCount() {
    this.service.getProjectCount().subscribe(res => {
      res.forEach((resp: any) => {
        if (resp._id == "Registered")
          this.Registered = resp.count;
        if (resp._id == "Closed")
          this.Closed = resp.count;
        if (resp._id == "Running")
          this.Running = resp.count;
        if (resp._id == "Cancelled")
          this.Cancelled = resp.count;
      })
    })
  }

  closureDelayCount() {
    this.service.closureDelayCount().subscribe((res: any) => {
      this.closureDelay = res.count;
    })
  }
  deptWiseCount() {
    let arr;
    this.service.deptWiseCount().subscribe((res: any) => {
      // this.deptWiseDataCount = res
      let deptName: any = [];
      let registered: any = [];
      let closed: any = [];
      res.map((r: any) => {
        deptName.push(r.deptName)
        registered.push(r.registered)
        closed.push(r.closed)
      })
      arr = [deptName, [registered, closed]];

      // this.barchart =  [["Jan","feb","Mar"],[["50","20","30"],["70","80","90"]]]  // data;
      this.barchart = arr


      this.data = {
        labels: this.barchart[0], //months
        datasets: [{
          label: "Total project registered",
          data: this.barchart[1][0],
          backgroundColor: "#2462ad",
        },
        {
          label: "Total projects closed ",
          data: this.barchart[1][1],
          backgroundColor: "#85c038",
        }]
      };
    })
  }

}
