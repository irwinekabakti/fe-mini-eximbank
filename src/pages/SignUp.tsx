import { FC } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button, TextField, Box, Typography, MenuItem } from '@mui/material';
import { signUpSchema } from '../hooks/validationSchema';
import { registerUser } from '../services/api';
import { useNavigate } from 'react-router-dom';

const SignUp: FC = () => {
  const navigate = useNavigate()

    const handleSignUp = async (values: any) => {
        try {
          const response = await registerUser(values);
          console.log('Registration Successful:', response.data);
          alert('Registration successful!');
          // Redirect or perform additional actions here
        } catch (error: any) {
          console.error('Registration Error:', error.response?.data || error.message);
          alert(error.response?.data?.message || 'Registration failed. Please try again.');
        }
      };

      const toSignIn = () => {
        navigate('/sign-in')
      }

  return (

    <>
    <Formik
      initialValues={{
        name: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        dateOfBirth: '',
        phoneNumber: '',
        gender: '',
      }}
      validationSchema={signUpSchema}
      onSubmit={handleSignUp}
    >
      {({ isSubmitting }) => (
        <Form>
          <Box display="flex" flexDirection="column" gap={2} maxWidth={400} mx="auto">
            <Typography variant="h4" textAlign="center">Sign Up</Typography>
            <Field name="name" as={TextField} label="Name" fullWidth />
            <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />

            <Field name="username" as={TextField} label="Username" fullWidth />
            <ErrorMessage name="username" component="div" className="text-red-500 text-sm" />

            <Field name="email" as={TextField} label="Email" fullWidth />
            <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />

            <Field name="password" as={TextField} label="Password" type="password" fullWidth />
            <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />

            <Field name="confirmPassword" as={TextField} label="Confirm Password" type="password" fullWidth />
            <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm" />

            <Field name="dateOfBirth" as={TextField} label="Date of Birth" type="date" InputLabelProps={{ shrink: true }} fullWidth />
            <ErrorMessage name="dateOfBirth" component="div" className="text-red-500 text-sm" />

{/* <Field
  name="dateOfBirth"
  as={TextField}
  label="Date of Birth"
  type="date"
  InputLabelProps={{ shrink: true }}
  fullWidth
  onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
    const value = e.target.value; 
    if (value) {
      const [yyyy, mm, dd] = value.split("-"); // Parse the ISO-8601 date format
      e.target.value = `${dd}/${mm}/${yyyy}`; // Reformat to dd/mm/yyyy
    }
  }}
/> */}

            <Field name="phoneNumber" as={TextField} label="Phone Number" fullWidth />
            <ErrorMessage name="phoneNumber" component="div" className="text-red-500 text-sm" />

            <Field name="gender" as={TextField} select label="Gender" fullWidth>
              <MenuItem value="MALE">Male</MenuItem>
              <MenuItem value="FEMALE">Female</MenuItem>
              <MenuItem value="OTHER">Other</MenuItem>
            </Field>
            <ErrorMessage name="gender" component="div" className="text-red-500 text-sm" />

            <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
              Sign Up
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
        <div className='flex justify-center py-6 gap-6 items-center'>
            <h1 className='text-2xl'>Already have an account ? </h1>

            <div className='button cursor-pointer' onClick={toSignIn}>
                <h1 className='text-blue-500 hover:text-blue-700'>Sign In</h1>
            </div>
        </div>
    </>
  );
};

export default SignUp;