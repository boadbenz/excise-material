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
import { StoreModule, MetaReducer } from '@ngrx/store';
// import { EffectsModule } from '@ngrx/effects';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';
// import { storeFreeze } from 'ngrx-store-freeze';
import { MainMasterService } from './services/main-master.service';
import { HttpClientModule } from '@angular/common/http';

import * as fromReducers from './pages/arrests/store/reducers/';
import { CanDeactiveGuard } from './guard/can-deactive.guard';

// const environment = {
//     development: true,
//     production: false,
// };

// export const metaReducers: MetaReducer<any>[] = !environment.production
//     ? [storeFreeze]
//     : [];

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
        NgbModule.forRoot(),
        FormsModule,
        HttpModule,
        HttpClientModule,
        RouterModule.forRoot(routes),
        PreloaderModule,
        CoreModule,
        MatAutocompleteModule,
        StoreModule.forRoot(
            {arrestProduct: fromReducers.productReducer}
            ),
        // EffectsModule.forRoot([]),
        // environment.development ? StoreDevtoolsModule.instrument() : [],
    ],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        AuthGuard,
        NavigationService,
        SidebarService,
        MainMasterService
    ],
    exports: [MatAutocompleteModule],
    bootstrap: [AppComponent]
})

export class AppModule { }

