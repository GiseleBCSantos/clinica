import { useState, useEffect } from "react";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useVitalRecords } from "../../hooks/useVitalRecords";
import { usePatients } from "../../hooks/usePatient";
import Modal from "../../components/ui/Modal";
import { getError } from "../../utils/functions";

interface Props {
  patientId: number;
  record?: any;
  open: boolean;
  onClose: () => void;
  refetchVitals: () => void;
}

export const VitalRecordsCreateModal = ({
  patientId,
  record,
  open,
  onClose,
  refetchVitals,
}: Props) => {
  const {
    createRecord,
    updateRecord,
    loading: createLoading,
  } = useVitalRecords();
  const { getPatientById } = usePatients();
  const [patientName, setPatientName] = useState("");

  useEffect(() => {
    const loadPatient = async () => {
      try {
        const patient = await getPatientById(patientId);
        setPatientName(patient.full_name);
      } catch (err) {
        console.error(err);
      }
    };
    if (open) loadPatient();
  }, [patientId, getPatientById, open]);

  const formik = useFormik({
    initialValues: {
      temperature: record?.temperature ?? "",
      systolic_bp: record?.systolic_bp ?? "",
      diastolic_bp: record?.diastolic_bp ?? "",
      heart_rate: record?.heart_rate ?? "",
      notes: record?.notes ?? "",
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      temperature: Yup.number().nullable().min(30).max(45),
      systolic_bp: Yup.number().nullable().min(50).max(250),
      diastolic_bp: Yup.number().nullable().min(30).max(150),
      heart_rate: Yup.number().nullable().min(30).max(220),
      notes: Yup.string().max(500),
    }),
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        if (record) {
          await updateRecord(record.id, {
            temperature: values.temperature
              ? Number(values.temperature)
              : undefined,
            systolic_bp: values.systolic_bp
              ? Number(values.systolic_bp)
              : undefined,
            diastolic_bp: values.diastolic_bp
              ? Number(values.diastolic_bp)
              : undefined,
            heart_rate: values.heart_rate
              ? Number(values.heart_rate)
              : undefined,
            notes: values.notes || undefined,
          });
        } else {
          await createRecord({
            patient_id: patientId,
            temperature: values.temperature
              ? Number(values.temperature)
              : undefined,
            systolic_bp: values.systolic_bp
              ? Number(values.systolic_bp)
              : undefined,
            diastolic_bp: values.diastolic_bp
              ? Number(values.diastolic_bp)
              : undefined,
            heart_rate: values.heart_rate
              ? Number(values.heart_rate)
              : undefined,
            notes: values.notes || undefined,
          });
        }

        resetForm();
        onClose();
        refetchVitals();
      } catch (err) {
        console.error(err);
      } finally {
        setSubmitting(false);
      }
    },
  });

  if (!open) return null;

  return (
    <Modal
      open={open}
      title={`${record ? "Edit" : "Add"} Vital Record for ${patientName}`}
      onClose={onClose}
    >
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <Input
          label="Temperature (°C) - (Normal: 36.5 - 37.5°C)"
          name="temperature"
          type="number"
          value={formik.values.temperature}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={getError(formik, "temperature")}
        />
        <Input
          label="Systolic BP - (Normal: 90 - 120 mmHg)"
          name="systolic_bp"
          type="number"
          value={formik.values.systolic_bp}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={getError(formik, "systolic_bp")}
        />
        <Input
          label="Diastolic BP - (Normal: 60 - 80 mmHg)"
          name="diastolic_bp"
          type="number"
          value={formik.values.diastolic_bp}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={getError(formik, "diastolic_bp")}
        />
        <Input
          label="Heart Rate - (Normal: 60 - 100 bpm)"
          name="heart_rate"
          type="number"
          value={formik.values.heart_rate}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={getError(formik, "heart_rate")}
        />
        <Input
          label="Notes"
          name="notes"
          type="text"
          value={formik.values.notes}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={getError(formik, "notes")}
        />
        <div className="flex justify-end gap-2">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={formik.isSubmitting || createLoading}>
            {formik.isSubmitting || createLoading
              ? "Saving..."
              : "Save Vital Record"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default VitalRecordsCreateModal;
