import { Component, type ErrorInfo, type ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

/**
 * App-level boundary so a render-time throw shows a recoverable fallback
 * instead of a blank white screen. Intentionally simple — it catches, logs,
 * and offers a reload; it does not try to retry or report behavior.
 */
export default class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('[ErrorBoundary] Uncaught render error:', error, info);
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <section
        className='hero-bg relative overflow-hidden text-center h-dvh flex flex-col justify-center'
        style={{ padding: '88px 32px 96px' }}
      >
        <div className='relative mx-auto' style={{ maxWidth: 560, zIndex: 1 }}>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(28px, 4vw, 44px)',
              lineHeight: 1.12,
              letterSpacing: '-0.012em',
            }}
          >
            Something went wrong.
          </h1>

          <p
            className='mx-auto'
            style={{
              marginTop: 16,
              maxWidth: 480,
              fontSize: 17,
              color: 'var(--ink-2)',
              lineHeight: 1.6,
            }}
          >
            An unexpected error interrupted this page. Reloading usually clears
            it — if it keeps happening, head back home and try again.
          </p>

          <div className='flex items-center justify-center gap-3 mt-10'>
            <button
              type='button'
              onClick={() => window.location.reload()}
              className='btn btn-primary btn-lg'
            >
              Reload page
            </button>
            <a href='/' className='btn btn-outline btn-lg'>
              Take me home
            </a>
          </div>
        </div>
      </section>
    );
  }
}
