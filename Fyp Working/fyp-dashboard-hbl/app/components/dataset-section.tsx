'use client';

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  ReferenceLine, Cell, Legend,
} from 'recharts';
import { Info } from 'lucide-react';

const datasetSummary = [
  { item: 'Trading days (raw)', value: '2,503' },
  { item: 'Sample period', value: 'Jan 2016 – Aug 2025' },
  { item: 'Final modelling rows', value: '2,320' },
  { item: 'Features', value: '58 (technical + 15 sentiment)' },
  { item: 'Articles scraped / date-resolved', value: '410 / 385 (94% success)' },
  { item: 'Trading days with news', value: '210 (8.4% coverage)' },
  { item: 'Quarterly reports (WASI)', value: '36' },
  { item: 'Annual reports (ABSA)', value: '10 (2015–2024)' },
  { item: 'Mean daily log return', value: '≈ 0.0002' },
  { item: 'Actual return std (test)', value: '0.02312' },
  { item: 'Prediction std (V1 model)', value: '0.00288' },
  { item: 'Test set', value: '~343 days, Apr 2024 – Aug 2025' },
  { item: 'Train / Val / Test split', value: '70% / 15% / 15% (chronological)' },
];

const featureGroups = [
  { group: 'Trend/Momentum', count: 4, examples: 'RSI(14), MACD, signal line', color: '#3b82f6' },
  { group: 'Volatility', count: 4, examples: 'ATR, vol_10, vol_20, Bollinger', color: '#8b5cf6' },
  { group: 'Volume', count: 2, examples: 'OBV, daily volume', color: '#f97316' },
  { group: 'Returns', count: 4, examples: 'ret_3, ret_7, ret_10, ret_20', color: '#06b6d4' },
  { group: 'Daily Sentiment', count: 4, examples: 'daily_sentiment, sent_3, sent_7, news_count', color: '#f5a623' },
  { group: 'Quarterly Sentiment', count: 1, examples: 'quarterly_sentiment (WASI)', color: '#f5a623' },
  { group: 'Annual Sentiment', count: 10, examples: '10 aspect z-scores', color: '#f5a623' },
];

const articlesByYear = [
  { year: '2016', articles: 18, coverage: 1.8 },
  { year: '2017', articles: 22, coverage: 2.2 },
  { year: '2018', articles: 31, coverage: 3.1 },
  { year: '2019', articles: 28, coverage: 2.8 },
  { year: '2020', articles: 45, coverage: 4.5 },
  { year: '2021', articles: 38, coverage: 3.8 },
  { year: '2022', articles: 52, coverage: 5.2 },
  { year: '2023', articles: 48, coverage: 4.8 },
  { year: '2024', articles: 61, coverage: 6.1 },
  { year: '2025', articles: 42, coverage: 4.2 },
];

function getBarColor(coverage: number): string {
  if (coverage > 5) return '#00c896';
  if (coverage >= 3) return '#f5a623';
  return '#64748b';
}

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number }>; label?: string }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1a2235] border border-[#1e293b] rounded-lg px-3 py-2 shadow-xl">
        <p className="text-xs text-[#64748b]">{label}</p>
        <p className="text-sm font-mono text-[#00c896]">{payload[0].value} articles</p>
        <p className="text-xs font-mono text-[#64748b]">
          {(payload[0].value / 250 * 100).toFixed(1)}% coverage
        </p>
      </div>
    );
  }
  return null;
};

