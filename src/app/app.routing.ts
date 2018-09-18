import { Routes } from '@angular/router';
import { LayoutComponent } from './shared/layout/layout.component';
import { AuthGuard } from './pages/login/auth.guard';

export const routes: Routes = [
    {
        path: '', redirectTo: 'home', pathMatch: 'full'
    }, {
        path: 'login', loadChildren: './pages/login/login.module#LoginModule'
    }, {
        path: 'home', loadChildren: './pages/starter/starter.module#StarterModule', component: LayoutComponent, canActivate: [AuthGuard]
    }, {
        path: 'notice', component: LayoutComponent, canActivate: [AuthGuard],
        children: [
            { path: 'list', loadChildren: './pages/notices/list/list.module#ListModule' },
            { path: 'manage/:mode/:code', loadChildren: './pages/notices/manage/manage.module#ManageModule' },
            { path: 'lawbreaker/:mode/:code', loadChildren: './pages/notices/lawbreaker/lawbreaker.module#LawbreakerModule' },
            { path: 'suspect/:mode/:code', loadChildren: './pages/notices/suspect/suspect.module#SuspectModule' }
        ]
    }, {
        path: 'arrest', component: LayoutComponent, canActivate: [AuthGuard],
        children: [
            { path: 'list', loadChildren: './pages/arrests/list/list.module#ListModule' },
            { path: 'manage/:mode/:code', loadChildren: './pages/arrests/manage/manage.module#ManageModule' }
        ]
    }, {
        path: 'investigation', component: LayoutComponent, canActivate: [AuthGuard],
        children: [
            { path: 'list', loadChildren: './pages/investigation/list/list.module#ListModule' },
            { path: 'manage/:mode/:code', loadChildren: './pages/investigation/manage/manage.module#ManageModule' },
            {
                path: 'detail-manage/:mode/:code',
                loadChildren: './pages/investigation/detail-manage/detail-manage.module#DetailManageModule'
            }
        ]
    }, {
        path: 'prove', component: LayoutComponent,
        children: [
            { path: 'list', loadChildren: './pages/prove/list/list.module#ListModule' },
            { path: 'manage/:mode/:code1/:code2/:code3/:code4/:code5', loadChildren: './pages/prove/manage/manage.module#ManageModule' }
        ]
    },
    {
        path: 'income', component: LayoutComponent,
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
        path: 'reward', component: LayoutComponent,
        children: [
            { path: 'list', loadChildren: './pages/reward/list/list.module#ListModule' },
            { path: 'manage/:mode/:code', loadChildren: './pages/reward/manage/manage.module#ManageModule' },
            { path: 'bribe/:mode', loadChildren: './pages/reward/bribe/bribe.module#BribeModule' },
            { path: 'reward/:mode/:caseSelect', loadChildren: './pages/reward/reward/reward.module#RewardModule' }
        ]
    }, {
        path: 'reduction', component: LayoutComponent,
        children: [
            { path: 'list', loadChildren: './pages/reduction/list/list.module#ListModule' },
            { path: 'manage/:mode', loadChildren: './pages/reduction/manage/manage.module#ManageModule' },
            { path: 'manage/:mode/:code', loadChildren: './pages/reduction/manage-detail/manage-detail.module#ManageDetailModule' }
        ]
    },

    {
        path: 'accordion', component: LayoutComponent,
        loadChildren: './pages/component/accordion/accordion.module#AccordionModule'
    }, {
        path: 'alert', component: LayoutComponent,
        loadChildren: './pages/component/alert/alert.module#NgAlertModule'
    }, {
        path: 'carousel', component: LayoutComponent,
        loadChildren: './pages/component/carousel/carousel.module#ButtonsModule'
    }, {
        path: 'datepicker', component: LayoutComponent,
        loadChildren: './pages/component/datepicker/datepicker.module#DatepickerModule'
    }, {
        path: 'dropdown', component: LayoutComponent,
        loadChildren: './pages/component/dropdown-collapse/dropdown-collapse.module#DropdownModule'
    }, {
        path: 'modal', component: LayoutComponent,
        loadChildren: './pages/component/modal/modal.module#ModalModule'
    }, {
        path: 'pagination', component: LayoutComponent,
        loadChildren: './pages/component/pagination/pagination.module#paginationModule'
    }, {
        path: 'Popovertooltip', component: LayoutComponent,
        loadChildren: './pages/component/popover-tooltip/popover-tooltip.module#PopoverTooltipModule'
    }, {
        path: 'progressbar', component: LayoutComponent,
        loadChildren: './pages/component/progressbar/progressbar.module#progressbarModule'
    }, {
        path: 'rating', component: LayoutComponent,
        loadChildren: './pages/component/rating/rating.module#RatingModule'
    }, {
        path: 'tabs', component: LayoutComponent,
        loadChildren: './pages/component/tabs/tabs.module#TabsModule'
    }, {
        path: 'timepicker', component: LayoutComponent,
        loadChildren: './pages/component/timepicker/timepicker.module#TimepickerModule'
    }, {
        path: 'typehead', component: LayoutComponent,
        loadChildren: './pages/component/typehead/typehead.module#TypeheadModule'
    }, {
        path: 'fontawesome', component: LayoutComponent,
        loadChildren: './pages/icons/fontawesome/fontawesome.module#FontawesomeModule'
    }, {
        path: 'simpleline', component: LayoutComponent,
        loadChildren: './pages/icons/simpleline/simpleline.module#SimplelineIconModule'
    }, {
        path: 'material', component: LayoutComponent,
        loadChildren: './pages/icons/material/material.module#MaterialComponentModule'
    }
];
