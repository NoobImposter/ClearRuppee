import React, { useEffect, useMemo, useState } from 'react';
import { TransactionItem } from '~/Componets/Transactions/transactionitem';
import type { Transaction } from '~/Componets/Transactions/trantypes';
import type { Transaction as APITransaction } from '../apis';
import { transactionsAPI } from '../apis';
import { useFinanceStore } from '../states/states';

// ─── Category mappings ────────────────────────────────────────────────────────
const categoryColors: Record<string, { bg: string; text: string }> = {
  salary:        { bg: '#4CF4E7', text: '#005853' },
  transfer:      { bg: '#4CF4E7', text: '#005853' },
  groceries:     { bg: '#E0F2FE', text: '#0E7490' },
  transport:     { bg: '#F3E8FF', text: '#7E22CE' },
  subscriptions: { bg: '#FEE2E2', text: '#991B1B' },
  utilities:     { bg: '#DBEAFE', text: '#1D4ED8' },
  dining:        { bg: '#E0F2FE', text: '#0E7490' },
  entertainment: { bg: '#FEE2E2', text: '#991B1B' },
};

const categoryIcons: Record<string, string> = {
  salary:        '💰',
  transfer:      '🔄',
  groceries:     '🛒',
  transport:     '🚌',
  subscriptions: '📺',
  utilities:     '⚡',
  dining:        '🍽️',
  entertainment: '🎭',
};

// ─── Amount filter buckets ────────────────────────────────────────────────────
type AmountFilter = 'all' | 'gt500' | 'lt100' | '100to500';

const AMOUNT_OPTIONS: { label: string; value: AmountFilter }[] = [
  { label: 'All Amounts',   value: 'all'      },
  { label: '> ₨500',       value: 'gt500'    },
  { label: '₨100 – ₨500',  value: '100to500' },
  { label: '< ₨100',       value: 'lt100'    },
];

const matchesAmount = (tx: APITransaction, filter: AmountFilter): boolean => {
  const abs = Math.abs(tx.amount);
  if (filter === 'gt500')    return abs > 500;
  if (filter === 'lt100')    return abs < 100;
  if (filter === '100to500') return abs >= 100 && abs <= 500;
  return true;
};

// ─── Transform API → UI shape ─────────────────────────────────────────────────
const transformTransactions = (apiTransactions: APITransaction[]): Transaction[] => {
  if (!apiTransactions || apiTransactions.length === 0) return [];

  const sorted = [...apiTransactions].sort((a, b) => a.timestamp - b.timestamp);
  let runningBalance = 0;

  const withBalance = sorted.map((tx) => {
    runningBalance += tx.amount;
    const absAmount = Math.abs(tx.amount);
    const isUnusual = absAmount > 1000;

    const date = new Date(
      tx.timestamp < 100_000_000_000 ? tx.timestamp * 1000 : tx.timestamp
    );
    const formattedDate = date.toLocaleDateString('en-US', {
      month: 'short', day: 'numeric', year: 'numeric',
    });

    const key           = (tx.category || '').toLowerCase();
    const categoryColor = categoryColors[key] ?? { bg: '#F1F5F9', text: '#475569' };
    const icon          = categoryIcons[key] ?? '🧾';

    return {
      id:            tx.transaction_id.toString(),
      date:          formattedDate,
      merchant:      tx.merchant,
      icon:          isUnusual ? '⚠️' : icon,
      category:      tx.category
                       ? tx.category.charAt(0).toUpperCase() + tx.category.slice(1)
                       : 'Other',
      categoryColor,
      amount:        tx.amount,
      balance:       runningBalance,
      isUnusual,
    } satisfies Transaction;
  });

  return withBalance.reverse();
};

// ─── Component ────────────────────────────────────────────────────────────────
const ITEMS_PER_PAGE = 12;

