import Sidebar from './components/sidebar';
import HeroSection from './components/hero-section';
import DatasetSection from './components/dataset-section';
import ModelResultsSection from './components/model-results-section';
import FeatureImportanceSection from './components/feature-importance-section';
import BacktestSection from './components/backtest-section';
import SentimentSection from './components/sentiment-section';
import ConclusionsSection from './components/conclusions-section';
import FloatingBadge from './components/floating-badge';

export default function Home() {
  return (
    <div className="flex bg-background min-h-screen text-foreground font-sans">
      <Sidebar />
      
      <main className="flex-1 lg:ml-64 relative w-full overflow-x-hidden">
        {/* Top Progress/Header Indicator for desktop */}
        <div className="hidden lg:flex sticky top-0 z-30 bg-background/80 backdrop-blur-md border-b border-border px-6 py-3 items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs font-mono text-text-muted tracking-widest uppercase">
              HBL Sentiment Study Dashboard
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            {[1, 2, 3, 4, 5, 6, 7].map((num) => (
              <div key={num} className="w-1.5 h-1.5 rounded-full bg-border" />
            ))}
          </div>
        </div>

        <div className="max-w-7xl mx-auto">
          <HeroSection />
          <DatasetSection />
          <ModelResultsSection />
          <FeatureImportanceSection />
          <BacktestSection />
          <SentimentSection />
          <ConclusionsSection />
        </div>

        {/* Footer */}
        <footer className="border-t border-border py-8 px-6 text-center mt-12 bg-surface">
          <p className="text-xs text-text-muted font-mono mb-2">
            Generated for FYP jury presentation
          </p>
          <p className="text-sm text-text-primary">
            Hamdard University, FEST, Karachi — BS CS 2026
          </p>
        </footer>
      </main>

      <FloatingBadge />
    </div>
  );
}
