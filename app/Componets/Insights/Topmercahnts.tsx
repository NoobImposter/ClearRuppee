import React from 'react';

import { useFinanceStore } from '../states/states';
export function TopMerchantsCard() {
  // 1. Pull the data dynamically from your Zustand store
  const topMerchants = useFinanceStore((state) => state.insightsTopMerchants);
  const totalExpense = useFinanceStore((state) => state.totalExpense);

  // Formatting utility for a premium local currency look
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
      maximumFractionDigits: 0,
    }).format(value).replace('PKR', 'Rs.');
  };

  return (
    <div style={styles.card}>
      <h4 style={styles.cardTitleMargin}>Top 4 Merchants</h4>
      <div style={{display:"flex",flexDirection:"column",gap:"20px"}}>
        {topMerchants.map((item, index) => {
          // 2. Compute dynamic line percentage based on total expense
          // Safeguard against division by zero if totalExpense isn't loaded yet
          const percentage = totalExpense > 0 
            ? Math.round((item.amount / totalExpense) * 100) 
            : 0;

          return (
            <div key={index} style={{   display: 'flex',
    flexDirection: 'column',
    gap: '8px'}}>
              <div style={styles.merchantHeader}>
                {/* Display Merchant Name & Calculated Share % */}
                <span style={styles.merchantName}>
                  {item.merchant} <span style={styles.percentageText}>({percentage}%)</span>
                </span>
                {/* Display Formatted Value */}
                <span style={styles.merchantValue}>
                  {formatCurrency(item.amount)}
                </span>
              </div>
              
              {/* Progress Bar Track */}
              <div style={styles.merchantTrack}>
                {/* 3. Assign calculated percentage dynamically to the line width */}
                <div 
                  style={{ 
                    ...styles.merchantFill, 
                    width: `${percentage}%` 
                  }} 
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// --- Premium Minimalist Styles ---
const styles = {
  card: {
   backgroundColor: '#ffffff',
    padding: 24,
    borderRadius: 16,
    border: '1px solid rgba(171, 173, 175, 0.15)',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
  },
  cardTitleMargin: {
    margin: '0 0 20px 0',
    fontSize: '18px',
    fontWeight: '600',
    color: '#1a1a1a',
    fontFamily: 'system-ui, sans-serif',
  },
  merchantList: {
    display: 'flex',
    gap: '20px',
  },
  merchantItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  merchantHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  merchantName: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#4a4a4a',
    fontFamily: 'system-ui, sans-serif',
  },
  percentageText: {
    fontSize: '12px',
    color: '#8c8c8c',
    fontWeight: '400',
    marginLeft: '4px',
  },
  merchantValue: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#1a1a1a',
    fontFamily: 'system-ui, sans-serif',
  },
  merchantTrack: {
    width: '100%',
    height: '6px',
    backgroundColor: '#f0f2f5',
    borderRadius: '99px',
    overflow: 'hidden',
  },
  merchantFill: {
    height: '100%',
    backgroundColor: '#0052ff', // Premium Fintech Blue
    borderRadius: '99px',
    transition: 'width 0.4s ease-out', // Smooth transition when data updates
  },
};