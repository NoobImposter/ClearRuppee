

// routes/layouts/dashboardLayout.tsx
import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../components/navbar';

export default function DashboardLayout() {
  return (
    <div style={styles.layoutWrapper}>
      <Navbar />
      
        <Outlet />
 
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  layoutWrapper: {
    display: 'flex',
    flexDirection: 'row',
    height: '100vh',
    width: '100vw',
    overflow: 'hidden',         // nothing escapes the viewport
    backgroundColor: '#f8fafc',
  },
  contentArea: {
    flex: 1,
    height: '100vh',
    overflowY: 'auto',          // only this panel scrolls, not the page
    overflowX: 'hidden',
  },
};