import { Routes } from '@angular/router';
import { LayoutComponent } from './shared/layout/layout.component';
import { AuthGuard } from './pages/login/auth.guard';

export const routes: Routes = [

   
    {
        path: '',canActivate: [AuthGuard], redirectTo: 'home', pathMatch: 'full'
    }, {
        path: 'login', loadChildren: './pages/login/login.module#LoginModule'
    }, {
        path: 'home', loadChildren: './pages/starter/starter.module#StarterModule', component: LayoutComponent, canActivate: [AuthGuard]
    }, {
        path: 'notice', component: LayoutComponent, canActivate: [AuthGuard],
        children: [
            { path: 'list', loadChildren: './pages/notices/list/list.module#ListModule' },
            { path: 'manage/:mode/:code', loadChildren: './pages/notices/manage/manage.module#ManageModule' },
            { path: 'suspect/:mode/:code', loadChildren: './pages/notices/suspect/suspect.module#SuspectModule' }
        ]
    }, {
        // canActivate: [AuthGuard],
        path: 'arrest', component: LayoutComponent, canActivate: [AuthGuard],
        loadChildren: './pages/arrests/arrest.module#ArrestModule'
    }, {
        // canActivate: [AuthGuard],
        path: 'suppression/investigation', component: LayoutComponent, canActivate: [AuthGuard],
        loadChildren: './pages/investigation/investigation.module#InvestigationModule'
    }, {
        path: 'prove', component: LayoutComponent, canActivate: [AuthGuard],
        children: [
            { path: 'list', loadChildren: './pages/prove/list/list.module#ListModule' },
            { path: 'manage/:mode/:code1/:code2', loadChildren: './pages/prove/manage/manage.module#ManageModule' }
        ]
    },
    {
        path: 'income', component: LayoutComponent, canActivate: [AuthGuard],
        children: [
            { path: 'list', loadChildren: './pages/income/list/list.module#ListModule' },
            { path: 'manage/:mode/:code', loadChildren: './pages/income/manage/manage.module#ManageModule' }
        ]
    }, {
        path: 'lawsuit', component: LayoutComponent, canActivate: [AuthGuard],
        children: [
            { path: 'list', loadChildren: './pages/lawsuit/list/list.module#ListModule' },
            { path: 'manage/:mode', loadChildren: './pages/lawsuit/manage/manage.module#ManageModule' },
            { path: 'detail/:mode', loadChildren: './pages/lawsuit/detail/detail.module#DetailModule' }
        ]
    }, {
        path: 'fine', component: LayoutComponent, canActivate: [AuthGuard],
        children: [
            { path: 'list', loadChildren: './pages/fine/list/list.module#ListModule' },
            { path: 'manage/:mode/:code1/:code2/:code3', loadChildren: './pages/fine/manage/manage.module#ManageModule' },
            { path: 'detail', loadChildren: './pages/fine/detail/detail.module#DetailModule' },
        ]
    }, 
    // {
    //     path: 'uac', component: LayoutComponent, canActivate: [AuthGuard],
    //     children: [
    //         { path: 'list', loadChildren: './pages/UAC/list/list.module#ListModule' },
    //         { path: 'manage', loadChildren: './pages/UAC/manage/manage.module#ManageModule' }
    //     ]
    // }, 
    {
        path: 'uac', component: LayoutComponent, canActivate: [AuthGuard],
        children: [
            { path: 'useraccount/list', loadChildren: './pages/UAC/useraccount/list/list.module#ListModule' },
            { path: 'useraccount/manage', loadChildren: './pages/UAC/useraccount/manage/manage.module#ManageModule' },

            { path: 'role/list', loadChildren: './pages/UAC/role/list/list.module#ListModule' },
            { path: 'role/manage', loadChildren: './pages/UAC/role/manage/manage.module#ManageModule' }
        ]
    },  
    {
        path: 'report', component: LayoutComponent, canActivate: [AuthGuard],
        children: [
            { path: 'list', loadChildren: './pages/report/list/list.module#ListModule' },
            { path: 'manage', loadChildren: './pages/report/manage/manage.module#ManageModule' }
        ]
    }, 
    {
        path: 'masProducts', component: LayoutComponent, canActivate: [AuthGuard],
        children: [
            { path: 'list', loadChildren: './pages/masProducts/list/list.module#ListModule' },
            { path: 'manage/:mode/:code', loadChildren: './pages/masProducts/manage/manage.module#ManageModule' }
        ]
    },
    // {
    //     path: 'reward', component: LayoutComponent,
    //     children: [
    //         // { path: 'list', loadChildren: './pages/reward/list/list.module#ListModule' },
    //         // { path: 'manage/:mode/:code', loadChildren: './pages/reward/manage/manage.module#ManageModule' },
    //         // { path: 'bribe/:mode', loadChildren: './pages/reward/bribe/bribe.module#BribeModule' },
    //         // { path: 'reward/:mode/:caseSelect', loadChildren: './pages/reward/reward/reward.module#RewardModule' }
    //     ]
    // },
    {
        path: 'reward', canActivate: [AuthGuard],
        component: LayoutComponent,
        loadChildren: './pages/reward/reward.module#RewardModule'
    },
    {
        path: 'logout', loadChildren: './pages/login/login.module#LoginModule'
    },
     {
        path: 'reduction', component: LayoutComponent, 
        children: [
            { path: 'list', loadChildren: './pages/reduction/list/list.module#ListModule' },
            { path: 'manage/:mode', loadChildren: './pages/reduction/manage/manage.module#ManageModule' },
            {
                path: 'manage/:mode/:compareid/:comparedetailid',
                loadChildren: './pages/reduction/manage-detail/manage-detail.module#ManageDetailModule'
            }
        ]
    },

    {
        path: 'accordion',
        component: LayoutComponent,
        loadChildren: './pages/component/accordion/accordion.module#AccordionModule'
    },
    {
        path: 'alert',
        component: LayoutComponent,
        loadChildren: './pages/component/alert/alert.module#NgAlertModule'
    },
    {
        path: 'carousel',
        component: LayoutComponent,
        loadChildren: './pages/component/carousel/carousel.module#ButtonsModule'
    },
    {
        path: 'datepicker',
        component: LayoutComponent,
        loadChildren:
            './pages/component/datepicker/datepicker.module#DatepickerModule'
    },
    {
        path: 'dropdown',
        component: LayoutComponent,
        loadChildren:
            './pages/component/dropdown-collapse/dropdown-collapse.module#DropdownModule'
    },
    {
        path: 'modal',
        component: LayoutComponent,
        loadChildren: './pages/component/modal/modal.module#ModalModule'
    },
    {
        path: 'pagination',
        component: LayoutComponent,
        loadChildren:
            './pages/component/pagination/pagination.module#paginationModule'
    },
    {
        path: 'Popovertooltip',
        component: LayoutComponent,
        loadChildren:
            './pages/component/popover-tooltip/popover-tooltip.module#PopoverTooltipModule'
    },
    {
        path: 'progressbar',
        component: LayoutComponent,
        loadChildren:
            './pages/component/progressbar/progressbar.module#progressbarModule'
    },
    {
        path: 'rating',
        component: LayoutComponent,
        loadChildren: './pages/component/rating/rating.module#RatingModule'
    },
    {
        path: 'tabs',
        component: LayoutComponent,
        loadChildren: './pages/component/tabs/tabs.module#TabsModule'
    },
    {
        path: 'timepicker',
        component: LayoutComponent,
        loadChildren:
            './pages/component/timepicker/timepicker.module#TimepickerModule'
    },
    {
        path: 'typehead',
        component: LayoutComponent,
        loadChildren: './pages/component/typehead/typehead.module#TypeheadModule'
    },
    {
        path: 'fontawesome',
        component: LayoutComponent,
        loadChildren:
            './pages/icons/fontawesome/fontawesome.module#FontawesomeModule'
    },
    {
        path: 'simpleline',
        component: LayoutComponent,
        loadChildren:
            './pages/icons/simpleline/simpleline.module#SimplelineIconModule'
    },
    {
        path: 'material',
        component: LayoutComponent,
        loadChildren:
            './pages/icons/material/material.module#MaterialComponentModule'
    },
    {
        path: 'evidenceIn', component: LayoutComponent, canActivate: [AuthGuard],
        children: [
            { path: 'list', loadChildren: './pages/evidenceIn/list/list.module#ListModule' },
            { path: 'manage/:type/:mode/:code/:proveid', loadChildren: './pages/evidenceIn/manage/manage.module#ManageModule' }
        ]
    },
    {
        path: 'evidenceOut', component: LayoutComponent, canActivate: [AuthGuard],
        children: [
            { path: 'list/:type', loadChildren: './pages/evidenceOut/list/list.module#ListModule' },
            { path: 'manage/:type/:mode/:code', loadChildren: './pages/evidenceOut/manage/manage.module#ManageModule' }
        ]
    },
    {
        path: 'evidenceStock', component: LayoutComponent, canActivate: [AuthGuard],
        children: [
            { path: 'list', loadChildren: './pages/evidenceStock/list/list.module#ListModule' },
            { path: 'manage/:code', loadChildren: './pages/evidenceStock/manage/manage.module#ManageModule' },
        ]
    },
    {
        path: 'msArrestTeam', component: LayoutComponent, canActivate: [AuthGuard],
        children: [
            { path: 'list', loadChildren: './pages/masters/msArrestTeam/list/list.module#ListModule' },
            { path: 'manage/:code', loadChildren: './pages/masters/msArrestTeam/manage/manage.module#ManageModule' }
        ]
    },
    {
        path: 'msCourt', component: LayoutComponent, canActivate: [AuthGuard],
        children: [
            { path: 'list', loadChildren: './pages/masters/msCourt/list/list.module#ListModule' },
            { path: 'manage/:code', loadChildren: './pages/masters/msCourt/manage/manage.module#ManageModule' }
        ]
    },
    {
        path: 'msCountry', component: LayoutComponent, canActivate: [AuthGuard],
        children: [
            { path: 'list', loadChildren: './pages/masters/msCountry/list/list.module#ListModule' },
            { path: 'manage/:code', loadChildren: './pages/masters/msCountry/manage/manage.module#ManageModule' }
        ]
    },
    {
        path: 'msProvince', component: LayoutComponent, canActivate: [AuthGuard],
        children: [
            { path: 'list', loadChildren: './pages/masters/msProvince/list/list.module#ListModule' },
            { path: 'manage/:code', loadChildren: './pages/masters/msProvince/manage/manage.module#ManageModule' }
        ]
    },
    {
        path: 'msDistrict', component: LayoutComponent, canActivate: [AuthGuard],
        children: [
            { path: 'list', loadChildren: './pages/masters/msDistrict/list/list.module#ListModule' },
            { path: 'manage/:code', loadChildren: './pages/masters/msDistrict/manage/manage.module#ManageModule' }
        ]
    },
    {
        path: 'msSubDistrict', component: LayoutComponent, canActivate: [AuthGuard],
        children: [
            { path: 'list', loadChildren: './pages/masters/msSubDistrict/list/list.module#ListModule' },
            { path: 'manage/:code', loadChildren: './pages/masters/msSubDistrict/manage/manage.module#ManageModule' }
        ]
    },
    {
        path: 'msRelation', component: LayoutComponent, canActivate: [AuthGuard],
        children: [
            { path: 'list', loadChildren: './pages/masters/msRelation/list/list.module#ListModule' },
            { path: 'manage/:code', loadChildren: './pages/masters/msRelation/manage/manage.module#ManageModule' }
        ]
    },
    {
        path: 'msNationality', component: LayoutComponent, canActivate: [AuthGuard],
        children: [
            { path: 'list', loadChildren: './pages/masters/msNationality/list/list.module#ListModule' },
            { path: 'manage/:code', loadChildren: './pages/masters/msNationality/manage/manage.module#ManageModule' }
        ]
    },
    {
        path: 'msRace', component: LayoutComponent, canActivate: [AuthGuard],
        children: [
            { path: 'list', loadChildren: './pages/masters/msRace/list/list.module#ListModule' },
            { path: 'manage/:code', loadChildren: './pages/masters/msRace/manage/manage.module#ManageModule' }
        ]
    },
    {
        path: 'msReligion', component: LayoutComponent, canActivate: [AuthGuard],
        children: [
            { path: 'list', loadChildren: './pages/masters/msReligion/list/list.module#ListModule' },
            { path: 'manage/:code', loadChildren: './pages/masters/msReligion/manage/manage.module#ManageModule' }
        ]
    },
    {
        path: 'msTitle', component: LayoutComponent, canActivate: [AuthGuard],
        children: [
            { path: 'list', loadChildren: './pages/masters/msTitle/list/list.module#ListModule' },
            { path: 'manage/:code', loadChildren: './pages/masters/msTitle/manage/manage.module#ManageModule' }
        ]
    },
    {
        path: 'msDivisionRate', component: LayoutComponent, canActivate: [AuthGuard],
        children: [
            { path: 'manage', loadChildren: './pages/masters/msDivisionRate/manage/manage.module#ManageModule' }
        ]
    },
    {
        path: 'msRawardDivision', component: LayoutComponent, canActivate: [AuthGuard],
        children: [
            { path: 'manage', loadChildren: './pages/masters/msRawardDivision/manage/manage.module#ManageModule' }
        ]
    },
    {
        path: 'msRawardRateDivision', component: LayoutComponent, canActivate: [AuthGuard],
        children: [
            { path: 'manage', loadChildren: './pages/masters/msRawardRateDivision/manage/manage.module#ManageModule' }
        ]
    },
    {
        path: 'msLawGroup', component: LayoutComponent, canActivate: [AuthGuard],
        children: [
            { path: 'list', loadChildren: './pages/masters/msLawGroup/list/list.module#ListModule' },
            { path: 'manage/:code', loadChildren: './pages/masters/msLawGroup/manage/manage.module#ManageModule' }
        ]
    },
    {
        path: 'msSection', component: LayoutComponent, canActivate: [AuthGuard],
        children: [
            { path: 'list', loadChildren: './pages/masters/msSection/list/list.module#ListModule' },
            { path: 'manage/:code', loadChildren: './pages/masters/msSection/manage/manage.module#ManageModule' }
        ]
    },
    {
        path: 'msWarehouse', component: LayoutComponent, canActivate: [AuthGuard],
        children: [
            { path: 'list', loadChildren: './pages/masters/msWarehouse/list/list.module#ListModule' },
            { path: 'manage/:code', loadChildren: './pages/masters/msWarehouse/manage/manage.module#ManageModule' }
        ]
    }
];
