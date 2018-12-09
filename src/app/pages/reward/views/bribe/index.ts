import { BribeComponent } from './bribe.component';
import { ILG6008030000E08Component } from './ILG60-08-03-00-00-E08/ILG60-08-03-00-00-E08.component';
import { ILG6008030000E12Component } from './ILG60-08-03-00-00-E12/ILG60-08-03-00-00-E12.component';
import { ILG6008030000E16Component } from './ILG60-08-03-00-00-E16/ILG60-08-03-00-00-E16.component';
import { BribeService } from './bribe.service';

export const BRIBE_COMPONENTS = [
  BribeComponent,
  ILG6008030000E08Component,
  ILG6008030000E12Component,
  ILG6008030000E16Component
];

export const BRIBE_SERVICES = [BribeService];
