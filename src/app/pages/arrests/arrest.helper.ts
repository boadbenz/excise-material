import { FormArray } from "@angular/forms";

export function groupArrayItem(array: any[], arg: any) {
    return array.reduce((a, b) => {
        var i = a.findIndex(x => x[arg] === b[arg]);
        return i === -1 ? a.push(b) : a[i], a;
    }, []);
}

export function removeObjectItem(obj: any, arg) {
    return Object.keys(obj).reduce((object, key) => {
        if (key !== arg) {
            object[key] = obj[key]
        }
        return object
    }, {})
}

export async function sortFormArray(arr: any[], arg: string) {
    let a = await arr.sort((a, b) => {
        if (a[arg] < b[arg]) return -1; // asc
        if (a[arg] > b[arg]) return 1; // desc
        return 0;
    });
    let i = 0;
    a.map((x) => { if (x[arg] != 0) x[arg] = ++i; });
    return a;
}

export const IntialLastRowID: number = 9999;
export function sortingArray(arr: any[], arg: string) {
    let a = arr.sort((a, b) => {
        if (a[arg] < b[arg]) return -1; // asc
        if (a[arg] > b[arg]) return 1; // desc
        return 0;
    });
    let i = 0;
    a.map((x) => { if (x[arg] < IntialLastRowID) x[arg] = ++i; });
    return a;
}

export function clearFormArray(formArray: FormArray) {
    while (formArray.length !== 0) {
        formArray.removeAt(0)
    }
}