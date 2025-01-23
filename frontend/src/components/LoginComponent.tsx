// components/LoginComponent.js
import GoogleSignIn from './GoogleSignIn';

export default function LoginComponent() {
  return (
    <div className="p-4">
      <h2 className="text-xl font-medium mb-4 text-center text-gray-800">
        Sign in to your account
      </h2>
      {/* Existing login form */}
      <form>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Password
          </label>
          <input
            type="password"
            placeholder="Enter your password"
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
        >
          Log In
        </button>
      </form>

      {/* Google Sign-In Integration */}
      <div className="mt-6 ">
        <GoogleSignIn />
      </div>
    </div>
  );
}
