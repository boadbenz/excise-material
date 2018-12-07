// import * as $ from 'jquery';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { LocationStrategy, HashLocationStrategy, CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NavigationComponent } from './shared/header-navigation/navigation.component';
import { SidebarComponent, SidebarService } from './shared/sidebar/sidebar.component';
import { BreadcrumbComponent } from './shared/breadcrumb/breadcrumb.component';
import { RightSidebarComponent } from './shared/right-sidebar/rightsidebar.component';
import { AppComponent } from './app.component';
import { routes } from './app.routing';
import { NavigationService } from './shared/header-navigation/navigation.service';
import { PreloaderModule } from './shared/preloader/preloader.module';

import { MatAutocompleteModule } from '@angular/material';
import { LayoutComponent } from './shared/layout/layout.component';
import { AuthGuard } from './pages/login/auth.guard';
import { CoreModule } from './core/core.module';
import { StoreModule } from '@ngrx/store';
import { MainMasterService } from './services/main-master.service';
import { HttpClientModule } from '@angular/common/http';

import * as fromArrestReducers from './pages/arrests/store/reducers/';
import * as fromInvestReducers from './pages/investigation/store/reducers';
import { TransactionRunningService } from './services/transaction-running.service';
import { MasDocumentMainService } from './services/mas-document-main.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ManageConfig } from './pages/arrests/components/manage/manage.config';


@NgModule({
    declarations: [
        AppComponent,
        NavigationComponent,
        BreadcrumbComponent,
        SidebarComponent,
        RightSidebarComponent,
        LayoutComponent,  
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        BrowserModule,
        BrowserAnimationsModule,
        NgbModule.forRoot(),
        FormsModule,
        HttpModule,
        HttpClientModule,
        RouterModule.forRoot(routes),
        PreloaderModule,
        CoreModule,
        MatAutocompleteModule,
        StoreModule.forRoot(
            {
                arrest: fromArrestReducers.arrestReducer,
                invest: fromInvestReducers.investReducer
            })
    ],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        AuthGuard,
        NavigationService,
        ManageConfig,
        SidebarService,
        MainMasterService,
        MasDocumentMainService,
        TransactionRunningService
    ],
    exports: [MatAutocompleteModule],
    bootstrap: [AppComponent]
})

export class AppModule { }