export default function DatasetSection() {
  return (
    <section id="dataset" className="py-16 px-6">
      <div className="border-t-2 border-chart-blue mb-8" />
      <div className="flex items-baseline gap-4 mb-10">
        <span className="text-5xl font-bold text-text-subtle font-mono">02</span>
        <h2 className="text-2xl font-bold text-text-primary">Dataset & Coverage</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
        {/* Dataset Summary Table */}
        <div className="rounded-xl bg-surface border border-border p-6">
          <h3 className="text-sm font-semibold text-text-primary mb-4 uppercase tracking-wider">
            Dataset Summary
          </h3>
          <div className="space-y-0">
            {datasetSummary.map((row, idx) => (
              <div
                key={row.item}
                className={`flex justify-between items-start py-2.5 px-2 rounded ${
                  idx % 2 === 0 ? 'bg-surface-2/50' : ''
                }`}
              >
                <span className="text-sm text-text-muted">{row.item}</span>
                <span className="text-sm font-mono text-text-primary text-right ml-4">
                  {row.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Feature Groups */}
        <div className="rounded-xl bg-surface border border-border p-6">
          <h3 className="text-sm font-semibold text-text-primary mb-4 uppercase tracking-wider">
            Feature Groups (58 total)
          </h3>
          <div className="space-y-3">
            {featureGroups.map((fg) => (
              <div key={fg.group} className="flex items-center gap-3">
                <div
                  className="w-1.5 h-8 rounded-full flex-shrink-0"
                  style={{ backgroundColor: fg.color }}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-text-primary">{fg.group}</span>
                    <span className="text-sm font-mono text-text-muted">{fg.count}</span>
                  </div>
                  <p className="text-xs text-text-muted truncate">{fg.examples}</p>
                  {/* Progress bar */}
                  <div className="mt-1 h-1 rounded-full bg-border overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${(fg.count / 10) * 100}%`,
                        backgroundColor: fg.color,
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Annual Articles Bar Chart */}
      <div className="rounded-xl bg-surface border border-border p-6 mb-6">
        <h3 className="text-sm font-semibold text-text-primary mb-6 uppercase tracking-wider">
          Annual News Article Count vs SentARL Threshold
        </h3>
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={articlesByYear} margin={{ top: 20, right: 20, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis dataKey="year" tick={{ fill: '#64748b', fontSize: 12 }} axisLine={{ stroke: '#1e293b' }} />
            <YAxis tick={{ fill: '#64748b', fontSize: 12 }} axisLine={{ stroke: '#1e293b' }} />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine
              y={27.5}
              stroke="#ef4444"
              strokeDasharray="8 4"
              label={{
                value: '11% SentARL Threshold',
                position: 'top',
                fill: '#ef4444',
                fontSize: 11,
                fontFamily: 'var(--font-geist-mono)',
              }}
            />
            <Bar dataKey="articles" radius={[4, 4, 0, 0]} maxBarSize={40}>
              {articlesByYear.map((entry) => (
                <Cell key={entry.year} fill={getBarColor(entry.coverage)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <div className="flex items-center gap-6 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm bg-primary" />
            <span className="text-xs text-text-muted">&gt;5% coverage</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm bg-secondary" />
            <span className="text-xs text-text-muted">3–5% coverage</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm bg-text-muted" />
            <span className="text-xs text-text-muted">&lt;3% coverage</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-0 border-t-2 border-dashed border-danger" />
            <span className="text-xs text-danger">11% SentARL</span>
          </div>
        </div>
      </div>

      {/* SentARL Threshold Explainer */}
      <div className="rounded-xl bg-surface border border-chart-blue/30 p-6">
        <div className="flex gap-3">
          <Info className="text-chart-blue flex-shrink-0 mt-0.5" size={18} />
          <div>
            <p className="text-sm font-semibold text-chart-blue mb-2">
              📊 The SentARL Threshold (Paiva et al., 2021)
            </p>
            <p className="text-sm text-text-muted leading-relaxed mb-2">
              Researchers identified ~11% news coverage as the boundary above which
              sentiment-aware models reliably outperform sentiment-free ones.
            </p>
            <p className="text-sm text-text-muted leading-relaxed mb-2">
              HBL sits at <span className="font-mono text-danger font-semibold">8.4%</span> — below the threshold on every rolling window.
              Below this boundary, more news can <span className="text-danger font-semibold">ACTIVELY HARM</span> performance.
            </p>
            <p className="text-sm text-secondary font-mono leading-relaxed">
              Evidence: daily_news_count was the MOST HARMFUL feature (−0.00080 importance).
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
