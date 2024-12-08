import "./SidePanelItem.css";

type SidePanelItemProps = {
  imageSrc: string;
  name: string;
  selected: boolean;
  onClick: () => void;
};

function SidePanelItem({
  imageSrc,
  name,
  selected,
  onClick,
}: SidePanelItemProps) {
  return (
    <div
      className={`side-panel-item ${selected && "side-panel-item-selected"}`}
      onClick={onClick}
    >
      <img src={imageSrc} className="side-panel-image" alt={name} />
      <div className="side-panel-text">{name}</div>
    </div>
  );
}

export default SidePanelItem;
