'use client';

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  ReferenceLine, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend,
} from 'recharts';

const featureImportance = [
  { feature: 'vol_20',              importance:  0.00094, group: 'Volatility',  color: '#8b5cf6' },
  { feature: 'vol_10',              importance:  0.00062, group: 'Volatility',  color: '#8b5cf6' },
  { feature: 'ret_10',              importance:  0.00036, group: 'Returns',     color: '#06b6d4' },
  { feature: 'ret_5',               importance:  0.00028, group: 'Returns',     color: '#06b6d4' },
  { feature: 'bb_width',            importance:  0.00021, group: 'Volatility',  color: '#8b5cf6' },
  { feature: 'vol_ratio_5',         importance:  0.00008, group: 'Volatility',  color: '#8b5cf6' },
  { feature: 'daily_sentiment',     importance:  0.00009, group: 'Sentiment',   color: '#f5a623' },
  { feature: 'quarterly_sentiment', importance:  0.00004, group: 'Sentiment',   color: '#f5a623' },
  { feature: 'annual_sentiment',    importance:  0.00001, group: 'Sentiment',   color: '#f5a623' },
  { feature: 'sent_momentum',       importance:  0.00000, group: 'Sentiment',   color: '#f5a623' },
  { feature: 'sent_surprise',       importance:  0.00000, group: 'Sentiment',   color: '#f5a623' },
  { feature: 'sent_7',              importance: -0.00006, group: 'Sent-Noise',  color: '#ef4444' },
  { feature: 'sent_3',              importance: -0.00008, group: 'Sent-Noise',  color: '#ef4444' },
  { feature: 'news_volume_ratio',   importance: -0.00031, group: 'Sent-Noise',  color: '#ef4444' },
  { feature: 'quarterly_sent_z',    importance: -0.00040, group: 'Sent-Noise',  color: '#ef4444' },
  { feature: 'daily_news_count',    importance: -0.00080, group: 'Sent-Harmful',color: '#ef4444' },
].sort((a, b) => b.importance - a.importance); // Sort descending

const radarData = [
  { axis: 'Volatility', actual: 0.90, baseline: 0.5 },
  { axis: 'Returns', actual: 0.60, baseline: 0.5 },
  { axis: 'Trend', actual: 0.30, baseline: 0.5 },
  { axis: 'Volume', actual: 0.20, baseline: 0.5 },
  { axis: 'Sentiment', actual: 0.05, baseline: 0.5 },
];

const ChartTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-[#1a2235] border border-[#1e293b] rounded-lg px-3 py-2 shadow-xl">
        <p className="text-sm font-semibold text-text-primary mb-1">{data.feature || data.axis}</p>
        <p className="text-xs font-mono" style={{ color: payload[0].color || data.color }}>
          {data.importance !== undefined ? `Importance: ${data.importance > 0 ? '+' : ''}${data.importance.toFixed(5)}` : `Value: ${payload[0].value}`}
        </p>
        {data.group && <p className="text-[10px] text-text-muted mt-1 uppercase">{data.group}</p>}
      </div>
    );
  }
  return null;
};

