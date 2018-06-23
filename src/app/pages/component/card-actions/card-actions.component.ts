import { Component, OnInit } from '@angular/core';

declare var jQuery: any;

@Component({
    selector: 'app-card-actions',
    templateUrl: './card-actions.component.html'
})
export class CardActionsComponent {
}

@Component({
    selector: 'app-card-actions-close',
    template: 
    `<div class="card-actions">
        <a class="" (click)="close($event)">
            <i class="fa fa-times"></i>
        </a>
    </div>`,
})
export class CardActionsCloseComponent {
    close(e): void {
        e.preventDefault();
        const ibox = jQuery(e.target).closest('div.card');
        ibox.slideToggle(200);
    }
}

@Component({
    selector: 'app-card-actions-collapse',
    template: 
    `<div class="card-actions">
        <a class="" (click)="collapse($event)">
            <i class="fa fa-chevron-down"></i>
        </a>
    </div>`,
})
export class CardActionsCollapseComponent {
    collapse(e): void {
        e.preventDefault();
        const ibox = jQuery(e.target).closest('div.card');
        const button = jQuery(e.target).closest('i');
        const content = ibox.children('.card-body');
        content.slideToggle(200);
        button.toggleClass('fa-chevron-down').toggleClass('fa-chevron-up');
        ibox.toggleClass('').toggleClass('border-bottom');
        setTimeout(function () {
            ibox.resize();
            ibox.find('[id^=map-]').resize();
        }, 50);

    }
}
