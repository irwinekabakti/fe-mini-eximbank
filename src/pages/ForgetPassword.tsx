import { FC } from 'react'
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { TextField, Button, CircularProgress, Alert } from "@mui/material";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

const ForgetPassword: FC = () => {
  const initialValues = { email: "" };
  const navigate = useNavigate()

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
  });

  const handleSubmit = async (values: { email: string }, { setSubmitting, setStatus }: any) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/api/v1/forgot-password?email=${values.email}`
      );
      setStatus({ success: response.data });
      toast.success("Input your token and new password!");
      setTimeout(() => {
        navigate('/reset-password')
      }, 500)
    //   navigate('/reset-password')
    } catch (err: any) {
      setStatus({ error: err.response?.data || "An error occurred." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Forgot Password</h2>
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
                name="email"
                as={TextField}
                label="Email"
                type="email"
                fullWidth
                variant="outlined"
                className="mb-4"
                helperText={<ErrorMessage name="email" />}
                error={!!status?.error}
              />
              <Button
                variant="contained"
                color="primary"
                fullWidth
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? <CircularProgress size={24} /> : "Send Reset Email"}
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ForgetPassword;
