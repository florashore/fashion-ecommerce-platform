/**
 * Sign In Page
 */

import SignInForm from '@/app/components/auth/SignInForm';
import Header from '@/app/components/layout/Header';

export default function SignInPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 py-12">
        <SignInForm />
      </div>
    </>
  );
}

