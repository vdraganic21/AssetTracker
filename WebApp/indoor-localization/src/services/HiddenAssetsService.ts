import CookieService from "./CookieService";

export default class HiddenAssetsService {
    static IsAssetHidden(assetId: number) {
        const hiddenAssets = this.GetHiddenAssets();
        return hiddenAssets.includes(assetId);
    }

    static ToggleAsset(assetId: number) {
        const hiddenAssets = this.GetHiddenAssets();
        const index = hiddenAssets.indexOf(assetId);
        if (index > -1) {
            hiddenAssets.splice(index, 1);
        } else {
            hiddenAssets.push(assetId);
        }
        CookieService.set("hiddenAssets", JSON.stringify(hiddenAssets));
    }

    static HideAsset(assetId: number) {
        const hiddenAssets = this.GetHiddenAssets();
        hiddenAssets.push(assetId);
        CookieService.set("hiddenAssets", JSON.stringify(hiddenAssets));
    }

    static UnhideAsset(assetId: number) {
        const hiddenAssets = this.GetHiddenAssets();
        const index = hiddenAssets.indexOf(assetId);
        if (index > -1) {
            hiddenAssets.splice(index, 1);
        }
        CookieService.set("hiddenAssets", JSON.stringify(hiddenAssets));
    }

    static GetHiddenAssets(): number[] {
        const hiddenAssets = CookieService.get("hiddenAssets");
        if (hiddenAssets) {
            return JSON.parse(hiddenAssets);
        }
        return [];
    }

    static Refresh() {
        CookieService.delete("hiddenAssets");
    }
}