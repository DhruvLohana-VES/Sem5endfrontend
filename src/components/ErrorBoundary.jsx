import { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    this.setState({
      error,
      errorInfo,
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 max-w-2xl w-full">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-red-100 dark:bg-red-900 p-3 rounded-full">
                <svg
                  className="h-8 w-8 text-red-600 dark:text-red-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Something went wrong
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  The application encountered an error
                </p>
              </div>
            </div>

            {this.state.error && (
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 mb-4">
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Error Details:
                </p>
                <pre className="text-xs text-red-600 dark:text-red-400 overflow-auto">
                  {this.state.error.toString()}
                </pre>
              </div>
            )}

            {this.state.errorInfo && (
              <details className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 mb-4">
                <summary className="text-sm font-semibold text-gray-700 dark:text-gray-300 cursor-pointer">
                  Stack Trace
                </summary>
                <pre className="text-xs text-gray-600 dark:text-gray-400 mt-2 overflow-auto">
                  {this.state.errorInfo.componentStack}
                </pre>
              </details>
            )}

            <div className="flex gap-3">
              <button
                onClick={() => {
                  localStorage.clear();
                  window.location.href = '/login';
                }}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Clear Data & Go to Login
              </button>
              <button
                onClick={() => window.location.reload()}
                className="flex-1 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
              >
                Reload Page
              </button>
            </div>

            <div className="mt-4 text-center">
              <a
                href="/"
                className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
              >
                Go to Home
              </a>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
