// routes/screens/users/userindex.tsx
import React from 'react';
import { useFinanceStore } from '~/Componets/states/states';

export async function clientLoader() {
  return {};
}
clientLoader.hydrate = true;

function userindex() {
  const {
    userId,
    accountName,
    username,
    currentMonth,
    isLoading,
  } = useFinanceStore();

  if (isLoading) {
    return (
      <div style={styles.loadingPage}>
        <div style={styles.loadingCard}>
          <div style={styles.loader}></div>
          <p style={styles.loadingText}>Syncing Financial Workspace...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page}>

      {/* LEFT SIDEBAR */}
  

      {/* MAIN CONTENT */}
      <main style={styles.mainContent}>

        {/* TOP BAR */}
        <div style={styles.topbar}>
          <div>
            <h1 style={styles.pageTitle}>User Profile</h1>
            <p style={styles.pageSubtitle}>
              Manage and monitor your financial identity
            </p>
          </div>

          <div style={styles.profileMini}>
            <div style={styles.profileMiniAvatar}>
              {accountName ? accountName.charAt(0).toUpperCase() : 'U'}
            </div>

            <div>
              <p style={styles.profileMiniName}>
                {accountName || 'ClearRupee User'}
              </p>

              <p style={styles.profileMiniHandle}>
                {username || '@username'}
              </p>
            </div>
          </div>
        </div>

        {/* DASHBOARD GRID */}
        <div style={styles.dashboardGrid}>

          {/* PROFILE CARD */}
          <div style={styles.profileCard}>
            <div style={styles.profileGlow}></div>

            <div style={styles.profileHeader}>
              <div style={styles.avatarLarge}>
                {accountName ? accountName.charAt(0).toUpperCase() : 'U'}
              </div>

              <div>
                <h2 style={styles.profileName}>
                  {accountName || 'ClearRupee Account'}
                </h2>

                <p style={styles.profileUsername}>
                  {username || '@username'}
                </p>

                <div style={styles.verifiedBadge}>
                  <span style={styles.greenDot}></span>
                  VERIFIED ACCOUNT
                </div>
              </div>
            </div>

            <div style={styles.statsGrid}>

              <div style={styles.statCard}>
                <p style={styles.statLabel}>PROFILE STATUS</p>
                <h3 style={styles.statValue}>ACTIVE</h3>
              </div>

              <div style={styles.statCard}>
                <p style={styles.statLabel}>STATEMENT CYCLE</p>
                <h3 style={styles.statValue}>
                  {currentMonth || 'N/A'}
                </h3>
              </div>

            </div>
          </div>

          {/* ACCOUNT DETAILS */}
          <div style={styles.detailsCard}>

            <div style={styles.sectionHeader}>
              <h3 style={styles.sectionTitle}>
                Account Information
              </h3>
            </div>

            <div style={styles.infoList}>

              <div style={styles.infoRow}>
                <span style={styles.infoLabel}>
                  Registered Display Name
                </span>

                <span style={styles.infoValue}>
                  {accountName || 'Unassigned'}
                </span>
              </div>

              <div style={styles.infoRow}>
                <span style={styles.infoLabel}>
                  Email Alias Handle
                </span>

                <span style={styles.infoCode}>
                  {username || 'Unassigned'}
                </span>
              </div>

              <div style={styles.infoRow}>
                <span style={styles.infoLabel}>
                  User Reference ID
                </span>

                <span style={styles.infoCode}>
                  {userId || 'N/A'}
                </span>
              </div>

              <div style={styles.infoRow}>
                <span style={styles.infoLabel}>
                  Security Tier
                </span>

                <span style={styles.infoValue}>
                  Enterprise
                </span>
              </div>

            </div>
          </div>

        </div>
      </main>
    </div>
  );
}

export default userindex;

const glass = 'rgba(15, 23, 42, 0.68)';

