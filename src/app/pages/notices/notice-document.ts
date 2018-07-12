import { FormControl } from '@angular/forms';

export class NoticeDocument {
    public DocumentID = '';
    public ReferenceCode = '';
    public FilePath = '';
    public DataSource = '';
    public IsActive = '';
    public IsNewItem: boolean;
}

export const NoticeDocumentFormControl = {
    DocumentID: new FormControl(null),
    ReferenceCode: new FormControl(null),
    FilePath: new FormControl(null),
    DataSource: new FormControl(null),
    IsActive: new FormControl(null),
    IsNewItem: new FormControl(null)
}
