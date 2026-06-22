'use client';

import { useState, useMemo } from 'react';
import { GraduationCap, Calendar, User, AlertTriangle } from 'lucide-react';

const heroStats = [
  { label: 'Trading Days', value: '2,503', color: 'text-primary', border: 'border-primary/30' },
  { label: 'Modelling Rows', value: '2,320', color: 'text-primary', border: 'border-primary/30' },
  { label: 'News Coverage', value: '8.4%', color: 'text-danger', border: 'border-danger/30' },
  { label: 'Dawn Articles', value: '385', color: 'text-secondary', border: 'border-secondary/30' },
  { label: 'Quarterly Reports', value: '36', color: 'text-secondary', border: 'border-secondary/30' },
  { label: 'Annual Reports', value: '10', color: 'text-text-muted', border: 'border-text-muted/30' },
];

const team = [
  { name: 'Wasif Sajjad', roll: '2672-2022' },
  { name: 'Syed Muzammil Ahmed', roll: '3014-2022' },
  { name: 'Ghufran E Azam', roll: '2536-2022' },
];

export default function HeroSection() {
  const [hoveredSquare, setHoveredSquare] = useState<number | null>(null);

  // Generate 250 squares, 8.4% lit (21 squares)
  const gridSquares = useMemo(() => {
    const totalSquares = 250;
    const litCount = 21; // 8.4% of 250
    const litIndices = new Set<number>();

    // Deterministic "random" distribution using a seed-like approach
    const positions = [3, 12, 27, 41, 55, 68, 73, 89, 102, 115, 128, 134, 147, 159, 168, 175, 188, 201, 214, 232, 245];
    positions.forEach((p) => litIndices.add(p));

    return Array.from({ length: totalSquares }, (_, i) => ({
      index: i,
      isLit: litIndices.has(i),
    }));
  }, []);

  return (
    <section id="overview" className="min-h-screen py-8 px-6">
      {/* Top Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-text-primary leading-tight">
            AI-Driven Stock Prediction Using Sentiment Analysis
          </h1>
          <p className="text-sm text-text-muted mt-1">
            A Negative-Result Study of Habib Bank Limited on the Pakistan Stock Exchange
          </p>
        </div>
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface border border-border">
            <GraduationCap size={14} className="text-primary" />
            <span className="text-xs text-text-muted">Hamdard University, FEST, Karachi</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface border border-border">
            <User size={14} className="text-secondary" />
            <span className="text-xs text-text-muted">Supervisor: Dr. Taha Shabbir</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface border border-border">
            <Calendar size={14} className="text-text-muted" />
            <span className="text-xs text-text-muted">BS CS 2026</span>
          </div>
        </div>
      </div>

      {/* 6 Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
        {heroStats.map((stat) => (
          <div
            key={stat.label}
            className={`card-hover p-5 rounded-xl bg-surface border ${stat.border} flex flex-col`}
          >
            <span className={`metric-number text-3xl font-bold ${stat.color}`}>
              {stat.value}
            </span>
            <span className="text-xs text-text-muted mt-2 uppercase tracking-wider">
              {stat.label}
            </span>
          </div>
        ))}
      </div>

      {/* Coverage Density Visualizer */}
      <div className="rounded-2xl bg-surface border border-border p-6 mb-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-1 h-6 rounded-full bg-primary" />
          <h2 className="text-lg font-semibold text-text-primary">
            Coverage Density Visualizer
          </h2>
          <span className="text-xs text-text-muted ml-2">
            Each square ≈ 10 trading days · 250 squares · 2,503 total days
          </span>
        </div>

        {/* Grid */}
        <div className="relative mb-6">
          <div className="grid gap-1" style={{ gridTemplateColumns: 'repeat(25, minmax(0, 1fr))' }}>
            {gridSquares.map((sq) => (
              <div
                key={sq.index}
                className={`aspect-square rounded-sm cursor-pointer transition-all duration-200 relative
                  ${sq.isLit
                    ? 'bg-primary shadow-sm shadow-primary/30 hover:shadow-md hover:shadow-primary/50 hover:scale-125'
                    : 'bg-border hover:bg-text-subtle hover:scale-110'
                  }
                `}
                onMouseEnter={() => setHoveredSquare(sq.index)}
                onMouseLeave={() => setHoveredSquare(null)}
              >
                {hoveredSquare === sq.index && (
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-10 pointer-events-none">
                    <div className="px-2 py-1 rounded bg-surface-2 border border-border text-xs font-mono whitespace-nowrap shadow-xl">
                      {sq.isLit ? (
                        <span className="text-primary">✦ News day</span>
                      ) : (
                        <span className="text-text-muted">No coverage</span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="flex items-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm bg-primary" />
              <span className="text-xs text-text-muted">News day (8.4%)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm bg-border" />
              <span className="text-xs text-text-muted">No coverage (91.6%)</span>
            </div>
          </div>
        </div>

        {/* Warning callout */}
        <div className="p-4 rounded-xl bg-secondary/5 border border-secondary/20">
          <div className="flex gap-3">
            <AlertTriangle className="text-secondary flex-shrink-0 mt-0.5" size={18} />
            <div>
              <p className="text-sm font-semibold text-secondary mb-1">
                91.6% of trading days had ZERO news coverage.
              </p>
              <p className="text-sm text-text-muted leading-relaxed">
                A 30-day input window averages only 2.5 days of actual sentiment.
                This is the binding structural constraint no model can overcome.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Team Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {team.map((member) => (
          <div
            key={member.roll}
            className="card-hover p-5 rounded-xl bg-surface border border-border flex items-center gap-4"
          >
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm">
              {member.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <p className="text-sm font-semibold text-text-primary">{member.name}</p>
              <p className="text-xs text-text-muted font-mono">Roll {member.roll}</p>
            </div>
            <span className="ml-auto text-xs px-2 py-0.5 rounded bg-primary/10 text-primary font-medium">
              BS CS 2026
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
