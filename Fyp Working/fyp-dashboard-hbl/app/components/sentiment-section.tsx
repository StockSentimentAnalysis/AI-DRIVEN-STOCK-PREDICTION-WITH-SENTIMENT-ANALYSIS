'use client';

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  Cell, ReferenceLine,
} from 'recharts';
import { Newspaper, FileText, BookOpen, RefreshCw } from 'lucide-react';

const wasiAspects = [
  { aspect: 'Profit',              weight: 0.20, note: 'Most informative' },
  { aspect: 'Capital',             weight: 0.18 },
  { aspect: 'Deposits',            weight: 0.14 },
  { aspect: 'Advances',            weight: 0.12 },
  { aspect: 'Non-Performing Loans',weight: 0.10, note: 'Negative polarity expected' },
  { aspect: 'Provisions',          weight: 0.09 },
  { aspect: 'Risk',                weight: 0.07 },
  { aspect: 'Outlook',             weight: 0.05 },
  { aspect: 'Macroeconomic',       weight: 0.03 },
  { aspect: 'Costs',               weight: 0.02 },
];

const contrarianData = [
  { direction: 'All news days',      upRate: 51.0, color: '#64748b' },
  { direction: 'Positive sentiment', upRate: 46.5, color: '#ef4444' }, // below baseline
  { direction: 'Negative sentiment', upRate: 59.2, color: '#00c896' }, // above baseline ✓
  { direction: 'Neutral sentiment',  upRate: 44.0, color: '#64748b' },
];

const ChartTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-[#1a2235] border border-[#1e293b] rounded-lg px-3 py-2 shadow-xl">
        <p className="text-sm font-semibold text-text-primary mb-1">{data.aspect || data.direction}</p>
        <p className="text-xs font-mono" style={{ color: payload[0].color || data.color }}>
          {data.weight !== undefined ? `Weight: ${(data.weight * 100).toFixed(0)}%` : `Up Rate: ${data.upRate}%`}
        </p>
        {data.note && <p className="text-[10px] text-text-muted mt-1 italic">{data.note}</p>}
      </div>
    );
  }
  return null;
};

