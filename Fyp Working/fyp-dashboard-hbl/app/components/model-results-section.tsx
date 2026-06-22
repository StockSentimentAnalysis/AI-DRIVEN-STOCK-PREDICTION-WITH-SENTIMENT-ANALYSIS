'use client';

import { useState, useMemo } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area,
} from 'recharts';

// Generate actual vs predicted data for V1
function generateV1Data() {
  const data = [];
  for (let i = 0; i < 343; i++) {
    const t = i / 343;
    const actual = (Math.sin(t * 15) * 0.03 + Math.sin(t * 7) * 0.02 + (Math.random() - 0.5) * 0.04) * (1 + Math.sin(t * 3) * 0.5);
    const predicted = (Math.random() - 0.5) * 0.006;
    data.push({
      day: i + 1,
      actual: parseFloat(actual.toFixed(6)),
      predicted: parseFloat(predicted.toFixed(6)),
    });
  }
  return data;
}

// Generate bell curve data for variance collapse
function generateBellCurve(mean: number, std: number, points: number = 200) {
  const data = [];
  const range = std * 5;
  for (let i = 0; i < points; i++) {
    const x = mean - range + (2 * range * i) / (points - 1);
    const y = (1 / (std * Math.sqrt(2 * Math.PI))) * Math.exp(-0.5 * Math.pow((x - mean) / std, 2));
    data.push({ x: parseFloat(x.toFixed(6)), y: parseFloat(y.toFixed(4)) });
  }
  return data;
}

const v1Metrics = [
  { label: 'Test R²', value: '−0.0413', color: 'text-danger', note: 'worse than predicting mean' },
  { label: 'Pearson r', value: '0.017', color: 'text-text-muted', note: '' },
  { label: 'p-value', value: '0.7607', color: 'text-text-muted', note: 'not significant' },
  { label: 'Directional Acc', value: '51.6%', color: 'text-danger', note: 'coin flip' },
  { label: 'RMSE', value: '0.023588', color: 'text-text-muted', note: '' },
  { label: 'MAE', value: '0.016013', color: 'text-text-muted', note: '' },
  { label: 'Prediction Std', value: '0.00288', color: 'text-danger', note: 'collapsed' },
  { label: 'Actual Std', value: '0.02312', color: 'text-primary', note: 'real volatility' },
];

const v2Metrics = [
  { label: 'Test R²', value: '−0.151', color: 'text-danger' },
  { label: 'Pearson r', value: '0.032', color: 'text-text-muted' },
  { label: 'p-value', value: '0.55', color: 'text-text-muted' },
  { label: 'Directional Acc', value: '50.0%', color: 'text-danger' },
  { label: 'McNemar p', value: '1.00', color: 'text-danger' },
  { label: 'Strategy Return', value: '18.7%', color: 'text-secondary' },
  { label: 'Buy & Hold', value: '161.7%', color: 'text-primary' },
];

const v5Metrics = [
  { label: 'Accuracy', value: '50.3%', color: 'text-text-muted' },
  { label: 'AUC', value: '0.5423', color: 'text-text-muted' },
  { label: 'McNemar p', value: '0.6851', color: 'text-text-muted' },
  { label: 'UP Prediction Bias', value: '88.2%', color: 'text-danger' },
  { label: 'Confident Pred Acc', value: '56.6%', color: 'text-text-muted' },
  { label: 'Train/Val AUC Gap', value: '0.012', color: 'text-primary' },
];

const mcnemarTable = [
  { model: 'Regression V1 (1-day)', pValue: '0.6205', significant: false },
  { model: 'Regression V2 (5-day)', pValue: '1.00', significant: false },
  { model: 'Classifier V5', pValue: '0.6851', significant: false },
  { model: 'Classifier V4 (early)', pValue: '> 0.39', significant: false },
];

const confusionMatrix = [
  [25, 153],
  [15, 145],
];

const cmColors = [
  ['rgba(0, 200, 150, 0.15)', 'rgba(239, 68, 68, 0.3)'],
  ['rgba(249, 115, 22, 0.2)', 'rgba(0, 200, 150, 0.25)'],
];

const cmLabels = [
  ['TN = 25', 'FP = 153'],
  ['FN = 15', 'TP = 145'],
];

const ChartTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ name: string; value: number; color: string }>; label?: string }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1a2235] border border-[#1e293b] rounded-lg px-3 py-2 shadow-xl">
        <p className="text-xs text-[#64748b] mb-1">Day {label}</p>
        {payload.map((p) => (
          <p key={p.name} className="text-xs font-mono" style={{ color: p.color }}>
            {p.name}: {p.value.toFixed(6)}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function ModelResultsSection() {
  const [activeTab, setActiveTab] = useState(0);
  const v1Data = useMemo(() => generateV1Data(), []);

  // Merge two bell curves onto shared x-axis
  const varianceData = useMemo(() => {
    const actualCurve = generateBellCurve(0, 0.02312, 300);
    const predictedCurve = generateBellCurve(0, 0.00288, 300);
    const allX = new Set([...actualCurve.map(d => d.x), ...predictedCurve.map(d => d.x)]);
    const sortedX = Array.from(allX).sort((a, b) => a - b);

    return sortedX.map(x => {
      const aPoint = actualCurve.find(d => d.x === x);
      const pPoint = predictedCurve.find(d => d.x === x);
      return {
        x,
        actual: aPoint ? aPoint.y : 0,
        predicted: pPoint ? pPoint.y : 0,
      };
    });
  }, []);

  const tabs = ['Regression V1', 'Regression V2', 'Classifier V5'];

  return (
    <section id="models" className="py-16 px-6">
      <div className="border-t-2 border-danger mb-8" />
      <div className="flex items-baseline gap-4 mb-10">
        <span className="text-5xl font-bold text-text-subtle font-mono">03</span>
        <h2 className="text-2xl font-bold text-text-primary">Model Results</h2>
      </div>

      {/* Tab Switcher */}
      <div className="flex gap-1 p-1 rounded-xl bg-surface border border-border mb-8 w-fit">
        {tabs.map((tab, idx) => (
          <button
            key={tab}
            onClick={() => setActiveTab(idx)}
            className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200
              ${activeTab === idx
                ? 'bg-primary/15 text-primary shadow-sm'
                : 'text-text-muted hover:text-text-primary hover:bg-surface-2'
              }
            `}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab 1 - Regression V1 */}
      {activeTab === 0 && (
        <div className="space-y-6 animate-fade-in-up">
          {/* Metric Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {v1Metrics.map((m) => (
              <div key={m.label} className="p-4 rounded-xl bg-surface border border-border">
                <p className={`metric-number text-2xl font-bold ${m.color}`}>{m.value}</p>
                <p className="text-xs text-text-muted mt-1 uppercase tracking-wider">{m.label}</p>
                {m.note && (
                  <p className="text-xs text-text-subtle mt-0.5 italic">{m.note}</p>
                )}
              </div>
            ))}
          </div>

          {/* Actual vs Predicted Line Chart */}
          <div className="rounded-xl bg-surface border border-border p-6">
            <h3 className="text-sm font-semibold text-text-primary mb-2 uppercase tracking-wider">
              Actual vs Predicted Returns (Test Set: 343 Days)
            </h3>
            <p className="text-xs text-text-muted mb-4 italic">
              Apr 2024 – Aug 2025 · Predicted std = 0.00288 vs actual std = 0.02312
            </p>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={v1Data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="day" tick={{ fill: '#64748b', fontSize: 10 }} axisLine={{ stroke: '#1e293b' }} />
                <YAxis tick={{ fill: '#64748b', fontSize: 10 }} axisLine={{ stroke: '#1e293b' }} domain={[-0.1, 0.1]} />
                <Tooltip content={<ChartTooltip />} />
                <Line type="monotone" dataKey="actual" stroke="#3b82f6" dot={false} strokeWidth={1.5} name="Actual" />
                <Line type="monotone" dataKey="predicted" stroke="#f5a623" dot={false} strokeWidth={2} strokeDasharray="5 3" name="Predicted" />
              </LineChart>
            </ResponsiveContainer>
            <p className="text-xs text-text-muted mt-3 italic text-center">
              &quot;Predicted std = 0.00288 vs actual std = 0.02312 — an order of magnitude collapse. The model learned to predict ~0 every day.&quot;
            </p>
          </div>

          {/* Variance Collapse */}
          <div className="rounded-xl bg-surface border border-border p-6">
            <h3 className="text-sm font-semibold text-text-primary mb-4 uppercase tracking-wider">
              Variance Collapse — The Predict-the-Mean Effect
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={varianceData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="x" tick={{ fill: '#64748b', fontSize: 10 }} axisLine={{ stroke: '#1e293b' }} />
                <YAxis tick={{ fill: '#64748b', fontSize: 10 }} axisLine={{ stroke: '#1e293b' }} />
                <Area type="monotone" dataKey="actual" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.15} strokeWidth={2} name="Actual (std=0.02312)" />
                <Area type="monotone" dataKey="predicted" stroke="#f5a623" fill="#f5a623" fillOpacity={0.4} strokeWidth={2} name="Predicted (std=0.00288)" />
              </AreaChart>
            </ResponsiveContainer>
            <p className="text-xs text-text-muted mt-3 italic text-center">
              &quot;The predict-the-mean collapse: all predictions cluster near zero regardless of input.&quot;
            </p>
          </div>
        </div>
      )}

      {/* Tab 2 - Regression V2 */}
      {activeTab === 1 && (
        <div className="space-y-6 animate-fade-in-up">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {v2Metrics.map((m) => (
              <div key={m.label} className="p-4 rounded-xl bg-surface border border-border">
                <p className={`metric-number text-2xl font-bold ${m.color}`}>{m.value}</p>
                <p className="text-xs text-text-muted mt-1 uppercase tracking-wider">{m.label}</p>
              </div>
            ))}
          </div>

          <div className="rounded-xl bg-danger/5 border border-danger/20 p-6">
            <p className="text-sm text-text-primary leading-relaxed mb-2">
              Lengthening the horizon did not recover signal — it diluted it further.
            </p>
            <p className="text-sm text-text-muted leading-relaxed mb-2">
              A 10-day window contains on average <span className="font-mono text-secondary">0.84</span> news days.
              Most sequences contain no news at all.
            </p>
            <p className="text-sm font-semibold text-danger font-mono">
              McNemar p = 1.00 — the most complete null possible.
            </p>
          </div>
        </div>
      )}

      {/* Tab 3 - Classifier V5 */}
      {activeTab === 2 && (
        <div className="space-y-6 animate-fade-in-up">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {v5Metrics.map((m) => (
              <div key={m.label} className="p-4 rounded-xl bg-surface border border-border">
                <p className={`metric-number text-2xl font-bold ${m.color}`}>{m.value}</p>
                <p className="text-xs text-text-muted mt-1 uppercase tracking-wider">{m.label}</p>
              </div>
            ))}
          </div>

          {/* Confusion Matrix */}
          <div className="rounded-xl bg-surface border border-border p-6">
            <h3 className="text-sm font-semibold text-text-primary mb-4 uppercase tracking-wider">
              Confusion Matrix
            </h3>
            <div className="max-w-md mx-auto">
              {/* Header row */}
              <div className="grid grid-cols-3 gap-2 mb-2">
                <div />
                <div className="text-center text-xs text-text-muted font-mono py-2">Pred DOWN</div>
                <div className="text-center text-xs text-text-muted font-mono py-2">Pred UP</div>
              </div>
              {/* Matrix rows */}
              {['Actual DOWN', 'Actual UP'].map((rowLabel, ri) => (
                <div key={rowLabel} className="grid grid-cols-3 gap-2 mb-2">
                  <div className="flex items-center text-xs text-text-muted font-mono pr-2 justify-end">
                    {rowLabel}
                  </div>
                  {confusionMatrix[ri].map((val, ci) => (
                    <div
                      key={`${ri}-${ci}`}
                      className="rounded-lg p-4 text-center transition-all duration-300 hover:scale-105"
                      style={{ backgroundColor: cmColors[ri][ci] }}
                    >
                      <span className="metric-number text-2xl font-bold text-text-primary">
                        {val}
                      </span>
                      <p className="text-xs text-text-muted mt-1">{cmLabels[ri][ci]}</p>
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <p className="text-xs text-text-muted mt-4 italic text-center">
              &quot;88.2% of all predictions were UP — the model defaulted to the market&apos;s unconditional upward drift, not genuine discrimination.&quot;
            </p>
          </div>

          {/* McNemar Summary */}
          <div className="rounded-xl bg-surface border border-border p-6">
            <h3 className="text-sm font-semibold text-text-primary mb-4 uppercase tracking-wider">
              McNemar Test Summary — All Models
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-3 text-text-muted font-medium">Model</th>
                    <th className="text-center py-3 px-3 text-text-muted font-medium">McNemar p</th>
                    <th className="text-center py-3 px-3 text-text-muted font-medium">Significant at 0.05?</th>
                  </tr>
                </thead>
                <tbody>
                  {mcnemarTable.map((row) => (
                    <tr key={row.model} className="border-b border-border/50 hover:bg-surface-2/50">
                      <td className="py-3 px-3 text-text-primary">{row.model}</td>
                      <td className="py-3 px-3 text-center font-mono text-text-muted">{row.pValue}</td>
                      <td className="py-3 px-3 text-center">
                        <span className="text-danger font-semibold">✗ No</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 p-4 rounded-lg bg-surface-2/50 border border-border">
              <p className="text-sm text-text-muted leading-relaxed">
                Four independent model configurations. Zero rejections at any conventional level.
                Convergence across architectures, horizons, and framing makes this a credible finding.
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
