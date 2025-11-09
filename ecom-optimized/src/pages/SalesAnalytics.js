import React, { lazy, Suspense } from 'react';

const HeavyChart = lazy(() => import('../components/analytics/HeavyChart'));

export default function SalesAnalytics() {
  return (
    <section>
      <h2>Sales Analytics (Lazy-loaded)</h2>
      <Suspense fallback={<div>Loading chart…</div>}>
        <HeavyChart />
      </Suspense>
    </section>
  );
}
