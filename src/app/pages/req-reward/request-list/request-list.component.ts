import { Component, OnInit } from '@angular/core';
import { ColumnsInterface } from '../req-reward-shared/interfaces/columns-interface';
import { RequestListConfig } from './request-list.config';
import { NavigationService } from 'app/shared/header-navigation/navigation.service';

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.scss']
})
export class RequestListComponent extends RequestListConfig implements OnInit {
  dataTest = [
    {
      ArrestCode: 0,
      IndictmentID: '5bdcd9f1f11fd65942217c47',
      LawsuitID: 0,
      LawsuitNo: 'male',
      OccurrenceDate: 1456688651833,
      LawsuitDate: 1471174872185,
      TitleName: '9f252d56-d490-4469-b256-1ff1bf168efc',
      FirstName: 'Shepard',
      LastName: 'Trevino',
      OfficeName: 'shepardtrevino@strezzo.com'
    },
    {
      ArrestCode: 1,
      IndictmentID: '5bdcd9f11c78aaf807c9ee79',
      LawsuitID: 1,
      LawsuitNo: 'male',
      OccurrenceDate: 1438055517779,
      LawsuitDate: 1498667456757,
      TitleName: '65fe6eaf-0c46-4a35-8586-f00c9013a3f2',
      FirstName: 'Curry',
      LastName: 'Thornton',
      OfficeName: 'currythornton@strezzo.com'
    },
    {
      ArrestCode: 2,
      IndictmentID: '5bdcd9f1a0c961ef21f0d438',
      LawsuitID: 2,
      LawsuitNo: 'male',
      OccurrenceDate: 1424917249658,
      LawsuitDate: 1515922472064,
      TitleName: 'ec66b6ad-1df2-45b0-ad19-fb9a94f95b80',
      FirstName: 'Mayer',
      LastName: 'Rivas',
      OfficeName: 'mayerrivas@strezzo.com'
    },
    {
      ArrestCode: 3,
      IndictmentID: '5bdcd9f153a758790ccbfd12',
      LawsuitID: 3,
      LawsuitNo: 'male',
      OccurrenceDate: 1464672593078,
      LawsuitDate: 1469286781841,
      TitleName: '13b09c9f-d15a-4a6e-b7c6-1aca9732052c',
      FirstName: 'Teri',
      LastName: 'Horne',
      OfficeName: 'terihorne@strezzo.com'
    },
    {
      ArrestCode: 4,
      IndictmentID: '5bdcd9f1973a1810f476de4d',
      LawsuitID: 4,
      LawsuitNo: 'female',
      OccurrenceDate: 1428633442668,
      LawsuitDate: 1459144293964,
      TitleName: '8fe37dea-19af-41fb-aacc-f2b37a2ff3c6',
      FirstName: 'Le',
      LastName: 'Fox',
      OfficeName: 'lefox@strezzo.com'
    },
    {
      ArrestCode: 5,
      IndictmentID: '5bdcd9f1e162c967c9225b99',
      LawsuitID: 5,
      LawsuitNo: 'male',
      OccurrenceDate: 1427833405144,
      LawsuitDate: 1427330429272,
      TitleName: '0a0ff2a2-054d-44f9-a199-4c790df3b49e',
      FirstName: 'Louise',
      LastName: 'Hardy',
      OfficeName: 'louisehardy@strezzo.com'
    },
    {
      ArrestCode: 6,
      IndictmentID: '5bdcd9f1d02052b30abfadbc',
      LawsuitID: 6,
      LawsuitNo: 'female',
      OccurrenceDate: 1443814561255,
      LawsuitDate: 1520606275118,
      TitleName: '3e0ae0b9-bb39-498f-837f-b844138c23c1',
      FirstName: 'Craig',
      LastName: 'Casey',
      OfficeName: 'craigcasey@strezzo.com'
    },
    {
      ArrestCode: 7,
      IndictmentID: '5bdcd9f12c6d2aa5cbb3c4dd',
      LawsuitID: 7,
      LawsuitNo: 'male',
      OccurrenceDate: 1481461160010,
      LawsuitDate: 1483564056406,
      TitleName: '00dad073-386b-406a-a57a-c46b7611ecee',
      FirstName: 'Johns',
      LastName: 'Lowe',
      OfficeName: 'johnslowe@strezzo.com'
    },
    {
      ArrestCode: 8,
      IndictmentID: '5bdcd9f145ef879f8c0e0663',
      LawsuitID: 8,
      LawsuitNo: 'male',
      OccurrenceDate: 1508419762912,
      LawsuitDate: 1467201334339,
      TitleName: 'cc9df4b4-0f73-4632-9187-4fb0c0acc6f0',
      FirstName: 'Mcfadden',
      LastName: 'Blackwell',
      OfficeName: 'mcfaddenblackwell@strezzo.com'
    }
  ];
  constructor(private navService: NavigationService) {
    super();
    this.navService.showAdvSearch.subscribe((isAdv: boolean) => {
      this.isShowAdvSearch = isAdv;
    })
  }

  ngOnInit() {
    this.setShowButton();
  }
  private setShowButton() {
    this.navService.setEditButton(false);
    this.navService.setDeleteButton(false);
    this.navService.setPrintButton(false);
    this.navService.setSaveButton(false);
    this.navService.setCancelButton(false);
    this.navService.setNextPageButton(false);
    this.navService.setNewButton(false);
    this.navService.setSearchBar(true);
  }
  public submit($event) {
    console.log('form', $event);
  }
}
