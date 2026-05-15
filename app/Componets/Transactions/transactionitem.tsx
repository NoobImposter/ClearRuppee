import React from 'react';
import type { TransactionItemProps } from './trantypes';

export const TransactionItem: React.FC<TransactionItemProps> = React.memo(({ transaction }) => {
  const {
    date,
    merchant,
    icon,
    category,
    categoryColor,
    amount,
    balance,
    isUnusual,
  } = transaction;

  const isIncome = amount > 0;

  return (
    <div
      style={{
        ...styles.row,
        backgroundColor: isUnusual ? 'rgba(254, 243, 199, 0.2)' : 'transparent',
      }}
    >
      <div style={styles.dateCell}>
        <div style={styles.dateText}>{date}</div>
      </div>

      <div style={styles.merchantCell}>
        <div style={styles.merchantContainer}>
          <div
            style={{
              ...styles.iconContainer,
              backgroundColor: isUnusual ? '#FEF3C7' : '#F1F5F9',
            }}
          >
            <span
              className="material-symbols-outlined"
              style={{
                ...styles.icon,
                color: isUnusual ? '#D97706' : '#94A3B8',
              }}
            >
              {icon}
            </span>
          </div>
          <div>
            <div style={styles.merchantText}>{merchant}</div>
            {isUnusual && (
              <div style={styles.unusualBadge}>
                <div style={styles.unusualText}>UNUSUAL</div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div style={styles.categoryCell}>
        <div
          style={{
            ...styles.categoryBadge,
            backgroundColor: categoryColor.bg,
          }}
        >
          <div style={{ ...styles.categoryText, color: categoryColor.text }}>
            {category}
          </div>
        </div>
      </div>

      <div style={styles.amountCell}>
        <div
          style={{
            ...styles.amountText,
            color: isIncome ? '#006761' : '#B31B25',
          }}
        >
          {isIncome ? '+' : '-'}${Math.abs(amount).toFixed(2)}
        </div>
      </div>

      <div style={styles.balanceCell}>
        <div style={styles.balanceText}>${balance.toFixed(2)}</div>
      </div>
    </div>
  );
});

TransactionItem.displayName = 'TransactionItem';

const styles: { [key: string]: React.CSSProperties } = {
  row: {
    display: 'flex',
    flexDirection: 'row',
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 24,
    paddingRight: 24,
    borderBottom: '1px solid #F1F5F9',
    transition: 'background-color 0.2s',
  },
  dateCell: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#64748B',
  },
  merchantCell: {
    flex: 2,
    display: 'flex',
    alignItems: 'center',
  },
  merchantContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 14,
  },
  merchantText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
  },
  unusualBadge: {
    marginTop: 4,
    display: 'inline-block',
  },
  unusualText: {
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 2,
    paddingBottom: 2,
    borderRadius: 9999,
    fontSize: 9,
    backgroundColor: '#FBBF24',
    color: '#78350F',
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  categoryCell: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
  },
  categoryBadge: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 4,
    paddingBottom: 4,
    borderRadius: 9999,
  },
  categoryText: {
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: -0.5,
  },
  amountCell: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  amountText: {
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'right',
  },
  balanceCell: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  balanceText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#94A3B8',
    textAlign: 'right',
  },
};