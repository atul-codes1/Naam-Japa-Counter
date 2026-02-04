import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error("Uncaught Error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="error-boundary-container">
                    <div className="error-icon">⚠️</div>
                    <h1 className="error-title">Something went wrong.</h1>
                    <p className="error-text">
                        We're sorry, an unexpected error occurred. Please try reloading the page.
                    </p>
                    <button
                        onClick={() => window.location.reload()}
                        className="error-button"
                    >
                        Reload Page
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
