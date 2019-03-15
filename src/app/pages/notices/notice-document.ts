import { FormControl } from '@angular/forms';

export class NoticeDocument {
    // public DocumentID = '';
    // public ReferenceCode = '';
    // public FilePath = '';
    // public DataSource = '';
    // DocumentType = '';
    // DocumentName = '';
    // public IsActive: number;
    public DocumentID: string;
    public DocumentName: string;
    public ReferenceCode: string;
    public FilePath: string;
    public DataSource: string;
    public DocumentType:number;

    // --- Custom --- //
    public IsNewItem: boolean;
    public IsActive: number;
}

export const NoticeDocumentFormControl = {
    // DocumentID: new FormControl(null),
    // ReferenceCode: new FormControl(null),
    // FilePath: new FormControl(null),
    // DataSource: new FormControl(null),
    // DocumentType: new FormControl(null),
    // DocumentName: new FormControl(null),
    // IsActive: new FormControl(null),
    // IsNewItem: new FormControl(null)
    DocumentID: new FormControl(null),
    DocumentName: new FormControl(null),
    ReferenceCode: new FormControl(null),
    FilePath: new FormControl(null),
    DataSource: new FormControl(null),
    DocumentType: new FormControl(2),
    IsActive: new FormControl(1),
    IsNewItem: new FormControl(null)
}
