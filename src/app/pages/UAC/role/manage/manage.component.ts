import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NavigationService } from 'app/shared/header-navigation/navigation.service';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { PreloaderService } from '../../../../shared/preloader/preloader.component';
import swal from 'sweetalert2'
import { SidebarService } from '../../../../shared/sidebar/sidebar.component';
import { ManageService } from './manage.service';
import * as uacdatamodel from '../../uac-user-datamodel';

@Component({
  selector: 'app-user-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class RoleManageComponent implements OnInit {

  form: FormGroup;
  private roleID: number;
  roleCode: string;
  roleName: string;
  showEditField: any;
  private roleinsAllRequest: uacdatamodel.RoleinsAllRequest;
  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private navService: NavigationService,
    private router: Router,
    private sidebarService: SidebarService,
    private manageService: ManageService) {

    // set button false
    this.navService.setEditButton(false);
    this.navService.setDeleteButton(false);
    this.navService.setPrintButton(false);
    this.navService.setSaveButton(false);
    this.navService.setCancelButton(false);
    this.navService.setNextPageButton(false);
    this.navService.setSearchBar(false);
    // set button true
    this.navService.setSaveButton(true);
    this.navService.setCancelButton(true);
  }
  public programList: Array<any> = new Array<any>();
  private programListTemplate: Array<any> = [
    { "programType": "Entry", "programCode": "ILG60-01-00", "programName": "งานสืบสวน", "isCreate": false, "isRead": false, "isUpdate": false, "isDelete": false },
    { "programType": "Entry", "programCode": "ILG60-02-00", "programName": "ใบแจ้งความนำจับ", "isCreate": false, "isRead": false, "isUpdate": false, "isDelete": false },
    { "programType": "Entry", "programCode": "ILG60-03-00", "programName": "งานจับกุม", "isCreate": false, "isRead": false, "isUpdate": false, "isDelete": false },
    { "programType": "Entry", "programCode": "ILG60-04-00", "programName": "บันทึกรับคำกล่าวโทษ", "isCreate": false, "isRead": false, "isUpdate": false, "isDelete": false },
    { "programType": "Entry", "programCode": "ILG60-05-00", "programName": "งานตรวจรับและพิสูจน์ของกลาง", "isCreate": false, "isRead": false, "isUpdate": false, "isDelete": false },
    { "programType": "Entry", "programCode": "ILG60-06-00", "programName": "งานเปรียบเทียบและชำระค่าปรับ", "isCreate": false, "isRead": false, "isUpdate": false, "isDelete": false },
    { "programType": "Entry", "programCode": "ILG60-07-00", "programName": "งานนำส่งรายได้", "isCreate": false, "isRead": false, "isUpdate": false, "isDelete": false },
    { "programType": "Entry", "programCode": "ILG60-08-01", "programName": "คำร้องขอรับเงินสินบน", "isCreate": false, "isRead": false, "isUpdate": false, "isDelete": false },
    { "programType": "Entry", "programCode": "ILG60-08-02", "programName": "คำร้องขอรับเงินรางวัล", "isCreate": false, "isRead": false, "isUpdate": false, "isDelete": false },
    { "programType": "Entry", "programCode": "ILG60-09-00", "programName": "งานปรับเพิ่ม-ลดค่าปรับ", "isCreate": false, "isRead": false, "isUpdate": false, "isDelete": false },
    { "programType": "Entry", "programCode": "ILG60-10-00", "programName": "งานตรวจรับของกลางเพื่อเก็บรักษา", "isCreate": false, "isRead": false, "isUpdate": false, "isDelete": false },
    { "programType": "Entry", "programCode": "ILG60-11-00", "programName": "งานคืนของกลาง", "isCreate": false, "isRead": false, "isUpdate": false, "isDelete": false },
    { "programType": "Entry", "programCode": "ILG60-12-00", "programName": "งานจัดเก็บของกลางเข้าพิพิธภัณฑ์", "isCreate": false, "isRead": false, "isUpdate": false, "isDelete": false },
    { "programType": "Entry", "programCode": "ILG60-13-00", "programName": "งานขายทอดตลาด", "isCreate": false, "isRead": false, "isUpdate": false, "isDelete": false },
    { "programType": "Entry", "programCode": "ILG60-14-00", "programName": "งานทำลายของกลาง", "isCreate": false, "isRead": false, "isUpdate": false, "isDelete": false },
    { "programType": "Entry", "programCode": "ILG60-15-00", "programName": "งานนำของกลางออกจากคลัง", "isCreate": false, "isRead": false, "isUpdate": false, "isDelete": false },
    { "programType": "Entry", "programCode": "ILG60-16-00", "programName": "งานโอนย้ายของกลาง", "isCreate": false, "isRead": false, "isUpdate": false, "isDelete": false },
    { "programType": "Entry", "programCode": "ILG60-17-00", "programName": "งานทะเบียนบัญชีสินค้าและของกลาง", "isCreate": false, "isRead": false, "isUpdate": false, "isDelete": false },
    { "programType": "Entry", "programCode": "ILG60-18-00", "programName": "หมายค้น", "isCreate": false, "isRead": false, "isUpdate": false, "isDelete": false },
    { "programType": "Entry", "programCode": "ILG60-19-00", "programName": "ใบรับรองความบริสุทธิ์", "isCreate": false, "isRead": false, "isUpdate": false, "isDelete": false },
    { "programType": "Master", "programCode": "ILG60-99-01", "programName": "ข้อมูลผู้ต้องสงสัย", "isCreate": false, "isRead": false, "isUpdate": false, "isDelete": false },
    { "programType": "Master", "programCode": "ILG60-99-02", "programName": "ข้อมูลผู้ต้องหา", "isCreate": false, "isRead": false, "isUpdate": false, "isDelete": false },
    { "programType": "Master", "programCode": "ILG60-99-03", "programName": "ข้อมูลเชื้อชาติ", "isCreate": false, "isRead": false, "isUpdate": false, "isDelete": false },
    { "programType": "Master", "programCode": "ILG60-99-04", "programName": "ข้อมูลสัญชาติ", "isCreate": false, "isRead": false, "isUpdate": false, "isDelete": false },
    { "programType": "Master", "programCode": "ILG60-99-05", "programName": "ข้อมูลศาสนา", "isCreate": false, "isRead": false, "isUpdate": false, "isDelete": false },
    { "programType": "Master", "programCode": "ILG60-99-06", "programName": "ข้อมูลประเทศ", "isCreate": false, "isRead": false, "isUpdate": false, "isDelete": false },
    { "programType": "Master", "programCode": "ILG60-99-07", "programName": "ข้อมูลคำนำหน้าชื่อ", "isCreate": false, "isRead": false, "isUpdate": false, "isDelete": false },
    { "programType": "Master", "programCode": "ILG60-99-08", "programName": "ข้อมูลศาล", "isCreate": false, "isRead": false, "isUpdate": false, "isDelete": false },
    { "programType": "Master", "programCode": "ILG60-99-09", "programName": "ข้อมูลสัดส่วนเงินสินบน รางวัล และส่งคลัง", "isCreate": false, "isRead": false, "isUpdate": false, "isDelete": false },
    { "programType": "Master", "programCode": "ILG60-99-10", "programName": "ข้อมูลสัดส่วนเงินรางวัล", "isCreate": false, "isRead": false, "isUpdate": false, "isDelete": false },
    { "programType": "Master", "programCode": "ILG60-99-11", "programName": "ข้อมูลคลังสินค้า", "isCreate": false, "isRead": false, "isUpdate": false, "isDelete": false },
    { "programType": "Master", "programCode": "ILG60-99-12", "programName": "ข้อมูลหมวด/ส่วนของพรบ.", "isCreate": false, "isRead": false, "isUpdate": false, "isDelete": false },
    { "programType": "Master", "programCode": "ILG60-99-13", "programName": "ข้อมูลมาตราของพรบ.", "isCreate": false, "isRead": false, "isUpdate": false, "isDelete": false },
    { "programType": "Master", "programCode": "ILG60-99-14", "programName": "ข้อมูลข้อย่อย/วรรคของพรบ.", "isCreate": false, "isRead": false, "isUpdate": false, "isDelete": false },
    { "programType": "Master", "programCode": "ILG60-99-15", "programName": "ข้อมูลหมวดของสินค้า", "isCreate": false, "isRead": false, "isUpdate": false, "isDelete": false },
    { "programType": "Master", "programCode": "ILG60-99-16", "programName": "ข้อมูลประเภทของสินค้า", "isCreate": false, "isRead": false, "isUpdate": false, "isDelete": false },
    { "programType": "Master", "programCode": "ILG60-99-17", "programName": "ข้อมูลยี่ห้อหลักของสินค้า", "isCreate": false, "isRead": false, "isUpdate": false, "isDelete": false },
    { "programType": "Master", "programCode": "ILG60-99-18", "programName": "ข้อมูลยี่ห้อรองของสินค้า", "isCreate": false, "isRead": false, "isUpdate": false, "isDelete": false },
    { "programType": "Master", "programCode": "ILG60-99-19", "programName": "ข้อมูลรุ่นของสินค้า", "isCreate": false, "isRead": false, "isUpdate": false, "isDelete": false },
    { "programType": "Master", "programCode": "ILG60-99-20", "programName": "ข้อมูลหน่วย", "isCreate": false, "isRead": false, "isUpdate": false, "isDelete": false }
  ];

  public uacRolePermissionResponse: uacdatamodel.UacRolePermissionResponse;

  public getProgramCodeList(programType: string): Array<any> {
    return this.programList.filter(item => item.programType == programType);
  }

  ngOnInit() {
    localStorage.setItem('programcode', 'ILG60-12-00');
    this.sidebarService.setVersion('Role Manage 0.0.0.1');

    this.navigate_Service();
    this.programList = JSON.parse(JSON.stringify(this.programListTemplate));
    this.roleinsAllRequest = new uacdatamodel.RoleinsAllRequest();
    this.roleID = +localStorage.getItem("roleID");

    this.manageService.loadRolegetByCon(this.roleID).then(result => {
      this.uacRolePermissionResponse = result;
      this.roleCode = this.uacRolePermissionResponse.roleCode;
      this.roleName = this.uacRolePermissionResponse.roleName;

      this.uacRolePermissionResponse.uacRolepermissions.forEach(permission => {
        let program: any = this.programList.find(item => item.programCode == permission.programCode);
        if (program != null) {
          program.isCreate = permission.isCreate;
          program.isRead = permission.isRead;
          program.isUpdate = permission.isUpdate;
          program.isDelete = permission.isDelete;
        }
      });

      this.uacRolePermissionResponse.uacRolepermissions.forEach(permission => {
        this.roleinsAllRequest.uacRolepermissions.push(permission);
      });
    }).catch(error => {
      alert("ERROR")
    });
  }

  ngDoCheck(): void {

  }

  private navigate_Service() {
    this.navService.showFieldEdit.subscribe(p => {
      this.showEditField = p;
    });

    this.navService.onSave.takeUntil(this.destroy$).subscribe(async status => {
      if (status) {
        await this.navService.setOnSave(false);
        this.roleinsAllRequest.roleID = this.roleID;
        let persistMode: boolean = this.roleinsAllRequest.uacRolepermissions.length == 0;

        if (persistMode) {
          for (let program of this.programList) {
            let rolePermission: uacdatamodel.RolePermission = new uacdatamodel.RolePermission();
            rolePermission.roleID = this.roleID;
            rolePermission.programCode = program.programCode;
            rolePermission.isCreate = program.isCreate;
            rolePermission.isRead = program.isRead;
            rolePermission.isUpdate = program.isUpdate;
            rolePermission.isDelete = program.isDelete;

            this.roleinsAllRequest.uacRolepermissions.push(rolePermission);
          }
        } else {
          for (let program of this.programList) {
            let rolePermission: uacdatamodel.RolePermission = this.roleinsAllRequest.uacRolepermissions.find(permission => permission.programCode == program.programCode);
            rolePermission.roleID = this.roleID;
            rolePermission.programCode = program.programCode;
            rolePermission.isCreate = program.isCreate;
            rolePermission.isRead = program.isRead;
            rolePermission.isUpdate = program.isUpdate;
            rolePermission.isDelete = program.isDelete;

            this.roleinsAllRequest.uacRolepermissions.push(rolePermission);
          }
        }

        if (persistMode) {
          this.manageService.roleinsAll(this.roleinsAllRequest).then(result => {
            if (result == "OK") {
              swal({
                title: '',
                text: "บันทึกสำเร็จ",
                type: 'success',
                showCancelButton: false,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'OK'
              }).then((result) => {
                if (result.value) {
                  this.router.navigate(['/uac/role/manage']);
                }
              })
            } else {
              swal('', 'manageService.roleinsAll', 'error');
            }
          }).catch(error => {
            swal('', error, 'error');
          });
        } else {
          this.manageService.roleupdByCon(this.roleinsAllRequest).then(result => {
            if (result == "OK") {
              swal({
                title: '',
                text: "บันทึกสำเร็จ",
                type: 'success',
                showCancelButton: false,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'OK'
              }).then((result) => {
                if (result.value) {
                  this.router.navigate([`/uac/role/manage`]);
                }
              })
            } else {
              swal('', 'manageService.roleupdByCon', 'error');
            }
          }).catch(error => {
            swal('', error, 'error');
          });
        }
      }
    });
    this.navService.onCancel.takeUntil(this.destroy$).subscribe(async status => {
      if (status) {
        swal('', 'ยกเลิกการทำรายการ', 'warning');
        await this.navService.setOnCancel(false);
        await this.router.navigate(['/uac/role/list']);
      }
    })
  }
}