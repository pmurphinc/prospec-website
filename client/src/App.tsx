import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";

// Import Pages
import Home from "./pages/Home";
import Services from "./pages/Services";
import Reviews from "./pages/Reviews";
import Inspector from "./pages/Inspector";
import BookNow from "./pages/BookNow";
import CommercialPCA from "./pages/CommercialPCA";
import CommercialBuilding from "./pages/CommercialBuilding";
import ApartmentInspections from "./pages/ApartmentInspections";
import LocalHomeInspection from "./pages/LocalHomeInspection";

/* 
  DESIGN PHILOSOPHY: Approach 1 - The Master Builder (Industrial Editorial)
  App Router setup for ProSpec, establishing clean client-side routing.
*/

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/services" component={Services} />
      <Route path="/reviews" component={Reviews} />
      <Route path="/inspector" component={Inspector} />
      <Route path="/booknow" component={BookNow} />

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
