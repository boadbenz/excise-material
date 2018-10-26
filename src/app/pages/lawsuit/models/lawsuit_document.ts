import { FormControl } from '@angular/forms';
export class LawsuitDocument {
  public RowsId: number;
  public DocumentID: number;
  public ReferenceCode: string;
  public FilePath: string;
  public DataSource: string;
  public DocumentType: number;
  public DocumentName: string;
  public IsActive: number;
  public IsNewItem: boolean;
}

export const LawsuitDocumentFormControl = {
  // DocumentID: new FormControl(null),
  // ReferenceCode: new FormControl(null),
  // FilePath: new FormControl(null),
  // DataSource: new FormControl(null),
  // DocumentType: new FormControl(null),
  // DocumentName: new FormControl(null),
  // IsActive: new FormControl(null),
  // IsNewItem: new FormControl(null)
  DocumentID: new FormControl(null),
  ReferenceCode: new FormControl(null),
  FilePath: new FormControl(null),
  DataSource: new FormControl(null),
  IsActive: new FormControl(null),
  IsNewItem: new FormControl(null)
}