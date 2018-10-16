import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import 'rxjs/add/operator/takeUntil';
import { NavigationService } from 'app/shared/header-navigation/navigation.service';
import { MainMasterService } from 'app/services/main-master.service';
import { MasDutyProductUnitModel } from 'app/models/mas-duty-product-unit.model';

@Component({
  selector: 'app-allegation',
  templateUrl: './allegation.component.html',
  styleUrls: ['./allegation.component.scss']
})
export class AllegationComponent implements OnInit, OnDestroy {
  constructor(
    private modelService: NgbModal,
    private activeRoute: ActivatedRoute,
    private navService: NavigationService,
    private router: Router
  ) {
    this.navService.setPrintButton(false);
    this.navService.setPrevPageButton(true);
    this.navService.setNextPageButton(true);

    this.navService.setInnerTextPrevPageButton('งานจับกุม')
    this.navService.setInnerTextNextPageButton('รับคำกล่าวโทษ')
  }
  private destroy$: Subject<boolean> = new Subject<boolean>();
  // sub: Subscription;
  // onSaveSub: Subscription;
  // onDeleSub: Subscription;
  // onEditSub: Subscription;

  card1: boolean = true;
  card2: boolean = true;

  mode: string;
  modal: any;
  showEditField: boolean;

  async ngOnInit() {


    this.navService.showFieldEdit.subscribe(p => this.showEditField = p.valueOf())
    this.activeRoute.params.takeUntil(this.destroy$).subscribe(p => {
      this.mode = p['mode']
      if (p['mode'] == 'C') {
        // set false
        this.navService.setEditButton(false);
        this.navService.setDeleteButton(false);
        this.navService.setEditField(false);
        // set true
        this.navService.setSaveButton(true);
        this.navService.setCancelButton(true);

      } else if (p['mode'] === 'R') {
        // set false
        this.navService.setSaveButton(false);
        this.navService.setCancelButton(false);
        // set true
        this.navService.setEditButton(true);
        this.navService.setDeleteButton(true);
        this.navService.setEditField(true);
      }
    })
    this.navService.onSave.takeUntil(this.destroy$).subscribe(status => {
      if (status) {
        this.navService.setOnSave(false);
      }
    });
    this.navService.onEdit.takeUntil(this.destroy$).subscribe(status => {
      if (status) {
        this.navService.setOnEdit(false);
      }
    })
    this.navService.onDelete.takeUntil(this.destroy$).subscribe(status => {
      if (status) {
        this.navService.setOnDelete(false);
      }
    })
    this.navService.onNextPage.takeUntil(this.destroy$).subscribe(async status => {
      if (status) {
        await this.navService.setOnNextPage(false);
        this.router.navigate(['/lawsuit/manage', 'C']);
      }
    })
    this.navService.onNextPage.takeUntil(this.destroy$).subscribe(async status => {
      if (status) {
        await this.navService.setOnPrevPage(false);
        this.router.navigate(['/arrest/manage', 'C', 'NEW']);
      }
    })
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
    // this.sub.unsubscribe();
    // this.onSaveSub.unsubscribe();
    // this.onEditSub.unsubscribe();
    // this.onDeleSub.unsubscribe();
  }

  openModal(e) {
    this.modal = this.modelService.open(e, { size: 'lg', centered: true });
  }



}
