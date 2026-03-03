"use client";
import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";
import { useRouter } from "next/navigation";
import { Loader2, Mail, Lock, LogIn } from "lucide-react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
const userFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
type ILoginInput = z.infer<typeof userFormSchema>;

const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`;

const Login = () => {
  const { handleSubmit, register } = useForm<z.infer<typeof userFormSchema>>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const router = useRouter();
  const [login, { loading, error }] = useMutation<{ login: string }>(LOGIN);

  const onSubmit = async (formData: ILoginInput) => {
    try {
      const { data } = await login({
        variables: {
          email: formData.email,
          password: formData.password,
        },
      });

      if (data?.login) {
        localStorage.setItem("token", data.login);
        router.push("/");
      }
    } catch (err) {
      console.error("Login failed:", err);
    }
  };
  return (
    <div className="flex items-center justify-center p-4">
      <div className="w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-black/40 p-8 shadow-2xl backdrop-blur-xl transition-all hover:border-white/20">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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
                {...register("email")}
                className="block w-full rounded-xl border border-zinc-800 bg-zinc-900/50 py-2.5 pl-10 pr-3 text-white transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                required
              />
            </div>
          </div>

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
                {...register("password")}
                className="block w-full rounded-xl border border-zinc-800 bg-zinc-900/50 py-2.5 pl-10 pr-3 text-white transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                required
              />
            </div>
          </div>

          {error && (
            <div className="rounded-lg bg-destructive/10 p-3 text-xs text-destructive">
              <p className="font-semibold">Login Error</p>
              <p>{error.message}</p>
            </div>
          )}

          <button
            onClick={handleSubmit(onSubmit)}
            disabled={loading}
            className="group relative flex w-full items-center justify-center rounded-xl bg-white px-4 py-3 text-sm font-semibold text-black transition-all hover:bg-zinc-200 focus:outline-none focus:ring-2 focus:ring-white/20 disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <>
                Sign In
                <LogIn className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 text-center text-xs text-zinc-500">
          <p>
            Don't have an account?{" "}
            <Link
              href="/sign-up"
              className="font-medium text-white hover:underline"
            >
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
