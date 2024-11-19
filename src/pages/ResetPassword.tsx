import { FC } from 'react'
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { TextField, Button, CircularProgress, Alert } from "@mui/material";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";


const ResetPassword: FC = () => {
  const initialValues = { token: "", newPassword: "" };
  const navigate = useNavigate()

  const validationSchema = Yup.object({
    token: Yup.string().required("Reset token is required"),
    newPassword: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("New password is required"),
  });

  const handleSubmit = async (
    values: { token: string; newPassword: string },
    { setSubmitting, setStatus }: any
  ) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/api/v1/reset-password?token=${values.token}&newPassword=${values.newPassword}`
      );
      setStatus({ success: response.data });
      toast.success("Password changed successfully! Please relogin.");
      setTimeout(() => {
        navigate('/sign-in')
      }, 500)
      // navigate('/sign-in')
    } catch (err: any) {
      setStatus({ error: err.response?.data || "An error occurred." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Reset Password</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, status }) => (
            <Form>
              {status?.success && <Alert severity="success">{status.success}</Alert>}
              {status?.error && <Alert severity="error" className="mt-2">{status.error}</Alert>}
              <Field
                name="token"
                as={TextField}
                label="Reset Token"
                fullWidth
                variant="outlined"
                className="mb-4"
                helperText={<ErrorMessage name="token" />}
                error={!!status?.error}
              />
              <Field
                name="newPassword"
                as={TextField}
                label="New Password"
                type="password"
                fullWidth
                variant="outlined"
                className="mb-4"
                helperText={<ErrorMessage name="newPassword" />}
                error={!!status?.error}
              />
              <Button
                variant="contained"
                color="primary"
                fullWidth
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? <CircularProgress size={24} /> : "Reset Password"}
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ResetPassword;
