import React, { useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";

/* 
  DESIGN PHILOSOPHY: Approach 1 - The Master Builder (Industrial Editorial)
  Provides a global grid alignment structure, smooth scrolling behavior, and correct semantic pairings.
*/

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  // Always scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      {/* Structural grid lines (visual-only absolute elements) */}
      <div className="pointer-events-none fixed inset-y-0 left-6 md:left-12 lg:left-24 w-[1px] bg-border/10 z-10" />
      <div className="pointer-events-none fixed inset-y-0 right-6 md:right-12 lg:right-24 w-[1px] bg-border/10 z-10" />
      
      {/* Header Navigation */}
      <Header />

      {/* Main Content Area */}
      <main className="flex-grow pt-[80px] md:pt-[90px]">
        {children}
      </main>

      {/* Footer Navigation */}
      <Footer />
    </div>
  );
}
