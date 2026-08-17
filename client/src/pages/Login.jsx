import { useState } from "react";
import { ArrowRight, BookOpen } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import AuthLayout from "../layouts/AuthLayout";

import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

import { loginUser } from "../services/authService";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.email || !form.password) {
      toast.error("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);

      const response = await loginUser(form);

      const data = response.data;

      login(data.user, data.token);

      toast.success("Welcome back!");

      navigate("/");
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Invalid email or password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>

      <div className="grid w-full max-w-4xl overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-xl shadow-indigo-100/40 md:grid-cols-2">

        {/* Left side */}

        <div className="hidden bg-indigo-900 p-10 text-white md:flex md:flex-col md:justify-between">

          <div>

            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
                <BookOpen size={20} />
              </div>

              <span className="font-semibold">
                Revision Buddy
              </span>

            </div>


            <h1 className="mt-16 text-3xl font-semibold leading-tight">
              Study less randomly.
              <br />
              Revise more effectively.
            </h1>

            <p className="mt-5 max-w-sm text-sm leading-6 text-indigo-200">
              Turn your notes and topics into summaries,
              quizzes and flashcards with a little help from AI.
            </p>

          </div>


          <p className="text-xs text-indigo-300">
            Your simple revision workspace.
          </p>

        </div>


        {/* Login */}

        <div className="p-7 sm:p-10">

          <div className="mb-8">

            <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 md:hidden">
              <BookOpen size={19} />
            </div>

            <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
              Welcome back
            </p>

            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-gray-900">
              Sign in to Revision Buddy
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Continue your revision from where you left off.
            </p>

          </div>


          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            <Input
              label="Email"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
            />


            <Input
              label="Password"
              name="password"
              type="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
            />


            <Button
              type="submit"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign in"}

              {!loading && (
                <ArrowRight size={16} />
              )}
            </Button>

          </form>


          <p className="mt-7 text-center text-sm text-gray-500">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-semibold text-indigo-600 hover:text-indigo-700"
            >
              Create one
            </Link>
          </p>

        </div>

      </div>

    </AuthLayout>
  );
};

export default Login;