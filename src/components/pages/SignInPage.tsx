import React from 'react';
import { AuthTemplate } from '../templates';
import { SignInForm } from '../organisms';
import Link from 'next/link';

const SignInPage: React.FC = () => {
  return (
    <AuthTemplate
      title='Sign in to your account'
      subtitle='Welcome back! Please enter your details.'
      logo={
        <div className='flex justify-center'>
          <h1 className='text-brand-600 text-2xl font-bold'>Your Logo</h1>
        </div>
      }
      footer={
        <p className='text-sm text-gray-600 dark:text-gray-400'>
          Don&apos;t have an account?{' '}
          <Link
            href='/signup'
            className='text-brand-600 hover:text-brand-500 font-medium'
          >
            Sign up
          </Link>
        </p>
      }
    >
      <SignInForm />
    </AuthTemplate>
  );
};

export default SignInPage;
