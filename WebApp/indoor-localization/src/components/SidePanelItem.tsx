import "./SidePanelItem.css";

function SidePanelItem({ imageSrc, name }: { imageSrc: string; name: string }) {
  return (
    <div className="side-panel-item">
      <img src={imageSrc} className="side-panel-image" alt={name} />
      <div className="side-panel-text">{name}</div>
    </div>
  );
}

export default SidePanelItem;
