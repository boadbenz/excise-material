import { ProveProduct } from "./proveProduct";
import { ProveStaff } from "./proveStaff";
import { ProveScience } from "./proveScience";

export class Prove {
    public ProveID?: number;
    public IsDelivery?: number;
    public DeliveryDocNo?: string;
    public DeliveryDate?: Date;
    public DeliveryStationCode?: string;
    public DeliveryStation?: string;
    public ProveReportNo?: string;
    public IsOutside?: number;
    public ProveDate?: Date;
    public ProveStationCode?: string;
    public ProveStation?: string;
    public Command?: string;
    public ArrestCode?: string;
    public IndictmentID?: number;
    public GuiltBaseID?: number;
    public LawsuitID?: number;
    public LawsuitNo?: string;
    public IsActive?: number;
    public ProveProduct?: Array<ProveProduct>;
    public ProveStaff?: Array<ProveStaff>;
    public ProveScience?: Array<ProveScience>;
}