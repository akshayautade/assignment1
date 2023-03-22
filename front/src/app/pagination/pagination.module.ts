import { PaginationComponent } from './../pagination/pagination.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
    ],
    declarations: [PaginationComponent],
    exports: [PaginationComponent],
    providers: []
})
export class PaginationModule {

}
