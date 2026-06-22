'use client';

import { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  Database,
  BarChart3,
  Layers,
  TrendingUp,
  MessageSquareText,
  CheckCircle2,
  Menu,
  X,
} from 'lucide-react';

const sections = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'dataset', label: 'Dataset & Coverage', icon: Database },
  { id: 'models', label: 'Model Results', icon: BarChart3 },
  { id: 'features', label: 'Feature Importance', icon: Layers },
  { id: 'backtest', label: 'Backtest', icon: TrendingUp },
  { id: 'sentiment', label: 'Sentiment Analysis', icon: MessageSquareText },
  { id: 'conclusions', label: 'Conclusions', icon: CheckCircle2 },
];

export default function Sidebar() {
  const [active, setActive] = useState('overview');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -70% 0px' }
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Mobile hamburger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 p-2 rounded-lg bg-surface border border-border lg:hidden"
        aria-label="Toggle navigation"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar */}
      <nav
        className={`fixed left-0 top-0 h-full z-40 bg-surface/95 backdrop-blur-xl border-r border-border
          transition-transform duration-300 ease-in-out
          w-64 lg:translate-x-0
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Logo area */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
              <TrendingUp size={16} className="text-primary" />
            </div>
            <div>
              <p className="text-sm font-semibold text-text-primary">HBL Study</p>
              <p className="text-xs text-text-muted">FYP Dashboard</p>
            </div>
          </div>
        </div>

        {/* Nav links */}
        <div className="p-4 space-y-1">
          {sections.map(({ id, label, icon: Icon }, idx) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200
                ${
                  active === id
                    ? 'bg-primary/10 text-primary border-l-2 border-primary'
                    : 'text-text-muted hover:text-text-primary hover:bg-surface-2'
                }
              `}
            >
              <span className="text-xs text-text-subtle font-mono w-4">
                {String(idx + 1).padStart(2, '0')}
              </span>
              <Icon size={16} />
              <span>{label}</span>
            </a>
          ))}
        </div>

        {/* Bottom badge */}
        <div className="absolute bottom-6 left-4 right-4">
          <div className="p-3 rounded-lg bg-danger/10 border border-danger/30">
            <p className="text-xs font-mono text-danger font-semibold">RESULT: NULL</p>
            <p className="text-xs font-mono text-text-muted mt-1">R² = −0.0413</p>
          </div>
        </div>
      </nav>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
