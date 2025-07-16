import { AuthLayout } from './ui/auth-layout';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/shared/model/routes';
import { LoginForm } from './ui/login-form';

function LoginPage() {
  return (
    <AuthLayout
      title="Enter"
      description="Provide valid email"
      form={<LoginForm />}
      footerText={
        <>
          No account? <Link to={ROUTES.REGISTER}>Sign up</Link>
        </>
      }
    />
  );
}

export const Component = LoginPage;
