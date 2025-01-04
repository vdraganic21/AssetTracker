import { AssetService } from "../../../services/AssetService";

function AssetIdleTimeReport() {
  const assets = AssetService.GetAll();

  return (
    <div className="asset-idle-time-report-container">
      <div className="asset-idle-time-panel">
        <div>
          <p>Asset Idle Time Report</p>
        </div>
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
                <td>{asset.GetCurrentFacility()?.name ?? "-"}</td>
                <td>{asset.GetCurrentZones()[0]?.name ?? "-"}</td>
                <td className="icon-cell"></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <p>Asset idle time reports -- other components go here</p>
      </div>
    </div>
  );
}

export default AssetIdleTimeReport;