const styles: { [key: string]: React.CSSProperties } = {

  page: {
display:"flex",
flex:1,
    background: `
      radial-gradient(circle at top left, rgba(59,130,246,0.15), transparent 20%),
      radial-gradient(circle at bottom right, rgba(6,182,212,0.12), transparent 20%),
      linear-gradient(135deg, #020617 0%, #0f172a 45%, #111827 100%)
    `,
    color: '#ffffff',
    fontFamily: 'Inter, sans-serif',
  },

  /* SIDEBAR */

  sidebar: {
    borderRight: '1px solid rgba(255,255,255,0.06)',
    background: 'rgba(2,6,23,0.55)',
    backdropFilter: 'blur(18px)',
    padding: '28px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },

  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    marginBottom: '40px',
  },

  logoIcon: {
    width: '52px',
    height: '52px',
    borderRadius: '16px',
    background: 'linear-gradient(135deg, #2563eb, #06b6d4)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 800,
    fontSize: '24px',
    boxShadow: '0 8px 22px rgba(37,99,235,0.45)',
  },

  logoTitle: {
    margin: 0,
    fontSize: '20px',
    fontWeight: 800,
  },

  logoSubtitle: {
    margin: '4px 0 0 0',
    color: '#94a3b8',
    fontSize: '13px',
  },

  sidebarSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },

  sidebarHeading: {
    color: '#64748b',
    fontSize: '12px',
    letterSpacing: '0.1em',
    marginBottom: '10px',
  },

  navItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    padding: '14px 16px',
    borderRadius: '16px',
    color: '#cbd5e1',
    cursor: 'pointer',
    transition: '0.2s',
  },

  navItemActive: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    padding: '14px 16px',
    borderRadius: '16px',
    background: 'rgba(59,130,246,0.14)',
    border: '1px solid rgba(59,130,246,0.22)',
    color: '#ffffff',
    fontWeight: 600,
  },

  sidebarFooter: {},

  securityCard: {
    padding: '18px',
    borderRadius: '20px',
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.06)',
  },

  securityTitle: {
    margin: 0,
    fontSize: '15px',
    fontWeight: 700,
  },

  securityText: {
    margin: '8px 0 0 0',
    color: '#94a3b8',
    fontSize: '13px',
    lineHeight: 1.6,
  },

  /* MAIN */

  mainContent: {
    padding: '34px',
    overflow: 'auto',
  },

  topbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '28px',
  },

  pageTitle: {
    margin: 0,
    fontSize: '34px',
    fontWeight: 800,
    letterSpacing: '-0.04em',
  },

  pageSubtitle: {
    marginTop: '8px',
    color: '#94a3b8',
    fontSize: '15px',
  },

  profileMini: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    background: 'rgba(255,255,255,0.04)',
    padding: '10px 14px',
    borderRadius: '18px',
    border: '1px solid rgba(255,255,255,0.06)',
  },

  profileMiniAvatar: {
    width: '42px',
    height: '42px',
    borderRadius: '14px',
    background: 'linear-gradient(135deg, #2563eb, #06b6d4)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 700,
  },

  profileMiniName: {
    margin: 0,
    fontWeight: 700,
    fontSize: '14px',
  },

  profileMiniHandle: {
    margin: '4px 0 0 0',
    color: '#94a3b8',
    fontSize: '12px',
  },

  /* GRID */

  dashboardGrid: {
    display: 'grid',
    gridTemplateColumns: '1.2fr 1fr',
    gap: '24px',
  },

  /* PROFILE CARD */

  profileCard: {
    position: 'relative',
    overflow: 'hidden',
    borderRadius: '30px',
    padding: '30px',
    background: glass,
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255,255,255,0.06)',
    boxShadow: '0 10px 40px rgba(0,0,0,0.35)',
  },

  profileGlow: {
    position: 'absolute',
    top: '-100px',
    right: '-50px',
    width: '240px',
    height: '240px',
    borderRadius: '50%',
    background: 'rgba(59,130,246,0.16)',
    filter: 'blur(70px)',
  },

  profileHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    position: 'relative',
    zIndex: 2,
  },

  avatarLarge: {
    width: '90px',
    height: '90px',
    borderRadius: '28px',
    background: 'linear-gradient(135deg, #2563eb, #06b6d4)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '34px',
    fontWeight: 800,
    boxShadow: '0 12px 28px rgba(37,99,235,0.45)',
  },

  profileName: {
    margin: 0,
    fontSize: '28px',
    fontWeight: 800,
  },

  profileUsername: {
    margin: '8px 0 0 0',
    color: '#94a3b8',
    fontFamily: 'monospace',
  },

  verifiedBadge: {
    marginTop: '14px',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '7px 14px',
    borderRadius: '999px',
    background: 'rgba(59,130,246,0.12)',
    border: '1px solid rgba(59,130,246,0.20)',
    color: '#93c5fd',
    fontSize: '12px',
    fontWeight: 700,
  },

  greenDot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    background: '#22c55e',
    boxShadow: '0 0 12px #22c55e',
  },

  statsGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px',
    marginTop: '30px',
  },

  statCard: {
    padding: '20px',
    borderRadius: '22px',
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.06)',
  },

  statLabel: {
    margin: 0,
    color: '#94a3b8',
    fontSize: '12px',
    letterSpacing: '0.08em',
  },

  statValue: {
    margin: '12px 0 0 0',
    fontSize: '26px',
    fontWeight: 800,
  },

  /* DETAILS */

  detailsCard: {
    borderRadius: '30px',
    padding: '30px',
    background: glass,
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255,255,255,0.06)',
    boxShadow: '0 10px 40px rgba(0,0,0,0.35)',
  },

  sectionHeader: {
    marginBottom: '26px',
  },

  sectionTitle: {
    margin: 0,
    fontSize: '22px',
    fontWeight: 800,
  },

  infoList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
  },

  infoRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '18px 20px',
    borderRadius: '18px',
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.05)',
  },

  infoLabel: {
    color: '#94a3b8',
    fontSize: '14px',
  },

  infoValue: {
    fontWeight: 700,
    fontSize: '14px',
  },

  infoCode: {
    fontWeight: 700,
    fontSize: '13px',
    fontFamily: 'monospace',
    color: '#38bdf8',
  },

  /* LOADING */

  loadingPage: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#020617',
  },

  loadingCard: {
    width: '260px',
    padding: '30px',
    borderRadius: '24px',
    background: glass,
    border: '1px solid rgba(255,255,255,0.06)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '18px',
  },

  loader: {
    width: '54px',
    height: '54px',
    borderRadius: '50%',
    border: '4px solid rgba(255,255,255,0.08)',
    borderTop: '4px solid #3b82f6',
  },

  loadingText: {
    color: '#cbd5e1',
    margin: 0,
    fontWeight: 600,
  },
};