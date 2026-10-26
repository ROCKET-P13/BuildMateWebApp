import { Outlet, useNavigate } from '@tanstack/react-router';
import { Drawer } from '@ui/Drawer';
import { NavigationItem } from '@ui/NavigationItem';
import { LayoutDashboard, LucideIcon } from 'lucide-react';

import { Routes } from '@/Common/routes';
import { dashboardStore } from '@/stores/dashboardStore';

import { DashboardAppBar } from './DashboardAppBar';

interface DrawerItem {
	label: string;
	icon: LucideIcon;
	route: string;
}

const DrawerItems: DrawerItem[] = [
	{
		label: 'Dashboard',
		icon: LayoutDashboard,
		route: Routes.DASHBOARD,
	},
];

export const DashboardDrawer = () => {
	const toggleDrawer = dashboardStore((state) => state.toggleDrawer);
	const drawerOpen = dashboardStore((state) => state.drawerOpen);

	const navigate = useNavigate();

	const handleNavigate = (route: string) => {
		toggleDrawer(false);
		navigate({ to: route });
	};

	return (
		<div className="min-h-screen bg-background text-foreground">
			<DashboardAppBar />

			<Drawer open={drawerOpen} onClose={() => toggleDrawer(false)}>
				<Drawer.Content
					side="left"
					className="w-64 flex flex-col"
				>
					<div className="flex-1 p-4 space-y-1">
						{
							DrawerItems.map((item) => (
								<NavigationItem
									key={item.label}
									icon={item.icon}
									onClick={() => handleNavigate(item.route)}
								>
									{item.label}
								</NavigationItem>
							))
						}
					</div>

				</Drawer.Content>
			</Drawer>

			<main className="pt-14 p-10">
				<Outlet />
			</main>
		</div>
	);
};