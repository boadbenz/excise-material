import { CompareDetail } from "./compareDetail";
import { CompareStaff } from "./compareStaff";

export class Compare {
    public CompareID?: string;
    public CompareCode?: string;
    public CompareDate?: string;
    public CompareStationCode?: string;
    public CompareStation?: string;
    public CompareSubdistrictCode?: string;
    public CompareSubdistrict?: string;
    public CompareDistrictCode?: string;
    public CompareDistrict?: string;
    public CompareProvinceCode?: string;
    public CompareProvince?: string;
    public AccuserSubdistrictCode?: string;
    public AccuserSubdistrict?: string;
    public AccuserDistrictCode?: string;
    public AccuserDistrict?: string;
    public AccuserProvinceCode?: string;
    public AccuserProvince?: string;
    public IsOutside?: string;
    public LawsuitID?: string;
    public CompareDetail?: CompareDetail[] ;
    public CompareStaff?: CompareStaff[];
}