import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  ChangeDetectorRef
} from '@angular/core';
import { Router } from '@angular/router';
import { Notice } from '../notice';
import { NoticeService } from '../notice.service';
<<<<<<< HEAD
import { pagination } from 'app/config/pagination';
import { Message } from 'app/config/message';
import { toLocalShort } from 'app/config/dateFormat';
=======
import { pagination } from '../../../config/pagination';
>>>>>>> master

@Component({
  selector: 'app-notice-list-modal',
  templateUrl: './notice-list-modal.component.html',
  styleUrls: ['./notice-list-modal.component.scss']
})
export class NoticeListModalComponent implements OnInit {
  isOpen = false;
  isCheckAll = false;
  advSearch = false;

  noticeList = new Array<Notice>();
  notice = new Array<Notice>();

  radioData: any;

  paginage = pagination;

  @Output() d = new EventEmitter();
  @Output() c = new EventEmitter();

  constructor(private noticeServie: NoticeService, private router: Router) {}

  ngOnInit() {
    this.onSearch({ Textsearch: '' });
  }

  onSearch(Textsearch: any) {
    this.noticeServie
      .noticegetByKeyword(Textsearch)
      .then(res => this.onSearchComplete(res));
  }

  onSearchAdv(f: any) {}

  onSearchComplete(list: Notice[]) {
    if (!list.length) {
      alert(Message.noRecord);
      return false;
    }

    this.notice = [];
    list.map((p, i) => {
      p.RowsId = i + 1;
      p.NoticeDate = toLocalShort(p.NoticeDate);
      p.NoticeStaff.map(staff => {
        staff.StaffFullName = `${staff.TitleName} ${staff.FirstName} ${
          staff.LastName
        }`;
      });
    });
    this.notice = list;

    // set total record
    this.paginage.TotalItems = this.notice.length;
  }

  checkAll() {
    this.isCheckAll = !this.isCheckAll;
  }

  toggle() {
    this.advSearch = !this.advSearch;
  }

  dismiss(e: any) {
    this.d.emit(e);
  }

  close(e: any) {
    // this.radioData
    this.c.emit(e);
  }

  async pageChanges(event: any) {
    this.noticeList = await this.notice.slice(
      event.startIndex - 1,
      event.endIndex
    );
  }

  clickView(code: string) {
    this.router.navigate([`/notice/manage/R/${code}`]);
  }
}
