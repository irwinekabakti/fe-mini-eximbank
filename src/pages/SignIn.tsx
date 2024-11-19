import { FC } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button, TextField, Box, Typography } from '@mui/material';
import {signInSchema } from '../hooks/validationSchema';
import { loginUser } from '../services/api';
import { useNavigate } from 'react-router-dom';

const SignIn: FC = () => {
    const handleSignIn = async (values: { username: string; password: string }) => {
        try {
          const response = await loginUser(values);
          console.log('Login Successful:', response.data);
          alert('Login successful!');
          // Redirect or perform additional actions here
        } catch (error: any) {
          console.error('Login Error:', error.response?.data || error.message);
          alert(error.response?.data?.message || 'Login failed. Please try again.');
        }
  };

  const navigate = useNavigate()

  const toSignUp = () => {
    navigate('/sign-up')
  }

  const toForgetPassword = () => {
    navigate('/forget-password')
  }

  return (
    <>
    <Formik
      initialValues={{ username: '', password: '' }}
      validationSchema={signInSchema}
      onSubmit={handleSignIn}
    >
      {({ isSubmitting }) => (
        <Form>
          <Box display="flex" flexDirection="column" gap={2} maxWidth={400} mx="auto">
            <Typography variant="h4" textAlign="center">Sign In</Typography>
            <Field name="username" as={TextField} label="Username" fullWidth />
            <ErrorMessage name="username" component="div" className="text-red-500 text-sm" />
            
            <Field name="password" as={TextField} label="Password" type="password" fullWidth />
            <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />

            <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
              Sign In
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
            <div className='flex justify-center py-4 gap-6 items-center'>
            <h1 className='text-2xl'>Dont't have an account ? </h1>

            <div className='button cursor-pointer' onClick={toSignUp}>
                <h1 className='text-blue-500 hover:text-blue-700'>Sign Up</h1>
            </div>
        </div>

      <div className='flex justify-center' onClick={toForgetPassword}>
        <h1 className='text-lg text-gray-800 hover:text-gray-600 cursor-pointer'>Forget Password</h1>
      </div>
    </>
  );
};

export default SignIn;
