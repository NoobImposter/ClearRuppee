import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowUp, faBell, faCloud, faFilter, faPiggyBank, faRefresh, faWallet } from '@fortawesome/free-solid-svg-icons';
import { faDownload } from '@fortawesome/free-solid-svg-icons/faDownload';
import { useFinanceStore } from '~/Componets/states/states';
import RecentTransactionsTable from '~/Componets/Transactions/Homerecents';
import SpendingByCategory from '~/Componets/Transactions/Speningbycategory';
export default function HomeIndex() {
  
  const username = useFinanceStore((state) => state.accountName);
  const Totalbalacne=useFinanceStore((state)=>state.totalBalance)
  const totalincoem =useFinanceStore((state)=>state.totalIncome)
  const totalexpense =useFinanceStore((state)=>state.totalExpense)
  return (
    <div style={styles.appContainer}>
      {/* Main Content Area - Expands to cover 100% viewport width */}
      <main style={styles.mainContent}>
        
        {/* Top Navigation Bar - Integrated precisely with your code */}
     
        {/* Page Canvas - Edge-to-Edge Fluid Layout */}
        <div style={styles.canvasContainer}>
          
          {/* Page Header & Upload Zone */}
          <div style={styles.pageHeaderRow}>
            <div style={styles.pageTitleBlock}>
              <div style={styles.pageTitleHeaderFlex}>
                <span style={styles.viewingLabel}>Viewing:</span>
                <h2 style={styles.pageTitleText}>All Accounts Dashboard</h2>
              </div>
              <div style={styles.pageMetaFlex}>
                <button style={styles.metaButton}>
                  <FontAwesomeIcon icon={faRefresh} />
                </button>
               
              
              </div>
            </div>

            {/* Subtle Horizontal Upload Zone */}
 
          </div>

          {/* Navigation Tabs */}
    

          {/* KPI Bento Grid - Stretches fluidly on wide screens */}
          <div style={styles.kpiGrid}>
            {/* Balance Card */}
            <div style={styles.kpiCard}>
              <div style={styles.kpiCardHeader}>
                <span style={{ ...styles.kpiCardIconBg, backgroundColor: 'rgba(0, 103, 97, 0.2)', color: '#006761' }}>
                 
                  <FontAwesomeIcon icon={faWallet} size="xl"/>
                  
                </span>
                <span style={{ ...styles.kpiCardBadge, color: '#006761', backgroundColor: 'rgba(76, 244, 231, 0.3)' }}>
                  Balance
                </span>
              </div>
              <h3 style={styles.kpiValueText}>{totalincoem-totalexpense}</h3>
              <p style={styles.kpiSubtext}>
                <span style={styles.kpiTrendPositive}>+12%</span> from last month
              </p>
            </div>

            {/* Income Card */}
            <div style={styles.kpiCard}>
              <div style={styles.kpiCardHeader}>
                <span style={{ ...styles.kpiCardIconBg, backgroundColor: 'rgba(58, 187, 255, 0.1)', color: '#00628b' }}>
                  <FontAwesomeIcon icon={faArrowUp} size="xl"/>
                </span>
                <span style={{ ...styles.kpiCardBadge, color: '#00628b', backgroundColor: 'rgba(58, 187, 255, 0.1)' }}>
                  Income
                </span>
              </div>
              <h3 style={styles.kpiValueText}>{totalincoem}</h3>
              <p style={styles.kpiSubtext}>Steady inflow detected</p>
            </div>

            {/* Expenses Card */}
            <div style={styles.kpiCard}>
              <div style={styles.kpiCardHeader}>
                <span style={{ ...styles.kpiCardIconBg, backgroundColor: 'rgba(251, 81, 81, 0.1)', color: '#b31b25' }}>
                  <FontAwesomeIcon icon={faArrowDown} size="xl"/>
                </span>
                <span style={{ ...styles.kpiCardBadge, color: '#b31b25', backgroundColor: 'rgba(251, 81, 81, 0.1)' }}>
                  Expenses
                </span>
              </div>
              <h3 style={styles.kpiValueText}>{totalexpense}</h3>
              <p style={{ ...styles.kpiSubtext, color: '#b31b25' }}>
                <span style={styles.boldSpan}>2.4%</span> above average
              </p>
            </div>

            {/* Savings Card */}
            {/* <div style={styles.kpiCard}>
              <div style={styles.kpiCardHeader}>
                <span style={{ ...styles.kpiCardIconBg, backgroundColor: 'rgba(218, 226, 253, 0.5)', color: '#4a5167' }}>
                 <FontAwesomeIcon icon={faPiggyBank} size="xl"/>
                </span>
                <span style={{ ...styles.kpiCardBadge, color: '#4a5167', backgroundColor: 'rgba(218, 226, 253, 1)' }}>
                  Savings
                </span>
              </div>
              <h3 style={styles.kpiValueText}>$420.00</h3>
              <p style={styles.kpiSubtext}>Smart Allocation Goal</p>
            </div> */}
          </div>

          {/* Charts Section - Flexible two-column layout */}
          <div style={styles.chartsDoubleColumnGrid}>
            {/* Spending by Category Card */}
          <SpendingByCategory />

            {/* Balance Trend Card */}
            <div style={styles.dataCard}>
              <div style={styles.dataCardHeader}>
                <h4 style={styles.dataCardTitle}>Balance Trend</h4>
                <div style={styles.togglePillContainer}>
                  <button style={styles.activePillButton}>Daily</button>
                  <button style={styles.inactivePillButton}>Weekly</button>
                </div>
              </div>
              <div style={styles.chartBarsContainer}>
                 <h3>Currenly in progress</h3>
             
              </div>
              <div style={styles.chartLabelsFooter}>
              
              </div>
            </div>
          </div>

          {/* Full-width Recent Transactions Table */}
          <RecentTransactionsTable />
        </div>
      </main>
    </div>
  );
}

