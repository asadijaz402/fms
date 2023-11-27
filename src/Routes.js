import { Suspense, lazy } from 'react';
// import PasswordRecoveryAmplify from "./Components/authentication/password-recovery/PasswordRecoveryAmplify";
import AuthGuard from './Components/AuthGuard';
import { InvoiceDetail } from './Components/Dashboard/account/InvoiceDetail';

// import DocsLayout from "./Components/docs/DocsLayout";
import DashboardLayout from './Components/Dashboard/DashboardLayout';
import GuestGuard from './Components/GuestGuard';
import LoadingScreen from './Components/LoadingScreen';
import PasswordReset from './pages/authentication/PasswordReset';
import MainDashboard from './Components/CustomGridLayout/MainDashboard';
import { ContactUs } from './pages/ContactUs';
const Loadable = (Component) => (props) =>
  (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );

// Authentication pages

const Account = Loadable(lazy(() => import('./pages/dashboard/Account')));
const Analytics = Loadable(lazy(() => import('./pages/dashboard/Analytics')));
const BlogPostDetails = Loadable(
  lazy(() => import('./pages/blog/BlogPostDetails'))
);
const Bookings = Loadable(
  lazy(() => import('./pages/dashboard/bookings/Bookings'))
);
const BookingDetails = Loadable(
  lazy(() => import('./pages/dashboard/bookings/BookingDetails/BookingDetails'))
);
const CaseStudy = Loadable(lazy(() => import('./pages/CaseStudy')));
const Claims = Loadable(lazy(() => import('./pages/dashboard/claims/Claims')));
const Customers = Loadable(
  lazy(() => import('./pages/dashboard/customers/Customers'))
);
const CustomerBookings = Loadable(
  lazy(() =>
    import(
      './pages/dashboard/customers/pages/CustomerRentalRecords/CustomerRentalRecords'
    )
  )
);
const Calendar = Loadable(
  lazy(() => import('./pages/dashboard/Calendar/Calendar'))
);
const Drivers = Loadable(lazy(() => import('./pages/dashboard/driver/Driver')));
const Assets = Loadable(
  lazy(() => import('./pages/dashboard/fleet/asset/Asset'))
);
const AssetDetails = Loadable(
  lazy(() => import('./pages/dashboard/fleet/asset/AssetDetails'))
);
const DriverBookings = Loadable(
  lazy(() =>
    import(
      './pages/dashboard/driver/pages/DriverRentalRecords/DriverRentalRecords'
    )
  )
);
const Login = Loadable(lazy(() => import('./pages/authentication/Login')));

const PricingPage = Loadable(lazy(() => import('./pages/PricingPage')));
const PrivacyPage = Loadable(lazy(() => import('./pages/PrivacyPage')));
const TermsAndConditions = Loadable(
  lazy(() => import('./pages/TermsAndConditions'))
);
const TrackerLandingPage = Loadable(
  lazy(() => import('./pages/TrackerLandingPage'))
);
const Register = Loadable(
  lazy(() => import('./pages/authentication/Register'))
);
const LandingPage = Loadable(lazy(() => import('./pages/LandingPage')));
const Users = Loadable(lazy(() => import('./pages/dashboard/users')));
const Suppliers = Loadable(lazy(() => import('./pages/dashboard/Suppliers')));
const SupplierVehicleList = Loadable(
  lazy(() => import('./pages/dashboard/Suppliers/Pages/Vehicles'))
);
const Traccar = Loadable(lazy(() => import('./pages/map/Traccar')));
const VehicleList = Loadable(
  lazy(() => import('./pages/dashboard/fleet/vehicles/Vehicle'))
);
const VehicleDetails = Loadable(
  lazy(() => import('./pages/dashboard/fleet/vehicleDetails'))
);
const VehicleRentalHistory = Loadable(
  lazy(() =>
    import('./pages/dashboard/fleet/vehicles/pages/VehicleRentalRecords')
  )
);
const VehicleSubModules = Loadable(
  lazy(() => import('./pages/dashboard/fleet/SubModules'))
);
const ServicingList = Loadable(
  lazy(() => import('./pages/dashboard/fleet/servicing/Servicing'))
);
const GovList = Loadable(lazy(() => import('./pages/dashboard/fleet/Gov/Gov')));
const PrechecksList = Loadable(
  lazy(() => import('./pages/dashboard/fleet/precheck/precheck'))
);
const Finance = Loadable(
  lazy(() => import('./pages/dashboard/fleet/finance/finance'))
);
const FinanceDetail = Loadable(
  lazy(() => import('./pages/dashboard/fleet/finance/FinanceDetail'))
);

