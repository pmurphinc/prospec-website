import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { useRef } from "react";
import { Route, Switch, useLocation } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { resetViewTracking } from "./lib/tracking";

// Import Pages
import Home from "./pages/Home";
import Services from "./pages/Services";
import Reviews from "./pages/Reviews";
import Inspector from "./pages/Inspector";
import BookNow from "./pages/BookNow";
import BookingConfirmed from "./pages/BookingConfirmed";
import CommercialPCA from "./pages/CommercialPCA";
import CommercialBuilding from "./pages/CommercialBuilding";
import ApartmentInspections from "./pages/ApartmentInspections";
import LocalHomeInspection from "./pages/LocalHomeInspection";
import NewConstructionInspection from "./pages/NewConstructionInspection";
import WarrantyInspection from "./pages/WarrantyInspection";
import ManufacturedHomeInspection from "./pages/ManufacturedHomeInspection";

/* 
  DESIGN PHILOSOPHY: Approach 1 - The Master Builder (Industrial Editorial)
  App Router setup for ProSpec, establishing clean client-side routing.
*/

function Router() {
  const [location] = useLocation();
  const lastLocation = useRef<string | null>(null);

  // Clear per-view analytics dedupe state so a funnel step can fire once per
  // page view rather than once per session.
  //
  // This runs during render, NOT in an effect: child effects run before parent
  // effects, so resetting in a parent effect would clear the record of events
  // the newly mounted page had just fired, allowing duplicates.
  if (lastLocation.current !== location) {
    lastLocation.current = location;
    resetViewTracking();
  }

  return (
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
