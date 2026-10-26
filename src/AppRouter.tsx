import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createRootRoute, createRoute, createRouter, Navigate, Outlet, RouterProvider } from '@tanstack/react-router';

import { RequireAuth } from './Auth/RequireAuth';
import { Routes } from './Common/routes';
import { Dashboard } from './Components/Dashboard/Dashboard';
import { DashboardDrawer } from './Components/Dashboard/DashboardDrawer';

const rootRoute = createRootRoute({
	component: () => (
		<>
			<Outlet />
		</>
	),
});

const queryClient = new QueryClient();

const indexRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: '/',
	component: () => <Navigate to={Routes.DASHBOARD}/>,
});

const protectedRoute = createRoute({
	getParentRoute: () => rootRoute,
	id: 'protected',
	component: RequireAuth,
});

const dashboardRoute = createRoute({
	getParentRoute: () => protectedRoute,
	path: Routes.DASHBOARD,
	component: DashboardDrawer,
});

const dashboardIndexRoute = createRoute({
	getParentRoute: () => dashboardRoute,
	path: '/',
	component: Dashboard,
});

dashboardRoute.addChildren([dashboardIndexRoute]);
protectedRoute.addChildren([dashboardRoute]);

const routeTree = rootRoute.addChildren([
	indexRoute,
	protectedRoute,
]);

const router = createRouter({
	routeTree,
	defaultPreload: 'intent',
	defaultPreloadStaleTime: 0,
	scrollRestoration: true,
	context: {
		queryClient,
	},
});

export const AppRouter = () => {
	return (
		<QueryClientProvider client={queryClient}>
			<RouterProvider
				router={router}
				context={{
					queryClient,
				}}
			/>
		</QueryClientProvider>
	);
};