import { useNavigate } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
const ErrorFallback = ({ error, resetErrorBoundary }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center px-4">
      <div
        role="alert"
        className="w-full max-w-md rounded-2xl bg-base-100 shadow-2xl p-8 text-center"
      >
        {/* Icon */}
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-error/10 text-error">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-7 w-7"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01M12 3a9 9 0 100 18 9 9 0 000-18z"
            />
          </svg>
        </div>

        {/* Text */}
        <h2 className="text-xl font-semibold mb-2 text-base-content">
          Something went wrong
        </h2>

        <p className="text-sm text-base-content/70 mb-6 break-words">
          {error?.message || "An unexpected error occurred. Please try again."}
        </p>

        {/* Actions */}
        <div className="flex justify-center gap-3">
          <button onClick={resetErrorBoundary} className="btn btn-error btn-sm">
            Try Again
          </button>

          <button
            onClick={() => {
              resetErrorBoundary();
              navigate("/");
            }}
            className="btn btn-outline btn-sm"
          >
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
};

const CustomErrorBoundary = ({ children }) => {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback} // ✅ FIXED
      onReset={() => window.location.reload()}
    >
      {children}
    </ErrorBoundary>
  );
};
export default CustomErrorBoundary;
