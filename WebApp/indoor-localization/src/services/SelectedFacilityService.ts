import CookieService from "./CookieService";
import { FacilityService } from "./FacilityService";

export default class SelectedFacilityService {
    private static async getSelectedFacilityDefault() {
		let selectedFacility = (await FacilityService.GetAll())[0];
		if (!selectedFacility) {
			CookieService.delete("selectedFacility");
			return null;
		}

		CookieService.set("selectedFacility", selectedFacility.id.toString());
		return selectedFacility;
	}

	static async getSelectedFacility() {
		let selectedFacilityId = CookieService.get("selectedFacility");
		let selectedFacility;

		if (!selectedFacilityId) {
			return await this.getSelectedFacilityDefault();
		}

		selectedFacility = FacilityService.Get(parseInt(selectedFacilityId));
		if (!selectedFacility) {
			return await this.getSelectedFacilityDefault();
		}

		return selectedFacility;
	}
	static setSelectedFacilityId(facilityId: number) {
		CookieService.set("selectedFacility", facilityId.toString());
	}
}