import { IMyOptions } from "mydatepicker-th";

export function toLocalNumeric(date: string): string {
    if (date === '' || date == null) {
        return null;
    }

    const _date = new Date(date)
    const dd = setZero(_date.getDate());
    const mm = setZero(_date.getMonth() + 1);
    const yyyy = _date.getFullYear() + 543;

    return `${yyyy}-${mm}-${dd}`;
}

export function resetLocalNumeric(date: string): string {
    if (date === '' || date == null) {
        return null;
    }

    const _date = new Date(date)
    const dd = setZero(_date.getDate());
    const mm = setZero(_date.getMonth() + 1);
    const yyyy = _date.getFullYear() - 543;

    return `${yyyy}-${mm}-${dd}`;
}

export function setZero(num: number) {
    return num < 10 ? '0' + num : num;
}

export function toLocalShort(date: string): string {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    const dd = new Date(date);
    return dd.toLocaleString('th-TH', options);
}

export function compareDate(sDate: Date, eDate: Date): boolean {
    if (!sDate && !eDate) return true;

    const sDateCompare = new Date(sDate);
    const eDateCompare = new Date(eDate);

    if (sDateCompare.valueOf() > eDateCompare.valueOf()) return false;

    return true;
}

export function toTimeShort(date: string): string {
    var options = { hour: 'numeric', minute: 'numeric' };
    return new Date(date).toLocaleTimeString('th-TH', options);
}

export const MyDatePickerOptions: IMyOptions = {
    dateFormat: 'dd mmm yyyy',
    showClearDateBtn: false,
    height: '30px',
    alignSelectorRight: true,
    openSelectorOnInputClick: true,
    editableDateField: false
};

export function setDateMyDatepicker(date: any) {
    if (!date)
        return { myDate: null };

    if (date.jsdate) {
        return date;
    } else {
        const d = new Date(date)
        return { date: { year: d.getFullYear(), month: d.getMonth() + 1, day: d.getDate() } };
    }
}

export function getDateMyDatepicker(date: any) {
    if (!date)
        return null;
        
    if (date.date) {
        const d = date.date;
        return new Date(`${d.year}-${d.month}-${d.day}`);
    } else {
        return date;
    }
    
}

export function convertDateForSave(date: Date) {
    if (!date)
        return null;

    date.setHours(0, -date.getTimezoneOffset(), 0, 0);
    let d = date.toISOString();
    d = d.replace('T', ' ').split('.')[0];
    return d;
}

export function setZeroHours(date: Date): string {
    if (!date)
        return null;

    date = new Date(date);
    date.setHours(0, -date.getTimezoneOffset(), 0, 0);
    return date.toISOString();
}

