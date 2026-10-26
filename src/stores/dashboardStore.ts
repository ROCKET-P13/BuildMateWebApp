import { create } from 'zustand';

interface DashboardState {
	drawerOpen: boolean;
	toggleDrawer: (open?: boolean) => void;
}

export const dashboardStore = create<DashboardState>((set) => ({
	drawerOpen: false,
	toggleDrawer: (open) => set((state) => ({
		drawerOpen: open !== undefined ? open : !state.drawerOpen,
	})),
}));