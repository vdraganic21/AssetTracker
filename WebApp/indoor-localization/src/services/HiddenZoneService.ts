import CookieService from "./CookieService";

export default class HiddenZoneService {
    static ToggleZone(zoneId: number) {
        const hiddenZones = this.GetHiddenZones();
        const index = hiddenZones.indexOf(zoneId);
        if (index > -1) {
            hiddenZones.splice(index, 1);
        } else {
            hiddenZones.push(zoneId);
        }
        CookieService.set("hiddenZones", JSON.stringify(hiddenZones));
    }

    static HideZone(zoneId: number) {
        const hiddenZones = this.GetHiddenZones();
        hiddenZones.push(zoneId);
        CookieService.set("hiddenZones", JSON.stringify(hiddenZones));
    }

    static UnhideZone(zoneId: number) {
        const hiddenZones = this.GetHiddenZones();
        const index = hiddenZones.indexOf(zoneId);
        if (index > -1) {
            hiddenZones.splice(index, 1);
        }
        CookieService.set("hiddenZones", JSON.stringify(hiddenZones));
    }

    static GetHiddenZones(): number[] {
        const hiddenZones = CookieService.get("hiddenZones");
        if (hiddenZones) {
            return JSON.parse(hiddenZones);
        }
        return [];
    }

    static Refresh() {
        CookieService.delete("hiddenZones");
    }
}