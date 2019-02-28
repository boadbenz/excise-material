export class UserAccountListItem {
    userAccountID: number;
    staffCode: string;
    roleID: number;
    userType: number;
    userName: string;
    password: string;
    isSignOn: boolean;
    signOnIP: string;
    approveCode: string;
    isActive: boolean;

    //staffCode: string;
    perType: number;
    titleName: string;
    firstName: string;
    lastName: string;
    operationPosCode: string;
    operationPosName: string;
    managementPosCode: string;
    managementPosName: string;
    posLevel: string;
    posLevelName: string;
    representationPosCode: string;
    representationPosName: string;
    operationDeptCode: string;
    operationDeptName: string;
    underDeptCode: string;
    underDeptName: string;
    deptLevel: string;
    officeCode: string;
    officeName: string;
    officeShortName: string;
    StatusCode: number;
    //isActive: boolean;

    public get FullName(): string {
        return this.titleName + "-" + this.firstName + "-" + this.lastName;
    }
}

export class UacUseraccount {
    userAccountID: number;
    staffCode: string;
    roleID: number;
    userType: number;
    userName: string;
    password: string;
    isSignOn: boolean;
    signOnIP: string;
    approveCode: string;
    isActive: boolean;
    masStaff: MasStaff;
}

export class MasStaff {
    staffCode: string;
    perType: number;
    titleName: string;
    firstName: string;
    lastName: string;
    operationPosCode: string;
    operationPosName: string;
    managementPosCode: string;
    managementPosName: string;
    posLevel: string;
    posLevelName: string;
    representationPosCode: string;
    representationPosName: string;
    operationDeptCode: string;
    operationDeptName: string;
    underDeptCode: string;
    underDeptName: string;
    deptLevel: string;
    officeCode: string;
    officeName: string;
    officeShortName: string;
    StatusCode: number;
    IsActive: boolean;

    public get FullName(): string {
        return this.titleName + " " + this.firstName + " " + this.lastName;
    }
}

export class UserAccountListItemResponse {
    IsSuccess: boolean;
    Msg: string;
    RunningID: number;
    Data: Array<UserAccountListItem>;
}

export class UserAccountListResponse {
    IsSuccess: boolean;
    Msg: string;
    RunningID: number;
    Data: Array<UacUseraccount>;
}

export class UserAccountListgetByKeywordRequest {
    TextSearch: string = "";
}

export class UserAccountListgetByConAdvRequest {
    staffCode: string = "";
    userName: string = "";
    staffName: string = "";
    operationPosName: string = "";
    managementPosName: string = "";
    representationPosName: string = "";
    operationDeptName: string = "";
    underDeptName: string = "";
    officeName: string = "";
}

export class UserAccountgetByConRequest {
    UserAccountID: number;
}

//== Role ======================================
export class RoleListItem {
    roleID: number;
    roleName: string;
    roleDescription: number;
    isActive: number;
    roleCode: string;
}

export class RoleListgetByKeywordRequest {
    TextSearch: string = "";
}

export class RoleListgetByConAdvRequest {
    RoleCode: string = "";
    RoleName: string = "";
}


export class RoleListItemResponse {
    IsSuccess: boolean;
    Msg: string;
    RunningID: number;
    Data: Array<RoleListItem>;
}

export class RoleListResponse {
    IsSuccess: boolean;
    Msg: string;
    RunningID: number;
    //Data: Array<UacUseraccount>;
}

export class UacUserpermissionResponse {
    userAccountID: number;
    staffCode: string;
    roleID: number;
    userType: number;
    userName: string;
    password: string;
    isSignOn: boolean;
    signOnIP: string;
    approveCode: string;
    isActive: boolean;
    masStaff: MasStaff;
    uacRole: UacUserRole;
    uacUserpermissions: Array<UacUserpermission>;
}

export class UacUserRole {

    roleID: number;
    roleName: string;
    roleDescription: string;
    isActive: number;
    roleCode: string;

    uacRolepermissions: Array<UacUserpermission>;

}

export class UacUserpermission {

    userPermissionID: number = -1;
    userAccountID: number;
    programCode: string;
    isCreate: boolean = false;
    isRead: boolean = false;
    isUpdate: boolean = false;
    isDelete: boolean = false;
}

export class UserAccountinsAllRequest {

    //constructor() { this.uacUserpermissions = new Array<UacUserpermission>() }

    userAccountID: number = 1;
    staffCode: string = "";
    roleID: number = -1;
    userType: number = -1;
    userName: string = "";
    password: string = "";
    isSignOn: boolean = false;
    signOnIP: string = "";
    approveCode: string = "";
    isActive: boolean = false;

    uacUserpermissions: Array<UacUserpermission> = new Array<UacUserpermission>();

}

export class UserAccountinsAllResponse {
    /* {
        "IsSuccess": "True",
        "UserAccountID": "1",
        ""UserAccount Permission":
        [
            {
                ""UserAccount PermissionID": "1"
            },
            {
                ""UserAccount PermissionID": "2"	
            }
        ]
    } */
    UserAccountID: number;
    IsSuccess: boolean;
    Msg: string;
}

export class UserAccountgetByConResponse {
    UserAccountID: number;
    IsSuccess: boolean;
    Msg: string;
}

export class UserAccountupdByConResponse {
    UserAccountID: number;
    IsSuccess: boolean;
    Msg: string;
}

export class UserAccountupdByConRequest {
    userAccountID: number;
    staffCode: string;
    roleID: number;
    userType: number;
    userName: string;
    password: string;
    isSignOn: boolean;
    signOnIP: string;
    approveCode: string;
    isActive: boolean;

    uacUserpermissions: Array<UacUserpermission> = new Array<UacUserpermission>();
}



export class RoleinsAllRequest {

    //constructor() { this.uacUserpermissions = new Array<UacUserpermission>() }

    roleID: number = -1;
    roleName: string = "";
    roleDescription: string = "";
    isActive: boolean = false;
    roleCode: string = "";

    uacRolepermissions: Array<RolePermission> = new Array<RolePermission>();

}

export class RolePermission {
    rolePermissionID: number = -1;
    roleID: number = -1;
    programCode: string = "";
    isCreate: boolean = false;
    isRead: boolean = false;
    isUpdate: boolean = false;
    isDelete: boolean = false;
}

export class RoleinsAllResponse {
    RoleID: number;
    IsSuccess: boolean;
    Msg: string;
}

export class RoleupdByConResponse {
    RoleID: number;
    IsSuccess: boolean;
    Msg: string;
}

export class RolegetByConRequest {
    RoleID: number;
}

export class RolegetByConResponse {
    IsSuccess: boolean;
    Msg: string;
    RunningID: number;
    Data: Array<UacUseraccount>;
}

export class UacRoleRequest {
    roleID: number = -1;
    roleName: string = "";
    roleDescription: string = "";
    isActive: boolean = false;
    roleCode: string = "";
    uacRolepermissions: Array<UacRolepermission> = new Array<UacRolepermission>();
}

export class UacRolepermission {
    rolePermissionID: number = -1;
    roleID: number = -1;
    programCode: string = "";
    isCreate: boolean = false;
    isRead: boolean = false;
    isUpdate: boolean = false;
    isDelete: boolean = false;
}

export class UacRolePermissionResponse {
    roleID: number = -1;
    roleName: string = "";
    roleDescription: string = "";
    isActive: boolean = false;
    roleCode: string = "";
    uacRolepermissions: Array<UacRolepermission> = new Array<UacRolepermission>();
}