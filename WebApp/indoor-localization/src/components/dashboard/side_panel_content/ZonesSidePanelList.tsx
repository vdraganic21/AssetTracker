import { SynDivider, SynIcon } from "@synergy-design-system/react";
import { Zone } from "../../../entities/Zone";
import "./SidePanelList.css";

function ZonesSidePanelList({ zones }: { zones: Zone[] }) {
	if (zones.length == 0)
		return (
			<div>
				<p className="no-items-message">No zones found.</p>
			</div>
		);

	return (
		<>
			<SynDivider />
			{zones.map((zone, index) => (
				<>
					<div className="side-panel-item-list">
						<p key={index}>{zone.name}</p>
						<SynIcon library="fa" name="far-eye"></SynIcon>
					</div>
					<SynDivider />
				</>
			))}
		</>
	);
}

export default ZonesSidePanelList;