const TransactionComponent: React.FC = () => {
  const activeSubAccountId  = useFinanceStore(s => s.activeSubAccountId);
  const isSubAccountLoading = useFinanceStore(s => s.isSubAccountLoading);
  const subAccounts         = useFinanceStore(s => s.subAccounts);

  const [rawTransactions, setRawTransactions] = useState<APITransaction[]>([]);
  const [isFetching, setIsFetching]           = useState(false);
  const [fetchError, setFetchError]           = useState<string | null>(null);
  const [currentPage, setCurrentPage]         = useState(1);

  // ── Filter state ───────────────────────────────────────────────────────────
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [amountFilter, setAmountFilter]     = useState<AmountFilter>('all');
  const [merchantSearch, setMerchantSearch] = useState<string>('');

  // ── Fetch on active account switch ─────────────────────────────────────────
  useEffect(() => {
    if (activeSubAccountId === null) return;
    let cancelled = false;

    const load = async () => {
      setIsFetching(true);
      setFetchError(null);
      setCurrentPage(1);
      setCategoryFilter('all');
      setAmountFilter('all');
      setMerchantSearch('');

      try {
        const data = await transactionsAPI.getBySubAccountId(activeSubAccountId);
        if (!cancelled) setRawTransactions(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('TransactionComponent fetch error:', err);
        if (!cancelled) setFetchError('Failed to load transactions for this account.');
      } finally {
        if (!cancelled) setIsFetching(false);
      }
    };

    load();
    return () => { cancelled = true; };
  }, [activeSubAccountId]);

  // ── Derived: unique categories from fetched data ───────────────────────────
  const availableCategories = useMemo<string[]>(() => {
    const seen = new Set<string>();
    rawTransactions.forEach(tx => { if (tx.category) seen.add(tx.category); });
    return Array.from(seen).sort();
  }, [rawTransactions]);

  // ── Derived: transformed rows ──────────────────────────────────────────────
  const allTransactions = useMemo(
    () => transformTransactions(rawTransactions),
    [rawTransactions]
  );

  // ── Derived: filtered rows ─────────────────────────────────────────────────
  const filteredTransactions = useMemo(() => {
    return allTransactions.filter((tx) => {
      const raw = rawTransactions.find(r => r.transaction_id.toString() === tx.id);
      if (!raw) return true;

      const passCat   = categoryFilter === 'all'
                          || tx.category.toLowerCase() === categoryFilter.toLowerCase();
      const passAmt   = matchesAmount(raw, amountFilter);
      const passMerch = merchantSearch.trim() === ''
                          || tx.merchant.toLowerCase().includes(merchantSearch.toLowerCase());

      return passCat && passAmt && passMerch;
    });
  }, [allTransactions, rawTransactions, categoryFilter, amountFilter, merchantSearch]);

  // ── Pagination ─────────────────────────────────────────────────────────────
  useEffect(() => { setCurrentPage(1); }, [categoryFilter, amountFilter, merchantSearch]);

  const totalPages          = Math.max(1, Math.ceil(filteredTransactions.length / ITEMS_PER_PAGE));
  const safePage            = Math.min(currentPage, totalPages);
  const startIndex          = (safePage - 1) * ITEMS_PER_PAGE;
  const currentTransactions = filteredTransactions.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // ── Active account label ───────────────────────────────────────────────────
  const activeAccountName = subAccounts.find(
    a => a.sub_account_id === activeSubAccountId
  )?.account_name ?? 'Account';

  const hasActiveFilters = categoryFilter !== 'all' || amountFilter !== 'all' || merchantSearch !== '';

  const clearFilters = () => {
    setCategoryFilter('all');
    setAmountFilter('all');
    setMerchantSearch('');
  };

  // ── Loading ────────────────────────────────────────────────────────────────
  if (isFetching || isSubAccountLoading) {
    return (
      <div style={styles.container}>
        <div style={styles.centeredMessage}>
          <span style={{ color: '#64748B', fontSize: 14 }}>Loading transactions…</span>
        </div>
      </div>
    );
  }

  if (fetchError) {
    return (
      <div style={styles.container}>
        <div style={{ ...styles.centeredMessage, color: '#EF4444' }}>{fetchError}</div>
      </div>
    );
  }

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div style={styles.container}>

      {/* ── Filter Bar ──────────────────────────────────────────────────────── */}
      <div style={styles.filterBar}>

        {/* Top row: account badge + clear filters */}
        <div style={styles.filterTopRow}>
          <div style={styles.accountBadge}>
            <span style={styles.accountDot} />
            <span style={styles.accountBadgeText}>{activeAccountName}</span>
            <span style={styles.accountBadgeDivider}>·</span>
            <span style={styles.accountBadgeSub}>{rawTransactions.length} transactions</span>
          </div>
          {hasActiveFilters && (
            <button onClick={clearFilters} style={styles.clearFiltersBtn}>
              Clear filters ✕
            </button>
          )}
        </div>

        {/* Filter controls row */}
        <div style={styles.filterFields}>

          {/* Category — populated from real fetched data */}
          <div style={styles.filterField}>
            <label style={styles.filterLabel}>CATEGORY</label>
            <select
              style={styles.filterSelect}
              value={categoryFilter}
              onChange={e => setCategoryFilter(e.target.value)}
            >
              <option value="all">All Categories</option>
              {availableCategories.map(cat => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Amount buckets */}
          <div style={styles.filterField}>
            <label style={styles.filterLabel}>AMOUNT</label>
            <select
              style={styles.filterSelect}
              value={amountFilter}
              onChange={e => setAmountFilter(e.target.value as AmountFilter)}
            >
              {AMOUNT_OPTIONS.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>

          {/* Merchant search */}
          <div style={{ ...styles.filterField, flex: 2 }}>
            <label style={styles.filterLabel}>MERCHANT</label>
            <div style={styles.filterInputWrap}>
              <span style={styles.searchIcon}>🔍</span>
              <input
                style={styles.filterInput}
                placeholder="Search merchants…"
                type="text"
                value={merchantSearch}
                onChange={e => setMerchantSearch(e.target.value)}
              />
              {merchantSearch && (
                <button
                  onClick={() => setMerchantSearch('')}
                  style={styles.clearInputBtn}
                  aria-label="Clear merchant search"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Live results pill — only shown when filtering */}
          {hasActiveFilters && (
            <div style={styles.resultsPill}>
              {filteredTransactions.length} result{filteredTransactions.length !== 1 ? 's' : ''}
            </div>
          )}

        </div>
      </div>

      {/* ── Empty filtered state ──────────────────────────────────────────────── */}
      {filteredTransactions.length === 0 ? (
        <div style={styles.centeredMessage}>
          <span style={{ fontSize: 28 }}>🔍</span>
          <span style={{ color: '#94A3B8', fontSize: 13 }}>
            No transactions match the current filters.
          </span>
          <button onClick={clearFilters} style={styles.clearFiltersBtn}>
            Clear filters
          </button>
        </div>
      ) : (
        <>
          {/* ── Table Header ────────────────────────────────────────────────────── */}
          <div style={styles.tableHeader}>
            <div style={styles.headerCell}>DATE</div>
            <div style={styles.headerCellMerchant}>MERCHANT / DESCRIPTION</div>
            <div style={styles.headerCell}>AI CATEGORY</div>
            <div style={styles.headerCellRight}>AMOUNT</div>
            <div style={styles.headerCellRight}>BALANCE</div>
          </div>

          {/* ── Rows ──────────────────────────────────────────────────────────── */}
          <div style={styles.listContainer}>
            {currentTransactions.map(item => (
              <TransactionItem key={item.id} transaction={item} />
            ))}
          </div>

          {/* ── Footer / Pagination ───────────────────────────────────────────── */}
          <div style={styles.footer}>
            <div style={styles.footerText}>
              Showing {startIndex + 1}–{Math.min(startIndex + ITEMS_PER_PAGE, filteredTransactions.length)}{' '}
              of {filteredTransactions.length} transactions
            </div>

            <div style={styles.paginationContainer}>
              <button
                style={{
                  ...styles.paginationButton,
                  opacity: safePage === 1 ? 0.4 : 1,
                  cursor:  safePage === 1 ? 'not-allowed' : 'pointer',
                }}
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={safePage === 1}
              >
                ‹
              </button>
              <span style={styles.pageIndicator}>{safePage} / {totalPages}</span>
              <button
                style={{
                  ...styles.paginationButton,
                  opacity: safePage === totalPages ? 0.4 : 1,
                  cursor:  safePage === totalPages ? 'not-allowed' : 'pointer',
                }}
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={safePage === totalPages}
              >
                ›
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles: Record<string, React.CSSProperties> = {
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    overflow: 'hidden',
  },

  // Filter bar
  filterBar: {
    padding: '16px 24px',
    borderBottom: '1px solid #F1F5F9',
    backgroundColor: '#FAFBFC',
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
  filterTopRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  accountBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
  },
  accountDot: {
    width: 7,
    height: 7,
    borderRadius: '50%',
    backgroundColor: '#22d3ee',
    display: 'inline-block',
    flexShrink: 0,
  },
  accountBadgeText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#0f172a',
  },
  accountBadgeDivider: {
    fontSize: 13,
    color: '#CBD5E1',
  },
  accountBadgeSub: {
    fontSize: 12,
    color: '#94A3B8',
  },
  filterFields: {
    display: 'flex',
    flexDirection: 'row',
    gap: 14,
    alignItems: 'flex-end',
    flexWrap: 'wrap' as const,
  },
  filterField: {
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
    flex: 1,
    minWidth: 110,
  },
  filterLabel: {
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: '0.14em',
    color: '#94A3B8',
    textTransform: 'uppercase' as const,
  },
  filterSelect: {
    padding: '8px 10px',
    borderRadius: 10,
    border: '1px solid #E2E8F0',
    backgroundColor: '#FFFFFF',
    fontSize: 13,
    color: '#334155',
    outline: 'none',
    cursor: 'pointer',
    appearance: 'auto' as const,
  },
  filterInputWrap: {
    position: 'relative' as const,
    display: 'flex',
    alignItems: 'center',
  },
  searchIcon: {
    position: 'absolute' as const,
    left: 10,
    fontSize: 12,
    pointerEvents: 'none' as const,
    userSelect: 'none' as const,
  },
  filterInput: {
    width: '100%',
    padding: '8px 32px 8px 30px',
    borderRadius: 10,
    border: '1px solid #E2E8F0',
    backgroundColor: '#FFFFFF',
    fontSize: 13,
    color: '#334155',
    outline: 'none',
    boxSizing: 'border-box' as const,
  },
  clearInputBtn: {
    position: 'absolute' as const,
    right: 8,
    background: 'none',
    border: 'none',
    color: '#94A3B8',
    cursor: 'pointer',
    fontSize: 10,
    padding: 0,
    lineHeight: 1,
  },
  resultsPill: {
    alignSelf: 'flex-end',
    backgroundColor: 'rgba(34,211,238,0.1)',
    color: '#0e7490',
    borderRadius: 20,
    padding: '6px 14px',
    fontSize: 12,
    fontWeight: '600',
    whiteSpace: 'nowrap' as const,
    marginBottom: 1,
  },
  clearFiltersBtn: {
    padding: '5px 12px',
    borderRadius: 8,
    border: '1px solid #E2E8F0',
    background: 'none',
    fontSize: 11,
    color: '#64748B',
    cursor: 'pointer',
    fontWeight: '500',
  },

  // Centered states
  centeredMessage: {
    padding: 48,
    textAlign: 'center' as const,
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },

  // Table
  tableHeader: {
    display: 'flex',
    flexDirection: 'row' as const,
    backgroundColor: 'rgba(238, 241, 243, 0.5)',
    padding: '14px 24px',
  },
  headerCell: {
    flex: 1,
    fontSize: 9,
    fontWeight: '900',
    textTransform: 'uppercase' as const,
    letterSpacing: 2,
    color: '#64748B',
  },
  headerCellMerchant: {
    flex: 2,
    fontSize: 9,
    fontWeight: '900',
    textTransform: 'uppercase' as const,
    letterSpacing: 2,
    color: '#64748B',
  },
  headerCellRight: {
    flex: 1,
    fontSize: 9,
    fontWeight: '900',
    textTransform: 'uppercase' as const,
    letterSpacing: 2,
    color: '#64748B',
    textAlign: 'right' as const,
  },
  listContainer: {
    borderTop: '1px solid #F1F5F9',
  },

  // Footer
  footer: {
    padding: '14px 24px',
    borderTop: '1px solid #F1F5F9',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
  },
  paginationContainer: {
    display: 'flex',
    flexDirection: 'row' as const,
    alignItems: 'center',
    gap: 4,
  },
  paginationButton: {
    width: 32,
    height: 32,
    border: '1px solid #E2E8F0',
    borderRadius: 8,
    backgroundColor: 'transparent',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 20,
    color: '#64748B',
    cursor: 'pointer',
    lineHeight: 1,
  },
  pageIndicator: {
    fontSize: 12,
    color: '#64748B',
    padding: '0 6px',
    minWidth: 40,
    textAlign: 'center' as const,
  },
};

export default TransactionComponent;