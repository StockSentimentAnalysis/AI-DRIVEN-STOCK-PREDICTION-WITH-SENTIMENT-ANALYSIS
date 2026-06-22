'use client';

import {
  ComposedChart, Area, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  ReferenceArea,
} from 'recharts';
import { AlertTriangle, Info } from 'lucide-react';

const backtestData = [
  { month: 'Apr 24',  strategy:   0, bh:   0 },
  { month: 'May 24',  strategy:   2, bh:   8 },
  { month: 'Jun 24',  strategy:   5, bh:  15 },
  { month: 'Jul 24',  strategy:   8, bh:  22 },
  { month: 'Aug 24',  strategy:  12, bh:  25 },
  { month: 'Sep 24',  strategy:  18, bh:  28 },
  { month: 'Oct 24',  strategy:  22, bh:  35 },
  { month: 'Nov 24',  strategy:  45, bh:  65 },
  { month: 'Dec 24',  strategy:  68, bh:  72 },
  { month: 'Jan 25',  strategy:  70, bh:  75 },
  { month: 'Feb 25',  strategy:  72, bh:  65 },
  { month: 'Mar 25',  strategy:  74, bh:  55 },
  { month: 'Apr 25',  strategy:  78, bh:  70 },
  { month: 'May 25',  strategy:  82, bh:  95 },
  { month: 'Jun 25',  strategy:  86, bh: 120 },
  { month: 'Jul 25',  strategy:  86, bh: 150 },
  { month: 'Aug 25',  strategy:  86, bh: 156 },
];

const ChartTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1a2235] border border-[#1e293b] rounded-lg px-3 py-2 shadow-xl">
        <p className="text-xs text-[#64748b] mb-2">{label}</p>
        {payload.map((p: any) => (
          <p key={p.name} className="text-sm font-mono flex justify-between gap-4" style={{ color: p.color }}>
            <span>{p.name}:</span>
            <span className="font-bold">{p.value}%</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function BacktestSection() {
  return (
    <section id="backtest" className="py-16 px-6">
      <div className="border-t-2 border-primary mb-8" />
      <div className="flex items-baseline gap-4 mb-10">
        <span className="text-5xl font-bold text-text-subtle font-mono">05</span>
        <h2 className="text-2xl font-bold text-text-primary">Backtest Analysis</h2>
      </div>

      {/* Top Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Strategy Card */}
        <div className="rounded-xl bg-surface border border-primary/30 p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <TrendingUp size={100} className="text-primary" />
          </div>
          <h3 className="text-sm font-semibold text-text-primary mb-6 uppercase tracking-wider relative z-10">
            BiLSTM Strategy (V1)
          </h3>
          <div className="grid grid-cols-2 gap-4 relative z-10">
            <div>
              <p className="text-xs text-text-muted uppercase tracking-wider">Cumulative Return</p>
              <p className="metric-number text-3xl font-bold text-primary mt-1">86.2%</p>
            </div>
            <div className="group relative">
              <p className="text-xs text-text-muted uppercase tracking-wider">Sharpe Ratio</p>
              <div className="flex items-center gap-2 mt-1">
                <p className="metric-number text-3xl font-bold text-danger">2.077</p>
                <AlertTriangle className="text-danger" size={20} />
              </div>
              {/* Custom Tooltip on hover */}
              <div className="absolute bottom-full left-0 mb-2 w-64 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                <div className="bg-surface-2 border border-danger/30 p-2 rounded shadow-xl text-xs text-text-primary">
                  Higher Sharpe is an <span className="text-danger font-bold">ARTEFACT</span> of low exposure, not predictive skill.
                </div>
              </div>
            </div>
            <div>
              <p className="text-xs text-text-muted uppercase tracking-wider">Market Exposure</p>
              <p className="metric-number text-xl font-bold text-text-primary mt-1">29.7% of days</p>
            </div>
            <div>
              <p className="text-xs text-text-muted uppercase tracking-wider">Approx Max Drawdown</p>
              <p className="metric-number text-xl font-bold text-text-primary mt-1">~−6%</p>
            </div>
          </div>
        </div>

        {/* Buy & Hold Card */}
        <div className="rounded-xl bg-surface border border-border p-6 relative overflow-hidden">
          <h3 className="text-sm font-semibold text-text-muted mb-6 uppercase tracking-wider relative z-10">
            Buy & Hold (Baseline)
          </h3>
          <div className="grid grid-cols-2 gap-4 relative z-10">
            <div>
              <p className="text-xs text-text-muted uppercase tracking-wider">Cumulative Return</p>
              <p className="metric-number text-3xl font-bold text-text-primary mt-1">156.4%</p>
            </div>
            <div>
              <p className="text-xs text-text-muted uppercase tracking-wider">Sharpe Ratio</p>
              <p className="metric-number text-3xl font-bold text-text-primary mt-1">1.885</p>
            </div>
            <div>
              <p className="text-xs text-text-muted uppercase tracking-wider">Market Exposure</p>
              <p className="metric-number text-xl font-bold text-text-primary mt-1">100% of days</p>
            </div>
            <div>
              <p className="text-xs text-text-muted uppercase tracking-wider">Approx Max Drawdown</p>
              <p className="metric-number text-xl font-bold text-text-primary mt-1">~−25%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Cumulative Return Chart */}
      <div className="rounded-xl bg-surface border border-border p-6 mb-8">
        <h3 className="text-sm font-semibold text-text-primary mb-2 uppercase tracking-wider">
          Cumulative Return: Strategy vs Buy & Hold
        </h3>
        <p className="text-xs text-text-muted mb-6 italic">
          Approximate reconstruction from reported endpoints (Apr 2024 – Aug 2025). Strategy clearly underperforms on raw return despite higher Sharpe.
        </p>
        
        <ResponsiveContainer width="100%" height={350}>
          <ComposedChart data={backtestData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
            <XAxis dataKey="month" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={{ stroke: '#1e293b' }} tickMargin={10} />
            <YAxis tick={{ fill: '#64748b', fontSize: 11 }} axisLine={{ stroke: '#1e293b' }} tickFormatter={(val) => `${val}%`} />
            <RechartsTooltip content={<ChartTooltip />} />
            
            {/* Cash Region Background to represent 70.3% out-of-market time conceptually */}
            <ReferenceArea y1={0} y2={160} fill="#111827" fillOpacity={0.5} />
            
            <Area 
              type="monotone" 
              dataKey="strategy" 
              name="Strategy" 
              fill="#00c896" 
              fillOpacity={0.1} 
              stroke="#00c896" 
              strokeWidth={3} 
            />
            <Line 
              type="monotone" 
              dataKey="bh" 
              name="Buy & Hold" 
              stroke="#3b82f6" 
              strokeWidth={2} 
              strokeDasharray="5 5" 
              dot={false}
            />
          </ComposedChart>
        </ResponsiveContainer>
        
        <div className="flex items-center justify-center gap-6 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-4 h-1 rounded-sm bg-primary" />
            <span className="text-xs text-text-muted">BiLSTM Strategy</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-0 border-t-2 border-dashed border-chart-blue" />
            <span className="text-xs text-text-muted">Buy & Hold</span>
          </div>
        </div>
      </div>

      {/* The Sharpe Artefact Explainer */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Explainer Box */}
        <div className="rounded-xl bg-surface-2 border border-border p-6 flex flex-col">
          <div className="flex items-center gap-2 mb-4">
            <Info size={18} className="text-text-primary" />
            <h3 className="text-sm font-semibold text-text-primary uppercase tracking-wider">
              The Sharpe Artefact Explained
            </h3>
          </div>
          
          <div className="grid grid-cols-2 gap-4 flex-grow">
            <div className="border-r border-border pr-4">
              <p className="text-xs text-text-muted mb-2 uppercase tracking-wider font-semibold">Naive Reading</p>
              <div className="space-y-2 font-mono text-sm">
                <p className="flex justify-between">
                  <span className="text-text-primary">Strategy Sharpe:</span>
                  <span className="text-primary font-bold">2.077 ✓</span>
                </p>
                <p className="flex justify-between">
                  <span className="text-text-muted">B&H Sharpe:</span>
                  <span className="text-text-muted">1.885</span>
                </p>
              </div>
              <p className="mt-4 text-sm text-text-primary leading-relaxed italic">
                &quot;Strategy wins on risk-adjusted basis!&quot;
              </p>
            </div>
            
            <div className="pl-2">
              <p className="text-xs text-primary mb-2 uppercase tracking-wider font-semibold">Correct Reading</p>
              <ul className="space-y-2 text-sm text-text-muted font-mono list-disc list-inside">
                <li>Strategy in market: <span className="text-text-primary">29.7%</span></li>
                <li>Cash <span className="text-text-primary">70.3%</span> of time</li>
                <li className="text-primary ml-2">→ lower volatility</li>
                <li className="text-danger font-bold ml-2">→ mechanically inflated Sharpe</li>
              </ul>
              <div className="mt-4 pt-4 border-t border-border/50 text-xs text-text-subtle font-mono space-y-1">
                <p>Directional acc: 51.6% (coin flip)</p>
                <p>McNemar p: 0.6205 (not sig)</p>
                <p className="text-danger font-bold mt-2">VERDICT: No skill. Artefact only.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Warning Callout */}
        <div className="rounded-xl bg-danger/10 border border-danger/30 p-6 flex items-start gap-4">
          <AlertTriangle size={24} className="text-danger flex-shrink-0 mt-1" />
          <div>
            <h3 className="text-sm font-bold text-danger mb-3 uppercase tracking-wider">
              Always report exposure alongside Sharpe ratio.
            </h3>
            <p className="text-sm text-text-primary leading-relaxed mb-3">
              A model that sits in cash 70% of the time mechanically posts a higher
              Sharpe than buy-and-hold — even with zero predictive skill.
            </p>
            <p className="text-sm text-text-muted leading-relaxed">
              This is the single most dangerous metric trap in financial ML.
              Our study is a concrete, documented example.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// Ensure TrendingUp is imported in the component if not already (it's used in the UI)
import { TrendingUp } from 'lucide-react';
