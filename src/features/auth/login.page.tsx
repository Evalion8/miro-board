import { AuthLayout } from './auth-layout';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/shared/model/routes';

function LoginPage() {
  return (
    <AuthLayout
      title="Enter"
      description="Provide valid email"
      footerText={
        <>
          No account? <Link to={ROUTES.REGISTER}>Sign up</Link>
        </>
      }
      form={<form>{/* ваши поля */}</form>}
    />
  );
}

export const Component = LoginPage;
