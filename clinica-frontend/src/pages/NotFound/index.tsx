import { Link } from "react-router-dom";
import { Button } from "../../components/ui/Button";

export function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-medical-600 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Página não encontrada
        </h2>
        <p className="text-gray-600 mb-8">
          A página que você está procurando não existe.
        </p>
        <Link to="/dashboard">
          <Button>Voltar ao Dashboard</Button>
        </Link>
      </div>
    </div>
  );
}

export default NotFoundPage;
