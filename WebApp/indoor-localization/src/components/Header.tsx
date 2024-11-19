import {
  SynHeader,
  SynNavItem,
  SynPrioNav,
} from "@synergy-design-system/react";

function Header() {
  const navigationItems = [
    { displayString: "Dashboard", route: "/" },
    { displayString: "Assets", route: "/assets" },
    { displayString: "Facilities", route: "/facilities" },
    { displayString: "Reports", route: "/reports" },
  ];

  return (
    <SynHeader label="Indoor Localization">
      <SynPrioNav slot="navigation">
        {navigationItems.map((navigationItem, index) => (
          <SynNavItem key={"navItem" + index} horizontal={true}>
            {navigationItem.displayString}
          </SynNavItem>
        ))}
      </SynPrioNav>
    </SynHeader>
  );
}

export default Header;