// Layout styling incorporating all properties from your requested Nav Bar
const styles: { [key: string]: React.CSSProperties } = {
  appContainer: {
    display: 'flex',
    minHeight: '100vh',
    width: '100vw',
    backgroundColor: '#f5f7f9',
    color: '#2c2f31',
    fontFamily: "'Inter', sans-serif",
    overflowX: 'hidden',
    boxSizing: 'border-box',
  },
  mainContent: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    minWidth: 0,
  },
  
  // ==========================================
  // REQUESTED HEADER STYLES
  // ==========================================
  header: {
    height: 70,
    backgroundColor: '#ffffff',
    borderBottom: '1px solid rgba(171, 173, 175, 0.15)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 'max(24px, 4vw)',
    paddingRight: 'max(24px, 4vw)',
    position: 'sticky',
    top: 0,
    zIndex: 40,
    boxSizing: 'border-box',
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'center',
    flex: 1,
  },
  searchContainer: {
    position: 'relative',
    width: '100%',
    maxWidth: 400,
  },
  searchIcon: {
    position: 'absolute',
    left: 12,
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#747779',
    fontSize: 20,
  },
  searchInput: {
    width: '100%',
    height: 40,
    backgroundColor: '#f5f7f9',
    border: 'none',
    borderRadius: 8,
    paddingLeft: 40,
    paddingRight: 16,
    fontSize: 14,
    color: '#2c2f31',
    outline: 'none',
    boxSizing: 'border-box',
  },
  headerRight: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 8,
    border: 'none',
    backgroundColor: 'transparent',
    color: '#595c5e',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  divider: {
    width: 1,
    height: 24,
    backgroundColor: 'rgba(171, 173, 175, 0.25)',
    marginLeft: 4,
    marginRight: 4,
  },
  userSection: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    paddingLeft: 4,
  },
  userInfo: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  userName: {
    fontSize: 14,
    fontWeight: 600,
    color: '#2c2f31',
    margin: 0,
    lineHeight: '1.2',
  },
  userPlan: {
    fontSize: 11,
    color: '#006761',
    fontWeight: 500,
    margin: 0,
    marginTop: 2,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: '50%',
    overflow: 'hidden',
    border: '1.5px solid rgba(0, 103, 97, 0.2)',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  // ==========================================

  canvasContainer: {
    width: '100%',
    maxWidth: '100%',
    paddingLeft: 'max(24px, 4vw)',
    paddingRight: 'max(24px, 4vw)',
    paddingTop: 40,
    paddingBottom: 40,
    display: 'flex',
    flexDirection: 'column',
    gap: 32,
    boxSizing: 'border-box',
  },
  pageHeaderRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 32,
    flexWrap: 'wrap',
  },
  pageTitleBlock: {
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
  },
  pageTitleHeaderFlex: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    flexWrap: 'wrap',
  },
  viewingLabel: {
    color: '#595c5e',
    fontWeight: 500,
  },
  pageTitleText: {
    fontSize: 26,
    fontWeight: 'bold',
    letterSpacing: '-0.025em',
    color: '#2c2f31',
    margin: 0,
  },
  pageMetaFlex: {
    display: 'flex',
    alignItems: 'center',
    gap: 16,
  },
  metaButton: {
    color: '#006761',
    backgroundColor: 'transparent',
    border: 'none',
    fontWeight: 600,
    fontSize: 14,
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    cursor: 'pointer',
  },
  metaIcon: {
    fontSize: 16,
  },
  metaDivider: {
    color: '#abadaf',
  },
  metaConfidenceText: {
    color: '#595c5e',
    fontSize: 14,
    display: 'flex',
    alignItems: 'center',
    gap: 6,
  },
  metaCheckIcon: {
    fontSize: 16,
    color: '#006761',
  },
  uploadZone: {
    paddingLeft: 24,
    paddingRight: 24,
    paddingTop: 12,
    paddingBottom: 12,
    backgroundColor: '#eef1f3',
    border: '2px dashed rgba(171, 173, 175, 0.3)',
    borderRadius: 12,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  uploadZoneIcon: {
    color: '#747779',
    fontSize: 22,
  },
  uploadZoneText: {
    fontSize: 13,
    fontWeight: 500,
    color: '#595c5e',
    margin: 0,
  },
  uploadZoneSubtext: {
    fontSize: 10,
    opacity: 0.6,
  },
  tabsNav: {
    display: 'flex',
    gap: 32,
    borderBottom: '1px solid rgba(171, 173, 175, 0.2)',
  },
  activeTabButton: {
    paddingBottom: 16,
    fontSize: 14,
    fontWeight: 600,
    color: '#006761',
    border: 'none',
    borderBottom: '2px solid #006761',
    backgroundColor: 'transparent',
    cursor: 'pointer',
  },
  inactiveTabButton: {
    paddingBottom: 16,
    fontSize: 14,
    fontWeight: 500,
    color: '#595c5e',
    border: 'none',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    transition: 'color 0.2s',
  },
  flexTabButton: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
  },
  tabBrainIcon: {
    fontSize: 16,
  },
  kpiGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: 24,
  },
  kpiCard: {
    backgroundColor: '#ffffff',
    padding: 24,
    borderRadius: 16,
    border: '1px solid rgba(171, 173, 175, 0.15)',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.02)',
    display: 'flex',
    flexDirection: 'column',
  },
  kpiCardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'start',
    marginBottom: 16,
  },
  kpiCardIconBg: {
    width: 40,
    height: 40,
    borderRadius: 8,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  kpiCardBadge: {
    fontSize: 10,
    fontWeight: 'bold',
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 2,
    paddingBottom: 2,
    borderRadius: 9999,
    textTransform: 'uppercase',
  },
  kpiValueText: {
    fontSize: 32,
    fontWeight: 'bold',
    letterSpacing: '-0.025em',
    color: '#2c2f31',
    margin: 0,
  },
  kpiSubtext: {
    fontSize: 12,
    color: '#595c5e',
    marginTop: 8,
    margin: 0,
    display: 'flex',
    alignItems: 'center',
    gap: 4,
  },
  kpiTrendPositive: {
    color: '#006761',
    fontWeight: 'bold',
  },
  boldSpan: {
    fontWeight: 'bold',
  },
  chartsDoubleColumnGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(480px, 1fr))',
    gap: 32,
  },
  dataCard: {
    backgroundColor: '#ffffff',
    padding: 32,
    borderRadius: 16,
    border: '1px solid rgba(171, 173, 175, 0.15)',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.02)',
  },
  dataCardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 32,
  },
  dataCardTitle: {
    fontWeight: 'bold',
    color: '#2c2f31',
    margin: 0,
    fontSize: 16,
  },
  moreOptionsButton: {
    color: '#595c5e',
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
  },
  donutLayoutFlex: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 64,
    paddingTop: 16,
    paddingBottom: 16,
    flexWrap: 'wrap',
  },
  pieRingWrapper: {
    position: 'relative',
    width: 192,
    height: 192,
    borderRadius: '50%',
    border: '16px solid #006761',
    borderRightColor: '#3abbff',
    borderBottomColor: '#dae2fd',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxSizing: 'border-box',
  },
  pieCenterContent: {
    textAlign: 'center',
  },
  pieCenterSubtitle: {
    fontSize: 12,
    color: '#595c5e',
    fontWeight: 500,
    margin: 0,
  },
  pieCenterTitle: {
    fontSize: 20,
    fontWeight: 900,
    color: '#2c2f31',
    margin: 0,
  },
  pieLegendStack: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
  },
  legendRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
  },
  legendCircleDot: {
    width: 12,
    height: 12,
    borderRadius: '50%',
  },
  legendRowLabel: {
    fontSize: 14,
    fontWeight: 500,
    color: '#595c5e',
  },
  togglePillContainer: {
    display: 'flex',
    backgroundColor: '#eef1f3',
    padding: 4,
    borderRadius: 8,
    gap: 4,
  },
  activePillButton: {
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 4,
    paddingBottom: 4,
    fontSize: 10,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    color: '#2c2f31',
    backgroundColor: '#ffffff',
    border: 'none',
    borderRadius: 4,
    boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
    cursor: 'pointer',
  },
  inactivePillButton: {
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 4,
    paddingBottom: 4,
    fontSize: 10,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    color: '#595c5e',
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
  },
  chartBarsContainer: {
    height: 192,
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    gap: 12,
    paddingLeft: 8,
    paddingRight: 8,
  },
  barWrapper: {
    width: '100%',
    backgroundColor: 'rgba(0, 103, 97, 0.1)',
    borderRadius: '8px 8px 0 0',
    transition: 'all 0.3s',
  },
  chartLabelsFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: 16,
    paddingLeft: 8,
    paddingRight: 8,
    fontSize: 10,
    fontWeight: 'bold',
    color: '#595c5e',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  tableCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    border: '1px solid rgba(171, 173, 175, 0.15)',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.02)',
    overflow: 'hidden',
    width: '100%',
  },
  tableHeader: {
    padding: 32,
    borderBottom: '1px solid rgba(171, 173, 175, 0.1)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 16,
  },
  tableActionGroup: {
    display: 'flex',
    gap: 16,
  },
  tableActionButton: {
    fontSize: 14,
    fontWeight: 600,
    color: '#006761',
    backgroundColor: 'transparent',
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: 4,
    cursor: 'pointer',
  },
  tableActionIcon: {
    fontSize: 18,
  },
  responsiveTableWrapper: {
    overflowX: 'auto',
    width: '100%',
  },
  transactionsTable: {
    width: '100%',
    textAlign: 'left',
    borderCollapse: 'collapse',
  },
  tableHeaderRow: {
    backgroundColor: 'rgba(238, 241, 243, 0.5)',
  },
  tableTh: {
    paddingLeft: 32,
    paddingRight: 32,
    paddingTop: 16,
    paddingBottom: 16,
    fontSize: 10,
    fontWeight: 'bold',
    color: '#595c5e',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
  },
  tableBody: {
    display: 'table-row-group',
  },
  tableRow: {
    borderBottom: '1px solid rgba(171, 173, 175, 0.1)',
    transition: 'background-color 0.2s',
  },
  tableTdDate: {
    paddingLeft: 32,
    paddingRight: 32,
    paddingTop: 20,
    paddingBottom: 20,
    fontSize: 14,
    fontWeight: 500,
    color: '#595c5e',
  },
  tableTdDesc: {
    paddingLeft: 32,
    paddingRight: 32,
    paddingTop: 20,
    paddingBottom: 20,
    fontSize: 14,
    fontWeight: 600,
    color: '#2c2f31',
  },
  tableTd: {
    paddingLeft: 32,
    paddingRight: 32,
    paddingTop: 20,
    paddingBottom: 20,
  },
  tableTdAmount: {
    paddingLeft: 32,
    paddingRight: 32,
    paddingTop: 20,
    paddingBottom: 20,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  tableBadge: {
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 4,
    paddingBottom: 4,
    borderRadius: 9999,
    fontSize: 11,
    fontWeight: 'bold',
  },
};