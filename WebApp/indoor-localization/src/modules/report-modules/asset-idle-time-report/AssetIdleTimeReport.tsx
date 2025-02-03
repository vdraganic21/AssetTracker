import { useEffect, useState } from "react";
import DataComparisonReportWidget from "../../../components/common/DataComparisonReportWidget";
import ReportExportButtonGroup from "../../../components/common/ReportExportButtonGroup";
import { AssetService } from "../../../services/AssetService";
import Spinner from "../../../components/common/Spinner";

function AssetIdleTimeReport() {
	const [assets, setAssets] = useState<any[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchAssets = async () => {
			setIsLoading(true);
			const fetchedAssets = await AssetService.GetAll();

			const enrichedAssets = await Promise.all(
				fetchedAssets.map(async (asset) => ({
					...asset,
					facilityName:
						(await AssetService.GetAssetParentFacility(asset))?.name ?? "-",
					zoneName:
						(await AssetService.GetAssetCurrentZones(asset))[0]?.name ?? "-",
				}))
			);

			setAssets(enrichedAssets);
			setIsLoading(false);
		};

		fetchAssets();
	}, []);

	if (isLoading) {
		return <Spinner text="Loading assets..." />;
	}

	return (
		<div className="report-row take-space report-padding">
			<div className="report-column">
				<div className="asset-idle-time-report-container content-border take-space">
					<p className="sidebar-title">Asset Idle Time Report</p>
					<table className="syn-table--default">
						<thead>
							<tr>
								<th className="syn-table-cell--shadow-bottom shadow-cell">
									Name
								</th>
								<th className="syn-table-cell--shadow-bottom shadow-cell">
									Facility
								</th>
								<th className="syn-table-cell--shadow-bottom shadow-cell">
									Zone
								</th>
								<th className="syn-table-cell--shadow-bottom shadow-cell"></th>
							</tr>
						</thead>
						<tbody>
							{assets.map((asset, index) => (
								<tr className="row-bottom-border hover-row" key={index}>
									<td>{asset.name}</td>
									<td>{asset.facilityName}</td>
									<td>{asset.zoneName}</td>
									<td className="icon-cell"></td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
				<div className="content-border">
					<ReportExportButtonGroup className="export-buttons-top-margin" />
				</div>
			</div>
			<div className="report-column take-space">
				<div className="report-row">
					<DataComparisonReportWidget
						mainData="17min"
						mainDescription="Viljuškar idle time last 24h"
						secondaryDataLeft="15min"
						secondaryDescriptionLeft="Last week"
						secondaryDataRight="16min"
						secondaryDescriptionRight="Last month"
					/>
					<DataComparisonReportWidget
						mainData="12h 15min"
						mainDescription="Viljuškar idle time last 24h"
						secondaryDataLeft="15min"
						secondaryDescriptionLeft="Last week"
						secondaryDataRight="16min"
						secondaryDescriptionRight="Last month"
					/>
					<DataComparisonReportWidget
						mainData="17min"
						mainDescription="Viljuškar idle time last 24h"
						secondaryDataLeft="12h 15min"
						secondaryDescriptionLeft="Last week"
						secondaryDataRight="16min"
						secondaryDescriptionRight="Last month"
					/>
					<DataComparisonReportWidget
						mainData="17min"
						mainDescription="Viljuškar idle time last 24h"
						secondaryDataLeft="15min"
						secondaryDescriptionLeft="Last week"
						secondaryDataRight="16min"
						secondaryDescriptionRight="Last month"
					/>
				</div>
				<div className="report-row take-space">
					<div className="content-border take-space">blah</div>
					<div className="content-border take-space">blah</div>
				</div>
			</div>
		</div>
	);
}

export default AssetIdleTimeReport;
