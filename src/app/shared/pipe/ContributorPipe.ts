import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'ContributorPipe',
    pure: false
})

export class ContributorPipe implements PipeTransform {
    transform(items: any[], code: string): any {
        return items.filter(item => item.ContributorCode == code);
    }
}