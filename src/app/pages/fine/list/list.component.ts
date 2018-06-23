import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  // pages: number;
  // row: number;
  // numPage: number = 2;

  response: object;

  constructor(private router: Router) {
    this.response = [{ "no": 1, "work_no": "TN90806026000002", "case_no": "001/2561" , "checklist": "001/2561", "compare_no": "001/2561", "lawyer": "นายธวัชชัย บิง ", "compare_day": "10-ม.ค.-2560 ", "department": "สสท.ระนอง สาขาเมือง" },
    { "no": 2, "work_no": "TN90806026000002", "case_no": "001/2561" , "checklist": "001/2561", "compare_no": "001/2561", "lawyer": "นายธวัชชัย บิง ", "compare_day": "10-ม.ค.-2560 ", "department": "สสท.ระนอง สาขาเมือง" },
    { "no": 3, "work_no": "TN90806026000002", "case_no": "001/2561" , "checklist": "001/2561", "compare_no": "001/2561", "lawyer": "นายธวัชชัย บิง ", "compare_day": "10-ม.ค.-2560 ", "department": "สสท.ระนอง สาขาเมือง" },
    { "no": 4, "work_no": "TN90806026000002", "case_no": "001/2561" , "checklist": "001/2561", "compare_no": "001/2561", "lawyer": "นายธวัชชัย บิง ", "compare_day": "10-ม.ค.-2560 ", "department": "สสท.ระนอง สาขาเมือง" },
    { "no": 5, "work_no": "TN90806026000002", "case_no": "001/2561" , "checklist": "001/2561", "compare_no": "001/2561", "lawyer": "นายธวัชชัย บิง ", "compare_day": "10-ม.ค.-2560 ", "department": "สสท.ระนอง สาขาเมือง" },
    { "no": 6, "work_no": "TN90806026000002", "case_no": "001/2561" , "checklist": "001/2561", "compare_no": "001/2561", "lawyer": "นายธวัชชัย บิง ", "compare_day": "10-ม.ค.-2560 ", "department": "สสท.ระนอง สาขาเมือง" },
    { "no": 7, "work_no": "TN90806026000002", "case_no": "001/2561" , "checklist": "001/2561", "compare_no": "001/2561", "lawyer": "นายธวัชชัย บิง ", "compare_day": "10-ม.ค.-2560 ", "department": "สสท.ระนอง สาขาเมือง" }];
  }

  

  ngOnInit() {
  }

  viewData(arrestCode:string){
    
    this.router.navigate(['/fine/manage', 'R'], { queryParams: {  arrestCode: arrestCode} });
  }

}
