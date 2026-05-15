import React from 'react'
import { SpendingByCategoryCard } from '~/Componets/Insights/topcategories';

// const InsightsHome = () => {
//   return (
//     <div>InsightsHome</div>
//   )
// }

// export default InsightsHome
import { useFinanceStore } from '~/Componets/states/states';
import { TopMerchantsCard } from '~/Componets/Insights/Topmercahnts';
// import React from 'react';
import PageHeader from '~/Componets/headercomponets';
const InsightsHome: React.FC = () => {
  const Totalexp=useFinanceStore((state)=>state.transactionsTotalExpense)
  const category =useFinanceStore((state)=>state.topCategory)
  const savingspotential=useFinanceStore((state)=>state.savingsPotential)
  return (
    <div style={styles.body}>
      {/* Main Canvas */}
      <main style={styles.main}>
        {/* TopNavBar */}
    

        {/* Scrollable Content Area */}
        <div style={styles.content}>
          <div style={styles.contentContainer}>
            {/* Main Content Header */}
            <div style={styles.pageHeader}>
              <PageHeader />
              
             
            </div>

            {/* KPI Row */}
            <div style={styles.kpiGrid}>
              {/* KPI 1 */}
              <div style={styles.card}>
                <p style={styles.kpiLabel}>Total Spent</p>
                <div style={styles.kpiValueRow}>
                  <h3 style={styles.kpiValue}>$ {Totalexp}</h3>
                  <span style={styles.trendNegative}>
                    <span className="material-symbols-outlined" style={styles.trendIcon}>trending_up</span>
                    12%
                  </span>
                </div>
                <div style={styles.progressBarBg}>
                  <div style={{ ...styles.progressBarFill, backgroundColor: '#006761', width: '75%' }}></div>
                </div>
              </div>

              {/* KPI 2 */}
              <div style={styles.card}>
                <p style={styles.kpiLabel}>Avg Daily Burn</p>
                <div style={styles.kpiValueRow}>
                  <h3 style={styles.kpiValue}>${Math.round(Totalexp/31)}</h3>
                  <span style={styles.trendPositive}>
                    <span className="material-symbols-outlined" style={styles.trendIcon}>trending_down</span>
                    4.2%
                  </span>
                </div>
                <div style={styles.progressBarBg}>
                  <div style={{ ...styles.progressBarFill, backgroundColor: '#22d3ee', width: '45%' }}></div>
                </div>
              </div>

              {/* KPI 3 */}
              <div style={styles.card}>
                <p style={styles.kpiLabel}>Top Category</p>
                <div style={styles.kpiValueRow}>
                  <h3 style={styles.kpiValue}>{category}</h3>
                  <span style={styles.badge}>32% OF TOTAL</span>
                </div>
                <div style={styles.progressBarBg}>
                  <div style={{ ...styles.progressBarFill, backgroundColor: '#005a54', width: '32%' }}></div>
                </div>
              </div>

              {/* KPI 4 */}
              <div style={styles.card}>
                <p style={styles.kpiLabel}>Savings Potential</p>
                <div style={styles.kpiValueRow}>
                  <h3 style={{ ...styles.kpiValue, color: '#006761' }}>${savingspotential}</h3>
                  <span className="material-symbols-outlined" style={{ color: '#006761', fontVariationSettings: "'FILL' 1" }}>
                    auto_awesome
                  </span>
                </div>
                <div style={styles.progressBarBg}>
                  <div style={{ ...styles.progressBarFill, background: 'linear-gradient(135deg, #006761 0%, #36e6d9 100%)', width: '100%' }}></div>
                </div>
              </div>
            </div>

            {/* Main Charts Row */}
            <div style={styles.chartsGrid}>
              {/* Monthly Spending Trend */}
            

              {/* Spending by Category */}
              <SpendingByCategoryCard />
              
             
            </div>

            {/* Secondary Charts Row */}
            <div style={styles.secondaryGrid}>
              {/* Top 4 Merchants */}
              <TopMerchantsCard />
           
              {/* Income vs Expenses */}
              <div style={styles.card}>
                <h4 style={styles.cardTitleMargin}>Income vs Expenses</h4>
                <div>
                  <h2>Work in Progress</h2>
                </div>
                <div style={styles.chartLegend}>
                  <div style={styles.legendItem}>
                    <div style={styles.legendColorGradient}></div>
                    <span style={styles.legendText}>Income</span>
                  </div>
                  <div style={styles.legendItem}>
                    <div style={styles.legendColorGray}></div>
                    <span style={styles.legendText}>Expenses</span>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Key Insights Panel */}
          
          </div>
        </div>
      </main>
    </div>
  );
};

