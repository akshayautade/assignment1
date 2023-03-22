import { SimpleChanges } from '@angular/core';
import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';

@Component({
  selector: 'pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit, OnChanges {
  @Input('pageCount') pageCount: number| any;
  @Input('currentPage') currentPage: number | any;
  @Output('pageSelected') pageSelected: EventEmitter<any> = new EventEmitter;

  constructor() {
    if (!this.currentPage) {
      this.currentPage = 1;
    }
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['pageCount']) {
      this.pageCount = changes['pageCount'].currentValue;
    }
  }

  showNext() {
    if (this.pageCount > this.currentPage) {
      this.currentPage++;
      this.pageSelected.emit(this.currentPage);
    }
  }

  showPrev() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.pageSelected.emit(this.currentPage);
    }
  }

  showFirst() {
    this.currentPage = 1;
    this.pageSelected.emit(this.currentPage);
  }

  showLast() {
    this.currentPage = this.pageCount;
    this.pageSelected.emit(this.currentPage);
  }

  nextTen() {
    if (this.currentPage + 10 < this.pageCount) {
      this.currentPage = this.currentPage + 10;
    }
    else {
      this.currentPage = this.pageCount;
    }
    this.pageSelected.emit(this.currentPage);
  }

  prevTen() {
    if (this.currentPage - 10 > 0) {
      this.currentPage = this.currentPage - 10;
    }
    else {
      this.currentPage = 1;
    }
    this.pageSelected.emit(this.currentPage);
  }

  getSelectedPage(page:number) {
    this.currentPage = page;
    this.pageSelected.emit(this.currentPage);
  }

  createPageRange() {
    let pages = [];
    let start = 1;
    let end = 9 < this.pageCount ? 9 : this.pageCount;
    if (this.currentPage) {
      let currentPage = this.currentPage;
      currentPage = currentPage - 4;
      if (currentPage > 1) {
        start = currentPage;
        end = start + 9;
        if (end < this.pageCount) {
          for (let i = start; i < end; i++)
            pages.push(i);
          return pages;
        }
        else {
          end = this.pageCount;
          start = this.pageCount - 8 >= 1 ? this.pageCount - 8 : 1;
        }
      }
    }
    for (let i = start; i <= end; i++)
      pages.push(i);
    return pages;
  }
}
