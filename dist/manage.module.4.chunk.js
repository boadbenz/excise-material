webpackJsonp(["manage.module.4"],{

/***/ "./src/app/pages/reward/manage/manage.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"wizard-content\">\r\n    <div class=\"wizard-circle wizard clearfix clearfix\">\r\n        <div class=\"steps tab-wizard\">\r\n            <ul role=\"tablist\">\r\n                <li role=\"tab\" class=\"current\" aria-disabled=\"false\" aria-selected=\"true\">\r\n                    <a>\r\n                        <span class=\"current-info audible\">current step: </span>\r\n                        <span class=\"step\"></span> 1. ใบแจ้งความนำจับ</a>\r\n                </li>\r\n                <li role=\"tab\" class=\"current\" aria-disabled=\"true\">\r\n                    <a>\r\n                        <span class=\"step\"></span> 2. งานจับกุม </a>\r\n                </li>\r\n                <li role=\"tab\" class=\"current\" aria-disabled=\"true\">\r\n                    <a>\r\n                        <span class=\"step\"></span> 3. รับคำกล่าวโทษ </a>\r\n                </li>\r\n                <li role=\"tab\" class=\"current\" aria-disabled=\"true\">\r\n                    <a>\r\n                        <span class=\"step\"></span> 4. งานตรวจรับและพิสูจน์ของกลาง </a>\r\n                </li>\r\n                <li role=\"tab\" class=\"current\" aria-disabled=\"true\">\r\n                    <a>\r\n                        <span class=\"step\"></span> 5. งานเปรียบเทียบและชำระค่าปรับ </a>\r\n                </li>\r\n                <li role=\"tab\" class=\"current\" aria-disabled=\"true\">\r\n                    <a>\r\n                        <span class=\"step\"></span> 6. นำส่งเงินรายได้ </a>\r\n                </li>\r\n                <li role=\"tab\" class=\"current\" aria-disabled=\"true\">\r\n                    <a>\r\n                        <span class=\"step\"></span> 7. คำร้องขอรับเงินสินบนรางวัล </a>\r\n                </li>\r\n            </ul>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n<div class=\"card \">\r\n    <div class=\"card-header  unset-radius\">\r\n        <app-card-actions-collapse></app-card-actions-collapse>\r\n        <h4 class=\"card-title m-b-0\">รายละเอียดคดี</h4>\r\n    </div>\r\n    <div class=\"card-body\">\r\n        <div class=\"form-body\">\r\n            <div class=\"row\">\r\n                <div class=\"col-md-6\">\r\n                    <div class=\"form-group row\">\r\n                        <label class=\"col-form-label col-md-4\">เลขที่ใบงาน : </label>\r\n                        <div class=\"col-md-8\">\r\n                            <input class=\"form-control\" type=\"text\" [(ngModel)]=\"arrest.ArrestCode\" name=\"allegationCode\" [disabled]=\"showEditField\">\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n                <div class=\"col-md-6\">\r\n                    <div class=\"form-group row\">\r\n                        <label class=\"col-form-label col-md-4\">วันที่จับกุม : </label>\r\n                        <div class=\"col-md-3\">\r\n                            <input class=\"form-control\" type=\"text\" [(ngModel)]=\"arrest.ArrestDate\" name=\"lawsuitDate\" [disabled]=\"showEditField\">\r\n                        </div>\r\n                        <label class=\"col-form-label text-center col-md-2\">เวลา</label>\r\n                        <div class=\"col-md-3\">\r\n                            <input class=\"form-control\" type=\"text\" [(ngModel)]=\"arrest.ArrestTime\" name=\"lawsuitTime\" [disabled]=\"showEditField\">\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n            <div class=\"row\">\r\n                <div class=\"col-md-6\">\r\n                    <div class=\"form-group row\">\r\n                        <label class=\"col-form-label col-md-4\">ผู้กล่าวหา : </label>\r\n                        <div class=\"col-md-8\">\r\n                            <input class=\"form-control\" [(ngModel)]=\"arrest.ArrestCode\" type=\"text\" name=\"allegationNo\" [disabled]=\"showEditField\">\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n                <div class=\"col-md-6\">\r\n                    <div class=\"form-group row\">\r\n                        <label class=\"col-form-label col-md-4\">ตำแหน่ง : </label>\r\n                        <div class=\"col-md-8\">\r\n                            <input class=\"form-control\" type=\"text\" [(ngModel)]=\"arrest.PositionName\"  name=\"allegationNo\" [disabled]=\"showEditField\">\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n            <div class=\"row\">\r\n                <div class=\"col-md-6\">\r\n                    <div class=\"form-group row\">\r\n                        <label class=\"col-form-label col-md-4\">หน่วยงาน : </label>\r\n                        <div class=\"col-md-8\">\r\n                            <input class=\"form-control\" type=\"text\" [(ngModel)]=\"arrest.DepartmentName\" name=\"allegationCode\" [disabled]=\"showEditField\">\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n                <div class=\"col-md-6\">\r\n                    <div class=\"form-group row\">\r\n                        <label class=\"col-form-label col-md-4\">สถานที่จับกุม : </label>\r\n                        <div class=\"col-md-8\">\r\n                            <input class=\"form-control\" type=\"text\" [(ngModel)]=\"arrest.ArresLocaltion\" name=\"allegationSubject\" [disabled]=\"showEditField\">\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n            <div class=\"row\">\r\n                <div class=\"col-md-6\">\r\n                    <div class=\"form-group row\">\r\n                        <label class=\"col-form-label col-md-4\">เลขที่คดีรับคำกล่าวโทษ : </label>\r\n                        <div class=\"col-md-8\">\r\n                            <input class=\"form-control\" type=\"text\" [(ngModel)]=\"arrest.LawsuitCode\" name=\"allegationCode\" [disabled]=\"showEditField\">\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n                <div class=\"col-md-6\">\r\n                    <div class=\"form-group row\">\r\n                        <label class=\"col-form-label col-md-4\">วันที่รับคดี : </label>\r\n                        <div class=\"col-md-3\">\r\n                            <input class=\"form-control\" type=\"text\" [(ngModel)]=\"arrest.LawsuitDate\" name=\"lawsuitDate\" [disabled]=\"showEditField\">\r\n                        </div>\r\n                        <label class=\"col-form-label text-center col-md-2\">เวลา</label>\r\n                        <div class=\"col-md-3\">\r\n                            <input class=\"form-control\" type=\"text\" [(ngModel)]=\"arrest.LawsuitTime\" name=\"lawsuitTime\" [disabled]=\"showEditField\">\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n            <div class=\"row\">\r\n                <div class=\"col-md-6\">\r\n                    <div class=\"form-group row\">\r\n                        <label class=\"col-form-label col-md-4\">ฐานความผิดมาตรา : </label>\r\n                        <div class=\"col-md-8\">\r\n                            <input class=\"form-control\" type=\"text\" name=\"allegationCode\" [disabled]=\"showEditField\">\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n                <div class=\"col-md-6\">\r\n                    <div class=\"form-group row\">\r\n                        <label class=\"col-form-label col-md-4\">ฐานความผิด : </label>\r\n                        <div class=\"col-md-8\">\r\n                            <input class=\"form-control\" type=\"text\" name=\"allegationSubject\" [disabled]=\"showEditField\">\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n            <div class=\"row\">\r\n                <div class=\"col-md-6\">\r\n                    <div class=\"form-group row\">\r\n                        <label class=\"col-form-label col-md-4\">บทกำหนดโทษ : </label>\r\n                        <div class=\"col-md-8\">\r\n                            <input class=\"form-control\" type=\"text\" name=\"allegationCode\" [disabled]=\"showEditField\">\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n                <div class=\"col-md-6\">\r\n                    <div class=\"form-group row\">\r\n                        <label class=\"col-form-label col-md-4\">อัตราโทษ : </label>\r\n                        <div class=\"col-md-8\">\r\n                            <input class=\"form-control\" type=\"text\" name=\"allegationSubject\" [disabled]=\"showEditField\">\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n<div class=\"card \">\r\n    <div class=\"card-header  unset-radius\">\r\n        <app-card-actions-collapse></app-card-actions-collapse>\r\n        <h4 class=\"card-title m-b-0\">คำสั่งกรมฯ กรณีที่มีผู้แจ้งความนำจับหลายคน</h4>\r\n    </div>\r\n    <div class=\"card-body\">\r\n        <div class=\"row\">\r\n            <div class=\"col-md-6\">\r\n                <div class=\"form-group row\">\r\n                    <label class=\"col-form-label col-md-4\">คำสั่งกรมฯที่ : </label>\r\n                    <div class=\"col-md-8\">\r\n                        <input class=\"form-control\" type=\"text\" name=\"allegationCode\" [disabled]=\"viewMode\"\r\n                               (change)=\"onRequestbribegetByCon($event)\" [ngbTypeahead]=\"onAutoCompleteAllegation\">\r\n                    </div>\r\n                </div>\r\n            </div>\r\n            <div class=\"col-md-6\">\r\n                <div class=\"form-group row\">\r\n                    <label class=\"col-form-label col-md-4\">วันที่ออกคำสั่ง : </label>\r\n                    <div class=\"col-md-3\">\r\n                        <input class=\"form-control\" type=\"date\" name=\"lawsuitDate\" [disabled]=\"viewMode\">\r\n                    </div>\r\n                    <label class=\"col-form-label text-center col-md-2\">เวลา</label>\r\n                    <div class=\"col-md-3\">\r\n                        <input class=\"form-control\" type=\"time\" name=\"lawsuitTime\" [disabled]=\"viewMode\">\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <div class=\"table-responsive\">\r\n            <table class=\"dataTable table table-sm table-striped table-hover\">\r\n                <thead>\r\n                <tr>\r\n                    <th class=\"footable-sortable text-center\">ลำดับ</th>\r\n                    <th class=\"footable-sortable\">เลขที่ใบแจ้งความ</th>\r\n                    <th class=\"footable-sortable\">วันที่แจ้งความ</th>\r\n                    <th class=\"footable-sortable\">ผู้แจ้งความ</th>\r\n                    <th class=\"footable-sortable\">ผู้รับแจ้งความ</th>\r\n                    <th class=\"footable-sortable\">ตำแหน่ง</th>\r\n                    <th class=\"footable-sortable\">หน่วยงาน</th>\r\n                    <th class=\"footable-sortable\">จำนวนส่วน</th>\r\n                </tr>\r\n                </thead>\r\n                <tbody>\r\n                <tr class=\"footable\" *ngFor=\"let notice of notices; let i = index\">\r\n                    <td class=\"text-center\">{{ i + 1 }}</td>\r\n                    <td class=\"\">{{notice.NoticeCode}}</td>\r\n                    <td>{{notice.NoticeDate}}</td>\r\n                    <td class=\"\">{{notice.ArrestName}}</td>\r\n                    <td class=\"\">{{notice.StaffName}}</td>\r\n                    <td class=\"\">{{notice.PositionName}}</td>\r\n                    <td class=\"\">{{notice.DepartmentName}}</td>\r\n                    <td>\r\n                        <input class=\"form-control text-center\" type=\"text\" [disabled]=\"viewMode\" value=\"{{notice.PartMoney}}\">\r\n                    </td>\r\n                </tr>\r\n                <tr>\r\n                    <td></td>\r\n                    <td></td>\r\n                    <td></td>\r\n                    <td></td>\r\n                    <td></td>\r\n                    <td></td>\r\n                    <td class=\"text-right\">รวม :</td>\r\n                    <td>\r\n                        <input class=\"form-control text-center\" type=\"text\" disabled value=\"{{totalPartMoney}}\">\r\n                    </td>\r\n                </tr>\r\n                </tbody>\r\n            </table>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n<div class=\"card \">\r\n    <div class=\"card-header unset-radius\">\r\n        <app-card-actions-collapse></app-card-actions-collapse>\r\n        <h4 class=\"card-title m-b-0\">คำร้องขอรับเงินสินบน</h4>\r\n    </div>\r\n    <div class=\"card-body\">\r\n        <div class=\"form-body\">\r\n            <div class=\"row\">\r\n                <div class=\"col-md-6\">\r\n                    <div class=\"form-group row\">\r\n                        <label class=\"col-form-label col-md-5\">เงินสินบนที่ขอรับแล้ว : </label>\r\n                        <div class=\"col-md-7\">\r\n                            <input class=\"form-control\" type=\"text\" name=\"allegationCode\" disabled>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n            <div class=\"text-right\">\r\n                <input type=\"button\" id=\"btn-browse\" [disabled]=\"viewMode\" data-toggle=\"modal\" data-target=\"#bribePopup\">\r\n                <label for=\"btn-browse\" [ngClass]=\"{disabled : viewMode}\" class=\"btn waves-effect waves-light btn-navy\"> ขอรับสินบน </label>\r\n            </div>\r\n        </div>\r\n        <div class=\"table-responsive\">\r\n            <table class=\"dataTable table table-sm table-striped table-hover\">\r\n                <thead>\r\n                <tr>\r\n                    <th class=\"footable-sortable text-center\">ลำดับ</th>\r\n                    <th class=\"footable-sortable\">เลขที่คำร้องขอ</th>\r\n                    <th class=\"footable-sortable\">วันที่จัดทำคำร้องขอรับเงินสินบน</th>\r\n                    <th class=\"footable-sortable\">ชื่อผู้ต้องหา</th>\r\n                    <th class=\"footable-sortable\">ลักษณะคดี</th>\r\n                    <th class=\"footable-sortable\">วันที่ชำระเงิน</th>\r\n                    <th class=\"footable-sortable\">งวดชำระ</th>\r\n                    <th class=\"footable-sortable\"></th>\r\n                </tr>\r\n                </thead>\r\n                <tbody>\r\n                <tr class=\"footable\"*ngFor=\"let requestBribe of requestBribes; let i= index;\">\r\n                    <td class=\"text-center\">{{ i + 1 }}</td>\r\n                    <td>{{requestBribe.RequestBribeCode}}</td>\r\n                    <td>{{requestBribe.RequestDate}}</td>\r\n                    <td>{{requestBribe.LawbreakerTitleName}}</td>\r\n                    <td>{{requestBribe.LawsuitType}}</td>\r\n                    <td>{{requestBribe.CourtFineDate}}</td>\r\n                    <td>{{requestBribe.PaymentPeroidRound}}</td>\r\n                    <td>\r\n                        <a href=\"javaScript:void(0);\" class=\"text-secondary\" (click)=\"changePage('bribe','')\">\r\n                            <i class=\"mdi mdi-eye fa-lg\"></i>\r\n                        </a>\r\n                    </td>\r\n                </tr>\r\n                </tbody>\r\n            </table>\r\n            <div class=\"row pages\">\r\n                <div class=\"col-9 \">\r\n                    <a href=\"#\">|&lt;&lt;</a> หน้าที่\r\n                    <select class=\"custom-select\">\r\n                        <option>1</option>\r\n                    </select> จาก 2 หน้า\r\n                    <a href=\"#\">&gt;&gt;|</a> รายการที่ 1-5 จาก 13 รายการ\r\n                </div>\r\n                <div class=\"col-3 text-right\">\r\n                    แสดง\r\n                    <select class=\"custom-select\">\r\n                        <option (click)=\"numPage = 5\">5</option>\r\n                        <option (click)=\"numPage = 10\">10</option>\r\n                        <option (click)=\"numPage = 15\">15</option>\r\n                    </select> รายการ\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n<div class=\"card \">\r\n    <div class=\"card-header  unset-radius\">\r\n        <app-card-actions-collapse></app-card-actions-collapse>\r\n        <h4 class=\"card-title m-b-0\">คำร้องขอรับเงินรางวัล</h4>\r\n    </div>\r\n\r\n    <div class=\"card-body\">\r\n        <div class=\"form-body\">\r\n            <div class=\"row\">\r\n                <div class=\"col-md-6\">\r\n                    <div class=\"form-group row\">\r\n                        <label class=\"col-form-label col-md-5\">เงินรางวัลที่ขอรับแล้ว : </label>\r\n                        <div class=\"col-md-7\">\r\n                            <input class=\"form-control\" type=\"text\" name=\"allegationCode\" disabled>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n            <div class=\"text-right\">\r\n                <input type=\"button\" id=\"btn-browse\" [disabled]=\"viewMode\" data-toggle=\"modal\" data-target=\"#rewardPopup\">\r\n                <label for=\"btn-browse\" [ngClass]=\"{disabled : viewMode}\" class=\"btn waves-effect waves-light btn-navy\"> ขอรับเงินรางวัล</label>\r\n            </div>\r\n        </div>\r\n        <div class=\"table-responsive\">\r\n            <table class=\"dataTable table table-sm table-striped table-hover\">\r\n                <thead>\r\n                <tr>\r\n                    <th class=\"footable-sortable text-center\">ลำดับ</th>\r\n                    <th class=\"footable-sortable\">เลขที่คำร้องขอ</th>\r\n                    <th class=\"footable-sortable\">วันที่จัดทำคำขอรับเงินรางวัล</th>\r\n                    <th class=\"footable-sortable\">ชื่อผู้ต้องหา</th>\r\n                    <th class=\"footable-sortable\">ลักษณะคดี</th>\r\n                    <th class=\"footable-sortable\">วันที่ชำระเงิน</th>\r\n                    <th class=\"footable-sortable\">งวดชำระ</th>\r\n                    <th class=\"footable-sortable\"></th>\r\n                </tr>\r\n                </thead>\r\n                <tbody>\r\n                <tr class=\"footable\"*ngFor=\"let requestReward of requestRewards; let i= index;\">\r\n                    <td class=\"text-center\">{{ i + 1 }}</td>\r\n                    <td>{{requestReward.RequestRewardCode}}</td>\r\n                    <td>{{requestReward.RequestDate}}</td>\r\n                    <td>{{requestReward.LawbreakerTitleName}}</td>\r\n                    <td>{{requestReward.LawsuitType}}</td>\r\n                    <td>{{requestReward.CourtFineDate}}</td>\r\n                    <td>{{requestReward.PaymentPeroidRound}}</td>\r\n                    <td>\r\n                        <a href=\"javaScript:void(0);\" class=\"text-secondary\" (click)=\"changePage('reward',test)\">\r\n                            <i class=\"mdi mdi-eye fa-lg\"></i>\r\n                        </a>\r\n                    </td>\r\n                </tr>\r\n                </tbody>\r\n            </table>\r\n            <div class=\"row pages\">\r\n                <div class=\"col-9 \">\r\n                    <a href=\"#\">|&lt;&lt;</a> หน้าที่\r\n                    <select class=\"custom-select\">\r\n                        <option>1</option>\r\n                    </select> จาก 2 หน้า\r\n                    <a href=\"#\">&gt;&gt;|</a> รายการที่ 1-5 จาก 13 รายการ\r\n                </div>\r\n                <div class=\"col-3 text-right\">\r\n                    แสดง\r\n                    <select class=\"custom-select\">\r\n                        <option (click)=\"numPage = 5\">5</option>\r\n                        <option (click)=\"numPage = 10\">10</option>\r\n                        <option (click)=\"numPage = 15\">15</option>\r\n                    </select> รายการ\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n\r\n<!-- popup -->\r\n<div class=\"modal fade\" id=\"bribePopup\" tabindex=\"-1\" role=\"dialog\">\r\n    <div class=\"modal-dialog modal-lg\" role=\"document\">\r\n        <div class=\"modal-content\">\r\n            <div class=\"modal-header top-navbar text-white\">\r\n                เลือกรายการที่ต้องการขอรับเงินสินบน\r\n                <div class=\"card-actions\">\r\n                    <i class=\"ti-close text-white close-popup\" data-dismiss=\"modal\" data-target=\"#bribePopup\"></i>\r\n                </div>\r\n            </div>\r\n            <div class=\"modal-body\">\r\n                <div class=\"text-right\"> XCS60-08-02-01-00 </div>\r\n                <div class=\"form-body m-t-10\">\r\n                    <div class=\"card\">\r\n                        <div class=\"card-header  unset-radius\">\r\n                            <h4 class=\"card-title m-b-0\">เลือกรายการใบแจ้งความนำจับ</h4>\r\n                        </div>\r\n                        <div class=\"card-body\">\r\n                            <div class=\"table-responsive\">\r\n                                <table class=\"dataTable table table-sm table-striped table-hover\">\r\n                                    <thead>\r\n                                    <tr>\r\n                                        <th></th>\r\n                                        <th class=\"footable-sortable text-center\">ลำดับ</th>\r\n                                        <th class=\"footable-sortable\">เลขที่ใบแจ้งความนำจับ</th>\r\n                                        <th class=\"footable-sortable\">วันที่แจ้งความ</th>\r\n                                        <th class=\"footable-sortable\">ผู้แจ้งความ</th>\r\n                                        <th class=\"footable-sortable\">ผู้รับแจ้งความ</th>\r\n                                        <th class=\"footable-sortable\">ตำแหน่ง</th>\r\n                                        <th class=\"footable-sortable\">หน่วยงาน</th>\r\n                                    </tr>\r\n                                    </thead>\r\n                                    <tbody>\r\n                                    <tr class=\"footable\">\r\n                                        <td>\r\n                                            <input name=\"report_selected\" type=\"radio\" class=\"text-center\">\r\n                                        </td>\r\n                                        <td class=\"text-center\">1</td>\r\n                                        <td class=\"\">LS90806026000002</td>\r\n                                        <td>10-ม.ค.-2560</td>\r\n                                        <td class=\"\">สายลับ (ขอปิดนาม)</td>\r\n                                        <td class=\"\">นายธวัชชัย บิงขุนทด</td>\r\n                                        <td class=\"\">เจ้าพนักงานสรรพสามิตชำนาญงาน</td>\r\n                                        <td class=\"\">สสท.ระนอง สาขาเมืองกระบุรี</td>\r\n                                    </tr>\r\n                                    </tbody>\r\n                                </table>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n\r\n                <div class=\"form-body m-t-10\">\r\n                    <div class=\"card\">\r\n                        <div class=\"card-header  unset-radius\">\r\n                            <h4 class=\"card-title m-b-0\">เลือกรายการที่ต้องการขอรับเงินสินบน</h4>\r\n                        </div>\r\n                        <div class=\"card-body\">\r\n                            <div class=\"table-responsive\">\r\n                                <table class=\"dataTable table table-sm table-striped table-hover\">\r\n                                    <thead>\r\n                                    <tr>\r\n                                        <th>\r\n                                            <input type=\"checkbox\" id=\"checked_all\" class=\"filled-in chk-col-indigo\">\r\n                                        </th>\r\n                                        <th class=\"footable-sortable text-center\">ลำดับ</th>\r\n                                        <th class=\"footable-sortable\">ชื่อผู้ต้องหา</th>\r\n                                        <th class=\"footable-sortable\">ลักษณะคดี</th>\r\n                                        <th class=\"footable-sortable\">เลขที่คดีเปรียบเทียบ/คำพิพากษาฎีกาที่</th>\r\n                                        <th class=\"footable-sortable\">วันที่ชำระเงิน</th>\r\n                                        <th class=\"footable-sortable\">งวดชำระ</th>\r\n                                    </tr>\r\n                                    </thead>\r\n                                    <tbody>\r\n                                    <tr class=\"footable\">\r\n                                        <td>\r\n                                            <input type=\"checkbox\" id=\"checked\" class=\"filled-in chk-col-indigo\">\r\n                                        </td>\r\n                                        <td class=\"text-center\">1</td>\r\n                                        <td class=\"\">นายธวัชชัย บิงขุนทด</td>\r\n                                        <td class=\"\">เปรียบเทียบคดี</td>\r\n                                        <td class=\"\">001/2561</td>\r\n                                        <td>10-ม.ค.-2560</td>\r\n                                        <td class=\"\">1/1</td>\r\n                                    </tr>\r\n                                    </tbody>\r\n                                </table>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n                <div class=\"text-right\">\r\n                    <button type=\"submit\" class=\"btn waves-effect waves-light btn-navy\" data-toggle=\"modal\" data-target=\"#bribePopup\" >ถัดไป</button>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n\r\n<div class=\"modal fade\" id=\"rewardPopup\" tabindex=\"-1\" role=\"dialog\">\r\n    <div class=\"modal-dialog modal-lg\" role=\"document\">\r\n        <div class=\"modal-content\">\r\n            <div class=\"modal-header text-white top-navbar\">\r\n                เลือกรายการที่ต้องการขอรับเงินรางวัล\r\n                <div class=\"card-actions\">\r\n                    <i class=\"ti-close text-white close-popup\" data-dismiss=\"modal\" data-target=\"#rewardPopup\"></i>\r\n                </div>\r\n            </div>\r\n            <div class=\"modal-body\">\r\n                <div class=\"text-right\"> XCS60-08-02-02-00 </div>\r\n                <div class=\"form-body m-t-10\">\r\n                    <div class=\"row\">\r\n                        <div class=\"col-md-12\">\r\n                            <div class=\"form-group row\">\r\n                                <label class=\"col-form-label col-md-2\">ลักษณะคดี : </label>\r\n                                <div class=\"custom-control custom-radio col-form-label col-md-8\">\r\n                                    <input name=\"courtCaseRadio\" value=\"compare\" [(ngModel)]=\"courtCase\" id=\"compare\" class=\"col-form-label with-gap radio-col-indigo\" type=\"radio\">\r\n                                    <label for=\"compare\" class=\"col-md-5\">เปรียบเทียบคดี</label>\r\n                                    <input name=\"courtCaseRadio\" value=\"filedCourt\" [(ngModel)]=\"courtCase\" id=\"filedCourtRadio\" class=\"col-form-label with-gap radio-col-indigo\" type=\"radio\">\r\n                                    <label for=\"filedCourtRadio\" class=\"col-md-5\">ส่งฟ้องศาล</label>\r\n                                    <!-- {{courtCase}} -->\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"table-responsive\">\r\n                        <table class=\"dataTable table table-sm table-striped table-hover\">\r\n                            <thead>\r\n                            <tr>\r\n                                <th>\r\n                                    <input type=\"checkbox\" id=\"checked_all\" class=\"filled-in chk-col-indigo\">\r\n                                </th>\r\n                                <th class=\"footable-sortable text-center\">ลำดับ</th>\r\n                                <th class=\"footable-sortable\">ชื่อผู้ต้องหา</th>\r\n                                <th class=\"footable-sortable\">ลักษณะคดี</th>\r\n                                <th class=\"footable-sortable\">เลขที่คดีเปรียบเทียบ/คำพิพากษาฎีกาที่</th>\r\n                                <th class=\"footable-sortable\">วันที่ชำระเงิน</th>\r\n                                <th class=\"footable-sortable\">งวดชำระ</th>\r\n                            </tr>\r\n                            </thead>\r\n                            <tbody>\r\n                            <tr class=\"footable\">\r\n                                <td>\r\n                                    <input type=\"checkbox\" id=\"checked\" class=\"filled-in chk-col-indigo\">\r\n                                </td>\r\n                                <td class=\"text-center\">1</td>\r\n                                <td class=\"\">นายธวัชชัย บิงขุนทด</td>\r\n                                <td class=\"\">เปรียบเทียบคดี</td>\r\n                                <td class=\"\">001/2561</td>\r\n                                <td>10-ม.ค.-2560</td>\r\n                                <td class=\"\">1/1</td>\r\n                            </tr>\r\n                            </tbody>\r\n                        </table>\r\n                    </div>\r\n                </div>\r\n                <div class=\"text-right\">\r\n                    <button type=\"submit\" class=\"btn waves-effect waves-light btn-navy\" data-toggle=\"modal\" data-target=\"#rewardPopup\">ถัดไป</button>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/pages/reward/manage/manage.component.scss":
/***/ (function(module, exports) {

module.exports = ".pages a {\n  color: #67757c; }\n\n.btn-navy {\n  background: #005e8d;\n  color: white; }\n\n.btn-orange {\n  background: #e07023;\n  color: white; }\n\n.top-navbar {\n  background: linear-gradient(45deg, #005e8d, #353993); }\n\n.btn-action {\n  color: red;\n  font-size: 20px;\n  margin-left: 5px;\n  cursor: pointer; }\n\n#btn-browse, #reward-btn {\n  opacity: 0; }\n\n.border-table {\n  border: #a5a7a8 1px;\n  border-style: solid; }\n\n.form-popup {\n  margin-bottom: 0; }\n\n.col-form-label {\n  color: black;\n  font-weight: 400; }\n\n.card-header {\n  background: #ccdeea;\n  border-color: #ccdeea; }\n"

/***/ }),

/***/ "./src/app/pages/reward/manage/manage.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ManageComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_header_navigation_navigation_service__ = __webpack_require__("./src/app/shared/header-navigation/navigation.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__reward_service__ = __webpack_require__("./src/app/pages/reward/reward.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_observable_of__ = __webpack_require__("./node_modules/rxjs/_esm5/observable/of.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_operators__ = __webpack_require__("./node_modules/rxjs/_esm5/operators.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__shared_preloader_preloader_component__ = __webpack_require__("./src/app/shared/preloader/preloader.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__config_message__ = __webpack_require__("./src/app/config/message.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__shared_sidebar_sidebar_component__ = __webpack_require__("./src/app/shared/sidebar/sidebar.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};









var ManageComponent = /** @class */ (function () {
    function ManageComponent(router, navService, activeRoute, preLoaderService, rewardService, sidebarService) {
        var _this = this;
        this.router = router;
        this.navService = navService;
        this.activeRoute = activeRoute;
        this.preLoaderService = preLoaderService;
        this.rewardService = rewardService;
        this.sidebarService = sidebarService;
        this.courtCase = '';
        this.test = 'ส่งฟ้องศาล';
        this.arrest = {};
        this.requestbribe = {};
        this.searchingAutoCompleteAllegation = {
            searching: false,
            searchingFailed: false
        };
        this.notices = [
        // { NoticeCode: 'LS90806026000002', NoticeDate: '10-ม.ค.-2560', ArrestName: 'สายลับ (ขอปิดนาม)', StaffName: 'นายธวัชชัย บิงขุนทด', PositionName: 'เจ้าพนักงานสรรพสามิตชำนาญงาน', DepartmentName: 'สสท.ระนอง สาขาเมืองกระบุรี', PartMoney: 1 },
        // { NoticeCode: 'LS90806026000001', NoticeDate: '11-ม.ค.-2560', ArrestName: 'สายลับ (ขอปิดนาม)', StaffName: 'นายธวัชชัย บิงขุนทด 001', PositionName: 'เจ้าพนักงานสรรพสามิตชำนาญงาน', DepartmentName: 'สสท.ระนอง สาขาเมืองกระบุรี', PartMoney: 1 },
        // { NoticeCode: 'LS90806026000001', NoticeDate: '11-ม.ค.-2560', ArrestName: 'สายลับ (ขอปิดนาม)', StaffName: 'นายธวัชชัย บิงขุนทด 001', PositionName: 'เจ้าพนักงานสรรพสามิตชำนาญงาน', DepartmentName: 'สสท.ระนอง สาขาเมืองกระบุรี', PartMoney: 3 }
        ];
        this.requestRewards = [
        // { RequestRewardCode: 'RW90806026000002', RequestDate: '10-ม.ค.-2560', LawbreakerTitleName: 'นายธวัชชัย บิงขุนทด', LawsuitType: 'ส่งฟ้องศาล', CourtFineDate: '10-ม.ค.-2560', PaymentPeroidRound: '1/1' }
        ];
        this.requestBribes = [
        // { RequestBribeCode: 'BR90806026000002', RequestDate: '10-ม.ค.-2560', LawbreakerTitleName: 'นายธวัชชัย บิงขุนทด', LawsuitType: 'เปรียบเทียบคดี', CourtFineDate: '10-ม.ค.-2560', PaymentPeroidRound: '1/1' }
        ];
        this.totalPartMoney = 0;
        this.onAutoCompleteAllegation = function (text$) {
            return text$.pipe(Object(__WEBPACK_IMPORTED_MODULE_5_rxjs_operators__["debounceTime"])(200), Object(__WEBPACK_IMPORTED_MODULE_5_rxjs_operators__["distinctUntilChanged"])(), Object(__WEBPACK_IMPORTED_MODULE_5_rxjs_operators__["tap"])(function () { return _this.searchingAutoCompleteAllegation.searching = true; }), Object(__WEBPACK_IMPORTED_MODULE_5_rxjs_operators__["switchMap"])(function (term) {
                return _this.autoCompleteAllegation(term).pipe(Object(__WEBPACK_IMPORTED_MODULE_5_rxjs_operators__["tap"])(function () { return _this.searchingAutoCompleteAllegation.searchingFailed = false; }), Object(__WEBPACK_IMPORTED_MODULE_5_rxjs_operators__["catchError"])(function () {
                    _this.searchingAutoCompleteAllegation.searchingFailed = true;
                    return Object(__WEBPACK_IMPORTED_MODULE_4_rxjs_observable_of__["a" /* of */])([]);
                }));
            }), Object(__WEBPACK_IMPORTED_MODULE_5_rxjs_operators__["tap"])(function () { return _this.searchingAutoCompleteAllegation.searching = false; }));
        };
    }
    // private getParamFromActiveRoute(): void {
    //   this.preLoaderService.setShowPreloader(true);
    //   this.rewardService.getArrestRequestgetByCon(this.activeRoute.snapshot.params['ArrestCode']).then(list => this.onSearchComplete(list));
    //   this.preLoaderService.setShowPreloader(false);
    // }
    ManageComponent.prototype.ngOnInit = function () {
        // this.getParamFromActiveRoute();
        var _this = this;
        this.sidebarService.setVersion('0.0.0.1');
        this.sumPartMoney();
        this.sub = this.navService.showFieldEdit.subscribe(function (status) {
            // this.viewMode = status;
            if (!_this.viewMode) {
                _this.navService.setCancelButton(true);
                _this.navService.setSaveButton(true);
                _this.navService.setPrintButton(false);
                _this.navService.setSearchBar(false);
                _this.navService.setDeleteButton(false);
                _this.navService.setEditButton(false);
                _this.navService.setNewButton(false);
            }
            else {
                _this.navService.setPrintButton(true);
                _this.navService.setDeleteButton(true);
                _this.navService.setEditButton(true);
                _this.navService.setSearchBar(false);
                _this.navService.setCancelButton(false);
                _this.navService.setSaveButton(false);
                _this.navService.setNewButton(false);
            }
        });
        // Save Button
        this.navService.onSave.subscribe(function (status) { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!status) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.navService.setOnSave(false)];
                    case 1:
                        _a.sent();
                        this.rewardService.RequestbribeinsAll(this.formGroup).then(function (res) {
                            if (res.IsSuccess) {
                                _this.navService.setEditField(true);
                                alert(__WEBPACK_IMPORTED_MODULE_7__config_message__["a" /* Message */].saveComplete);
                            }
                            else {
                                alert(__WEBPACK_IMPORTED_MODULE_7__config_message__["a" /* Message */].saveFail);
                            }
                        });
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        }); });
        // Delete Button
        this.navService.onDelete.subscribe(function (status) { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!status) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.navService.setOnDelete(false)];
                    case 1:
                        _a.sent();
                        if (confirm(__WEBPACK_IMPORTED_MODULE_7__config_message__["a" /* Message */].confirmAction)) {
                            this.rewardService.ArrestRequestupdDelete(null);
                            this.rewardService.RequestbribeupdDelete(null);
                            this.rewardService.RequestrewardupdDelete(null).then(function (res) {
                                if (res.IsSuccess) {
                                    alert(__WEBPACK_IMPORTED_MODULE_7__config_message__["a" /* Message */].saveComplete);
                                    _this.router.navigate(["/lawsuit/list"]);
                                }
                                else {
                                    alert(__WEBPACK_IMPORTED_MODULE_7__config_message__["a" /* Message */].cannotDelete);
                                }
                            });
                        }
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        }); });
        this.sub = this.navService.onCancel.subscribe(function (response) {
            if (response) {
                _this.router.navigate(['reward/list']);
                _this.navService.setOnCancel(false);
            }
        });
        this.activeRoute.queryParams.subscribe(function (queryParam) {
            _this.queryParam = queryParam;
        });
        this.activeRoute.params.subscribe(function (param) {
            _this.rewardService.getArrestRequestgetByCon(_this.queryParam.ArrestCode).subscribe(function (response) {
                // ArrestLocale
                if (response.ArrestLocale.length !== 0) {
                    response.ArresLocaltion = (response.ArrestLocale[0].SubDistrict + ' ' +
                        response.ArrestLocale[0].District + ' ' + response.ArrestLocale[0].Province);
                }
                else {
                    response.ArresLocaltion = '';
                }
                // Lawsuit
                if (response.ArrestIndicment.length !== 0) {
                    if (response.ArrestIndicment[0].Lawsuit.length !== 0) {
                        response.LawsuitCode = (response.ArrestIndicment[0].Lawsuit[0].LawsuitNo);
                        var dateSplit = response.ArrestIndicment[0].Lawsuit[0].LawsuitDate.split(' ');
                        response.LawsuitDate = (dateSplit[0]);
                        response.LawsuitTime = (dateSplit[1]);
                    }
                }
                else {
                    response.LawsuitCode = '';
                    response.LawsuitDate = '';
                    response.LawsuitTime = '';
                }
                _this.arrest = response;
            });
            _this.rewardService.getRequestbribegetByKeyword(null).subscribe(function (response) {
                console.log((response || [{}])[0]);
                _this.requestbribe = (response || [{}])[0];
            });
            _this.rewardService.getNoticeRequestgetByCon(null).subscribe(function (response) {
                console.log(response);
                _this.notices = response || [];
            });
            _this.rewardService.getRequestbribegetByCon(null).subscribe(function (response) {
                console.log(response);
                _this.requestBribes = response || [];
            });
            _this.rewardService.getRequestrewardgetByCon(null).subscribe(function (response) {
                console.log(response);
                _this.requestRewards = response || [];
            });
            // this.rewardService.getRequestbribegetByCon(this.queryParam).subscribe(response => {
            // });
            switch (param['mode']) {
                case 'C': {
                    _this.navService.setEditField(true);
                    _this.navService.setCancelButton(true);
                    _this.navService.setSaveButton(true);
                    _this.navService.setPrintButton(false);
                    _this.navService.setSearchBar(false);
                    _this.navService.setDeleteButton(false);
                    _this.navService.setEditButton(false);
                    _this.navService.setNewButton(false);
                    _this.setIsViewMode(true);
                    break;
                }
                case 'R': {
                    _this.navService.setEditField(true);
                    _this.navService.setPrintButton(true);
                    _this.navService.setDeleteButton(true);
                    _this.navService.setEditButton(true);
                    _this.navService.setSearchBar(false);
                    _this.navService.setCancelButton(false);
                    _this.navService.setSaveButton(false);
                    _this.navService.setNewButton(false);
                    _this.setIsViewMode(false);
                    break;
                }
                default: {
                    break;
                }
            }
        });
        this.navService.showFieldEdit.subscribe(function (p) {
            _this.showEditField = p;
        });
    };
    ManageComponent.prototype.setIsViewMode = function (value) {
        this.viewMode = !value;
    };
    ManageComponent.prototype.sumPartMoney = function () {
        this.totalPartMoney = this.notices.reduce(function (sum, d) {
            return sum + d.PartMoney;
        }, 0);
    };
    ManageComponent.prototype.changePage = function (page, caseSelect) {
        // console.log(caseSelect)
        if (page === 'bribe') {
            this.router.navigate(['reward/bribe']);
        }
        else if (page === 'reward') {
            this.router.navigate(['reward/reward', caseSelect]);
        }
    };
    ManageComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    ManageComponent.prototype.autoCompleteAllegation = function (term) {
        return this.rewardService.getRequestbribegetByKeyword(term).pipe(Object(__WEBPACK_IMPORTED_MODULE_5_rxjs_operators__["map"])(function (response) { return response[1]; }));
    };
    ManageComponent.prototype.onRequestbribegetByCon = function (event) {
        var _this = this;
        this.rewardService.getRequestbribegetByCon(event.target.value).subscribe(function (response) {
            console.log(response);
            _this.requestBribes = response || [];
        });
    };
    ManageComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-manage',
            template: __webpack_require__("./src/app/pages/reward/manage/manage.component.html"),
            styles: [__webpack_require__("./src/app/pages/reward/manage/manage.component.scss")],
            providers: [__WEBPACK_IMPORTED_MODULE_3__reward_service__["a" /* RewardService */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* Router */], __WEBPACK_IMPORTED_MODULE_2__shared_header_navigation_navigation_service__["a" /* NavigationService */], __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */],
            __WEBPACK_IMPORTED_MODULE_6__shared_preloader_preloader_component__["b" /* PreloaderService */], __WEBPACK_IMPORTED_MODULE_3__reward_service__["a" /* RewardService */],
            __WEBPACK_IMPORTED_MODULE_8__shared_sidebar_sidebar_component__["b" /* SidebarService */]])
    ], ManageComponent);
    return ManageComponent;
}());



