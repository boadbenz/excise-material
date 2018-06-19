import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadChildren: './pages/starter/starter.module#StarterModule'
    }, {
        path: 'notice',
        children: [
            { path: 'list', loadChildren: './pages/notices/list/list.module#ListModule' },
            { path: 'manage/:mode', loadChildren: './pages/notices/manage/manage.module#ManageModule' }
        ]
    },

    // {
    //     path: 'accordion',
    //     loadChildren: './pages/component/accordion/accordion.module#AccordionModule'
    // }, {
    //     path: 'alert',
    //     loadChildren: './pages/component/alert/alert.module#NgAlertModule'
    // }, {
    //     path: 'carousel',
    //     loadChildren: './pages/component/carousel/carousel.module#ButtonsModule'
    // }, {
    //     path: 'datepicker',
    //     loadChildren: './pages/component/datepicker/datepicker.module#DatepickerModule'
    // }, {
    //     path: 'dropdown',
    //     loadChildren: './pages/component/dropdown-collapse/dropdown-collapse.module#DropdownModule'
    // }, {
    //     path: 'modal',
    //     loadChildren: './pages/component/modal/modal.module#ModalModule'
    // }, {
    //     path: 'pagination',
    //     loadChildren: './pages/component/pagination/pagination.module#paginationModule'
    // }, {
    //     path: 'Popovertooltip',
    //     loadChildren: './pages/component/popover-tooltip/popover-tooltip.module#PopoverTooltipModule'
    // }, {
    //     path: 'progressbar',
    //     loadChildren: './pages/component/progressbar/progressbar.module#progressbarModule'
    // }, {
    //     path: 'rating',
    //     loadChildren: './pages/component/rating/rating.module#RatingModule'
    // }, {
    //     path: 'tabs',
    //     loadChildren: './pages/component/tabs/tabs.module#TabsModule'
    // }, {
    //     path: 'timepicker',
    //     loadChildren: './pages/component/timepicker/timepicker.module#TimepickerModule'
    // }, {
    //     path: 'typehead',
    //     loadChildren: './pages/component/typehead/typehead.module#TypeheadModule'
    // }, {
    //     path: 'fontawesome',
    //     loadChildren: './pages/icons/fontawesome/fontawesome.module#FontawesomeModule'
    // }, {
    //     path: 'simpleline',
    //     loadChildren: './pages/icons/simpleline/simpleline.module#SimplelineIconModule'
    // }, {
    //     path: 'material',
    //     loadChildren: './pages/icons/material/material.module#MaterialComponentModule'
    // }
];
