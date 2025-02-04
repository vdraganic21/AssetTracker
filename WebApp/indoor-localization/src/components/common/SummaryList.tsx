import SummaryListItem from "./SummaryListItem";
import "./SummaryList.css";
import { SynDivider } from "@synergy-design-system/react";

export type SummaryItem = {
  note: string;
  icon?: string;
};

type SummaryListProps = {
  summaryItems: SummaryItem[];
};

function SummaryList({ summaryItems }: SummaryListProps) {
  return (
    <div className="summary-list">
      <span className="summary-label">Summary</span>
      <SynDivider></SynDivider>
      <div className="scrollable-list">
        {summaryItems.map((item, index) => (
          <SummaryListItem key={index} note={item.note} icon={item.icon} />
        ))}
      </div>
    </div>
  );
}

export default SummaryList;
