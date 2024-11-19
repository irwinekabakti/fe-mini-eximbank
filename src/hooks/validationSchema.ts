import * as Yup from 'yup';

export const signInSchema = Yup.object({
  username: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is required'),
});

export const signUpSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  username: Yup.string().required('Username is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm Password is required'),
  dateOfBirth: Yup.date().required('Date of Birth is required'),
  phoneNumber: Yup.string().matches(/^\d+$/, 'Must be a valid phone number'),
  gender: Yup.string().oneOf(['MALE', 'FEMALE', 'OTHER'], 'Invalid gender').required('Gender is required'),
});
