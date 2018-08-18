import { FormControl } from '@angular/forms';

export class NoticeDocument {
    public DocumentID = '';
    public ReferenceCode = '';
    public FilePath = '';
    public DataSource = '';
    DocumentType = '';
    DocumentName = '';
    public IsActive = '';
    public IsNewItem: boolean;
}

export const NoticeDocumentFormControl = {
    DocumentID: new FormControl(null),
    ReferenceCode: new FormControl(null),
    FilePath: new FormControl(null),
    DataSource: new FormControl(null),
    DocumentType: new FormControl(null),
    DocumentName: new FormControl(null),
    IsActive: new FormControl(null),
    IsNewItem: new FormControl(null)
}
