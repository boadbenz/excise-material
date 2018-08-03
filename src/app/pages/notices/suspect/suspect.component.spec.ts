import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { SuspectComponent } from './suspect.component';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '../../../../../node_modules/@angular/http';
import { HttpClientModule } from '../../../../../node_modules/@angular/common/http';
import { NgbModule } from '../../../../../node_modules/@ng-bootstrap/ng-bootstrap';
import { CardActionsModule } from '../../component/card-actions/card-actions.module';
import { RouterModule, Routes, Router } from '@angular/router';
import { ArrestsService } from '../../arrests/arrests.service';

describe('SuspectComponent', () => {
    let component: SuspectComponent;
    let fixture: ComponentFixture<SuspectComponent>;


    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SuspectComponent],
            imports:[
                FormsModule,
                ReactiveFormsModule,
                CardActionsModule,
                NgbModule.forRoot(),
                RouterTestingModule
            ],
            providers: [
                ArrestsService
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SuspectComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    // it('should create', () => {
    //   expect(component).toBeTruthy();
    // });

    it('ตัวแปร Form ต้องมีค่า Default', () => {
        const mockForm: FormGroup = new FormGroup({
            SuspectID: new FormControl(null),
            EntityType: new FormControl(null),
            CompanyTitleCode: new FormControl(null),
            CompanyTitle: new FormControl(null),
            CompanyName: new FormControl(null),
            CompanyOtherName: new FormControl(null),
            CompanyRegistrationNo: new FormControl(null),
            CompanyLicenseNo: new FormControl(null),
            FoundedDate: new FormControl(null),
            LicenseDateForm: new FormControl(null),
            LicenseDateTo: new FormControl(null),
            TaxID: new FormControl(null),
            ExciseRegNo: new FormControl(null),
            SuspectType: new FormControl(null),
            SuspectTitleCode: new FormControl(null),
            SuspectTitleName: new FormControl(null),
            SuspectFirstName: new FormControl(null),
            SuspectMiddleName: new FormControl(null),
            SuspectLastName: new FormControl(null),
            SuspectOtherName: new FormControl(null),
            SuspectDesc: new FormControl(null),
            IDCard: new FormControl(null),
            PassportNo: new FormControl(null),
            VISAType: new FormControl(null),
            PassportCountryCode: new FormControl(null),
            PassportCountryName: new FormControl(null),
            PassportDateIn: new FormControl(null),
            PassportDateOut: new FormControl(null),
            BirthDate: new FormControl(null),
            GenderType: new FormControl(null, Validators.required),
            BloodType: new FormControl(null, Validators.required),
            NationalityCode: new FormControl(null, Validators.required),
            NationalityNameTH: new FormControl(null, Validators.required),
            RaceCode: new FormControl(null, Validators.required),
            RaceName: new FormControl(null, Validators.required),
            ReligionCode: new FormControl(null, Validators.required),
            ReligionName: new FormControl(null, Validators.required),
            MaritalStatus: new FormControl(null),
            Career: new FormControl(null),
            GPS: new FormControl(null),
            Location: new FormControl(null),
            Address: new FormControl(null, Validators.required),
            Village: new FormControl(null, Validators.required),
            Building: new FormControl(null),
            Floor: new FormControl(null),
            Room: new FormControl(null),
            Alley: new FormControl(null),
            Road: new FormControl(null, Validators.required),
            SubDistrictCode: new FormControl(null, Validators.required),
            SubDistrict: new FormControl(null, Validators.required),
            DistrictCode: new FormControl(null, Validators.required),
            District: new FormControl(null, Validators.required),
            ProvinceCode: new FormControl(null, Validators.required),
            Province: new FormControl(null, Validators.required),
            ZipCode: new FormControl(null, Validators.required),
            TelephoneNo: new FormControl(null),
            Email: new FormControl(null),
            FatherName: new FormControl(null),
            MotherName: new FormControl(null),
            Remarks: new FormControl(null),
            LinkPhoto: new FormControl(null),
            PhotoDesc: new FormControl(null),
            IsActive: new FormControl(null),
        });
        expect(component.SuspectFG.value).toEqual(mockForm.value);
    });
});
