import { SynIcon } from "@synergy-design-system/react";
import "./AssetsTable.css";
import { useNavigate } from "react-router-dom";

function AssetsTable({ assets }: { assets: any[] }) {
	const navigate = useNavigate();

	if (assets.length == 0)
		return (
			<div>
				<p className="no-assets-message">No assets found.</p>
			</div>
		);

	return (
		<table className="syn-table--default">
			<thead>
				<tr>
					<th className="syn-table-cell--shadow-bottom shadow-cell">Name</th>
					<th className="syn-table-cell--shadow-bottom shadow-cell">
						Facility
					</th>
					<th className="syn-table-cell--shadow-bottom shadow-cell">Zone</th>
					<th className="syn-table-cell--shadow-bottom shadow-cell"></th>
				</tr>
			</thead>
			<tbody>
				{assets.map((asset, index) => (
					<tr className="row-bottom-border hover-row" key={index}>
						<td>{asset.name}</td>
						<td>{asset.facilityName}</td>
						<td>{asset.zoneName}</td>
						<td className="icon-cell">
							<SynIcon
								library="fa"
								name="far-pen-to-square"
								className="table-icon"
								onClick={() => navigate(`/assets/edit/${asset.id}`)}
							/>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}

export default AssetsTable;
