import React from 'react';

import { useFinanceStore } from '../states/states';
export function SpendingByCategoryCard() {
  // 1. Pull the prefilled category array and total expense from Zustand
  const categories = useFinanceStore((state) => state.insightsTopCategories);
  const totalExpense = useFinanceStore((state) => state.transactionsTotalExpense);

  // Premium Fintech Color Palette for Chart Segments
  const segmentColors = ['#0052ff', '#22d3ee', '#00c853', '#ff9100', '#7c4dff'];
  const defaultColor = '#cbd5e1';

  // Currency Formatter Utility
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
      maximumFractionDigits: 0,
    }).format(value).replace('PKR', 'Rs.');
  };

  // --- SVG Donut Logic Config ---
  const radius = 50;
  const circumference = 2 * Math.PI * radius; // Approx 314.16
  let accumulatedPercentage = 0;

  return (
    <div style={styles.card}>
      <h4 style={styles.cardTitle}>Spending by Category</h4>
      
      <div style={styles.donutContainer}>
        {/* Dynamic SVG Donut Chart */}
        <div style={styles.donutWrapper}>
          <svg width="200" height="200" viewBox="0 0 120 120" style={styles.svgRotation}>
            {categories.map((item, index) => {
              const percentage = item.percentage || 0;
              const strokeDasharray = `${(percentage / 100) * circumference} ${circumference}`;
              const strokeDashoffset = -((accumulatedPercentage / 100) * circumference);
              
              // Increment the offset anchor for the next loop's segment
              accumulatedPercentage += percentage;
              const color = segmentColors[index] || defaultColor;

              return (
                <circle
                  key={index}
                  cx="60"
                  cy="60"
                  r={radius}
                  fill="transparent"
                  stroke={color}
                  strokeWidth="12"
                  strokeDasharray={strokeDasharray}
                  strokeDashoffset={strokeDashoffset}
                />
              );
            })}
          </svg>

          {/* Center Text Panel */}
          <div style={styles.donutContent}>
            <p style={styles.donutLabel}>Total</p>
            <p style={styles.donutValue}>{formatCurrency(totalExpense)}</p>
          </div>
        </div>

        {/* Dynamic Legend List */}
        <div style={styles.categoryList}>
          {categories.map((item, index) => {
            const color = segmentColors[index] || defaultColor;
            return (
              <div key={index} style={styles.categoryItem}>
                <div style={styles.categoryInfo}>
                  <div style={{ ...styles.categoryIndicator, backgroundColor: color }} />
                  <span style={styles.categoryText}>{item.category}</span>
                </div>
                <span style={styles.categoryPercentage}>{item.percentage}%</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// --- Premium Minimalist CSS Styles ---
const styles : { [key: string]: React.CSSProperties }= {
  card: {
    backgroundColor: '#ffffff',
    padding: 24,
    borderRadius: 16,
    border: '1px solid rgba(171, 173, 175, 0.15)',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
    justifyContent:"center",
    alignItems:"center"
  },
  cardTitle: {
     fontSize: 25,
    fontWeight: '900',
    color: '#0f172a',
    margin: 0,
    letterSpacing: '-0.025em',
    marginBottom:'20px'
  },
  donutContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '24px',
    flexWrap: 'wrap', // Responsive behavior for smaller screen layouts
  },
  donutWrapper: {
    position: 'relative',
    width: '140px',
    height: '140px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  svgRotation: {
    transform: 'rotate(-90deg)', // Ensures chart segments start cleanly at the top 12 o'clock node
  },
  donutContent: {
    position: 'absolute',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  donutLabel: {
    fontSize:15,
    fontWeight: '900',
    color: '#0f172a',
    margin: 0,
    letterSpacing: '-0.025em',
  },
  donutValue: {
    fontSize: 15,
    fontWeight: '900',
    color: '#0f172a',
    margin: 0,
    letterSpacing: '-0.025em',
  },
  categoryList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
    flex: '1',
    minWidth: '180px',
  },
  categoryItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoryInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  categoryIndicator: {
    width: '10px',
    height: '10px',
    borderRadius: '50%',
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#4a4a4a',
  },
  categoryPercentage: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1a1a1a',
  },
};