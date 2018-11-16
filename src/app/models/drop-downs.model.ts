export class DropDown {
    public value: string;
    public text: string;
}

export const VISATypes: DropDown[] = [
    {
        value: '1',
        text: 'ประเภทคนเดินทางผ่านราชอาณาจักร (Transit Visa)'
    }, {
        value: '2',
        text: 'ประเภทนักท่องเที่ยว (Tourist Visa)'
    }, {
        value: '3',
        text: 'ประเภทคนอยู่ชั่วคราว (Non-Immigrant Visa)'
    }, {
        value: '4',
        text: 'ประเภททูต (Diplomatic Visa)'
    }, {
        value: '5',
        text: 'ประเภทราชการ (Official Visa)'
    }, {
        value: '6',
        text: 'ประเภทอัธยาศัยไมตรี (Courtesy Visa)'
    }
];

export const BloodTypes: DropDown[] = [
    {
        value: 'O',
        text: 'O'
    }, {
        value: 'A',
        text: 'A'
    }, {
        value: 'B',
        text: 'B'
    }, {
        value: 'AB',
        text: 'AB'
    }
]

export const EntityTypes: DropDown[] = [
    {
        value: '2',
        text: 'นิติบุคคล'
    }, {
        value: '1',
        text: 'บุคคลธรรมดา'
    }
]

export const LawbreakerTypes: DropDown[] = [
    {
        value: '0',
        text: 'ชาวต่างชาติ'
    }, {
        value: '1',
        text: 'ชาวไทย'
    }
]

export const GenderTypes: DropDown[] = [
    {
        value: 'M',
        text: 'ชาย'
    }, {
        value: 'F',
        text: 'หญิง'
    }
]

export const ContributorType: DropDown[] = [
    { value: '6', text: 'ผู้กล่าวหา' },
    { value: '7', text: 'ผู้ร่วมจับกุม' }
]

export const MaritalStatuType: DropDown[] = [
    {
        value: '1',
        text: 'โสด'
    }, {
        value: '2',
        text: 'สมรส'
    }, {
        value: '3',
        text: 'หย่าร้าง'
    }, {
        value: '4',
        text: 'หม้าย'
    },
]

export const TitleNames: DropDown[] = [
    {
        value: '1',
        text: 'นาย'
    }, {
        value: '2',
        text: 'นาง'
    }, {
        value: '3',
        text: 'นางสาว'
    }
]

export const Nationalitys: DropDown[] = [
    {
        value: '1',
        text: 'ไทย'
    }, {
        value: '2',
        text: 'เวียดนาม'
    }, {
        value: '3',
        text: 'ลาว'
    }, {
        value: '4',
        text: 'กัมพูชา'
    }, {
        value: '5',
        text: 'มาเลเชีย'
    }, {
        value: '6',
        text: 'ฟิลิปปินส์'
    }, {
        value: '7',
        text: 'บรูไน'
    }, {
        value: '8',
        text: 'จีน'
    }
]

export const Races: DropDown[] = [
    {
        value: '1',
        text: 'ไทย'
    }, {
        value: '2',
        text: 'เวียดนาม'
    }, {
        value: '3',
        text: 'ลาว'
    }, {
        value: '4',
        text: 'กัมพูชา'
    }, {
        value: '5',
        text: 'มาเลเชีย'
    }, {
        value: '6',
        text: 'ฟิลิปปินส์'
    }, {
        value: '7',
        text: 'บรูไน'
    }, {
        value: '8',
        text: 'จีน'
    }
]

export const Religions: DropDown[] = [
    { value: '1', text: 'ศาสนาฮินดู' }
    , { value: '2', text: 'ศาสนาเชน' }
    , { value: '3', text: 'ศาสนาพุทธ' }
    , { value: '4', text: 'ศาสนาซิกข์' }
    , { value: '5', text: 'ศาสนายูดาห์' }
    , { value: '6', text: 'ศาสนาคริสต์' }
    , { value: '7', text: 'ศาสนาอิสลาม' }
    , { value: '8', text: 'ศาสนาบาไฮ' }
]

export const ValueofNews: DropDown[] = [
    {
        value: '1',
        text: 'ที่ผ่านมาเชื่อมั่นได้อย่างสมบูรณ์'
    }, {
        value: '2',
        text: 'ที่อ่านมาเชื่อถือได้เป็นส่วนใหญ่'
    }, {
        value: '3',
        text: 'ที่ผ่านมาเชื่อถือไม่ได้เป็นส่วนใหญ่'
    }, {
        value: '4',
        text: 'ไม่สามารถตัดสินได้'
    }
]

export const CostofNews: DropDown[] = [
    {
        value: '1',
        text: 'รู้ว่าเป็นความจริงโดยปราศจากข้อสงสัย'
    }, {
        value: '2',
        text: 'ข่าวเป็นที่รู้จากแหล่งแต่ยังไม่ได้รายงานให้เจ้าหน้าที่'
    }, {
        value: '3',
        text: 'ข่าวไม่ได้เป็นที่รู้จักจากแหล่งแต่รู้มาจากผู้อื่นและได้มีการบันทึกไว้แล้ว'
    }, {
        value: '4',
        text: 'ไม่สามารถตัดสินได้'
    }
]