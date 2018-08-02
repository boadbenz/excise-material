// import * as $ from 'jquery';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NavigationComponent } from './shared/header-navigation/navigation.component';
import { SidebarComponent, SidebarService } from './shared/sidebar/sidebar.component';
import { BreadcrumbComponent } from './shared/breadcrumb/breadcrumb.component';
import { RightSidebarComponent } from './shared/right-sidebar/rightsidebar.component';
import { AppComponent } from './app.component';
import { routes } from './app.routing';
import { NavigationService } from './shared/header-navigation/navigation.service';
import { PreloaderModule } from './shared/preloader/preloader.module';


@NgModule({
    declarations: [
        AppComponent,
        NavigationComponent,
        BreadcrumbComponent,
        SidebarComponent,
<<<<<<< HEAD
        RightSidebarComponent,
        
=======
        RightSidebarComponent
>>>>>>> FL_J
    ],
    imports: [
        BrowserModule,
        NgbModule.forRoot(),
        FormsModule,
        HttpModule,
        RouterModule.forRoot(routes),
<<<<<<< HEAD
       
=======
        PreloaderModule
>>>>>>> FL_J
    ],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        NavigationService,
        SidebarService
    ],
    bootstrap: [AppComponent]
})

export class AppModule {}

