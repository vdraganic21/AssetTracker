import CookieService from "./CookieService";
import { FacilityService } from "./FacilityService";

export default class SelectedFacilityService {
    private static getSelectedFaciltiyDefault() {
		let selectedFacility = FacilityService.GetAll()[0];
		if (!selectedFacility) {
			CookieService.delete("selectedFacility");
			return null;
		}

		CookieService.set("selectedFacility", selectedFacility.id.toString());
		return selectedFacility;
	}

	static getSelectedFacility() {
		let selectedFacilityId = CookieService.get("selectedFacility");
		let selectedFacility;

		if (!selectedFacilityId) {
			return this.getSelectedFaciltiyDefault();
		}

		selectedFacility = FacilityService.Get(parseInt(selectedFacilityId));
		if (!selectedFacility) {
			return this.getSelectedFaciltiyDefault();
		}

		return selectedFacility;
	}
	static setSelectedFacilityId(facilityId: number) {
		CookieService.set("selectedFacility", facilityId.toString());
	}
}