/**
 * Sign Up Page
 */

import SignUpForm from '@/app/components/auth/SignUpForm';
import Header from '@/app/components/layout/Header';

export default function SignUpPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 py-12">
        <SignUpForm />
      </div>
    </>
  );
}

