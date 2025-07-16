import { ROUTES } from '@/shared/model/routes';
import { AuthLayout } from './ui/auth-layout';
import { Link } from 'react-router-dom';
import { RegisterForm } from './ui/register-form';

function RegisterPage() {
  return (
    <AuthLayout
      title="Register"
      description="Provide valid email"
      form={<RegisterForm />}
      footerText={
        <>
          Already have an account? <Link to={ROUTES.LOGIN}>Login</Link>
        </>
      }
    />
  );
}

export const Component = RegisterPage;
