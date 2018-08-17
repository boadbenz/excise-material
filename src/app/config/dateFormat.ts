export function toLocalNumeric(date: string): string {
    if (date === '' || date == null) {
        return null;
    }

    const _date = new Date(date)
    const dd = this.setZero(_date.getDate());
    const mm = this.setZero(_date.getMonth() + 1);
    const yyyy = _date.getFullYear() + 543;

    return `${yyyy}-${mm}-${dd}`;
}

export function resetLocalNumeric(date: string): string {
    if (date === '' || date == null) {
        return null;
    }

    const _date = new Date(date)
    const dd = this.setZero(_date.getDate());
    const mm = this.setZero(_date.getMonth() + 1);
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

export function compareDate(sDate: string, eDate: string): boolean {
    if (!sDate && !eDate) return true;

    const sDateCompare = new Date(sDate);
    const eDateCompare = new Date(eDate);

    if (sDateCompare.valueOf() > eDateCompare.valueOf()) return false;

    return true;
}

