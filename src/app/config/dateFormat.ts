export function toLocalNumeric(date: string): string {
    if (date === '' || date == null) {
        return null;
    }

    const _date = new Date(date)
    const dd = _date.getDate();
    const mm = _date.getMonth() + 1;
    const yyyy = _date.getFullYear() + 543;

    const _dd = dd < 10 ? '0' + dd : dd;
    const _mm = mm < 10 ? '0' + mm : mm;

    return `${yyyy}-${_mm}-${_dd}`;
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

export function toTimeShort(date: string): string {
  var options = { hour: 'numeric', minute: 'numeric' };
  return new Date(date).toLocaleTimeString('th-TH', options);
}

