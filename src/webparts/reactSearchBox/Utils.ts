export default class Utils {

    public static getTenantUrl(absoluteUrl: string, serverRelativeUrl: string): string {
        let tenantUrl: string = absoluteUrl;
        if (serverRelativeUrl !== "/") {
            tenantUrl = tenantUrl.replace(serverRelativeUrl, "");
        }
        return tenantUrl;
    }
}