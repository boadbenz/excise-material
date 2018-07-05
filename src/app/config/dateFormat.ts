export function toLocalNumeric(date: string): string {
    if (date === '' || date == null) {
        return null;
    }

    const dd = new Date(date).getDay();
    const mm = new Date(date).getMonth() + 1;
    const yyyy = new Date(date).getFullYear() + 543;

    const _dd = (dd < 10 ? '0' + dd : dd);
    const _mm = (mm < 10 ? '0' + mm : mm);

    return `${yyyy}-${_mm}-${_dd}`;
}

export function toLocalShort(date: string): string {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    const dd = new Date(date);
    return dd.toLocaleString('th-TH', options);
}

