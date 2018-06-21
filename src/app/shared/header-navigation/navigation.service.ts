import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class NavigationService {

	private modeSource = new BehaviorSubject<string>('');
	private actionSave = new BehaviorSubject<boolean>(false);
	private actionCancel = new BehaviorSubject<boolean>(false);
	private actionPrint = new BehaviorSubject<boolean>(false);
	private actionEdit = new BehaviorSubject<boolean>(false);
	private actionToCreate = new BehaviorSubject<boolean>(false);

	currentMode = this.modeSource.asObservable();
	currentActionSave = this.actionSave.asObservable();
	currentActionCancel = this.actionCancel.asObservable();
	currentActionPrint = this.actionPrint.asObservable();
	currentActionEdit = this.actionEdit.asObservable();
	currentActionToCreate = this.actionToCreate.asObservable();

	constructor() { }

	changeMode(data: string) {
		this.modeSource.next(data);
	}

	onActionSave(e: boolean) {
		this.actionSave.next(e);
	}

	onActionEdit(e: boolean) {
		this.actionEdit.next(e);
	}

	onActionPrint(e: boolean) {
		this.actionPrint.next(e);
	}

	onActionCancel(e: boolean) {
		this.actionCancel.next(e);
	}

	onActionNextToCreate(e: boolean) {
		this.actionToCreate.next(e);
	}

}
