import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { lazy, Suspense } from "react";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";

// Home is eagerly imported: it is the most common entry point, and splitting it
// would only add a network round trip before the landing page can paint.
import Home from "./pages/Home";

// Every other route is code-split so a visitor downloads just the page they
// asked for. LocalHomeInspection alone carries five full city datasets.
const Services = lazy(() => import("./pages/Services"));
const Reviews = lazy(() => import("./pages/Reviews"));
const Inspector = lazy(() => import("./pages/Inspector"));
const BookNow = lazy(() => import("./pages/BookNow"));
const BookingConfirmed = lazy(() => import("./pages/BookingConfirmed"));
const CommercialPCA = lazy(() => import("./pages/CommercialPCA"));
const CommercialBuilding = lazy(() => import("./pages/CommercialBuilding"));
const ApartmentInspections = lazy(() => import("./pages/ApartmentInspections"));
const LocalHomeInspection = lazy(() => import("./pages/LocalHomeInspection"));
const NewConstructionInspection = lazy(
  () => import("./pages/NewConstructionInspection")
);
const WarrantyInspection = lazy(() => import("./pages/WarrantyInspection"));
const ManufacturedHomeInspection = lazy(
  () => import("./pages/ManufacturedHomeInspection")
);

/* 
  DESIGN PHILOSOPHY: Approach 1 - The Master Builder (Industrial Editorial)
  App Router setup for ProSpec, establishing clean client-side routing.
*/

/**
 * Shown only while a route chunk is in flight. Deliberately minimal and
 * non-blocking — the server-rendered static content stays on screen until
 * React commits, so this is rarely visible on a first load.
 */
function RouteFallback() {
  return (
    <div
      className="min-h-screen bg-background"
      role="status"
      aria-label="Loading page"
    />
  );
}

// Analytics dedupe needs no router involvement: lib/tracking.ts keys each
// funnel event by pathname and normalized parameters, so a different route is
// already a different key. Nothing mutates analytics state during render.
function Router() {
  return (
    <Suspense fallback={<RouteFallback />}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/services" component={Services} />
        <Route path="/reviews" component={Reviews} />
        <Route path="/inspector" component={Inspector} />
        <Route path="/booknow" component={BookNow} />
        {/* Reached only via Spectora's post-booking redirect. Fires booking_complete. */}
        <Route path="/booking-confirmed" component={BookingConfirmed} />

        {/* Local Residential SEO Landing Pages */}
        <Route
          path="/home-inspection-sacramento"
          component={LocalHomeInspection}
        />
        <Route path="/home-inspection-folsom" component={LocalHomeInspection} />
        <Route
          path="/home-inspection-el-dorado-hills"
          component={LocalHomeInspection}
        />
        <Route
          path="/home-inspection-placerville"
          component={LocalHomeInspection}
        />
        <Route
          path="/home-inspection-shingle-springs"
          component={LocalHomeInspection}
        />

        {/* Service-Specific Pages */}
        <Route
          path="/new-construction-inspection"
          component={NewConstructionInspection}
        />
        <Route
          path="/11-month-warranty-inspection"
          component={WarrantyInspection}
        />
        <Route
          path="/manufactured-home-inspection"
          component={ManufacturedHomeInspection}
        />

        {/* Commercial Landing Pages - Exact URLs matching user requirements */}
        <Route
          path="/commercial-property-condition-assessments-sacramento"
          component={CommercialPCA}
        />
        <Route
          path="/commercial-building-inspections-sacramento"
          component={CommercialBuilding}
        />
        <Route
          path="/apartment-building-inspections-sacramento"
          component={ApartmentInspections}
        />

        <Route path="/404" component={NotFound} />
        {/* Final fallback route */}
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