export default function FeatureImportanceSection() {
  return (
    <section id="features" className="py-16 px-6">
      <div className="border-t-2 border-chart-purple mb-8" />
      <div className="flex items-baseline gap-4 mb-10">
        <span className="text-5xl font-bold text-text-subtle font-mono">04</span>
        <h2 className="text-2xl font-bold text-text-primary">Feature Importance</h2>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Full Horizontal Bar Chart (Spans 2 columns on large screens) */}
        <div className="xl:col-span-2 rounded-xl bg-surface border border-border p-6 flex flex-col">
          <h3 className="text-sm font-semibold text-text-primary mb-6 uppercase tracking-wider">
            Feature Permutation Importance (Regression V1)
          </h3>
          
          <div className="flex-grow min-h-[400px] relative">
            {/* Background color bands */}
            <div className="absolute inset-y-0 right-[50%] left-0 z-0 border-r border-dashed border-[#1e293b]"></div>
            <div className="absolute inset-y-0 right-0 left-[50%] z-0 bg-primary/5">
               <div className="absolute top-2 right-4 text-xs font-semibold text-primary/40 uppercase tracking-widest">These features help</div>
            </div>
            <div className="absolute inset-y-0 right-[50%] left-[25%] z-0 bg-secondary/5 border-r border-dashed border-[#1e293b]">
               <div className="absolute bottom-4 right-4 text-[10px] font-semibold text-secondary/40 text-right uppercase w-32">Sentiment contributes ~1/10th of top feature</div>
            </div>
            <div className="absolute inset-y-0 right-[75%] left-0 z-0 bg-danger/5 border-r border-dashed border-[#1e293b]">
               <div className="absolute bottom-4 left-4 text-[10px] font-semibold text-danger/40 uppercase w-32">These features HURT prediction (shuffling improves model)</div>
            </div>

            <ResponsiveContainer width="100%" height="100%" className="relative z-10">
              <BarChart
                layout="vertical"
                data={featureImportance}
                margin={{ top: 10, right: 30, left: 100, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#1e293b" />
                <XAxis 
                  type="number" 
                  tick={{ fill: '#64748b', fontSize: 10 }} 
                  axisLine={false} 
                  domain={[-0.001, 0.0012]} 
                  tickFormatter={(val) => val.toFixed(4)}
                />
                <YAxis 
                  dataKey="feature" 
                  type="category" 
                  tick={{ fill: '#f1f5f9', fontSize: 11, fontFamily: 'var(--font-geist-mono)' }} 
                  axisLine={false} 
                  tickLine={false}
                />
                <RechartsTooltip content={<ChartTooltip />} cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }} />
                <ReferenceLine x={0} stroke="#64748b" strokeWidth={2} />
                <Bar dataKey="importance" barSize={12} radius={[0, 4, 4, 0]}>
                  {featureImportance.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right Column: Ratio Callout & Radar */}
        <div className="flex flex-col gap-6">
          {/* Ratio Callout Card */}
          <div className="rounded-xl bg-surface border border-chart-purple/30 p-6 flex-shrink-0">
            <h3 className="text-sm font-semibold text-chart-purple mb-4 uppercase tracking-wider">
              The Sentiment Deficit
            </h3>
            
            <div className="space-y-4 font-mono text-sm">
              <div>
                <div className="flex justify-between text-text-muted text-xs mb-1">
                  <span>vol_20</span>
                  <span className="text-primary">+0.00094</span>
                </div>
                <div className="w-full bg-surface-2 rounded-sm h-3">
                  <div className="bg-[#8b5cf6] h-full rounded-sm" style={{ width: '100%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-text-muted text-xs mb-1">
                  <span>daily_sentiment</span>
                  <span className="text-secondary">+0.00009 <span className="text-text-subtle text-[10px] ml-1">(10.4× smaller)</span></span>
                </div>
                <div className="w-full bg-surface-2 rounded-sm h-3">
                  <div className="bg-[#f5a623] h-full rounded-sm" style={{ width: '9.5%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-text-muted text-xs mb-1">
                  <span>daily_news_count</span>
                  <span className="text-danger">−0.00080 <span className="text-text-subtle text-[10px] ml-1">(most harmful)</span></span>
                </div>
                <div className="w-full bg-surface-2 rounded-sm h-3 flex justify-end">
                   {/* Visualizing negative impact by drawing from right to left conceptually, but let's just make it a red bar */}
                  <div className="bg-danger h-full rounded-sm" style={{ width: '85%' }}></div>
                </div>
              </div>
            </div>

            <div className="mt-5 p-3 rounded bg-danger/10 border border-danger/20">
              <p className="text-xs text-danger font-medium leading-relaxed">
                Including news count <span className="font-bold">DEGRADES</span> predictions by 85% of vol_20&apos;s benefit.
              </p>
            </div>
          </div>

          {/* Feature Group Radar Chart */}
          <div className="rounded-xl bg-surface border border-border p-6 flex-grow flex flex-col">
            <h3 className="text-sm font-semibold text-text-primary mb-2 uppercase tracking-wider">
              Group Contribution
            </h3>
            <div className="flex-grow min-h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                  <PolarGrid stroke="#1e293b" />
                  <PolarAngleAxis dataKey="axis" tick={{ fill: '#64748b', fontSize: 11 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 1]} tick={false} axisLine={false} />
                  <Radar name="Hoped-for Baseline" dataKey="baseline" stroke="#64748b" strokeDasharray="3 3" fill="transparent" />
                  <Radar name="Actual Contribution" dataKey="actual" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.4} />
                  <RechartsTooltip content={<ChartTooltip />} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-xs text-text-muted italic text-center mt-2">
              &quot;Sentiment contributes nearly nothing. Volatility and returns carry all predictive weight.&quot;
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
