import React from 'react';
import { useNavigate } from 'react-router-dom'; // Crucial for programmatic routing

import { useFinanceStore } from './states/states';
export const SidebarFooter = () => {
  const navigate = useNavigate();
  const { accountName, username } = useFinanceStore();

  const handleProfileClick = () => {
    console.log('Navigating to user profile indices...');
    navigate('/userindex');
  };

  return (
    <div style={{
      marginTop: 'auto',
      padding: '0 16px',
      borderTop: '1px solid rgba(255,255,255,0.08)',
      paddingTop: '24px',
    }}>

      {/* Interactive User identity pill */}
      {accountName && (
        <div 
          onClick={handleProfileClick}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '10px 12px',
            borderRadius: '10px',
            backgroundColor: 'rgba(255,255,255,0.04)',
            marginBottom: '16px',
            cursor: 'pointer', // Makes it clear to the user that it's clickable
            transition: 'background-color 0.2s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.08)')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.04)')}
        >
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #22d3ee, #14b8a6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: '700',
            fontSize: '13px',
            flexShrink: 0,
            color: '#ffffff',
          }}>
            {accountName.charAt(0).toUpperCase()}
          </div>
          <div style={{ minWidth: 0, flex: 1 }}>
            <div style={{
              fontSize: '13px',
              fontWeight: '600',
              color: '#e2e8f0',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}>
              {accountName}
            </div>
            <div style={{ 
              fontSize: '11px', 
              color: '#64748b', // Slightly brightened color tone for better readability against dark themes
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}>
              {username}
            </div>
          </div>
        </div>
      )}

      {/* Upload Button & NavLinks remain safely commented out below */}
      {/* <button style={{ ... }}>Upload New Statement</button> */}
    </div>
  );
};