import { NoticeStaff } from './notice-staff';
import { NoticeInformer } from './notice-informer';
import { NoticeLocale } from './notice-locale';
import { NoticeProduct } from './notice-product';
import { NoticeSuspect } from './notice-suspect';
import { NoticeDocument } from './notice-document';

export class Notice {
    public NoticeCode: string;
    public NoticeStationCode: string;
    public NoticeStation: string;
    public NoticeDate: string;
    public NoticeTime: string;
    public NoticeDue: string;
    public NoticeDueDate: string;
    public NoticeDueTime: string;
    public GroupNameDesc: string;
    public CommunicationChanelID: string;
    public DataSource: string;
    public FilePath: string;
    public ArrestCode: string;
    public IsActive: number;
    public IsArrest: number;
    public NoticeStaff: Array<NoticeStaff>;
    public NoticeInformer: Array<NoticeInformer>;
    public NoticeLocale: Array<NoticeLocale>;
    public NoticeProduct: Array<NoticeProduct>;
    public NoticeSuspect: Array<NoticeSuspect>;
    public NoticeDocument: Array<NoticeDocument>;

    public RowId: number;
    public IsChecked: boolean;
}

