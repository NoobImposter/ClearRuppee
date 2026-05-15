import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faDownload } from '@fortawesome/free-solid-svg-icons';
import { transactionsAPI } from '../apis';
import type { Transaction as APITransaction } from '../apis';

interface RecentTransaction {
  id: number;
  date: string;
  description: string;
  category: string;
  categoryColor: { bg: string; text: string };
  amount: number;
}

// Category color mapping
const categoryColors: Record<string, { bg: string; text: string }> = {
  'salary': { bg: '#4cf4e7', text: '#005853' },
  'transfer': { bg: '#4cf4e7', text: '#005853' },
  'groceries': { bg: 'rgba(58, 187, 255, 0.2)', text: '#00628b' },
  'transport': { bg: '#dfe3e6', text: '#595c5e' },
  'subscriptions': { bg: '#dae2fd', text: '#4a5167' },
  'utilities': { bg: '#d9dde0', text: '#2c2f31' },
  'dining': { bg: '#dfe3e6', text: '#595c5e' },
  'entertainment': { bg: '#dae2fd', text: '#4a5167' },
};

const RecentTransactionsTable: React.FC = () => {
  const [transactions, setTransactions] = useState<RecentTransaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchRecentTransactions();
  }, []);

  const fetchRecentTransactions = async () => {
    try {
      setIsLoading(true);

      // Fetch transactions from both sub-accounts
      const transactions1 = await transactionsAPI.getBySubAccountId(1);
      const transactions2 = await transactionsAPI.getBySubAccountId(2);
      
      // Combine and sort by timestamp (newest first)
      const allTransactions = [...transactions1, ...transactions2]
        .sort((a, b) => b.timestamp - a.timestamp)
        .slice(0, 5); // Get last 5 transactions

      // Transform to UI format
      const transformedTransactions = allTransactions.map((tx) => 
        transformTransaction(tx)
      );

      setTransactions(transformedTransactions);
      setIsLoading(false);
    } catch (err) {
      console.error('Error fetching recent transactions:', err);
      setError('Failed to load transactions');
      setIsLoading(false);
    }
  };

  const transformTransaction = (tx: APITransaction): RecentTransaction => {
    // Format date
    const date = new Date(tx.timestamp * 1000);
    const formattedDate = date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });

    // Get category colors
    const categoryColor = categoryColors[tx.category.toLowerCase()] || 
      { bg: '#dfe3e6', text: '#595c5e' };

    // Capitalize category
    const category = tx.category.charAt(0).toUpperCase() + tx.category.slice(1);

    return {
      id: tx.transaction_id,
      date: formattedDate,
      description: tx.merchant,
      category,
      categoryColor,
      amount: tx.amount,
    };
  };

  const formatAmount = (amount: number): string => {
    const formatted = Math.abs(amount).toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    return amount >= 0 ? `+$${formatted}` : `-$${formatted}`;
  };

  const getAmountColor = (amount: number): string => {
    return amount >= 0 ? '#006761' : '#b31b25';
  };

  return (
    <div style={styles.tableCard}>
      <div style={styles.tableHeader}>
        <h4 style={styles.dataCardTitle}>Recent Transactions</h4>
        {/* <div style={styles.tableActionGroup}>
          <button style={styles.tableActionButton}>
            <FontAwesomeIcon icon={faFilter} size="xl" />
          </button>
          <button style={styles.tableActionButton}>
            <FontAwesomeIcon icon={faDownload} size="xl" />
          </button>
        </div> */}
      </div>

      <div style={styles.responsiveTableWrapper}>
        {isLoading ? (
          <div style={styles.loadingContainer}>
            <p style={styles.loadingText}>Loading transactions...</p>
          </div>
        ) : error ? (
          <div style={styles.errorContainer}>
            <p style={styles.errorText}>{error}</p>
          </div>
        ) : (
          <table style={styles.transactionsTable}>
            <thead>
              <tr style={styles.tableHeaderRow}>
                <th style={styles.tableTh}>Date</th>
                <th style={styles.tableTh}>Description</th>
                <th style={styles.tableTh}>AI Category</th>
                <th style={{ ...styles.tableTh, textAlign: 'right' }}>Amount</th>
              </tr>
            </thead>
            <tbody style={styles.tableBody}>
              {transactions.map((tx, index) => (
                <tr 
                  key={tx.id} 
                  style={{
                    ...styles.tableRow,
                    borderBottom: index === transactions.length - 1 ? 'none' : undefined,
                  }}
                >
                  <td style={styles.tableTdDate}>{tx.date}</td>
                  <td style={styles.tableTdDesc}>{tx.description}</td>
                  <td style={styles.tableTd}>
                    <span
                      style={{
                        ...styles.tableBadge,
                        backgroundColor: tx.categoryColor.bg,
                        color: tx.categoryColor.text,
                      }}
                    >
                      {tx.category}
                    </span>
                  </td>
                  <td
                    style={{
                      ...styles.tableTdAmount,
                      color: getAmountColor(tx.amount),
                    }}
                  >
                    {formatAmount(tx.amount)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  tableCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: '24px',
    padding: '32px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  },
  tableHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px',
  },
  dataCardTitle: {
    fontSize: '20px',
    fontWeight: '700',
    margin: 0,
    color: '#1e293b',
  },
  tableActionGroup: {
    display: 'flex',
    gap: '12px',
  },
  tableActionButton: {
    width: '40px',
    height: '40px',
    borderRadius: '12px',
    border: '1px solid #e2e8f0',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#64748b',
    transition: 'all 0.2s',
  },
  responsiveTableWrapper: {
    overflowX: 'auto',
  },
  transactionsTable: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  tableHeaderRow: {
    borderBottom: '2px solid #f1f5f9',
  },
  tableTh: {
    padding: '12px 16px',
    textAlign: 'left',
    fontSize: '11px',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: '1.5px',
    color: '#64748b',
  },
  tableBody: {},
  tableRow: {
    borderBottom: '1px solid #f1f5f9',
    transition: 'background-color 0.2s',
  },
  tableTdDate: {
    padding: '16px',
    fontSize: '14px',
    fontWeight: '500',
    color: '#475569',
  },
  tableTdDesc: {
    padding: '16px',
    fontSize: '14px',
    fontWeight: '500',
    color: '#1e293b',
  },
  tableTd: {
    padding: '16px',
  },
  tableBadge: {
    padding: '6px 12px',
    borderRadius: '8px',
    fontSize: '12px',
    fontWeight: '600',
    display: 'inline-block',
  },
  tableTdAmount: {
    padding: '16px',
    fontSize: '14px',
    fontWeight: '700',
    textAlign: 'right',
  },
  loadingContainer: {
    padding: '40px',
    textAlign: 'center',
  },
  loadingText: {
    color: '#64748b',
    fontSize: '14px',
  },
  errorContainer: {
    padding: '40px',
    textAlign: 'center',
  },
  errorText: {
    color: '#ef4444',
    fontSize: '14px',
  },
};

export default RecentTransactionsTable;