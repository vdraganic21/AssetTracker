import { SynCheckbox } from "@synergy-design-system/react";
import { Asset } from "../../entities/Asset";
import "./AssetsTable.css";

function AssetsTable({ assets }: { assets: Asset[] }) {
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
        {assets.map((asset) => (
          <tr className="row-bottom-border">
            <td>{asset.name}</td>
            <td>{asset.GetCurrentFacility()?.name}</td>
            <td>{asset.GetCurrentZones()[0].name}</td>
            <td>
              <SynCheckbox />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default AssetsTable;