/***/ }),

/***/ "./src/app/pages/reward/manage/manage.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ManageModule", function() { return ManageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("./node_modules/@angular/common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__manage_component__ = __webpack_require__("./src/app/pages/reward/manage/manage.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__component_card_actions_card_actions_module__ = __webpack_require__("./src/app/pages/component/card-actions/card-actions.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_common_http__ = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ng_bootstrap_ng_bootstrap__ = __webpack_require__("./node_modules/@ng-bootstrap/ng-bootstrap/index.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};








var routes = [
    {
        path: '',
        data: {
            urls: [
                { title: 'หน้าหลัก', url: '/' },
                { title: 'ค้นหาคำร้องขอรับเงินสินบนรางวัล', url: '/reward/list' },
                { title: 'จัดการข้อมูลคำร้องขอรับเงินสินบนรางวัล' }
            ],
            pageType: 'manage'
            // nextPage: { title: '...', url: '#' }
        },
        component: __WEBPACK_IMPORTED_MODULE_2__manage_component__["a" /* ManageComponent */]
    }
];
var ManageModule = /** @class */ (function () {
    function ManageModule() {
    }
    ManageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_4__angular_forms__["g" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["b" /* CommonModule */],
                __WEBPACK_IMPORTED_MODULE_5__component_card_actions_card_actions_module__["a" /* CardActionsModule */],
                __WEBPACK_IMPORTED_MODULE_6__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_7__ng_bootstrap_ng_bootstrap__["e" /* NgbModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_router__["d" /* RouterModule */].forChild(routes)
            ],
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__manage_component__["a" /* ManageComponent */]
            ]
        })
    ], ManageModule);
    return ManageModule;
}());



/***/ })

});
//# sourceMappingURL=manage.module.4.chunk.js.map