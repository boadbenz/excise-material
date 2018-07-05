import { Component, OnInit, ElementRef, Input, EventEmitter, Output } from '@angular/core';
import { PaginationTableService } from './pagination-table.service';

@Component({
    selector: 'app-pagination-table',
    templateUrl: './pagination-table.component.html',
    styleUrls: ['./pagination-table.component.scss']
})
export class PaginationTableComponent implements OnInit {

    @Input() TotalItems: number;
    @Input() CurrentPage: number;
    @Input() PageSize: number;
    @Input() TotalPageLinkButtons: number;
    @Input() RowsPerPageOptions: any[];

    @Output() onPageChange = new EventEmitter();

    paginate: any;

    constructor(private paginateService: PaginationTableService) {


    }

    ngOnInit() {
        console.log(this.TotalItems);
        this.changePage();
    }

    previousPage() {
        if (this.CurrentPage > this.paginate.startPage) {
            this.CurrentPage = this.CurrentPage - 1;
            this.changePage();
        }
    }

    nextPage() {
        if (this.CurrentPage < this.paginate.endPage) {
            this.CurrentPage = this.CurrentPage + 1;
            this.changePage();
        }
    }

    changePage() {
        this.paginate = this.paginateService
        .getPagingServiceItems(this.TotalItems, this.CurrentPage, this.PageSize, this.TotalPageLinkButtons);    
        this.onPageChange.emit(this.paginate);
    }
}
