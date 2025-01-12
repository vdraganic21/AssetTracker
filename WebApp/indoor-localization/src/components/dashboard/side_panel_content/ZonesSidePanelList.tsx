import { SynDivider } from "@synergy-design-system/react";
import { Zone } from "../../../entities/Zone";

function ZonesSidePanelList({ zones }: { zones: Zone[] }) {
	if (zones.length == 0)
		return (
			<div>
				<p className="no-zones-message">No zones found.</p>
			</div>
		);

	return (
		<>
			<SynDivider />
			{zones.map((zone, index) => (
				<>
					<p className="side-panel-item-list" key={index}>
						{zone.name}
					</p>
					<SynDivider />
				</>
			))}
		</>
	);
}

export default ZonesSidePanelList;
