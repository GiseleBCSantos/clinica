import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Card } from "../../components/ui/Card";
import { Alert } from "../../components/ui/Alert";
import { patientsService } from "../../services/patient.service";

const patientSchema = Yup.object({
  nome: Yup.string()
    .required("Nome é obrigatório")
    .min(3, "Nome deve ter no mínimo 3 caracteres"),
  data_nascimento: Yup.date()
    .required("Data de nascimento é obrigatória")
    .max(new Date(), "Data de nascimento não pode ser futura"),
  cpf: Yup.string()
    .required("CPF é obrigatório")
    .matches(
      /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
      "CPF inválido (formato: 000.000.000-00)"
    ),
  telefone: Yup.string()
    .required("Telefone é obrigatório")
    .matches(
      /^$$\d{2}$$ \d{4,5}-\d{4}$/,
      "Telefone inválido (formato: (00) 00000-0000)"
    ),
  email: Yup.string().required("Email é obrigatório").email("Email inválido"),
  endereco: Yup.string().required("Endereço é obrigatório"),
  cidade: Yup.string().required("Cidade é obrigatória"),
  estado: Yup.string()
    .required("Estado é obrigatório")
    .length(2, "Estado deve ter 2 caracteres (UF)"),
  cep: Yup.string()
    .required("CEP é obrigatório")
    .matches(/^\d{5}-\d{3}$/, "CEP inválido (formato: 00000-000)"),
  sexo: Yup.string()
    .required("Sexo é obrigatório")
    .oneOf(["M", "F", "O"], "Sexo inválido"),
});

export function PatientCreatePage() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      nome: "",
      data_nascimento: "",
      cpf: "",
      telefone: "",
      email: "",
      endereco: "",
      cidade: "",
      estado: "",
      cep: "",
      sexo: "M" as "M" | "F" | "O",
    },
    validationSchema: patientSchema,
    onSubmit: async (values, { setSubmitting, setStatus }) => {
      try {
        await patientsService.create(values);
        navigate("/patients");
      } catch (err) {
        setStatus("Erro ao criar paciente. Tente novamente.");
        console.error(err);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Novo Paciente</h1>

      <Card variant="default" title="Informações do Paciente">
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <Input
            label="Nome Completo"
            name="nome"
            value={formik.values.nome}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.nome && formik.errors.nome
                ? formik.errors.nome
                : undefined
            }
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Data de Nascimento"
              type="date"
              name="data_nascimento"
              value={formik.values.data_nascimento}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.data_nascimento && formik.errors.data_nascimento
                  ? formik.errors.data_nascimento
                  : undefined
              }
            />
            <Input
              label="CPF"
              name="cpf"
              value={formik.values.cpf}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="000.000.000-00"
              error={
                formik.touched.cpf && formik.errors.cpf
                  ? formik.errors.cpf
                  : undefined
              }
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Telefone"
              name="telefone"
              value={formik.values.telefone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="(00) 00000-0000"
              error={
                formik.touched.telefone && formik.errors.telefone
                  ? formik.errors.telefone
                  : undefined
              }
            />
            <Input
              label="Email"
              type="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.email && formik.errors.email
                  ? formik.errors.email
                  : undefined
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Sexo
            </label>
            <select
              name="sexo"
              value={formik.values.sexo}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-medical-500"
            >
              <option value="M">Masculino</option>
              <option value="F">Feminino</option>
              <option value="O">Outro</option>
            </select>
            {formik.touched.sexo && formik.errors.sexo && (
              <p className="mt-1 text-sm text-red-600">{formik.errors.sexo}</p>
            )}
          </div>

          <Input
            label="Endereço"
            name="endereco"
            value={formik.values.endereco}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.endereco && formik.errors.endereco
                ? formik.errors.endereco
                : undefined
            }
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              label="Cidade"
              name="cidade"
              value={formik.values.cidade}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.cidade && formik.errors.cidade
                  ? formik.errors.cidade
                  : undefined
              }
            />
            <Input
              label="Estado"
              name="estado"
              value={formik.values.estado}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="UF"
              maxLength={2}
              error={
                formik.touched.estado && formik.errors.estado
                  ? formik.errors.estado
                  : undefined
              }
            />
            <Input
              label="CEP"
              name="cep"
              value={formik.values.cep}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="00000-000"
              error={
                formik.touched.cep && formik.errors.cep
                  ? formik.errors.cep
                  : undefined
              }
            />
          </div>

          {formik.status && <Alert variant="danger">{formik.status}</Alert>}

          <div className="flex gap-3 pt-4">
            <Button type="submit" disabled={formik.isSubmitting}>
              {formik.isSubmitting ? "Salvando..." : "Salvar Paciente"}
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => navigate("/patients")}
            >
              Cancelar
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}

export default PatientCreatePage;
