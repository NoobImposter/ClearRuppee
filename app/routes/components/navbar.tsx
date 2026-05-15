import React from 'react';
import { NavLink } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faChartSimple,
  faReceipt,
  faCog,
  faQuestionCircle,
  faWallet,
  faChevronRight,
  faSpinner,
  faPerson,
} from '@fortawesome/free-solid-svg-icons';
 // adjust path as needed
import { useFinanceStore } from '~/Componets/states/states';
// ─── Nav link style factory ───────────────────────────────────────────────────
const navLinkStyle = (isActive: boolean): React.CSSProperties => ({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  padding: '12px 16px',
  marginBottom: '4px',
  borderRadius: '12px',
  textDecoration: 'none',
  color: isActive ? '#67e8f9' : '#94a3b8',
  backgroundColor: isActive ? 'rgba(103, 232, 249, 0.1)' : 'transparent',
  borderRight: isActive ? '3px solid #67e8f9' : '3px solid transparent',
  fontSize: '14px',
  fontWeight: '500',
  transition: 'all 0.2s',
});

// ─── Navbar ───────────────────────────────────────────────────────────────────
const Navbar = () => {
  // Pull what we need from the global store — no local state needed
  const subAccounts        = useFinanceStore(s => s.subAccounts);
  const activeSubAccountId = useFinanceStore(s => s.activeSubAccountId);
  const isSubAccountLoading = useFinanceStore(s => s.isSubAccountLoading);
  const switchSubAccount   = useFinanceStore(s => s.switchSubAccount);
  const accountName        = useFinanceStore(s => s.accountName);
  const username           = useFinanceStore(s => s.username);

  const handleAccountSwitch = (subAccountId: number) => {
    if (subAccountId === activeSubAccountId) return; // already selected
    switchSubAccount(subAccountId);
  };

  return (
    <aside style={{
      width: '280px',
      height: '95vh',
      backgroundColor: '#0f172a',
      display: 'flex',
      flexDirection: 'column',
      padding: '24px 0',
      position: 'sticky',
      left: '0',
      top: '0',
      boxShadow: '2px 0 8px rgba(0,0,0,0.3)',
      color: 'white',
    }}>

      {/* ── Logo ── */}
      <div style={{ padding: '0 24px', marginBottom: '40px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '36px',
            height: '36px',
            background: 'linear-gradient(135deg, #22d3ee, #14b8a6)',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '20px',
          }}>
            💰
          </div>
          <div>
            <h1 style={{ fontSize: '22px', fontWeight: '900', letterSpacing: '-0.04em', margin: '0' }}>
              StatementAI
            </h1>
            <p style={{
              fontSize: '10px',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              color: '#64748b',
              fontWeight: '700',
              marginTop: '2px',
            }}>
              The Financial Architect
            </p>
          </div>
        </div>
      </div>

      {/* ── Main Nav ── */}
      <nav style={{ flex: '1', padding: '0 16px', overflowY: 'auto' }}>

        <NavLink to="/dashboard"            style={({ isActive }) => navLinkStyle(isActive)}>
          <FontAwesomeIcon icon={faHome} size="lg" />
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/transactions" style={({ isActive }) => navLinkStyle(isActive)}>
          <FontAwesomeIcon icon={faReceipt} size="lg" />
          <span>Transactions</span>
        </NavLink>

        <NavLink to="/insights"    style={({ isActive }) => navLinkStyle(isActive)}>
          <FontAwesomeIcon icon={faChartSimple} size="lg" />
          <span>Insights</span>
        </NavLink>

        {/* ── Sub-Account Switcher ─────────────────────────────────────── */}
        {subAccounts.length > 0 && (
          <div style={{ marginTop: '24px' }}>

            {/* Section header */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0 16px',
              marginBottom: '8px',
            }}>
              <span style={{
                fontSize: '10px',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                color: '#475569',
                fontWeight: '700',
              }}>
                Accounts
              </span>

              {/* Spinner shown while a switch is loading */}
              {isSubAccountLoading && (
                <FontAwesomeIcon
                  icon={faSpinner}
                  spin
                  style={{ color: '#67e8f9', fontSize: '11px' }}
                />
              )}
            </div>

            {/* One button per sub-account */}
            {subAccounts.map((account) => {
              const isActive = account.sub_account_id === activeSubAccountId;

              return (
                <button
                  key={account.sub_account_id}
                  onClick={() => handleAccountSwitch(account.sub_account_id)}
                  disabled={isSubAccountLoading}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '10px 16px',
                    marginBottom: '4px',
                    borderRadius: '12px',
                    border: 'none',
                    cursor: isSubAccountLoading ? 'not-allowed' : 'pointer',
                    backgroundColor: isActive ? 'rgba(103, 232, 249, 0.12)' : 'transparent',
                    borderRight: isActive ? '3px solid #67e8f9' : '3px solid transparent',
                    color: isActive ? '#67e8f9' : '#94a3b8',
                    fontSize: '13px',
                    fontWeight: isActive ? '600' : '400',
                    transition: 'all 0.2s',
                    textAlign: 'left',
                    opacity: isSubAccountLoading && !isActive ? 0.5 : 1,
                  }}
                >
                  {/* Icon */}
                  <div style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '8px',
                    backgroundColor: isActive ? 'rgba(103, 232, 249, 0.2)' : 'rgba(255,255,255,0.06)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <FontAwesomeIcon icon={faWallet} style={{ fontSize: '12px' }} />
                  </div>

                  {/* Account name + balance */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      fontSize: '13px',
                    }}>
                      {account.account_name}
                    </div>
                    <div style={{ fontSize: '11px', color: '#475569', marginTop: '1px' }}>
                      ₨ {account.total_balance.toLocaleString()}
                    </div>
                  </div>

                  {/* Active chevron */}
                  {isActive && (
                    <FontAwesomeIcon
                      icon={faChevronRight}
                      style={{ fontSize: '10px', color: '#67e8f9', flexShrink: 0 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        )}
      </nav>

      {/* ── Bottom Section ── */}
     <NavLink to="/Users"            style={({ isActive }) => navLinkStyle(isActive)}>
          <FontAwesomeIcon icon={faPerson} size="lg" />
          <span>User</span>
        </NavLink>
           <NavLink to="/"            style={({ isActive }) => navLinkStyle(isActive)}>
          <FontAwesomeIcon icon={faPerson} size="lg" />
          <span>Log Out</span>
        </NavLink>
    </aside>
  );
};

export default Navbar;