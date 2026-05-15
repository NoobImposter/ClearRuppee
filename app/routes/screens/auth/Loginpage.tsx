// routes/screens/auth/LoginPage.tsx
import React, { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router';

import { userAPI } from '~/Componets/apis';
const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const user = await userAPI.getByEmail(email);

      if (user.password_hash === password) {
        localStorage.setItem('userId', user.user_id.toString());
        localStorage.setItem('userEmail', user.email);
        localStorage.setItem('userName', user.name);
        navigate('/dashboard');
      } else {
        setError('Invalid email or password. Please try again.');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Invalid email or password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{
      backgroundColor: 'var(--surface)',
      color: 'var(--on-surface)',
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <main style={{
        flexGrow: 1,
        display: 'flex',
        height: '100vh',
        overflow: 'hidden'
      }} className="responsive-main">
        
        {/* Left Section - Login Form */}
        <section style={{
          backgroundColor: 'var(--surface-container-lowest)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '48px 24px',
          zIndex: 10,
          position: 'relative'
        }} className="login-side-panel">
          
          <div style={{
            maxWidth: '448px',
            width: '100%',
            marginLeft: 'auto',
            marginRight: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '40px'
          }}>
            {/* Header */}
            <header style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '32px' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  background: 'linear-gradient(135deg, var(--primary), var(--primary-fixed-dim))',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <span className="material-symbols-outlined" style={{ color: '#ffffff', fontVariationSettings: "'FILL' 1" }}>
                    architecture
                  </span>
                </div>
                <span style={{ fontSize: '24px', fontWeight: 'bold', letterSpacing: '-0.05em', color: 'var(--on-surface)' }}>
                  StatementAI
                </span>
              </div>
              <h1 style={{ fontSize: '32px', fontWeight: 'bold', letterSpacing: '-0.025em', color: 'var(--on-surface)', lineHeight: 1.2 }}>
                Welcome back
              </h1>
              <p style={{ color: 'var(--on-surface-variant)', fontSize: '14px' }}>
                Enter your credentials to access your secure financial workspace.
              </p>
            </header>

            {/* Error Message */}
            {error && (
              <div style={{
                backgroundColor: 'var(--error-container)',
                color: 'var(--error)',
                padding: '16px',
                borderRadius: '12px',
                fontSize: '14px',
                fontWeight: 500
              }}>
                {error}
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label
                  style={{
                    fontSize: '11px',
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    color: 'var(--on-surface-variant)',
                    marginLeft: '4px'
                  }}
                  htmlFor="email"
                >
                  Email Address
                </label>
                <input
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    backgroundColor: 'var(--surface-container-low)',
                    border: '1px solid transparent',
                    borderRadius: '12px',
                    color: 'var(--on-surface)',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                  id="email"
                  placeholder="name@company.com"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 4px' }}>
                  <label
                    style={{
                      fontSize: '11px',
                      fontWeight: 'bold',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      color: 'var(--on-surface-variant)'
                    }}
                    htmlFor="password"
                  >
                    Password
                  </label>
                </div>
                <div style={{ position: 'relative' }}>
                  <input
                    style={{
                      width: '100%',
                      padding: '14px 16px',
                      backgroundColor: 'var(--surface-container-low)',
                      border: '1px solid transparent',
                      borderRadius: '12px',
                      color: 'var(--on-surface)',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                    id="password"
                    placeholder="••••••••"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  {/* <button
                    style={{
                      position: 'absolute',
                      right: '16px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none',
                      border: 'none',
                      color: 'var(--on-surface-variant)',
                      cursor: 'pointer'
                    }}
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>
                      {showPassword ? 'visibility' : 'visibility_off'}
                    </span>
                  </button> */}
                </div>
              </div>

              <button
                style={{
                  width: '100%',
                  padding: '16px',
                  background: 'linear-gradient(90deg, var(--primary), var(--primary-fixed-dim))',
                  color: '#000',
                  backgroundColor:"'rgba(103, 232, 249, 0.1)'",
                  fontWeight: 'bold',
                  borderRadius: '12px',
                  border: 'none',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                  cursor: isLoading ? 'not-allowed' : 'pointer',
                  opacity: isLoading ? 0.5 : 1,
                  transition: 'all 0.3s ease'
                }}
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? 'Signing In...' : 'Sign In'}
              </button>
            </form>

            <p style={{ textAlign: 'center', color: 'var(--on-surface-variant)', fontSize: '14px' }}>
              Don't have an account?{' '}
              <a
                style={{ color: 'var(--primary)', fontWeight: 600, textDecoration: 'none', cursor: 'pointer' }}
                onClick={() => navigate('/signup')}
              >
                Sign Up
              </a>
            </p>

            {/* Footer */}
            <footer style={{ marginTop: 'auto', paddingTop: '48px' }}>
           
            </footer>
          </div>
        </section>

        {/* Right Section - Hero Image */}
        <section style={{
          position: 'relative',
          overflow: 'hidden',
          backgroundColor: 'var(--on-background)'
        }} className="hero-side-panel">
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, rgba(var(--primary-dim-rgb, 0,0,0), 0.4), var(--on-background))',
            zIndex: 10
          }}></div>
          <div style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            padding: '80px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 20,
            boxSizing: 'border-box'
          }}>
            <div className="glass-panel" style={{
              width: '100%',
              maxWidth: '896px',
              padding: '32px',
              borderRadius: '32px',
              boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
              border: '1px solid rgba(255,255,255,0.1)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '40px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <h3 style={{ color: 'var(--on-background)', fontWeight: 'bold', fontSize: '20px', margin: 0 }}>Portfolio Performance</h3>
                  <p style={{ color: 'var(--on-surface-variant)', fontSize: '14px', fontWeight: 500, margin: 0 }}>
                    Real-time analytical forecast for Q4 2024
                  </p>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: 'var(--primary)' }}></div>
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: 'var(--tertiary)' }}></div>
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: 'var(--surface-dim)' }}></div>
                </div>
              </div>
              <div style={{
                aspectRatio: '16/9',
                width: '100%',
                borderRadius: '16px',
                overflow: 'hidden',
                position: 'relative',
                backgroundColor: 'var(--surface-container-low)'
              }}>
                <img
                  alt="Financial Dashboard Preview"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    filter: 'grayscale(100%)',
                    opacity: 0.8
                  }}
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBt6pKqQbaAxax90howM5Vi_2LPmnLnJuT68bY2z5R5xwrlHZ6RvlLMjEsZ2lnXHnqoTob85XSBbY6NpMzXII26_etd2S5vkcNbt2d40qofHhNaK_HsDR_KWM7gELLUmWbT-_iRW5jW9EuUjRoBGHxdUjy8BaMpkd3wIBZaNKz_sxythpEeSMd5Yiud1LU5ffMFAzqwesY1ve0rfZOklOxIwLJ4ka7hKke9YfU4diGyN3wqN2oV1zX6lheScoIz0fOTM9dA0R6vSm8"
                />
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'end',
                  padding: '40px'
                }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <span style={{ fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--primary-fixed-dim)' }}>
                        Market Velocity
                      </span>
                      <p style={{ fontSize: '30px', fontWeight: 800, color: '#ffffff', margin: 0 }}>+12.4%</p>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <span style={{ fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.6)' }}>Risk Index</span>
                      <p style={{ fontSize: '30px', fontWeight: 800, color: '#ffffff', margin: 0 }}>Low</p>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <span style={{ fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.6)' }}>
                        Security Level
                      </span>
                      <p style={{ fontSize: '30px', fontWeight: 800, color: '#ffffff', margin: 0 }}>Tier 1</p>
                    </div>
                  </div>
                </div>
              </div>
              <div style={{ marginTop: '32px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ padding: '12px', backgroundColor: 'rgba(var(--primary-container-rgb), 0.2)', borderRadius: '12px' }}>
                
                </div>
                <div>
                  <h4 style={{ fontWeight: 'bold', color: 'var(--on-background)', margin: 0 }}>Bank-Grade Encryption</h4>
                  <p style={{ fontSize: '14px', color: 'var(--on-surface-variant)', margin: 0 }}>
                    Your data is protected by industry-leading AES-256 protocols.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div style={{ position: 'absolute', bottom: '48px', right: '48px', zIndex: 30, display: 'flex', alignItems: 'center', gap: '24px' }}>
            <div style={{ textAlign: 'right' }}>
              <p style={{ color: 'rgba(255,255,255,0.8)', fontWeight: 500, fontSize: '14px', margin: 0 }}>Join over 10,000+ analysts</p>
              <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '10px', fontWeight: 'bold', letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>
                Trusted by the Fortune 500
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Handled global responsive mechanics that inline-styles cannot native look up (Media queries) */}
      <style>{`
        .glass-panel {
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(24px);
        }
        
        /* Replaces md:flex-row & responsive sections */
        @media (max-width: 767px) {
          .responsive-main { flex-direction: column !important; }
          .login-side-panel { width: 100% !important; }
          .hero-side-panel { display: none !important; }
        }
        @media (min-width: 768px) {
          .responsive-main { flex-direction: row !important; }
          .login-side-panel { width: 45% !important; padding-left: 64px !important; padding-right: 64px !important; }
          .hero-side-panel { display: flex !important; flex-grow: 1 !important; }
        }
        @media (min-width: 1024px) {
          .login-side-panel { width: 40% !important; padding-left: 96px !important; padding-right: 96px !important; }
        }
      `}</style>
    </div>
  );
};

export default LoginPage;