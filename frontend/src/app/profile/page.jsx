import GoogleSignIn from '@/components/GoogleSignIn'

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="p-2 border rounded-lg shadow-lg">
        <GoogleSignIn/>
      </div>
    </div>
  );
}