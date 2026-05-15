import React, { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router';
import { apiClient } from '~/Componets/apis';
import { useFinanceStore } from '~/Componets/states/states';
const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  const setProfile = useFinanceStore((state) => state.setProfile);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  // Dynamic state to manage focus outlines natively with inline styles
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    setIsLoading(true);

    try {
      const response = await apiClient.post('/users', {
        name,
        email,
        password_hash: password,
      });

      if (response.data) {
        localStorage.setItem('userId', response.data.user_id.toString());
        localStorage.setItem('userEmail', response.data.email);
        localStorage.setItem('userName', response.data.name);

        // Sync to global Zustand engine
        const inferredUsername = `@${response.data.name.toLowerCase().replace(/\s+/g, '_')}`;
        setProfile(response.data.name, inferredUsername);

        navigate('/');
      }
    } catch (err: any) {
      console.error('Signup error:', err);
      if (err.response?.status === 409) {
        setError('An account with this email already exists');
      } else {
        setError('Failed to create account. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Helper function to dynamically calculate input styles when focused
  const getInputStyle = (fieldId: string) => ({
    ...styles.input,
    ...(focusedField === fieldId ? styles.inputFocus : {}),
  });

  return (
    <div style={styles.pageContainer}>
      <main style={styles.mainLayout}>
        
        {/* Left Interactive Entry Form Section */}
        <section style={styles.formSection}>
          <div style={styles.formWrapper}>
            
            <header style={styles.headerBlock}>
              <div style={styles.brandContainer}>
                <div style={styles.logoIcon}>
                  <span className="material-symbols-outlined" style={styles.materialIcon}>
                    account_balance_wallet
                  </span>
                </div>
                <span style={styles.brandName}>ClearRupee</span>
              </div>
              <h1 style={styles.titleText}>Create Account</h1>
              <p style={styles.subtitleText}>
                Sign up to get started with your financial workspace.
              </p>
            </header>

            {error && (
              <div style={styles.errorAlert}>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} style={styles.formGroup}>
              {/* Full Name */}
              <div style={styles.inputContainer}>
                <label style={styles.label} htmlFor="name">Full Name</label>
                <input
                  style={getInputStyle('name')}
                  id="name"
                  placeholder="Zain Ahmed"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                  required
                />
              </div>

              {/* Email Address */}
              <div style={styles.inputContainer}>
                <label style={styles.label} htmlFor="email">Email Address</label>
                <input
                  style={getInputStyle('email')}
                  id="email"
                  placeholder="name@domain.com"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  required
                />
              </div>

              {/* Password */}
              <div style={styles.inputContainer}>
                <label style={styles.label} htmlFor="password">Password</label>
                <div style={styles.relativeWrapper}>
                  <input
                    style={getInputStyle('password')}
                    id="password"
                    placeholder="••••••••"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setFocusedField('password')}
                    onBlur={() => setFocusedField(null)}
                    required
                  />
                  <button
                    style={styles.visibilityButton}
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>
                      {showPassword ? 'visibility' : 'visibility_off'}
                    </span>
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div style={styles.inputContainer}>
                <label style={styles.label} htmlFor="confirmPassword">Confirm Password</label>
                <input
                  style={getInputStyle('confirmPassword')}
                  id="confirmPassword"
                  placeholder="••••••••"
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  onFocus={() => setFocusedField('confirmPassword')}
                  onBlur={() => setFocusedField(null)}
                  required
                />
              </div>

              {/* Submit Action Action */}
              <button
                style={{
                  ...styles.submitBtn,
                  ...(isLoading ? styles.disabledBtn : {}),
                }}
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? 'Creating Account...' : 'Sign Up'}
              </button>
            </form>

            <p style={styles.footerText}>
              Already have an account?{' '}
              <span
                style={styles.footerLink}
                onClick={() => navigate('/login')}
              >
                Sign In
              </span>
            </p>
          </div>
        </section>

        {/* Right Graphic Space Panel */}
        <section style={styles.graphicSection}>
          <div style={styles.gradientOverlay} />
        </section>
      </main>
    </div>
  );
};

// --- Premium Minimalist Design Architecture Styles ---
const styles: Record<string, React.CSSProperties> = {
  pageContainer: {
    backgroundColor: '#f8f9fa',
    color: '#1a1a1a',
    fontFamily: 'system-ui, -apple-system, sans-serif',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  mainLayout: {
    display: 'flex',
    flexDirection: 'row',
    height: '100vh',
    overflow: 'hidden',
  },
  formSection: {
    width: '40%',
    backgroundColor: '#ffffff',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '0 48px',
    zIndex: 10,
    boxShadow: '4px 0 24px rgba(0,0,0,0.02)',
  },
  formWrapper: {
    maxWidth: '400px',
    width: '100%',
    margin: '0 auto',
  },
  headerBlock: {
    marginBottom: '32px',
  },
  brandContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '24px',
  },
  logoIcon: {
    width: '40px',
    height: '40px',
    backgroundColor: '#0052ff',
    backgroundImage: 'linear-gradient(135deg, #0052ff, #0038b8)',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  materialIcon: {
    color: '#ffffff',
    fontSize: '22px',
  },
  brandName: {
    fontSize: '22px',
    fontWeight: '700',
    letterSpacing: '-0.5px',
    color: '#1a1a1a',
  },
  titleText: {
    fontSize: '32px',
    fontWeight: '700',
    letterSpacing: '-0.5px',
    margin: '0 0 8px 0',
    color: '#1a1a1a',
  },
  subtitleText: {
    fontSize: '14px',
    color: '#666666',
    margin: 0,
  },
  errorAlert: {
    backgroundColor: '#ffebe9',
    color: '#ea4335',
    padding: '14px',
    borderRadius: '12px',
    fontSize: '14px',
    fontWeight: '500',
    marginBottom: '20px',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  label: {
    fontSize: '11px',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    color: '#666666',
    paddingLeft: '4px',
  },
  input: {
    width: '100%',
    padding: '14px 16px',
    backgroundColor: '#f1f3f5',
    border: '2px solid transparent',
    borderRadius: '12px',
    fontSize: '14px',
    color: '#1a1a1a',
    outline: 'none',
    boxSizing: 'border-box',
    transition: 'all 0.2s ease',
  },
  inputFocus: {
    backgroundColor: '#ffffff',
    borderColor: '#0052ff',
    boxShadow: '0 0 0 4px rgba(0, 82, 255, 0.1)',
  },
  relativeWrapper: {
    position: 'relative',
    width: '100%',
  },
  visibilityButton: {
    position: 'absolute',
    right: '16px',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'transparent',
    border: 'none',
    color: '#666666',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    padding: 0,
  },
  submitBtn: {
    width: '100%',
    padding: '16px',
    backgroundColor: '#0052ff',
    backgroundImage: 'linear-gradient(to right, #0052ff, #0038b8)',
    color: '#ffffff',
    fontWeight: '700',
    fontSize: '15px',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    boxShadow: '0 4px 12px rgba(0, 82, 255, 0.2)',
    transition: 'all 0.2s ease',
    marginTop: '8px',
  },
  disabledBtn: {
    opacity: 0.6,
    cursor: 'not-allowed',
  },
  footerText: {
    textAlign: 'center',
    fontSize: '14px',
    color: '#666666',
    marginTop: '28px',
  },
  footerLink: {
    color: '#0052ff',
    fontWeight: '600',
    cursor: 'pointer',
    textDecoration: 'none',
  },
  graphicSection: {
    flexGrow: 1,
    position: 'relative',
    backgroundColor: '#0a0f1d',
  },
  gradientOverlay: {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(to bottom right, rgba(0, 82, 255, 0.15), transparent)',
  },
};

export default SignupPage;