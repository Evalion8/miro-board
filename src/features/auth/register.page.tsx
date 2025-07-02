import { ROUTES } from '@/shared/model/routes';
import { AuthLayout } from './auth-layout';
import { Link } from 'react-router-dom';

function RegisterPage() {
  return (
    <AuthLayout
      title="Register"
      description="Provide valid email"
      footerText={
        <>
          Already have an account? <Link to={ROUTES.LOGIN}>Login</Link>
        </>
      }
      form={<form></form>}
    />
  );
}

export const Component = RegisterPage;