// Inline CSS Stylesheet representing full dimensional-aware visual specifications
const styles: { [key: string]: React.CSSProperties } = {
  body: {
    backgroundColor: '#f5f7f9',
    color: '#2c2f31',
    display: 'flex',
    height: '100vh',
    width: '100vw',
    overflow: 'hidden',
    fontFamily: 'Inter, sans-serif',
    margin: 0,
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
    flexShrink: 0,
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    backdropFilter: 'blur(12px)',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 32,
    paddingRight: 32,
    boxSizing: 'border-box',
    borderBottom: '1px solid #eef1f3',
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: 16,
    flex: 1,
    maxWidth: 512,
  },
  searchContainer: {
    position: 'relative',
    width: '100%',
  },
  searchIcon: {
    position: 'absolute',
    left: 12,
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#94a3b8',
    fontSize: 20,
  },
  searchInput: {
    width: '100%',
    backgroundColor: '#f1f5f9',
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
    gap: 24,
  },
  actionIcons: {
    display: 'flex',
    alignItems: 'center',
    gap: 16,
  },
  iconButton: {
    padding: 8,
    color: '#64748b',
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: 8,
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconButtonCyan: {
    color: '#0891b2',
  },
  divider: {
    height: 32,
    width: 1,
    backgroundColor: '#e2e8f0',
  },
  userSection: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
  },
  userInfo: {
    textAlign: 'right',
  },
  userName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0f172a',
    margin: 0,
    lineHeight: 1,
  },
  userPlan: {
    fontSize: 10,
    color: '#64748b',
    textTransform: 'uppercase',
    fontWeight: '700',
    margin: 0,
    marginTop: 4,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: '50%',
    objectFit: 'cover',
    border: '2px solid white',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  },
  content: {
    flex: 1,
    height: 'calc(100% - 68px)',
    overflowY: 'auto',
    width: '100%',
    boxSizing: 'border-box',
  },
  contentContainer: {
    padding: 32,
    maxWidth: 1600,
    width: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: 32,
    boxSizing: 'border-box',
  },
  pageHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    flexWrap: 'wrap',
    gap: 16,
  },
  breadcrumb: {
    fontSize: 10,
    fontWeight: '700',
    color: '#94a3b8',
    textTransform: 'uppercase',
    letterSpacing: '0.2em',
    marginBottom: 8,
  },
  pageTitle: {
    fontSize: 30,
    fontWeight: '800',
    letterSpacing: '-0.025em',
    color: '#0f172a',
    margin: 0,
  },
  bulletSeparator: {
    color: '#cbd5e1',
    marginLeft: 8,
    marginRight: 8,
  },
  highlightText: {
    color: '#006761',
  },
  actionButtons: {
    display: 'flex',
    gap: 12,
  },
  outlineButton: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: 'white',
    color: '#2c2f31',
    fontWeight: '700',
    fontSize: 14,
    borderRadius: 12,
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    border: '1px solid #e2e8f0',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  gradientButton: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    background: 'linear-gradient(135deg, #006761 0%, #36e6d9 100%)',
    color: 'white',
    fontWeight: '700',
    fontSize: 14,
    borderRadius: 12,
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    border: 'none',
    cursor: 'pointer',
    boxShadow: '0 10px 25px rgba(0, 103, 97, 0.2)',
  },
  buttonIcon: {
    fontSize: 18,
  },
  kpiGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: 24,
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 24,
    borderRadius: 16,
    border: '1px solid rgba(171, 173, 175, 0.15)',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
  },
  kpiLabel: {
    fontSize: 10,
    fontWeight: '900',
    color: '#94a3b8',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    marginBottom: 16,
    margin: 0,
  },
  kpiValueRow: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  kpiValue: {
    fontSize: 30,
    fontWeight: '900',
    color: '#0f172a',
    margin: 0,
    letterSpacing: '-0.025em',
  },
  trendNegative: {
    fontSize: 12,
    fontWeight: '700',
    color: '#b31b25',
    display: 'flex',
    alignItems: 'center',
    gap: 2,
  },
  trendPositive: {
    fontSize: 12,
    fontWeight: '700',
    color: '#006761',
    display: 'flex',
    alignItems: 'center',
    gap: 2,
  },
  trendIcon: {
    fontSize: 14,
  },
  progressBarBg: {
    marginTop: 16,
    width: '100%',
    height: 4,
    backgroundColor: '#f1f5f9',
    borderRadius: 9999,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 9999,
  },
  badge: {
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 4,
    paddingBottom: 4,
    backgroundColor: 'rgba(76, 244, 231, 0.3)',
    color: '#005853',
    fontSize: 10,
    fontWeight: '700',
    borderRadius: 9999,
  },
  chartsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: 24,
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 32,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0f172a',
    margin: 0,
  },
  cardTitleMargin: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0f172a',
    margin: '0 0 24px 0',
  },
  toggleGroup: {
    display: 'flex',
    gap: 8,
  },
  toggleButtonInactive: {
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 4,
    paddingBottom: 4,
    fontSize: 10,
    fontWeight: '700',
    backgroundColor: '#f1f5f9',
    border: 'none',
    borderRadius: 8,
    color: '#475569',
    cursor: 'pointer',
  },
  toggleButtonActive: {
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 4,
    paddingBottom: 4,
    fontSize: 10,
    fontWeight: '700',
    backgroundColor: '#006761',
    border: 'none',
    borderRadius: 8,
    color: '#ffffff',
    cursor: 'pointer',
  },
  chartContainer: {
    position: 'relative',
    height: 300,
    width: '100%',
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    gap: 8,
    paddingLeft: 8,
    paddingRight: 8,
    paddingBottom: 24,
    boxSizing: 'border-box',
  },
  svgBackground: {
    position: 'absolute',
    inset: 0,
    display: 'flex',
    alignItems: 'flex-end',
    opacity: 0.2,
    pointerEvents: 'none',
    paddingBottom: 24,
  },
  chartBarWrapper: {
    flex: 1,
    height: '100%',
    backgroundColor: '#f8fafc',
    borderRadius: '8px 8px 0 0',
    position: 'relative',
    display: 'flex',
    alignItems: 'flex-end',
  },
  chartBarFill: {
    width: '100%',
    backgroundColor: 'rgba(0, 103, 97, 0.2)',
    borderRadius: '8px 8px 0 0',
    transition: 'all 0.3s',
  },
  chartBarLabel: {
    position: 'absolute',
    bottom: -24,
    left: '50%',
    transform: 'translateX(-50%)',
    fontSize: 10,
    color: '#94a3b8',
    fontWeight: '700',
    margin: 0,
  },
  donutContainer: {
    position: 'relative',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  donutRing: {
    width: 192,
    height: 192,
    borderRadius: '50%',
    border: '20px solid #f8fafc',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxSizing: 'border-box',
  },
  donutSegment: {
    position: 'absolute',
    inset: -20,
    borderRadius: '50%',
    pointerEvents: 'none',
    boxSizing: 'border-box',
  },
  donutContent: {
    textAlign: 'center',
  },
  donutLabel: {
    fontSize: 10,
    fontWeight: '900',
    color: '#94a3b8',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    margin: 0,
  },
  donutValue: {
    fontSize: 20,
    fontWeight: '900',
    color: '#0f172a',
    margin: 0,
  },
  categoryList: {
    marginTop: 32,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },
  categoryItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  categoryInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
  },
  categoryIndicator: {
    width: 8,
    height: 8,
    borderRadius: '50%',
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#475569',
  },
  categoryPercentage: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0f172a',
  },
  secondaryGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: 24,
  },
  merchantList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
  },
  merchantItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
  },
  merchantHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: 12,
  },
  merchantName: {
    fontWeight: '700',
    color: '#334155',
  },
  merchantValue: {
    fontWeight: '700',
    color: '#0f172a',
  },
  merchantTrack: {
    width: '100%',
    height: 6,
    backgroundColor: '#f8fafc',
    borderRadius: 9999,
  },
  merchantFill: {
    height: '100%',
    backgroundColor: '#006761',
    borderRadius: 9999,
  },
  doubleChart: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 180,
    gap: 32,
    paddingLeft: 16,
    paddingRight: 16,
  },
  doubleChartGroup: {
    flex: 1,
    display: 'flex',
    gap: 4,
    alignItems: 'flex-end',
    height: '100%',
  },
  barGradient: {
    flex: 1,
    background: 'linear-gradient(to bottom, #006761, #36e6d9)',
    borderRadius: '4px 4px 0 0',
  },
  barGray: {
    flex: 1,
    backgroundColor: '#e2e8f0',
    borderRadius: '4px 4px 0 0',
  },
  chartLegend: {
    display: 'flex',
    justifyContent: 'center',
    gap: 24,
    marginTop: 24,
  },
  legendItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
  },
  legendColorGradient: {
    width: 12,
    height: 12,
    background: 'linear-gradient(135deg, #006761 0%, #36e6d9 100%)',
    borderRadius: 4,
  },
  legendColorGray: {
    width: 12,
    height: 12,
    backgroundColor: '#e2e8f0',
    borderRadius: 4,
  },
  legendText: {
    fontSize: 10,
    fontWeight: '900',
    color: '#94a3b8',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
  },
  aiInsightsPanel: {
    backgroundColor: '#0f172a',
    borderRadius: 16,
    padding: 32,
    position: 'relative',
    overflow: 'hidden',
  },
  aiGlow: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 256,
    height: 256,
    background: 'linear-gradient(135deg, #006761 0%, #36e6d9 100%)',
    opacity: 0.1,
    borderRadius: '50%',
    transform: 'translate(50%, -50%)',
    filter: 'blur(40px)',
    pointerEvents: 'none',
  },
  aiHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    marginBottom: 24,
  },
  aiHeaderIcon: {
    color: '#4cf4e7',
    fontVariationSettings: "'FILL' 1",
  },
  aiPanelTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff',
    margin: 0,
  },
  aiGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: 24,
  },
  aiCard: {
    display: 'flex',
    gap: 16,
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    transition: 'background-color 0.2s',
  },
  aiIconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 8,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  aiTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#f8fafc',
    margin: 0,
  },
  aiDescription: {
    fontSize: 12,
    color: '#94a3b8',
    marginTop: 4,
    lineHeight: 1.6,
    fontWeight: 300,
    margin: '4px 0 0 0',
  },
};

export default InsightsHome;