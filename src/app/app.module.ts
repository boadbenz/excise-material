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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
    declarations: [
        AppComponent,
        NavigationComponent,
        BreadcrumbComponent,
        SidebarComponent,
        RightSidebarComponent,
        LayoutComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        BrowserModule,
        BrowserAnimationsModule,
        NgbModule.forRoot(),
        FormsModule,
        HttpModule,
        RouterModule.forRoot(routes),
        PreloaderModule,
        MatAutocompleteModule
    ],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        AuthGuard,
        NavigationService,
        SidebarService
    ],
    exports: [MatAutocompleteModule],
    bootstrap: [AppComponent]
})

export class AppModule {}

