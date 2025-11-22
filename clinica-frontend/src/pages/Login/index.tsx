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
    .required("Username is required")
    .min(3, "Username must be at least 3 characters"),
  password: Yup.string()
    .required("Password is required")
    .min(3, "Password must be at least 3 characters"),
});

export const LoginPage = () => {
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
        setStatus("Invalid credentials. Please try again.");
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-medical-50 to-medical-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <Card variant="header" className="text-center">
          <div className="mx-auto w-16 h-16 bg-medical-600 rounded-2xl flex items-center justify-center mb-4">
            <span className="text-white font-bold text-3xl">C+</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Clinic+</h1>
          <p className="text-gray-600 mt-2">Sign in with your credentials</p>
        </Card>

        <Card variant="content" className="space-y-4">
          <form onSubmit={formik.handleSubmit} className="space-y-4" noValidate>
            <Input
              label="Username"
              type="text"
              name="username"
              autoComplete="username"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter your username"
              error={
                formik.touched.username && formik.errors.username
                  ? formik.errors.username
                  : undefined
              }
            />

            <Input
              label="Password"
              type="password"
              name="password"
              autoComplete="current-password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter your password"
              error={
                formik.touched.password && formik.errors.password
                  ? formik.errors.password
                  : undefined
              }
            />

            {formik.status && (
              <Alert variant="danger" title="Login Failed">
                {formik.status}
              </Alert>
            )}

            <Button
              type="submit"
              className="w-full"
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting ? "Signing in..." : "Sign In"}
            </Button>
          </form>
        </Card>
      </Card>
    </div>
  );
};

export default LoginPage;
