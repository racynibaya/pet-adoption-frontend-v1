import { useState, useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom';

import { useNavigate } from 'react-router-dom';

import PawIcon from '@/icons/PawIcon';
import { apiLogin, ApiError } from '@/services/api';
import { useAdopter } from '@/context/useUser';

type AuthMode = 'signin' | 'signup';

interface AuthModalProps {
  isOpen: boolean;
  mode: AuthMode;
  onClose: () => void;
  onModeChange: (mode: AuthMode) => void;
}

function EyeIcon({ open }: { open: boolean }) {
  if (open) {
    return (
      <svg
        width='16'
        height='16'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      >
        <path d='M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24' />
        <line x1='1' y1='1' x2='23' y2='23' />
      </svg>
    );
  }
  return (
    <svg
      width='16'
      height='16'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path d='M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z' />
      <circle cx='12' cy='12' r='3' />
    </svg>
  );
}

export default function AuthModal({
  isOpen,
  mode,
  onClose,
  onModeChange,
}: AuthModalProps) {
  const [signIn, setSignIn] = useState({ email: '', password: '' });
  const [signUp, setSignUp] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [authError, setAuthError] = useState('');

  const navigate = useNavigate();
  const { signIn: signInAdopter } = useAdopter();

  useEffect(() => {
    if (isOpen) {
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;
      document.body.style.paddingRight = `${scrollbarWidth}px`;
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [isOpen]);

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose],
  );

  useEffect(() => {
    if (!isOpen) return;
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, handleKey]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;

    setAuthError('');

    if (mode === 'signin') {
      setSubmitting(true);
      try {
        const data = await apiLogin(signIn.email, signIn.password);
        if (!data.success || !data.accessToken) {
          setAuthError('Sign in failed. Please try again.');
          return;
        }

        const ok = await signInAdopter(data.accessToken);
        if (!ok) {
          setAuthError('This account does not have adopter access.');
          return;
        }

        onClose();
        navigate('/users/me');
      } catch (err) {
        if (err instanceof ApiError) {
          setAuthError(
            err.status === 401 ? 'Invalid email or password.' : err.message,
          );
        } else {
          setAuthError('Could not connect to the server.');
        }
      } finally {
        setSubmitting(false);
      }
      return;
    }

    if (mode === 'signup') {
      void signUp;
    }
  };

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div
      className='fixed inset-0 z-200 flex items-center justify-center p-4'
      style={{
        background: 'rgba(26,42,30,0.55)',
        backdropFilter: 'blur(4px)',
        WebkitBackdropFilter: 'blur(4px)',
        animation: 'fadeIn 300ms var(--ease-out) both',
      }}
      onClick={onClose}
      role='dialog'
      aria-modal='true'
      aria-label='Authentication'
    >
      <div
        className='auth-card-bg relative bg-(--canvas) rounded-3xl w-full max-w-110'
        style={{
          padding: '40px 40px 36px',
          boxShadow: 'var(--shadow-lift)',
          animation: 'authScaleIn 420ms cubic-bezier(0.16, 1, 0.3, 1) both',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          className='absolute top-4 right-4 z-2 w-8 h-8 rounded-full border-0 bg-(--soft) text-(--muted) text-[18px] flex items-center justify-center cursor-pointer transition-[background,color,transform] duration-120 ease-out hover:bg-(--hairline) hover:text-(--ink) hover:scale-[1.1] hover:rotate-90 active:scale-[0.95]'
          onClick={onClose}
          aria-label='Close'
        >
          <svg width='14' height='14' viewBox='0 0 14 14' fill='none'>
            <path
              d='M1 1 L13 13 M13 1 L1 13'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
            />
          </svg>
        </button>

        {/* Decorative paw */}
        <div
          className='flex justify-center mb-3.25 relative z-1'
          style={{ opacity: 0.22 }}
          aria-hidden='true'
        >
          <PawIcon width={36} height={36} />
        </div>

        {/* Title */}
        <h2
          className='text-[28px] font-bold text-(--ink) text-center tracking-[-0.016em] leading-[1.2] relative z-1 m-0'
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {mode === 'signin' ? 'Welcome back' : 'Create account'}
        </h2>
        <p className='text-center text-(--muted) text-[14px] mt-2 leading-[1.55] relative z-1'>
          {mode === 'signin'
            ? 'Sign in to continue your adoption journey'
            : 'Join KodaNest and find your perfect companion'}
        </p>

        {/* Tab switcher */}
        <div
          className='relative grid grid-cols-2 bg-(--soft) rounded-xl p-1 mt-5.5 mb-5 z-1'
          role='tablist'
        >
          <button
            role='tab'
            aria-selected={mode === 'signin'}
            className={`relative z-2 border-0 bg-transparent rounded-[9px] h-9.5 text-[14px] font-semibold cursor-pointer transition-[color] duration-200 tracking-[0.01em] hover:text-(--ink-2) ${
              mode === 'signin' ? 'text-(--ink)' : 'text-(--muted)'
            }`}
            onClick={() => onModeChange('signin')}
          >
            Sign In
          </button>
          <button
            role='tab'
            aria-selected={mode === 'signup'}
            className={`relative z-2 border-0 bg-transparent rounded-[9px] h-9.5 text-[14px] font-semibold cursor-pointer transition-[color] duration-200 tracking-[0.01em] hover:text-(--ink-2) ${
              mode === 'signup' ? 'text-(--ink)' : 'text-(--muted)'
            }`}
            onClick={() => onModeChange('signup')}
          >
            Sign Up
          </button>
          <div
            className={`auth-tab-indicator${mode === 'signup' ? ' auth-tab-indicator-right' : ''}`}
          />
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className='flex flex-col gap-3.5 relative z-1'
          noValidate
        >
          {mode === 'signup' && (
            <div className='grid grid-cols-2 gap-3 max-[480px]:grid-cols-1 max-[480px]:gap-3.5'>
              <div className='field'>
                <label htmlFor='auth-firstName'>First name</label>
                <input
                  id='auth-firstName'
                  type='text'
                  autoComplete='given-name'
                  placeholder='Jane'
                  value={signUp.firstName}
                  onChange={(e) =>
                    setSignUp({ ...signUp, firstName: e.target.value })
                  }
                  required
                  autoFocus
                />
              </div>
              <div className='field'>
                <label htmlFor='auth-lastName'>Last name</label>
                <input
                  id='auth-lastName'
                  type='text'
                  autoComplete='family-name'
                  placeholder='Doe'
                  value={signUp.lastName}
                  onChange={(e) =>
                    setSignUp({ ...signUp, lastName: e.target.value })
                  }
                  required
                />
              </div>
            </div>
          )}

          <div className='field'>
            <label htmlFor='auth-email'>Email address</label>
            <input
              id='auth-email'
              type='email'
              autoComplete='email'
              placeholder='you@example.com'
              value={mode === 'signin' ? signIn.email : signUp.email}
              onChange={(e) =>
                mode === 'signin'
                  ? setSignIn({ ...signIn, email: e.target.value })
                  : setSignUp({ ...signUp, email: e.target.value })
              }
              required
              autoFocus={mode === 'signin'}
            />
          </div>

          <div className='field'>
            <label htmlFor='auth-password'>Password</label>
            <div className='relative'>
              <input
                id='auth-password'
                type={showPassword ? 'text' : 'password'}
                autoComplete={
                  mode === 'signin' ? 'current-password' : 'new-password'
                }
                placeholder={
                  mode === 'signin' ? '••••••••' : 'Min. 8 characters'
                }
                value={mode === 'signin' ? signIn.password : signUp.password}
                onChange={(e) =>
                  mode === 'signin'
                    ? setSignIn({ ...signIn, password: e.target.value })
                    : setSignUp({ ...signUp, password: e.target.value })
                }
                required
                style={{ paddingRight: '48px' }}
              />
              <button
                type='button'
                className='absolute right-3.5 top-1/2 -translate-y-1/2 border-0 bg-transparent text-(--muted) cursor-pointer p-0 flex items-center justify-center transition-[color] duration-120 ease-out hover:text(--ink)'
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                <EyeIcon open={showPassword} />
              </button>
            </div>
          </div>

          {mode === 'signin' && (
            <button
              type='button'
              className='self-end bg-transparent border-0 text-[13px] text-(--muted) cursor-pointer p-0 -mt-1 transition-[color] duration-120 ease-out hover:text-(--rausch) hover:underline'
            >
              Forgot password?
            </button>
          )}

          {authError && (
            <p
              role='alert'
              className='text-[13px] text-(--rausch) bg-(--rausch-soft) rounded-lg px-3 py-2 m-0'
            >
              {authError}
            </p>
          )}

          <button
            type='submit'
            className='btn btn-primary btn-lg'
            style={{ width: '100%', marginTop: 4 }}
            disabled={submitting}
          >
            {submitting
              ? mode === 'signin'
                ? 'Signing in…'
                : 'Creating…'
              : mode === 'signin'
                ? 'Sign in →'
                : 'Create account →'}
          </button>
        </form>

        {/* Footer toggle */}
        <p className='text-center text-[13.5px] text-(--muted) mt-4 relative z-1'>
          {mode === 'signin'
            ? "Don't have an account? "
            : 'Already have an account? '}
          <button
            type='button'
            className='bg-transparent border-0 text-(--rausch) font-semibold text-[13.5px] cursor-pointer p-0 transition-[color] duration-120 ease-out hover:text-(--rausch-active) hover:underline'
            onClick={() =>
              onModeChange(mode === 'signin' ? 'signup' : 'signin')
            }
          >
            {mode === 'signin' ? 'Sign up' : 'Sign in'}
          </button>
        </p>
      </div>
    </div>,
    document.body,
  );
}
