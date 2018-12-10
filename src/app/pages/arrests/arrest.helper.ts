export function groupArrayItem(array: any[], arg: any) {
    return array.reduce((a, b) => {
        var i = a.findIndex(x => x[arg] === b[arg]);
        return i === -1 ? a.push(b) : a[i], a;
    }, []);
}
