import React, { useEffect, useRef, useState, useMemo } from 'react';
import { Chart, ArcElement, Tooltip, DoughnutController } from 'chart.js';

import { useFinanceStore } from '../states/states';
import { transactionsAPI } from '../apis';
import type { Transaction } from '../apis';

Chart.register(DoughnutController, ArcElement, Tooltip);

// ─── Types ────────────────────────────────────────────────────────────────────
interface CategoryEntry {
  category: string;
  amount: number;
  pct: number;
}

type ViewKey = 'both' | 'acc1' | 'acc2';

// ─── Constants ────────────────────────────────────────────────────────────────
const PALETTE = [
  '#0F6E56', '#1D9E75', '#5DCAA7',
  '#9FE1CB', '#3abbff', '#85c8ef', '#dae2fd',
];

// ─── Helpers ─────────────────────────────────────────────────────────────────
const aggregateByCategory = (transactions: Transaction[]): Map<string, number> => {
  const map = new Map<string, number>();
  transactions.forEach((tx) => {
    if (tx.amount < 0) {
      const key = tx.category || 'Other';
      map.set(key, (map.get(key) || 0) + Math.abs(tx.amount));
    }
  });
  return map;
};

const mergeMaps = (a: Map<string, number>, b: Map<string, number>): Map<string, number> => {
  const merged = new Map(a);
  b.forEach((val, key) => merged.set(key, (merged.get(key) || 0) + val));
  return merged;
};

const topWithPct = (map: Map<string, number>, limit = 6): CategoryEntry[] => {
  const sorted = Array.from(map.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit);
  const total = sorted.reduce((s, [, v]) => s + v, 0);
  return sorted.map(([category, amount]) => ({
    category,
    amount,
    pct: total > 0 ? Math.round((amount / total) * 100) : 0,
  }));
};

