import { ProveProduct } from "./proveProduct";
import { ProveStaff } from "./proveStaff";
import { ProveScience } from "./proveScience";

export class Prove {
    public ProveID?: string;
    public IsDelivery?: number;
    public DeliveryDocNo?: string;
    public DeliveryDate?: string;
    public DeliveryStationCode?: string;
    public DeliveryStation?: string;
    public ProveReportNo?: string;
    public IsOutside?: number;
    public ProveDate?: string;
    public ProveStationCode?: string;
    public ProveStation?: string;
    public Command?: string;
    public ArrestCode?: string;
    public IndictmentID?: string;
    public GuiltBaseID?: number;
    public LawsuitID?: number;
    public LawsuitNo?: string;
    public IsActive?: number;
    public ProveOneStaff?: Array<ProveStaff>;
    public ProveOneStaffScience?: Array<ProveStaff>;
    public ProveProduct?: Array<ProveProduct>;
    public ProveStaff?: Array<ProveStaff>;
    public ProveScience?: Array<ProveScience>;
}