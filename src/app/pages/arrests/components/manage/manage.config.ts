import { BehaviorSubject } from "rxjs";

export class ManageConfig {
    ILG60_03_02_00_00_E08 = new BehaviorSubject<Boolean>(true);
    ILG60_03_02_00_00_E10 = new BehaviorSubject<Boolean>(false);
    ILG60_03_02_00_00_E13 = new BehaviorSubject<Boolean>(true);
    ILG60_03_02_00_00_E18 = new BehaviorSubject<Boolean>(false);
    ILG60_03_02_00_00_E20 = new BehaviorSubject<Boolean>(false);
    ILG60_03_02_00_00_E21 = new BehaviorSubject<Boolean>(false);
    ILG60_03_03_00_00_E15 = new BehaviorSubject<Boolean>(false);
    ILG60_03_02_00_00_E25 = new BehaviorSubject<Boolean>(false);
    ILG60_03_02_00_00_E28 = new BehaviorSubject<Boolean>(false);

    onCollapse(event: BehaviorSubject<Boolean>) {
        if (event.getValue()) {
            event.next(false);
        } else {
            event.next(true);
        }
    }
}