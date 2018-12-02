export class RewardCommon {
    static isDate(date: Date) {
        return isNaN(date.getTime())
    }

    static isVerifyDate(form: Date, to: Date) {
        return form.getTime() > to.getTime();
    }
}
