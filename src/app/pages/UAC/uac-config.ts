export class UacConfig{
    private static readonly API_URL : string = "http://103.233.193.94:8103/XCS60/";
    // private static readonly API_URL : string = "http://192.168.3.158:8103/XCS60/";

    public static readonly UserAccountgetByCon : string = UacConfig.API_URL + "UserAccountgetByCon";
    public static readonly UserAccountListgetByKeyword : string = UacConfig.API_URL + "UserAccountListgetByKeyword";
    public static readonly UserAccountListgetByConAdv : string = UacConfig.API_URL + "UserAccountListgetByConAdv";
    public static readonly UserAccountinsAll : string = UacConfig.API_URL + "UserAccountinsAll";
    public static readonly UserAccountupdByCon : string = UacConfig.API_URL + "UserAccountupdByCon";

    public static readonly RoleListgetByKeyword : string = UacConfig.API_URL + "RoleListgetByKeyword";
    public static readonly RoleListgetByConAdv : string = UacConfig.API_URL + "RoleListgetByConAdv";

    public static readonly RolegetByCon : string = UacConfig.API_URL + "RolegetByCon";
    public static readonly RoleinsAll : string = UacConfig.API_URL + "RoleinsAll";
    public static readonly RoleupdByCon : string = UacConfig.API_URL + "RoleupdByCon";
    
}