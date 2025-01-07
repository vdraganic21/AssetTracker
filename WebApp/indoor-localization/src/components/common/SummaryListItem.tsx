import "./SummaryListItem.css";

type SummaryListItemProps = {
  note: string;
  icon?: string;
};

function SummaryListItem({ note, icon }: SummaryListItemProps) {
  return (
    <div className="summary-list-item">
      <span className="bullet-with-icon">
        <span className="bullet">•</span>
        {icon && <span className="icon">{icon}</span>}
      </span>
      <span className="note">{note}</span>
    </div>
  );
}

export default SummaryListItem;
