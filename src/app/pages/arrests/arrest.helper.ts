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

export function clearFormArray(formArray: FormArray) {
    while (formArray.length !== 0) {
        formArray.removeAt(0)
    }
}