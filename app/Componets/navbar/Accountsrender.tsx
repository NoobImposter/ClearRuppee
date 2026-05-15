import React, { useEffect, useState } from 'react';
import { subAccountsAPI } from '../apis';
import type { SubAccount } from '../apis';

interface AccountItemProps {
  account: {
    id: number;
    name: string;
    isActive: boolean;
  };
  onAccountClick?: (accountId: number) => void;
}

const AccountItem = React.memo(({ account, onAccountClick }: AccountItemProps) => {
  const handleClick = () => {
    if (onAccountClick) {
      onAccountClick(account.id);
    }
  };

  return (
    <div
      style={{
        padding: "12px 16px",
        borderRadius: "12px",
        marginBottom: "6px",
        fontSize: "13px",
        fontWeight: account.isActive ? "600" : "500",
        backgroundColor: account.isActive ? "rgba(255,255,255,0.08)" : "transparent",
        color: account.isActive ? "#ffffff" : "#94a3b8",
        cursor: "pointer",
        transition: "all 0.2s",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "10px"
      }}
      onClick={handleClick}
      onMouseOver={(e) => {
        if (!account.isActive) {
          e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.05)";
        }
      }}
      onMouseOut={(e) => {
        if (!account.isActive) {
          e.currentTarget.style.backgroundColor = "transparent";
        }
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <div
          style={{
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            backgroundColor: account.isActive ? "#22d3ee" : "#475569"
          }}
        />
        <span>{account.name}</span>
      </div>
    </div>
  );
});

interface AccountsNavProps {
  userId: number;
  activeAccountId?: number;
  onAccountChange?: (accountId: number) => void;
}

const AccountsNav: React.FC<AccountsNavProps> = ({ 
  userId, 
  activeAccountId,
  onAccountChange 
}) => {
  const [accounts, setAccounts] = useState<SubAccount[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAccounts();
  }, [userId]);

  const fetchAccounts = async () => {
    try {
      setIsLoading(true);
      const subAccounts = await subAccountsAPI.getByUserId(userId);
      setAccounts(subAccounts);
      setIsLoading(false);
    } catch (err) {
      console.error('Error fetching accounts:', err);
      setError('Failed to load accounts');
      setIsLoading(false);
    }
  };

  const handleAccountClick = (accountId: number) => {
    if (onAccountChange) {
      onAccountChange(accountId);
    }
  };

  if (isLoading) {
    return (
      <div style={styles.navSection}>
        <div style={styles.navLabel}>ACCOUNTS</div>
        <div style={{ color: '#94a3b8', fontSize: '13px', padding: '12px 16px' }}>
          Loading accounts...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.navSection}>
        <div style={styles.navLabel}>ACCOUNTS</div>
        <div style={{ color: '#ef4444', fontSize: '13px', padding: '12px 16px' }}>
          {error}
        </div>
      </div>
    );
  }

  return (
    <div style={styles.navSection}>
      <div style={styles.navLabel}>ACCOUNTS</div>
      {accounts.map((account) => (
        <AccountItem
          key={account.sub_account_id}
          account={{
            id: account.sub_account_id,
            name: account.account_name,
            isActive: activeAccountId === account.sub_account_id,
          }}
          onAccountClick={handleAccountClick}
        />
      ))}
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  navSection: {
    marginBottom: '32px',
  },
  navLabel: {
    fontSize: '11px',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: '1.5px',
    color: '#64748b',
    marginBottom: '12px',
    paddingLeft: '16px',
  },
};

export { AccountItem, AccountsNav };
export default AccountsNav;