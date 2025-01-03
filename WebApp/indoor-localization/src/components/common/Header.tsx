import {
	SynHeader,
	SynNavItem,
	SynPrioNav,
} from "@synergy-design-system/react";
import { useLocation, useNavigate } from "react-router-dom";

function Header() {
	const navigate = useNavigate();
	const location = useLocation();
	const navigationItems = [
		{ displayString: "Dashboard", route: "/" },
		{ displayString: "Assets", route: "/assets" },
		{ displayString: "Facilities", route: "/facilities" },
		{ displayString: "Reports", route: "/reports" },
	];

	const isPathActive = (path: string) => {
		return location.pathname === path;
	};

	return (
		<SynHeader label="Indoor Localization" className="unselectable">
			<SynPrioNav slot="navigation">
				{navigationItems.map((navigationItem, index) => (
					<SynNavItem
						key={"navItem" + index}
						current={isPathActive(navigationItem.route)}
						horizontal={true}
						onClick={() => navigate(navigationItem.route)}
					>
						{navigationItem.displayString}
					</SynNavItem>
				))}
			</SynPrioNav>
		</SynHeader>
	);
}

export default Header;
