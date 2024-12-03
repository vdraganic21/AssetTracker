import {
  SynHeader,
  SynNavItem,
  SynPrioNav,
} from "@synergy-design-system/react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Header() {
  const navigate = useNavigate();
  const [currentNavIndex, setCurrentNavIndex] = useState(0);

  const navigationItems = [
    { displayString: "Dashboard", route: "/" },
    { displayString: "Assets", route: "/assets" },
    { displayString: "Facilities", route: "/facilities" },
    { displayString: "Reports", route: "/reports" },
  ];

  const handleNavClick = (index: number, route: string) => {
    setCurrentNavIndex(index);
    navigate(route);
  };

  return (
    <SynHeader label="Indoor Localization">
      <SynPrioNav slot="navigation">
        {navigationItems.map((navigationItem, index) => (
          <SynNavItem
            key={"navItem" + index}
            current={index === currentNavIndex}
            horizontal={true}
            onClick={() => handleNavClick(index, navigationItem.route)}
          >
            {navigationItem.displayString}
          </SynNavItem>
        ))}
      </SynPrioNav>
    </SynHeader>
  );
}

export default Header;
