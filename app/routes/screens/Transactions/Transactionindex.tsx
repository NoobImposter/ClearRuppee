import React from 'react';
import TransactionComponet from '~/Componets/Transactions/Transactioncomponent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { useFinanceStore } from '~/Componets/states/states';
const Transactionindex: React.FC = () => {
  const Totalinoome= useFinanceStore((state)=>state.transactionsTotalIncome)
  const TotalExpense= useFinanceStore((state)=>state.transactionsTotalExpense)
  return (
    <div style={styles.body}>
      {/* Main Canvas */}
      <main style={styles.main}>
  


        {/* Content Area */}
        <div style={styles.content}>
          {/* Left Side: Table & Filters */}
          <div style={styles.leftContent}>
            {/* Header & Actions */}
            <div style={styles.pageHeader}>
              <div>
                <h2 style={styles.pageTitle}>Transactions</h2>
              
              </div>
            
            </div>

            {/* Filter Bar */}
       

            {/* Transactions Table */}
            <TransactionComponet />
          </div>

          {/* Right Side: Analytics Sidebar */}
          <aside style={styles.rightSidebar}>
            {/* Quick Summary Card */}
            <section style={styles.summaryCard}>
              <h3 style={styles.sectionTitle}>March Summary</h3>
              <div style={styles.summaryContent}>
                <div style={styles.summaryItem}>
                  <div>
                    <p style={styles.summaryLabel}>TOTAL INCOME</p>
                    <p style={styles.summaryIncomeValue}>{Totalinoome}</p>
                  </div>
                  <div style={styles.progressBarContainer}>
                    <div style={{...styles.progressBar, ...styles.progressBarIncome}}></div>
                  </div>
                </div>

                <div style={styles.summaryItem}>
                  <div>
                    <p style={styles.summaryLabel}>TOTAL EXPENSES</p>
                    <p style={styles.summaryExpenseValue}>{TotalExpense}</p>
                  </div>
                  <div style={styles.progressBarContainer}>
                    <div style={{...styles.progressBar, ...styles.progressBarExpense}}></div>
                  </div>
                </div>

            
              </div>
            </section>

            {/* AI Insights Card */}
         

            {/* Visual Chart */}
            {/* <section style={styles.chartCard}>
              <div style={styles.chartContainer}>
                <div style={{...styles.chartBar, height: '40%'}}></div>
                <div style={{...styles.chartBar, height: '60%'}}></div>
                <div style={{...styles.chartBar, ...styles.chartBarHighlight, height: '45%'}}></div>
                <div style={{...styles.chartBar, ...styles.chartBarPrimary, height: '85%'}}></div>
                <div style={{...styles.chartBar, height: '50%'}}></div>
                <div style={{...styles.chartBar, height: '30%'}}></div>
                <div style={{...styles.chartBar, height: '40%'}}></div>
              </div>
              <p style={styles.chartLabel}>Spending Velocity</p>
            </section> */}
          </aside>
        </div>
      </main>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  body: {
    backgroundColor: '#F5F7F9',
    color: '#2C2F31',
    display: 'flex',
    height: '100vh',
    width: '100vw',
    overflow: 'hidden', // Prevents double scrollbars on the main viewport
    fontFamily: 'Inter, sans-serif',
    boxSizing: 'border-box',
  },
  main: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '100%',
    overflow: 'hidden',
  },
  header: {
    height: 68,
    flexShrink: 0, // Prevents header from collapsing
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    backdropFilter: 'blur(20px)',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 32,
    paddingRight: 32,
    boxSizing: 'border-box',
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: 32,
    flex: 1,
  },
  searchContainer: {
    position: 'relative',
    width: '100%',
    maxWidth: 448,
  },
  searchIcon: {
    position: 'absolute',
    left: 12,
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#94A3B8',
    fontSize: 18,
  },
  searchInput: {
    width: '100%',
    backgroundColor: '#EEF1F3',
    border: 'none',
    borderRadius: 12,
    paddingLeft: 40,
    paddingRight: 16,
    paddingTop: 8,
    paddingBottom: 8,
    fontSize: 14,
    outline: 'none',
  },
  headerRight: {
    display: 'flex',
    alignItems: 'center',
    gap: 16,
  },
  iconButton: {
    padding: 8,
    color: '#64748B',
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: 8,
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  divider: {
    height: 32,
    width: 1,
    backgroundColor: '#E2E8F0',
    marginLeft: 8,
    marginRight: 8,
  },
  userSection: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    paddingLeft: 8,
  },
  userInfo: {
    textAlign: 'right',
  },
  userName: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0F172A',
    margin: 0,
  },
  userPlan: {
    fontSize: 10,
    color: '#64748B',
    margin: 0,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E2E8F0',
    overflow: 'hidden',
    border: '2px solid white',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  content: {
    padding: 32,
    display: 'flex',
    gap: 32,
    flex: 1,
    height: 'calc(100% - 68px)', // Subtracts header height
    boxSizing: 'border-box',
    overflow: 'hidden',
  },
  leftContent: {
    flex: 1,
    minWidth: 0,
    height: '100%',
    overflowY: 'auto', // Allows scrolling inside the main table data
    paddingRight: 8,
  },
  pageHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 32,
  },
  pageTitle: {
    fontSize: 30,
    fontWeight: '900',
    color: '#0F172A',
    letterSpacing: -1,
    margin: 0,
  },
  pageSubtitle: {
    color: '#595C5E',
    fontWeight: '500',
    marginTop: 4,
    margin: 0,
  },
  actionButtons: {
    display: 'flex',
    gap: 12,
  },
  filterButton: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#DFE3E6',
    color: '#2C2F31',
    fontWeight: '600',
    fontSize: 14,
    borderRadius: 12,
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  primaryButton: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#006761',
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
    borderRadius: 12,
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    border: 'none',
    cursor: 'pointer',
    boxShadow: '0 10px 25px rgba(6, 103, 97, 0.2)',
    transition: 'transform 0.2s',
  },
  buttonIcon: {
    fontSize: 18,
  },
  filterBar: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 32,
    display: 'flex',
    flexWrap: 'wrap',
    gap: 16,
    alignItems: 'flex-end',
    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
  },
  filterField: {
    flex: 1,
    minWidth: 140,
  },
  filterFieldLarge: {
    flex: 1.5,
    minWidth: 200,
  },
  filterLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#94A3B8',
    textTransform: 'uppercase',
    letterSpacing: 2,
    display: 'block',
    marginBottom: 4,
    paddingLeft: 4,
  },
  filterInputContainer: {
    // position: 'relative',
    // display:"flex",
    // flexDirection:"row"


  },
  filterIcon: {
    position: 'absolute',
  
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#94A3B8',
    fontSize: 14,
  },
  filterInput: {
    width: '100%',
    backgroundColor: '#EEF1F3',
    border: 'none',
    borderRadius: 8,
    paddingRight: 12,
    paddingLeft:5,
    paddingTop: 8,
    paddingBottom: 8,
    fontSize: 12,
    outline: 'none',
    boxSizing: 'border-box',
  },
  filterSelect: {
    width: '100%',
    backgroundColor: '#EEF1F3',
    border: 'none',
    borderRadius: 8,
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 8,
    paddingBottom: 8,
    fontSize: 12,
    outline: 'none',
    appearance: 'none',
    boxSizing: 'border-box',
  },
  rightSidebar: {
    width: 340,
    flexShrink: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: 32,
    height: '100%',
    overflowY: 'auto', // Allows analytical sidebar to scroll independently if needed
    paddingRight: 4,
  },
  summaryCard: {
    backgroundColor: '#FFFFFF',
    padding: 24,
    borderRadius: 12,
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    border: '1px solid #F1F5F9',
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 2.5,
    color: '#94A3B8',
    marginBottom: 24,
    marginTop: 0,
  },
  summaryContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: 24,
  },
  summaryItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  summaryLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#64748B',
    textTransform: 'uppercase',
    marginBottom: 4,
    marginTop: 0,
  },
  summaryIncomeValue: {
    fontSize: 24,
    fontWeight: '900',
    color: '#006761',
    margin: 0,
  },
  summaryExpenseValue: {
    fontSize: 24,
    fontWeight: '900',
    color: '#B31B25',
    margin: 0,
  },
  progressBarContainer: {
    height: 4,
    width: 96,
    backgroundColor: '#F1F5F9',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
  },
  progressBarIncome: {
    backgroundColor: '#006761',
    width: '75%',
  },
  progressBarExpense: {
    backgroundColor: '#B31B25',
    width: '85%',
  },
  largestExpense: {
    paddingTop: 24,
    borderTop: '1px solid #F1F5F9',
  },
  expenseItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    padding: 12,
    backgroundColor: '#F5F7F9',
    borderRadius: 12,
  },
  expenseIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#FCE7F3',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#BE185D',
  },
  expenseName: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0F172A',
    margin: 0,
  },
  expenseDetails: {
    fontSize: 10,
    color: '#64748B',
    margin: 0,
  },
  expenseAmount: {
    marginLeft: 'auto',
    fontSize: 14,
    fontWeight: '900',
    color: '#0F172A',
    margin: 0,
  },
  aiInsightsCard: {
    backgroundColor: '#020617',
    padding: 24,
    borderRadius: 12,
    position: 'relative',
    overflow: 'hidden',
  },
  aiGlow: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 128,
    height: 128,
    backgroundColor: 'rgba(6, 103, 97, 0.2)',
    filter: 'blur(64px)',
    borderRadius: '50%',
    marginRight: -40,
    marginTop: -40,
  },
  aiContent: {
    position: 'relative',
    zIndex: 10,
  },
  aiHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    marginBottom: 24,
  },
  aiIcon: {
    color: '#006761',
    fontVariationSettings: "'FILL' 1",
  },
  aiTitle: {
    fontSize: 12,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 2.5,
    color: 'white',
    margin: 0,
  },
  aiList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },
  aiListItem: {
    display: 'flex',
    gap: 12,
  },
  aiBullet: {
    marginTop: 4,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#006761',
    flexShrink: 0,
  },
  aiText: {
    fontSize: 12,
    lineHeight: 1.6,
    color: '#CBD5E1',
    margin: 0,
  },
  aiTextBold: {
    color: 'white',
    fontWeight: '700',
  },
  aiButton: {
    width: '100%',
    marginTop: 32,
    paddingTop: 12,
    paddingBottom: 12,
    borderRadius: 12,
    border: '1px solid rgba(255, 255, 255, 0.1)',
    color: 'white',
    backgroundColor: 'transparent',
    fontWeight: '700',
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: 2,
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  chartCard: {
    backgroundColor: '#FFFFFF',
    padding: 24,
    borderRadius: 12,
    border: '1px solid #F1F5F9',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  chartContainer: {
    width: '100%',
    height: 128,
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    gap: 8,
    paddingLeft: 8,
    paddingRight: 8,
  },
  chartBar: {
    width: 12,
    backgroundColor: '#F1F5F9',
    borderRadius: '2px 2px 0 0',
  },
  chartBarHighlight: {
    backgroundColor: 'rgba(6, 103, 97, 0.4)',
  },
  chartBarPrimary: {
    backgroundColor: '#006761',
  },
  chartLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#94A3B8',
    marginTop: 16,
    textTransform: 'uppercase',
    letterSpacing: 2,
    margin: '16px 0 0 0',
  },
};

export default Transactionindex;