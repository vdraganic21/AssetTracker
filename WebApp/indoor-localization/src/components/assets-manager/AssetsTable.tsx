import { SynIcon } from "@synergy-design-system/react";
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
        {assets.map((asset, index) => (
          <tr className="row-bottom-border hover-row" key={index}>
            <td>{asset.name}</td>
            <td>{asset.GetCurrentFacility()?.name ?? "-"}</td>
            <td>{asset.GetCurrentZones()[0]?.name ?? "-"}</td>
            <td className="icon-cell">
              <SynIcon
                library="fa"
                name="far-edit"
                className="table-icon"
              ></SynIcon>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default AssetsTable;
