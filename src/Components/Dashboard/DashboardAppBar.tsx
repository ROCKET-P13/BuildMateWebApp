import { AppBar, AppBarLeft, AppBarRight, AppBarTitle } from '@ui/AppBar';
import { Icon } from '@ui/Icon';
import { ThemeToggle } from '@ui/ThemeToggle';
import { MenuIcon } from 'lucide-react';

import { dashboardStore } from '@/stores/dashboardStore';

export const DashboardAppBar = () => {
	const toggleDrawer = dashboardStore((state) => state.toggleDrawer);

	return (
		<AppBar>
			<AppBarLeft>
				<button
					onClick={() => toggleDrawer(true)}
					className="p-2 rounded-md hover:bg-accent"
				>
					<Icon as={MenuIcon} />
				</button>

				<AppBarTitle>
					CoBuild
				</AppBarTitle>
			</AppBarLeft>

			<AppBarRight>
				<ThemeToggle />
			</AppBarRight>
		</AppBar>
	);
};