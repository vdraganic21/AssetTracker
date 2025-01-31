import { useState } from "react";
import { SynDivider, SynIcon } from "@synergy-design-system/react";
import { Zone } from "../../../entities/Zone";
import "./SidePanelList.css";
import HiddenZoneService from "../../../services/HiddenZoneService";

function ZonesSidePanelList({ zones }: { zones: Zone[] }) {
	const [, setHiddenZones] = useState<number[]>(
		HiddenZoneService.GetHiddenZones()
	);

	const handleToggleZone = (zoneId: number) => {
		HiddenZoneService.ToggleZone(zoneId);
		setHiddenZones(HiddenZoneService.GetHiddenZones());
	};

	if (zones.length === 0) {
		return (
			<div>
				<p className="no-items-message">No zones found.</p>
			</div>
		);
	}

	return (
		<>
			<SynDivider />
			{zones.map((zone, index) => (
				<div key={index} className="side-panel-item-list">
					<p>{zone.name}</p>
					<SynIcon
						library="fa"
						name={
							HiddenZoneService.IsZoneHidden(zone.id)
								? "far-eye-slash"
								: "far-eye"
						}
						onClick={() => handleToggleZone(zone.id)}
					/>
				</div>
			))}
			<SynDivider />
		</>
	);
}

export default ZonesSidePanelList;
