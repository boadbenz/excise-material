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
        value: '1',
        text: 'บุคคลธรรมดา'
    }, {
        value: '2',
        text: 'นิติบุคคล'
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

export const LawbreakerTypes: DropDown[] = [
    {
        value: '0',
        text: 'ชาวต่างชาติ'
    }, {
        value: '1',
        text: 'ชาวไทย'
    }
]

export const MaritalStatus: DropDown[] = [
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