export default function SentimentSection() {
  return (
    <section id="sentiment" className="py-16 px-6">
      <div className="border-t-2 border-chart-orange mb-8" />
      <div className="flex items-baseline gap-4 mb-10">
        <span className="text-5xl font-bold text-text-subtle font-mono">06</span>
        <h2 className="text-2xl font-bold text-text-primary">Sentiment Analysis Deep Dive</h2>
      </div>

      {/* Three Sentiment Source Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {/* Card 1 — Daily News */}
        <div className="rounded-xl bg-surface border border-border p-6 hover:border-text-subtle transition-colors">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-surface-2 border border-border">
              <Newspaper size={20} className="text-text-primary" />
            </div>
            <h3 className="font-semibold text-text-primary">Daily News (Dawn)</h3>
          </div>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between"><span className="text-text-muted">Source:</span> <span className="font-mono text-text-primary">ProsusAI FinBERT</span></div>
            <div className="flex justify-between"><span className="text-text-muted">Articles:</span> <span className="font-mono text-text-primary">385 (of 410 scraped)</span></div>
            <div className="flex justify-between"><span className="text-text-muted">Coverage:</span> <span className="font-mono text-text-primary">8.4% of days</span></div>
            <div className="flex justify-between"><span className="text-text-muted">Modal val:</span> <span className="font-mono text-text-primary">0.000 (91.6% of days)</span></div>
          </div>
          <div className="mt-6 p-3 rounded bg-surface-2 border border-danger/30 flex items-start gap-2">
            <span className="text-sm mt-0.5">⛔</span>
            <p className="text-xs text-text-primary leading-relaxed">
              <span className="font-bold text-danger">Sub-threshold</span> — cannot support sequence learning
            </p>
          </div>
        </div>

        {/* Card 2 — Quarterly Reports */}
        <div className="rounded-xl bg-surface border border-border p-6 hover:border-text-subtle transition-colors">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-surface-2 border border-border">
              <FileText size={20} className="text-text-primary" />
            </div>
            <h3 className="font-semibold text-text-primary">Quarterly Reports (WASI)</h3>
          </div>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between"><span className="text-text-muted">Source:</span> <span className="font-mono text-text-primary text-right">FinBERT-tone ABSA</span></div>
            <div className="flex justify-between"><span className="text-text-muted">Reports:</span> <span className="font-mono text-text-primary">36 quarterly</span></div>
            <div className="flex justify-between"><span className="text-text-muted">Coverage:</span> <span className="font-mono text-text-primary">100% (fwd-filled)</span></div>
            <div className="flex flex-col mt-2">
              <span className="text-text-muted mb-1">Problem:</span> 
              <span className="text-xs text-text-primary font-mono bg-surface-2 p-2 rounded">Near-zero within-quarter variance. Same value repeated ~60 days.</span>
            </div>
          </div>
          <div className="mt-4 p-3 rounded bg-surface-2 border border-secondary/30 flex items-start gap-2">
            <span className="text-sm mt-0.5">⚠️</span>
            <p className="text-xs text-text-primary leading-relaxed">
              Full coverage, <span className="text-secondary font-bold">no day-to-day variance</span>
            </p>
          </div>
        </div>

        {/* Card 3 — Annual Reports */}
        <div className="rounded-xl bg-surface border border-border p-6 hover:border-text-subtle transition-colors">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-surface-2 border border-border">
              <BookOpen size={20} className="text-text-primary" />
            </div>
            <h3 className="font-semibold text-text-primary">Annual Reports</h3>
          </div>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between"><span className="text-text-muted">Source:</span> <span className="font-mono text-text-primary">FinBERT-tone ABSA</span></div>
            <div className="flex justify-between"><span className="text-text-muted">Reports:</span> <span className="font-mono text-text-primary">10 annual (2015-2024)</span></div>
            <div className="flex justify-between"><span className="text-text-muted">Coverage:</span> <span className="font-mono text-text-primary">100% of days</span></div>
            <div className="flex flex-col mt-2">
              <span className="text-text-muted mb-1">Problem:</span> 
              <span className="text-xs text-text-primary font-mono bg-surface-2 p-2 rounded border border-danger/20">Systematic NEGATIVE TONE BIAS on formal risk disclosures.</span>
            </div>
          </div>
          <div className="mt-4 p-3 rounded bg-surface-2 border border-secondary/30 flex items-start gap-2">
            <span className="text-sm mt-0.5">⚠️</span>
            <p className="text-xs text-text-primary leading-relaxed">
              Full coverage, <span className="text-secondary font-bold">spurious negative bias</span>
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 10 WASI Aspects */}
        <div className="rounded-xl bg-surface border border-border p-6">
          <h3 className="text-sm font-semibold text-text-primary mb-6 uppercase tracking-wider">
            10 WASI Aspects (Quarterly)
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart layout="vertical" data={wasiAspects} margin={{ top: 0, right: 20, left: 40, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#1e293b" />
              <XAxis type="number" hide={true} domain={[0, 0.25]} />
              <YAxis 
                dataKey="aspect" 
                type="category" 
                tick={{ fill: '#f1f5f9', fontSize: 11 }} 
                axisLine={false} 
                tickLine={false} 
                width={120}
              />
              <RechartsTooltip content={<ChartTooltip />} cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }} />
              <Bar dataKey="weight" fill="#f97316" radius={[0, 4, 4, 0]} barSize={16}>
                {wasiAspects.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.aspect === 'Profit' ? '#f5a623' : '#3b82f6'} fillOpacity={0.8} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Contrarian Finding Panel */}
        <div className="rounded-xl bg-surface border border-secondary/50 p-6 flex flex-col shadow-[0_0_20px_rgba(245,166,35,0.05)]">
          <div className="flex items-center gap-3 mb-6">
            <RefreshCw size={20} className="text-secondary" />
            <h3 className="text-sm font-bold text-secondary uppercase tracking-wider">
              Contrarian Finding
            </h3>
          </div>
          
          <div className="mb-6 p-4 rounded-lg bg-surface-2 border border-border text-sm text-text-primary leading-relaxed font-medium">
            On news days, <span className="text-danger font-bold">NEGATIVE</span> sentiment preceded upward price movement more often than <span className="text-primary font-bold">POSITIVE</span> sentiment did.
          </div>

          <div className="flex-grow min-h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart layout="vertical" data={contrarianData} margin={{ top: 0, right: 30, left: 20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#1e293b" />
                <XAxis type="number" domain={[40, 65]} tick={{ fill: '#64748b', fontSize: 11 }} tickFormatter={(v) => `${v}%`} />
                <YAxis dataKey="direction" type="category" tick={{ fill: '#f1f5f9', fontSize: 11 }} axisLine={false} tickLine={false} width={120} />
                <RechartsTooltip content={<ChartTooltip />} cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }} />
                <ReferenceLine x={50} stroke="#f5a623" strokeDasharray="4 4" strokeWidth={2} label={{ position: 'top', value: 'Baseline 50%', fill: '#f5a623', fontSize: 10 }} />
                <Bar dataKey="upRate" radius={[0, 4, 4, 0]} barSize={20}>
                  {contrarianData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-4 p-4 rounded-lg bg-surface-2/50 border border-border">
            <p className="text-sm text-text-primary mb-3">
              Negative sentiment → <span className="font-mono text-primary font-bold">59.2%</span> actual UP rate (vs <span className="font-mono text-danger font-bold">46.5%</span> for positive)
            </p>
            <p className="text-xs text-text-muted leading-relaxed">
              Possible explanation: News itself — regardless of tone — signals heightened attention to HBL, which may precede buying pressure.
              Consistent with Fang & Peress (2009): <span className="italic text-text-primary">&quot;Coverage breadth, not just valence, affects pricing.&quot;</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
