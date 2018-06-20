import { NavigationService } from './shared/header-navigation/navigation.service';
import * as $ from 'jquery';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NavigationComponent } from './shared/header-navigation/navigation.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { BreadcrumbComponent } from './shared/breadcrumb/breadcrumb.component';
import { RightSidebarComponent } from './shared/right-sidebar/rightsidebar.component';
import { AppComponent } from './app.component';
import { Xcs6004020000Service } from './pages/component/xcs60-04-02-00-00/xcs60-04-02-00-00.service';
import { Xcs6004030000Service } from './pages/component/xcs60-04-03-00-00/xcs60-04-03-00-00.service';


const routes: Routes = [
    {
        path: '',
        loadChildren: './pages/starter/starter.module#StarterModule'
    }, {
        path: 'accordion',
        loadChildren: './pages/component/accordion/accordion.module#AccordionModule'
    }, {
        path: 'alert',
        loadChildren: './pages/component/alert/alert.module#NgAlertModule'
    }, {
        path: 'carousel',
        loadChildren: './pages/component/carousel/carousel.module#ButtonsModule'
    }, {
        path: 'datepicker',
        loadChildren: './pages/component/datepicker/datepicker.module#DatepickerModule'
    }, {
        path: 'dropdown',
        loadChildren: './pages/component/dropdown-collapse/dropdown-collapse.module#DropdownModule'
    }, {
        path: 'modal',
        loadChildren: './pages/component/modal/modal.module#ModalModule'
    }, {
        path: 'pagination',
        loadChildren: './pages/component/pagination/pagination.module#paginationModule'
    }, {
        path: 'Popovertooltip',
        loadChildren: './pages/component/popover-tooltip/popover-tooltip.module#PopoverTooltipModule'
    }, {
        path: 'progressbar',
        loadChildren: './pages/component/progressbar/progressbar.module#progressbarModule'
    }, {
        path: 'rating',
        loadChildren: './pages/component/rating/rating.module#RatingModule'
    }, {
        path: 'tabs',
        loadChildren: './pages/component/tabs/tabs.module#TabsModule'
    }, {
        path: 'timepicker',
        loadChildren: './pages/component/timepicker/timepicker.module#TimepickerModule'
    }, {
        path: 'typehead',
        loadChildren: './pages/component/typehead/typehead.module#TypeheadModule'
    }, 
    {
        path: 'ILG60-04-01-00',
        loadChildren: './pages/component/xcs60-04-01-00-00/xcs60-04-01-00-00.module#Xcs6004010000Module'
    },
    {
        path: 'ILG60-04-02-00',
        loadChildren: './pages/component/xcs60-04-02-00-00/xcs60-04-02-00-00.module#Xcs6004020000Module'
    },
    {
        path: 'ILG60-04-03-00',
        loadChildren: './pages/component/xcs60-04-03-00-00/xcs60-04-03-00-00.module#Xcs6004030000Module'
    },{
        path: 'fontawesome',
        loadChildren: './pages/icons/fontawesome/fontawesome.module#FontawesomeModule'
    }, {
        path: 'simpleline',
        loadChildren: './pages/icons/simpleline/simpleline.module#SimplelineIconModule'
    }, {
        path: 'material',
        loadChildren: './pages/icons/material/material.module#MaterialComponentModule'
    }
];

@NgModule({
    declarations: [
        AppComponent,
        NavigationComponent,
        BreadcrumbComponent,
        SidebarComponent,
        RightSidebarComponent,
    ],
    imports: [
        BrowserModule,
        NgbModule.forRoot(),
        FormsModule,
        HttpModule,
        RouterModule.forRoot(routes)
    ],
    providers: [NavigationService, Xcs6004020000Service, Xcs6004030000Service],
    bootstrap: [AppComponent]
})
export class AppModule { }