const OdometerList = Loadable(
  lazy(() => import('./pages/dashboard/fleet/odometer/odometer'))
);

const Invoices = Loadable(
  lazy(() => import('./pages/dashboard/invoices/Invoices'))
);
const Breakdown = Loadable(
  lazy(() => import('./pages/dashboard/claims/Claims'))
);
const ShareDetails = Loadable(
  lazy(() =>
    import(
      './pages/dashboard/bookings/BookingDetails/ShareDetails/Share_details'
    )
  )
);

const StripeCheckout = Loadable(lazy(() => import('./pages/payment/checkout')));
const Success = Loadable(lazy(() => import('./pages/payment/success')));
const Cancel = Loadable(lazy(() => import('./pages/payment/cancel')));
const PasswordRecovery = Loadable(
  lazy(() => import('./pages/authentication/PasswordRecovery'))
);
const AuthorizationRequired = Loadable(
  lazy(() => import('./pages/AuthorizationRequired'))
);
const NotFound = Loadable(lazy(() => import('./pages/NotFound')));
const ServerError = Loadable(lazy(() => import('./pages/ServerError')));

const routes = [
  {
    path: '/',
    element: <LandingPage />,
  },

  {
    path: '/contactUs',
    element: <ContactUs />,
  },
  {
    path: 'blog/:id',
    element: <BlogPostDetails />,
  },
  {
    path: 'features-tracker',
    element: <TrackerLandingPage />,
  },
  {
    path: 'casestudy',
    element: <CaseStudy />,
  },
  //share Booking Details Route
  {
    path: 'share',
    children: [
      {
        path: 'details/:tabName/:bookingId',
        element: (
          <GuestGuard>
            <ShareDetails />
          </GuestGuard>
        ),
      },
    ],
  },
  {
    path: 'termsandconditions',
    element: <TermsAndConditions />,
  },
  {
    path: 'pricing',
    element: <PricingPage />,
  },
  // {
  //   path: "subscriptionPage",
  //   element: (
  //     <GuestGuard>
  //       <SubscriptionPage />
  //     </GuestGuard>
  //   ),
  // },
  {
    path: 'privacypolicy',
    element: <PrivacyPage />,
  },
  {
    path: 'payment',
    children: [
      {
        path: 'stripe',
        element: (
          <AuthGuard>
            <StripeCheckout />
          </AuthGuard>
        ),
      },
      {
        path: 'success',
        element: (
          <AuthGuard>
            <Success />
          </AuthGuard>
        ),
      },
      {
        path: 'cancel',
        element: (
          <AuthGuard>
            <Cancel />
          </AuthGuard>
        ),
      },
      {
        path: 'invoiceDetail/:id',
        element: (
          <AuthGuard>
            <InvoiceDetail />
          </AuthGuard>
        ),
      },
    ],
  },
  {
    path: 'authentication',
    children: [
      {
        path: 'login',
        element: (
          <GuestGuard>
            <Login />
          </GuestGuard>
        ),
      },
      {
        path: 'password-recovery',
        element: (
          <GuestGuard>
            <PasswordRecovery />
          </GuestGuard>
        ),
      },
      {
        path: 'password-reset',
        element: (
          <GuestGuard>
            <PasswordReset />
          </GuestGuard>
        ),
      },
      {
        path: 'login-unguarded',
        element: <Login />,
      },
      {
        path: 'register',
        element: (
          <GuestGuard>
            <Register />
          </GuestGuard>
        ),
      },
    ],
  },
  // {
  //   path: "customDashboard",
  //   element: (
  //     <AuthGuard>
  //       <DashboardLayout />
  //     </AuthGuard>
  //   ),
  //   children: [
  //     {
  //       path: "dashboard/test",
  //       element: <CustomDashboard />,
  //     },
  //   ],
  // },
  {
    path: 'customDashboard',
    element: (
      <AuthGuard>
        <DashboardLayout />
      </AuthGuard>
    ),
    children: [
      {
        path: ':state/:dashboardId',
        element: <MainDashboard />,
      },
    ],
  },
  {
    path: 'editDashboard/:state/:dashboardId',
    element: (
      <AuthGuard>
        <MainDashboard />
      </AuthGuard>
    ),
  },
  {
    path: 'newDashboard/:state',
    element: (
      <AuthGuard>
        <MainDashboard />
      </AuthGuard>
    ),
  },
  {
    path: 'fleet',
    element: (
      <AuthGuard>
        <DashboardLayout />
      </AuthGuard>
    ),
    children: [
      {
        path: 'map/replay/:vehicleId/:start_date/:end_date',
        element: <Traccar />,
      },
      {
        path: 'map/:vehicleId/:mapRefresh',
        element: <Traccar />,
      },
      {
        path: 'vehicles/:tabName',
        element: <VehicleList />,
      },
      {
        path: 'servicing/:tabName',
        element: <ServicingList />,
      },

      {
        path: 'gov/:tabName',
        element: <GovList />,
      },
      {
        path: 'precheck/:tabName',
        element: <PrechecksList />,
      },
      {
        path: 'odometerandfuel/:tabName',
        element: <OdometerList />,
      },

      {
        path: 'submodules/:tabName',
        element: <VehicleSubModules />,
      },
      {
        path: 'vehicles/rental_history/:vehicleNumber/:vehicleId/:tabName',
        element: <VehicleRentalHistory />,
      },
      {
        path: 'vehicle/:vehicleId/:tabName',
        element: <VehicleDetails />,
      },
    ],
  },
  {
    path: 'finance',
        element: (
      <AuthGuard>
        <DashboardLayout />
      </AuthGuard>
    ),
    children: [
    {
           path: 'invoice/:tabName',
        element: <Finance />,
      },
      {
        path: 'invoice/:id/:tabName',
        element: <FinanceDetail />,
        }
]
  },
  {
    path: 'assets',
    element: (
      <AuthGuard>
        <DashboardLayout />
      </AuthGuard>
    ),
    children: [
      {
        path: 'list/:tabName',
        element: <Assets />,
      },
      {
        path: 'details/:assetId/:tabName',
        element: <AssetDetails />,
      },
    ],
  },
  {
    path: 'claims',
    element: (
      <AuthGuard>
        <DashboardLayout />
      </AuthGuard>
    ),
    children: [
      {
        path: ':tabName',
        element: <Claims />,
      },
      {
        path: 'breakdown/:tabName',
        element: <Breakdown />,
      },
    ],
  },
  {
    path: 'bookings',
    element: (
      <AuthGuard>
        <DashboardLayout />
      </AuthGuard>
    ),
    children: [
      {
        path: 'customers/bookings/:customerName/:customerId/:tabName',
        element: <CustomerBookings />,
      },
      {
        path: 'driver/records/:driverName/:driverId/:tabName',
        element: <DriverBookings />,
      },
      {
        path: 'drivers/:tabName',
        element: <Drivers />,
      },
      {
        path: 'customers/:tabName',
        element: <Customers />,
      },
      {
        path: 'vehicles/:tabName',
        element: <Bookings />,
      },
      {
        path: 'details/:tabName/:bookingId',
        element: <BookingDetails />,
      },
    ],
  },
  {
    path: 'finance',
    element: (
      <AuthGuard>
        <DashboardLayout />
      </AuthGuard>
    ),
    children: [
      {
        path: 'invoices/:tabName',
        element: <Invoices />,
      },
    ],
  },
  {
    path: '/',
    element: (
      <AuthGuard>
        <DashboardLayout />
      </AuthGuard>
    ),
    children: [
      {
        path: 'analytics',
        element: <Analytics />,
      },
      {
        path: 'account',
        element: <Account />,
      },

      {
        path: 'users/:tabName',
        element: <Users />,
      },
      {
        path: 'calendar',
        element: <Calendar />,
      },
      {
        path: 'suppliers/:tabName',
        element: <Suppliers />,
      },
      {
        path: 'suppliers/vehicles/:supplierName/:supplierId/:tabName',
        element: <SupplierVehicleList />,
      },
    ],
  },

  {
    path: '*',
    element: (
      // <AuthGuard>
      <GuestGuard>
        <DashboardLayout />
      </GuestGuard>
      // </AuthGuard>
    ),
    children: [
      {
        path: '*/',
        // element: <Home />,
        element: <LandingPage />,
      },
      {
        path: '*/casestudy',
        // element: <Home />,
        element: <CaseStudy />,
      },
      {
        path: '*/401',
        element: <AuthorizationRequired />,
      },
      {
        path: '*/404',
        element: <NotFound />,
      },
      {
        path: '*/500',
        element: <ServerError />,
      },
      {
        path: '*/*',
        element: <NotFound />,
      },
    ],
  },
];

export default routes;
