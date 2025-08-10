import SignInForm from '@/components/organisms/forms/auth/SignInForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Next.js SignIn Page | TailAdmin - Next.js Dashboard Template',
  description: 'This is Next.js Signin Page TailAdmin Dashboard Template',
};

export default function SignIn() {
  return <SignInForm />;
}
