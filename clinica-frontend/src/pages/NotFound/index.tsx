import { Link } from "react-router-dom";
import { Button } from "../../components/ui/Button";

export function NotFoundPage() {
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="text-center animate-fade-in">
        <div className="text-6xl mb-4">🔍</div>

        <h1 className="text-6xl font-bold text-medical-600 mb-2">404</h1>

        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Page Not Found
        </h2>

        <p className="text-gray-600 max-w-md mx-auto mb-8">
          The page you are looking for doesn't exist or may have been moved.
        </p>

        <Link to="/dashboard">
          <Button size="md">Back to Dashboard</Button>
        </Link>
      </div>
    </main>
  );
}

export default NotFoundPage;
