import { useState } from "react";
import { ArrowRight, BookOpen } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import AuthLayout from "../layouts/AuthLayout";

import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

import { registerUser } from "../services/authService";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
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

    if (
      !form.name ||
      !form.email ||
      !form.password ||
      !form.confirmPassword
    ) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (form.password.length < 6) {
      toast.error(
        "Password must be at least 6 characters."
      );
      return;
    }

    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      await registerUser({
        name: form.name,
        email: form.email,
        password: form.password,
      });

      toast.success(
        "Account created successfully. Please login."
      );

      navigate("/login");

    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Registration failed."
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
              Your notes.
              <br />
              Your revision buddy.
            </h1>

            <p className="mt-5 max-w-sm text-sm leading-6 text-indigo-200">
              Get concise summaries, practice quizzes and
              flashcards from the material you're studying.
            </p>

          </div>


          <p className="text-xs text-indigo-300">
            Simple tools for better revision.
          </p>

        </div>


        {/* Register */}

        <div className="p-7 sm:p-10">

          <div className="mb-7">

            <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 md:hidden">
              <BookOpen size={19} />
            </div>

            <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
              Get started
            </p>

            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-gray-900">
              Create your account
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Set up your workspace and start revising.
            </p>

          </div>


          <form
            onSubmit={handleSubmit}
            className="space-y-4"
          >

            <Input
              label="Name"
              name="name"
              type="text"
              placeholder="Your name"
              value={form.name}
              onChange={handleChange}
            />


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
              placeholder="At least 6 characters"
              value={form.password}
              onChange={handleChange}
            />


            <Input
              label="Confirm password"
              name="confirmPassword"
              type="password"
              placeholder="Enter password again"
              value={form.confirmPassword}
              onChange={handleChange}
            />


            <div className="pt-2">

              <Button
                type="submit"
                disabled={loading}
              >
                {loading
                  ? "Creating account..."
                  : "Create account"}

                {!loading && (
                  <ArrowRight size={16} />
                )}
              </Button>

            </div>

          </form>


          <p className="mt-6 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-indigo-600 hover:text-indigo-700"
            >
              Sign in
            </Link>
          </p>

        </div>

      </div>

    </AuthLayout>
  );
};

export default Register;