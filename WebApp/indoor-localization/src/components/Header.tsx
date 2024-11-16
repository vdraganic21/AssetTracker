import {
  SynHeader,
  SynNavItem,
  SynPrioNav,
} from "@synergy-design-system/react";

function Header() {
  return (
    <SynHeader label="Indoor Localization">
      <SynPrioNav slot="navigation">
        <SynNavItem horizontal={true} current={true}>
          Dashboard
        </SynNavItem>
        <SynNavItem horizontal={true}>Assets</SynNavItem>
        <SynNavItem horizontal={true}>Facilities</SynNavItem>
        <SynNavItem horizontal={true}>Reports</SynNavItem>
      </SynPrioNav>
    </SynHeader>
  );
}

export default Header;
