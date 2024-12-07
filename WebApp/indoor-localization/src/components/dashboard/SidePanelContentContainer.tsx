type SidePanelContentContainerProps = {
  children: React.ReactNode;
};

function SidePanelContentContainer({
  children,
}: SidePanelContentContainerProps) {
  return <div className="side-panel-content side-panel-border">{children}</div>;
}

export default SidePanelContentContainer;
