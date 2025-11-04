import LoginForm from "../components/LoginForm";

function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg border p-8">
        <h2 className="text-2xl font-bold text-center text-primary mb-6">
          Welcome to Xentax
        </h2>
        <LoginForm />
      </div>
    </div>
  );
}

export default LoginPage;