// ─── Component ────────────────────────────────────────────────────────────────
const SpendingByCategory: React.FC = () => {
  const subAccounts        = useFinanceStore(s => s.subAccounts);
  const activeSubAccountId = useFinanceStore(s => s.activeSubAccountId);

  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const chartRef   = useRef<Chart | null>(null);

  const [view, setView]           = useState<ViewKey>('both');
  const [acc1Txns, setAcc1Txns]   = useState<Transaction[]>([]);
  const [acc2Txns, setAcc2Txns]   = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch transactions for both sub-accounts whenever the list changes
  useEffect(() => {
    if (!subAccounts || subAccounts.length === 0) return;

    const fetchBoth = async () => {
      setIsLoading(true);
      try {
        const [t1, t2] = await Promise.all([
          subAccounts[0] ? transactionsAPI.getBySubAccountId(subAccounts[0].sub_account_id) : Promise.resolve([]),
          subAccounts[1] ? transactionsAPI.getBySubAccountId(subAccounts[1].sub_account_id) : Promise.resolve([]),
        ]);
        setAcc1Txns(Array.isArray(t1) ? t1 : []);
        setAcc2Txns(Array.isArray(t2) ? t2 : []);
      } catch (err) {
        console.error('SpendingByCategory fetch error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBoth();
  }, [subAccounts]);

  // Derive category data for the selected view
  const items = useMemo<CategoryEntry[]>(() => {
    const map1 = aggregateByCategory(acc1Txns);
    const map2 = aggregateByCategory(acc2Txns);

    if (view === 'acc1') return topWithPct(map1);
    if (view === 'acc2') return topWithPct(map2);
    return topWithPct(mergeMaps(map1, map2)); // 'both'
  }, [view, acc1Txns, acc2Txns]);

  const colors = items.map((_, i) => PALETTE[i % PALETTE.length]);

  // Build / update Chart.js instance
  useEffect(() => {
    if (!canvasRef.current || items.length === 0) return;

    if (chartRef.current) {
      chartRef.current.data.labels                    = items.map(d => d.category);
      chartRef.current.data.datasets[0].data          = items.map(d => d.amount);
      (chartRef.current.data.datasets[0] as any).backgroundColor = colors;
      chartRef.current.update();
    } else {
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      chartRef.current = new Chart(canvasRef.current, {
        type: 'doughnut',
        data: {
          labels: items.map(d => d.category),
          datasets: [{
            data:            items.map(d => d.amount),
            backgroundColor: colors,
            borderWidth:     2,
            borderColor:     isDark ? '#1a1a1a' : '#ffffff',
            hoverOffset:     4,
          }],
        },
        options: {
          responsive:          false,
          cutout:              '68%',
          animation:           { duration: 400 },
          plugins: {
            legend:  { display: false },
            tooltip: { enabled: false },
          },
        },
      });
    }
  }, [items]);

  // Destroy chart on unmount
  useEffect(() => () => { chartRef.current?.destroy(); }, []);

  const topCategory = items[0]?.category ?? '—';

  // ── Account tab labels from store (fallback to generic names) ──────────────
  const acc1Name = subAccounts[0]?.account_name ?? 'Account 1';
  const acc2Name = subAccounts[1]?.account_name ?? 'Account 2';

  return (
    <div style={styles.card}>

      {/* Header */}Total
      <div style={styles.header}>
        <h4 style={styles.title}>Spending by category</h4>
       
      </div>

      {/* Account tabs */}
      <div style={styles.tabs}>
        {(['both', 'acc1', 'acc2'] as ViewKey[]).map((v) => (
          <button
            key={v}
            onClick={() => setView(v)}
            style={{
              ...styles.tab,
              ...(view === v ? styles.tabActive : {}),
            }}
          >
            {v === 'both' ? 'Both accounts' : v === 'acc1' ? acc1Name : acc2Name}
          </button>
        ))}
      </div>

      {/* Body */}
      {isLoading ? (
        <div style={styles.placeholder}>Loading…</div>
      ) : items.length === 0 ? (
        <div style={styles.placeholder}>No expense data available.</div>
      ) : (
        <div style={styles.body}>

          {/* Donut */}
          <div style={styles.donutWrap}>
            <canvas ref={canvasRef} width={160} height={160} />
            <div style={styles.donutCenter}>
              <p style={styles.donutSub}>Top spent</p>
              <p style={styles.donutLabel}>{topCategory}</p>
            </div>
          </div>

          {/* Legend */}
          <div style={styles.legend}>
            {items.map((d, i) => (
              <div key={d.category} style={styles.legendRow}>
                <div style={{ ...styles.legendDot, backgroundColor: colors[i] }} />
                <span style={styles.legendName}>{d.category}</span>
                <span style={styles.legendPct}>{d.pct}%</span>
              </div>
            ))}
          </div>

        </div>
      )}
    </div>
  );
};

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles: Record<string, React.CSSProperties> = {
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    border: '1px solid #F1F5F9',
    padding: '20px 24px',
    width: '100%',
    boxSizing: 'border-box',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  title: {
    fontSize: 15,
    fontWeight: 600,
    color: '#0f172a',
    margin: 0,
  },
  moreBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#94A3B8',
    padding: 0,
    lineHeight: 1,
    display: 'flex',
  },
  tabs: {
    display: 'flex',
    gap: 8,
    marginBottom: 20,
  },
  tab: {
    fontSize: 12,
    padding: '4px 12px',
    borderRadius: 8,
    border: '1px solid #E2E8F0',
    background: 'none',
    cursor: 'pointer',
    color: '#94A3B8',
    fontWeight: 500,
    transition: 'all 0.15s',
    whiteSpace: 'nowrap' as const,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxWidth: 120,
  },
  tabActive: {
    backgroundColor: '#F8FAFC',
    color: '#0f172a',
    borderColor: '#CBD5E1',
  },
  body: {
    display: 'flex',
    alignItems: 'center',
    gap: 28,
  },
  donutWrap: {
    position: 'relative',
    width: 160,
    height: 160,
    flexShrink: 0,
  },
  donutCenter: {
    position: 'absolute',
    inset: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    pointerEvents: 'none',
  },
  donutSub: {
    fontSize: 10,
    color: '#94A3B8',
    margin: 0,
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
  },
  donutLabel: {
    fontSize: 13,
    fontWeight: 600,
    color: '#0f172a',
    margin: '3px 0 0',
    textAlign: 'center',
    maxWidth: 90,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  legend: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    flex: 1,
    minWidth: 0,
  },
  legendRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 2,
    flexShrink: 0,
  },
  legendName: {
    fontSize: 13,
    color: '#334155',
    flex: 1,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  legendPct: {
    fontSize: 12,
    color: '#94A3B8',
    flexShrink: 0,
    minWidth: 32,
    textAlign: 'right',
  },
  placeholder: {
    padding: '32px 0',
    textAlign: 'center',
    color: '#94A3B8',
    fontSize: 13,
  },
};

export default SpendingByCategory;