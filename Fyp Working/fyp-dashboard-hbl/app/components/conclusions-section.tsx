'use client';

import { Lightbulb, ArrowRight, Telescope } from 'lucide-react';

const priorStudies = [
  { study: 'Maqsood et al. (2020)', target: 'Multi-country stocks incl. PSX', data: '11.42M tweets', method: 'DBN / SVR / LR', result: 'Sentiment helps ✓' },
  { study: 'PSX Technical Study', target: 'KSE-100 direction', data: 'Technical only', method: 'ANN / SVM / LSTM', result: 'ANN/SVM ≈ 85% acc ✓' },
  { study: 'This Study', target: 'HBL single stock', data: '385 articles', method: 'BiLSTM + FinBERT', result: 'R² = −0.04; NULL ✗', isHighlight: true },
];

export default function ConclusionsSection() {
  return (
    <section id="conclusions" className="py-16 px-6 mb-24">
      <div className="border-t-2 border-primary mb-8" />
      <div className="flex items-baseline gap-4 mb-10">
        <span className="text-5xl font-bold text-text-subtle font-mono">07</span>
        <h2 className="text-2xl font-bold text-text-primary">Conclusions & Implications</h2>
      </div>

      {/* 4 Numbered Conclusion Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {/* Card 1 */}
        <div className="rounded-xl bg-surface border-l-4 border-l-danger border-y border-r border-border p-6 shadow-lg shadow-danger/5">
          <div className="flex items-baseline gap-3 mb-4">
            <span className="text-3xl font-mono font-bold text-text-subtle">01</span>
            <h3 className="text-lg font-bold text-danger uppercase tracking-wide">Sentiment Failed — Structurally</h3>
          </div>
          <div className="space-y-3 font-mono text-sm text-text-muted bg-surface-2 p-3 rounded mb-4">
            <p>R² = −0.0413 | Pearson r = 0.017 | p = 0.7607</p>
            <p>Four models. Four McNemar tests. Zero rejections.</p>
          </div>
          <p className="text-sm text-text-primary leading-relaxed">
            This is not a model failure — it is a data environment failure.
            The architecture is not broken. The information is not there.
          </p>
        </div>

        {/* Card 2 */}
        <div className="rounded-xl bg-surface border-l-4 border-l-secondary border-y border-r border-border p-6 shadow-lg shadow-secondary/5">
          <div className="flex items-baseline gap-3 mb-4">
            <span className="text-3xl font-mono font-bold text-text-subtle">02</span>
            <h3 className="text-lg font-bold text-secondary uppercase tracking-wide">Coverage Density is the Constraint</h3>
          </div>
          <div className="space-y-3 font-mono text-sm text-text-muted bg-surface-2 p-3 rounded mb-4">
            <p>8.4% coverage &lt; 11% SentARL threshold</p>
            <p>A 30-day window holds ~2.5 news days on average.</p>
            <p>A 10-day window holds &lt; 1 news day on average.</p>
          </div>
          <p className="text-sm text-text-primary leading-relaxed">
            No sequence model can learn from a feature that is zero 91.6% of the time.
          </p>
        </div>

        {/* Card 3 */}
        <div className="rounded-xl bg-surface border-l-4 border-l-chart-blue border-y border-r border-border p-6 shadow-lg shadow-chart-blue/5">
          <div className="flex items-baseline gap-3 mb-4">
            <span className="text-3xl font-mono font-bold text-text-subtle">03</span>
            <h3 className="text-lg font-bold text-chart-blue uppercase tracking-wide">Price Features Dominate</h3>
          </div>
          <div className="space-y-2 font-mono text-sm text-text-muted bg-surface-2 p-3 rounded mb-4">
            <div className="flex justify-between"><span>vol_20 importance:</span> <span className="text-chart-blue">+0.00094</span></div>
            <div className="flex justify-between"><span>daily_sentiment:</span> <span className="text-secondary">+0.00009 <span className="text-xs text-text-subtle">(10× smaller)</span></span></div>
            <div className="flex justify-between"><span>daily_news_count:</span> <span className="text-danger">−0.00080 <span className="text-xs text-text-subtle">(HARMFUL)</span></span></div>
          </div>
          <p className="text-sm text-text-primary leading-relaxed">
            Volatility and return features carry all predictive weight.
            Sentiment adds noise, not signal, at this coverage level.
          </p>
        </div>

        {/* Card 4 */}
        <div className="rounded-xl bg-surface border-l-4 border-l-chart-purple border-y border-r border-border p-6 shadow-lg shadow-chart-purple/5">
          <div className="flex items-baseline gap-3 mb-4">
            <span className="text-3xl font-mono font-bold text-text-subtle">04</span>
            <h3 className="text-lg font-bold text-chart-purple uppercase tracking-wide">The Sharpe Artefact Warning</h3>
          </div>
          <div className="space-y-3 font-mono text-sm text-text-muted bg-surface-2 p-3 rounded mb-4">
            <p>Strategy Sharpe 2.077 &gt; B&H Sharpe 1.885</p>
            <p>BUT strategy is in market only 29.7% of days.</p>
            <p>Low exposure → low volatility → inflated Sharpe.</p>
          </div>
          <p className="text-sm text-text-primary font-bold leading-relaxed text-danger">
            RULE: Never read Sharpe without its exposure figure. Single-metric evaluation is dangerous in financial ML.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Practical Recommendation Card */}
        <div className="rounded-xl bg-surface border border-primary p-6 shadow-[0_0_15px_rgba(0,200,150,0.1)] flex flex-col">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border">
            <Lightbulb size={24} className="text-primary" />
            <h3 className="text-lg font-bold text-primary tracking-wide">
              FOR PRACTITIONERS — A Free Diagnostic
            </h3>
          </div>
          <p className="text-sm text-text-muted mb-4 italic">
            Before building any sentiment-augmented stock model:
          </p>
          <div className="space-y-4 mb-6 flex-grow">
            <div className="flex gap-4">
              <span className="font-mono text-primary font-bold">Step 1</span>
              <p className="text-sm text-text-primary">Count trading days with at least one news article.</p>
            </div>
            <div className="flex gap-4">
              <span className="font-mono text-primary font-bold">Step 2</span>
              <p className="text-sm text-text-primary">Divide by total trading days → get coverage density %.</p>
            </div>
            <div className="flex gap-4">
              <span className="font-mono text-primary font-bold">Step 3</span>
              <p className="text-sm text-text-primary">
                If coverage &lt; ~10%: <span className="text-danger font-bold">DO NOT add sentiment features.</span> They will add noise, not signal.
              </p>
            </div>
            <div className="flex gap-4">
              <span className="font-mono text-primary font-bold">Step 4</span>
              <p className="text-sm text-text-primary">
                If coverage &gt; ~11%: sentiment may help. Proceed carefully. Measure price-sentiment correlation before committing.
              </p>
            </div>
          </div>
          <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
            <p className="text-sm text-text-primary leading-relaxed font-medium">
              This check takes minutes.<br/>
              Our full study took months to confirm the same conclusion.<br/>
              <span className="text-primary">The diagnostic predicts the outcome before any model is trained.</span>
            </p>
          </div>
        </div>

        {/* Future Work Card */}
        <div className="rounded-xl bg-surface border border-border p-6 flex flex-col">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border">
            <Telescope size={24} className="text-text-primary" />
            <h3 className="text-lg font-bold text-text-primary uppercase tracking-wide">
              Next Steps
            </h3>
          </div>
          
          <div className="space-y-6">
            <div>
              <h4 className="text-sm font-bold text-text-primary mb-1 flex items-center gap-2">
                <span className="font-mono text-text-muted">1.</span> Multi-source aggregation
              </h4>
              <p className="text-xs text-text-muted pl-5 mb-1">Business Recorder + Express Tribune + PSX disclosure feed</p>
              <p className="text-xs text-primary pl-5 flex items-center gap-1"><ArrowRight size={12}/> lift coverage above 11% threshold</p>
              <p className="text-xs text-primary pl-5 flex items-center gap-1"><ArrowRight size={12}/> test whether the null inverts</p>
            </div>
            
            <div>
              <h4 className="text-sm font-bold text-text-primary mb-1 flex items-center gap-2">
                <span className="font-mono text-text-muted">2.</span> Urdu-language sources
              </h4>
              <p className="text-xs text-text-muted pl-5">
                Large share of Pakistani financial commentary is in Urdu — currently invisible to an English-only scraper.
              </p>
            </div>
            
            <div>
              <h4 className="text-sm font-bold text-text-primary mb-1 flex items-center gap-2">
                <span className="font-mono text-text-muted">3.</span> Cross-stock study
              </h4>
              <p className="text-xs text-text-muted pl-5 mb-1">Repeat design across PSX stocks with varying coverage densities</p>
              <p className="text-xs text-primary pl-5 flex items-start gap-1">
                <ArrowRight size={12} className="mt-0.5 flex-shrink-0"/> 
                <span>confirm: predictive value appears exactly where coverage crosses the threshold</span>
              </p>
            </div>
            
            <div>
              <h4 className="text-sm font-bold text-text-primary mb-1 flex items-center gap-2">
                <span className="font-mono text-text-muted">4.</span> LLM-based sentiment
              </h4>
              <p className="text-xs text-text-muted pl-5 mb-1">Better zero-shot calibration for sparse-text regime</p>
              <p className="text-xs text-primary pl-5 flex items-center gap-1"><ArrowRight size={12}/> may extract more from the 8.4% of days that DO have news</p>
            </div>
          </div>
        </div>
      </div>

      {/* Prior PSX Literature Table */}
      <div className="rounded-xl bg-surface border border-border p-6">
        <h3 className="text-sm font-semibold text-text-primary mb-4 uppercase tracking-wider">
          Consistency with Prior PSX Literature
        </h3>
        
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="border-b border-border bg-surface-2">
                <th className="py-3 px-4 font-semibold text-text-primary rounded-tl-lg">Study</th>
                <th className="py-3 px-4 font-semibold text-text-primary">Target</th>
                <th className="py-3 px-4 font-semibold text-text-primary">Data</th>
                <th className="py-3 px-4 font-semibold text-text-primary">Method</th>
                <th className="py-3 px-4 font-semibold text-text-primary rounded-tr-lg">Result</th>
              </tr>
            </thead>
            <tbody>
              {priorStudies.map((row, idx) => (
                <tr 
                  key={idx} 
                  className={`border-b border-border/50 ${row.isHighlight ? 'bg-danger/5 border-danger/30' : 'hover:bg-surface-2/50'}`}
                >
                  <td className={`py-3 px-4 ${row.isHighlight ? 'font-bold text-danger' : 'text-text-primary'}`}>{row.study}</td>
                  <td className={`py-3 px-4 ${row.isHighlight ? 'font-bold text-text-primary' : 'text-text-muted'}`}>{row.target}</td>
                  <td className={`py-3 px-4 ${row.isHighlight ? 'font-bold text-text-primary' : 'text-text-muted'}`}>{row.data}</td>
                  <td className={`py-3 px-4 font-mono text-xs ${row.isHighlight ? 'font-bold text-text-primary' : 'text-text-subtle'}`}>{row.method}</td>
                  <td className={`py-3 px-4 font-mono text-xs ${row.isHighlight ? 'font-bold text-danger' : 'text-primary'}`}>{row.result}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-5 rounded-lg bg-surface-2 border border-border">
            <p className="text-sm font-bold text-text-primary mb-3">Why the contrast?</p>
            <div className="space-y-2 font-mono text-xs text-text-muted">
              <div className="flex justify-between"><span className="text-text-primary">KSE-100 index</span> <span>→ near-100% daily news coverage</span></div>
              <div className="flex justify-between"><span className="text-text-primary">11.42M tweets</span> <span>→ ultra-high density text signal</span></div>
              <div className="flex justify-between"><span className="text-danger font-bold">HBL (single stock)</span> <span>→ 8.4% coverage → below threshold</span></div>
            </div>
          </div>
          <div className="p-5 rounded-lg bg-surface-2 border border-primary/20 flex items-center">
            <p className="text-sm text-text-primary leading-relaxed">
              The index-level successes and our single-stock null are <span className="font-bold text-primary">CONSISTENT</span> under one rule:
              <br/><br/>
              <span className="italic">Sentiment helps where coverage is dense.<br/>
              Sentiment hurts (or vanishes) where coverage is sparse.</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
