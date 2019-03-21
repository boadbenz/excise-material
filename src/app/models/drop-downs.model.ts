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

export const ContributorInvestType: DropDown[] = [
    { value: '1', text: 'ผู้ร่วมทำการสืบสวน' },
    { value: '2', text: 'ผู้ดูแลการสืบสวน' },
    { value: '3', text: 'ผู้สังการ' }
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

export const ValueofNews: DropDown[] = [
    {
        value: 'A',
        text: 'ที่ผ่านมาเชื่อมั่นได้อย่างสมบูรณ์'
    }, {
        value: 'B',
        text: 'ที่อ่านมาเชื่อถือได้เป็นส่วนใหญ่'
    }, {
        value: 'C',
        text: 'ที่ผ่านมาเชื่อถือไม่ได้เป็นส่วนใหญ่'
    }, {
        value: 'X',
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
    }, {
        value: '5',
        text: 'แยกกันอยู่'
    }
]