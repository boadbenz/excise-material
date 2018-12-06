import { FormControl } from "@angular/forms";

export class ArrestDocument {
    public DocumentID = '';
    public ReferenceCode = '';
    public FilePath = '';
    public DataSource = '';
    public DocumentType = '';
    public DocumentName = '';
    
    public IsActive : number;
    public IsNewItem: boolean;
    public IsModify: string;
    public RowId: number;
}

export const ArrestDocumentFormControl = {
    DocumentID: new FormControl(null),
    ReferenceCode: new FormControl(null),
    FilePath: new FormControl(null),
    DataSource: new FormControl(null),
    DocumentType: new FormControl(null),
    DocumentName: new FormControl(null),
    IsActive: new FormControl(null),
    IsNewItem: new FormControl(null)
}