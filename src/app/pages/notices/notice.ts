import { NoticeStaff } from './notice-staff';
import { NoticeInformer } from './notice-informer';
import { NoticeLocale } from './notice-locale';
import { NoticeProduct } from './notice-product';
import { NoticeSuspect } from './notice-suspect';

export class Notice {
    public NoticeCode: string;
    public NoticeStationCode: string;
    public NoticeStation: string;
    public NoticeDate: string;
    public NoticeTime: string;
    public NoticeDue: string;
    public NoticeDueDate: string;
    public GroupNameDesc: string;
    public CommunicationChannelID: string;
    public ArrestCode: string;
    public IsActive: number;
    public Noticestaff: Array<NoticeStaff>;
    public Noticeinformer: Array<NoticeInformer>;
    public Noticelocale: Array<NoticeLocale>;
    public NoticeProduct: Array<NoticeProduct>;
    public NoticeSuspect: Array<NoticeSuspect>;
}
