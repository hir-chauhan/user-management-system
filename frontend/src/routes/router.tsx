import {
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
  redirect,
} from '@tanstack/react-router';
import { LoginPage } from '@/features/auth';
import { DashboardPage } from '@/features/dashboard';
import { UserManagementFeature } from '@/features/user-management';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Toaster } from 'sonner';


const isLoggedIn = () => {
  const auth = localStorage.getItem('auth-storage');

  if (!auth) {
    return false;
  }

  try {
    const data = JSON.parse(auth);
    return !!data?.state?.token;
  } catch {
    return false;
  }
};


const rootRoute = createRootRoute({
  component: () => (
    <>
      <Outlet />
      <Toaster richColors closeButton position="top-right" />
    </>
  ),
});


const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  beforeLoad: () => {
    if (isLoggedIn()) {
      throw redirect({ to: '/users' });
    }

    throw redirect({ to: '/login' });
  },
});


const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/login',
  beforeLoad: () => {
    if (isLoggedIn()) {
      throw redirect({ to: '/users' });
    }
  },
  component: LoginPage,
});


const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/dashboard',
  beforeLoad: () => {
    if (!isLoggedIn()) {
      throw redirect({ to: '/login' });
    }
  },
  component: () => (
    <DashboardLayout
      title="Dashboard"
      subtitle="Get a quick overview of your system and recent user activity."
      currentPath="/dashboard"
    >
      <DashboardPage />
    </DashboardLayout>
  ),
});


const usersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/users',
  beforeLoad: () => {
    if (!isLoggedIn()) {
      throw redirect({ to: '/login' });
    }
  },
  component: () => (
    <DashboardLayout
      title="User Management"
      subtitle="View and manage registered users, roles, and account status."
      currentPath="/users"
    >
      <UserManagementFeature />
    </DashboardLayout>
  ),
});


const routeTree = rootRoute.addChildren([
  indexRoute,
  loginRoute,
  dashboardRoute,
  usersRoute,
]);


export const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
});


declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
