import React from 'react';

import { useFinanceStore } from './states/states';

const PageHeader: React.FC = () => {
  const subAccounts         = useFinanceStore(s => s.subAccounts);
  const activeSubAccountId  = useFinanceStore(s => s.activeSubAccountId);
  const currentMonth        = useFinanceStore(s => s.currentMonth);

  const activeAccountName = subAccounts.find(
    a => a.sub_account_id === activeSubAccountId
  )?.account_name ?? 'Account';

  return (
    <div>
      <nav style={styles.breadcrumb}>Analytics / Statements</nav>
      <h2 style={styles.pageTitle}>
        Spending Analytics — {activeAccountName}
        <span style={styles.bulletSeparator}> • </span>
        <span style={styles.highlightText}>{currentMonth}</span>
      </h2>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  breadcrumb: {
    fontSize: 12,
    color: '#94A3B8',
    marginBottom: 6,
    fontWeight: '500',
    letterSpacing: '0.04em',
  },
  pageTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#0f172a',
    margin: 0,
  },
  bulletSeparator: {
    color: '#CBD5E1',
    margin: '0 6px',
  },
  highlightText: {
    color: '#22d3ee',
  },
};

export default PageHeader;