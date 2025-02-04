import CookieService from "./CookieService";

export default class HighlightedAssetService {
    static getHighlightedAssetId(): number {
        const highlightedAsset = CookieService.get("highlightedAsset");

        if (!highlightedAsset) {
            return -1;
        }

        return parseInt(highlightedAsset);
	}

	static setHighlightedAssetId(assetId: number) {
        CookieService.set("highlightedAsset", assetId.toString());
	}

    static removeHighlightedAssetId() {
        CookieService.delete("highlightedAsset");
    }
}