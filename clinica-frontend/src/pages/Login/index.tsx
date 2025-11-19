import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Card } from "../../components/ui/Card";
import { Alert } from "../../components/ui/Alert";
import { useFormik } from "formik";
import * as Yup from "yup";

const loginSchema = Yup.object({
  username: Yup.string()
    .required("Usuário é obrigatório")
    .min(3, "Usuário deve ter no mínimo 3 caracteres"),
  password: Yup.string()
    .required("Senha é obrigatória")
    .min(3, "Senha deve ter no mínimo 3 caracteres"),
});

export function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values, { setSubmitting, setStatus }) => {
      try {
        await login(values);
        navigate("/dashboard");
      } catch (err) {
        setStatus("Credenciais inválidas. Tente novamente.");
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-medical-50 to-medical-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md" variant="default">
        <div className="text-center p-6 border-b">
          <div className="mx-auto w-16 h-16 bg-medical-600 rounded-2xl flex items-center justify-center mb-4">
            <span className="text-white font-bold text-3xl">C+</span>
          </div>
          <h1 className="text-2xl font-bold">Clinic+</h1>
          <p className="text-gray-600 mt-2">Entre com suas credenciais</p>
        </div>
        <div className="p-6">
          <form onSubmit={formik.handleSubmit} className="space-y-4">
            <Input
              label="Usuário"
              type="text"
              name="username"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Digite seu usuário"
              error={
                formik.touched.username && formik.errors.username
                  ? formik.errors.username
                  : undefined
              }
            />
            <Input
              label="Senha"
              type="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Digite sua senha"
              error={
                formik.touched.password && formik.errors.password
                  ? formik.errors.password
                  : undefined
              }
            />
            {formik.status && <Alert variant="danger">{formik.status}</Alert>}
            <Button
              type="submit"
              className="w-full"
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting ? "Entrando..." : "Entrar"}
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
}

export default LoginPage;
