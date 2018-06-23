class Pages {

    // page:number;
    data:number;
    // row:number;

    constructor(data,row){
        this.data = data;
        // this.row = row;
        // this.page = this.getPage();
    }

    getPage(row):number{
        return this.data/row;
    }
    getPageNo(page,row):object {
        let firstRow:number = 1+((page-1)*row);
        let endRow:number = firstRow+row;
        return {
            firstRow:firstRow,
            endRow:endRow
        };
    }
}