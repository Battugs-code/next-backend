"use client";
import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";
import { useState } from "react";
import { Loader2, Mail, Lock, User, UserPlus } from "lucide-react";
import { Link } from "lucide-react";
import { useRouter } from "next/navigation";
import LinkNext from "next/link";

const SIGN_UP = gql`
  mutation signUp(
    $name: String!
    $email: String!
    $password: String!
    $VerifyPassword: String!
  ) {
    signUp(
      name: $name
      email: $email
      password: $password
      VerifyPassword: $VerifyPassword
    )
  }
`;

const SignUp = () => {
  const router = useRouter();
  const [name, setName] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [VerifyPassword, setVerifyPassword] = useState("");

  const [signUp, { loading, error }] = useMutation<{ signUp: string }>(
    SIGN_UP,
    {
      variables: {
        name,
        email,
        password,
        VerifyPassword,
      },
    },
  );

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (password !== VerifyPassword) {
        throw new Error("Passwords do not match");
      }
      const { data } = await signUp();
      if (data?.signUp) {
        localStorage.setItem("token", data.signUp);
        router.push("/");
      }
    } catch (err) {
      console.error("Sign-up failed:", err);
    }
  };

  return (
    <div className="flex items-center justify-center p-4">
      <div className="w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-black/40 p-8 shadow-2xl backdrop-blur-xl transition-all hover:border-white/20">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <UserPlus className="h-6 w-6" />
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-white">
            Create Account
          </h2>
          <p className="mt-2 text-sm text-zinc-400">
            Join us to get started with your journey
          </p>
        </div>

        <form onSubmit={handleSignUp} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-300" htmlFor="name">
              Full Name
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-500">
                <User className="h-4 w-4" />
              </div>
              <input
                id="name"
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="block w-full rounded-xl border border-zinc-800 bg-zinc-900/50 py-2.5 pl-10 pr-3 text-white transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label
              className="text-sm font-medium text-zinc-300"
              htmlFor="email"
            >
              Email Address
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-500">
                <Mail className="h-4 w-4" />
              </div>
              <input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full rounded-xl border border-zinc-800 bg-zinc-900/50 py-2.5 pl-10 pr-3 text-white transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label
                className="text-sm font-medium text-zinc-300"
                htmlFor="password"
              >
                Password
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-500">
                  <Lock className="h-4 w-4" />
                </div>
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full rounded-xl border border-zinc-800 bg-zinc-900/50 py-2.5 pl-10 pr-3 text-white transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label
                className="text-sm font-medium text-zinc-300"
                htmlFor="verifyPassword"
              >
                Verify
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-500">
                  <Lock className="h-4 w-4" />
                </div>
                <input
                  id="verifyPassword"
                  type="password"
                  placeholder="••••••••"
                  value={VerifyPassword}
                  onChange={(e) => setVerifyPassword(e.target.value)}
                  className="block w-full rounded-xl border border-zinc-800 bg-zinc-900/50 py-2.5 pl-10 pr-3 text-white transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  required
                />
              </div>
            </div>
          </div>

          {error && (
            <div className="rounded-lg bg-destructive/10 p-3 text-xs text-destructive">
              <p className="font-semibold">Sign-up Error</p>
              <p>{error.message}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="group relative flex w-full items-center justify-center rounded-xl bg-white px-4 py-3 text-sm font-semibold text-black transition-all hover:bg-zinc-200 focus:outline-none focus:ring-2 focus:ring-white/20 disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <>
                Create Account
                <UserPlus className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 text-center text-xs text-zinc-500">
          <p>
            Already have an account?{" "}
            <LinkNext
              href="/login"
              className="font-medium text-white hover:underline"
            >
              Sign In
            </LinkNext>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
