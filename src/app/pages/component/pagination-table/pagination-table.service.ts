import { Injectable } from '@angular/core';

@Injectable()
export class PaginationTableService {

    constructor() { }

    /**
     * @param totalItems : Total items to be listed
     * @param currentPage : Current page number ( Pages starting from 1 not 0)
     * @param pageSize : The number of items in the page
     * @param totalPageLinkButtons : The number of total page link buttons
     * @returns {{
     * startPage: number,
     * endPage: number,
     * startIndex: number,
     * endIndex: number,
     * totalPageLinkButtons: number,
     * totalItems: number,
     * currentPage: number,
     * pageSize: number,
     * totalPages: number,
     * pages: (Observable<number>|any)
     * }}
     */
    getPagingServiceItems(totalItems: number, currentPage: number, pageSize: number, totalPageLinkButtons: number) {

        if (totalItems == 0) {
            return {
                startPage: 0,
                endPage: 0,
                startIndex: 0,
                endIndex: 0,
                totalPageLinkButtons: totalPageLinkButtons,
                totalItems: 0,
                currentPage: 1,
                pageSize: pageSize,
                totalPages: 0,
                pages: []
            }
        }

        /* if currentPage not exists default value will be '1' */
        currentPage = currentPage || 1;

        /* The default value of the number of items in the page is 5 if not exist */
        pageSize = pageSize || 5;

        /* The default value of the number of total page link buttons is 5 if not exist */
        // totalPageLinkButtons = totalPageLinkButtons || 5;

        /* calculate total pages  */
        const totalPages = Math.ceil(totalItems / pageSize);

        let startPage: number = 1; // start Page Button number
        let endPage: number = totalPages;   // end Page Button number

        // calculate start and end item indexes
        // Indexes are started from 0 ! It is important
        const startIndex = ((currentPage - 1) * pageSize) + 1;
        const endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

        let pages = [];
        // create an array of pages to ng-repeat in the pager control
        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }

        // return object with all paging properties required by the view
        return {
            startPage: startPage,
            endPage: endPage,
            startIndex: startIndex,
            endIndex: endIndex,
            totalPageLinkButtons: totalPageLinkButtons,
            totalItems: totalItems,
            currentPage: currentPage,
            pageSize: pageSize,
            totalPages: totalPages,
            pages: pages
        };
    }
}
