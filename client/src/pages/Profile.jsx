import {
  Mail,
  UserRound,
} from "lucide-react";

import MainLayout from "../layouts/MainLayout";
import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const { user } = useAuth();

  const name = user?.name || "User";
  const email = user?.email || "No email available";

  const initial =
    name.charAt(0).toUpperCase();

  return (
    <MainLayout>

      <div className="mx-auto max-w-2xl">

        <div className="mb-8">

          <p className="text-xs font-semibold uppercase tracking-wider text-[#4f46e5]">
            Account
          </p>

          <h1 className="mt-2 text-2xl font-semibold tracking-[-0.025em] text-[#25233a]">
            Your profile
          </h1>

          <p className="mt-2 text-sm text-[#858397]">
            A few details about your Revision Buddy account.
          </p>

        </div>


        <div className="overflow-hidden rounded-2xl border border-[#e4e3eb] bg-white shadow-sm">

          <div className="bg-[#312e81] px-7 py-8">

            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-xl font-bold text-[#4f46e5]">
              {initial}
            </div>

            <h2 className="mt-5 text-xl font-semibold text-white">
              {name}
            </h2>

            <p className="mt-1 text-sm text-indigo-200">
              Revision Buddy user
            </p>

          </div>


          <div className="divide-y divide-[#ecebf1]">

            <div className="flex items-center gap-4 px-7 py-5">

              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#f7f7fb] text-[#77758a]">
                <UserRound size={17} />
              </div>

              <div>
                <p className="text-xs text-[#aaa8b6]">
                  Name
                </p>

                <p className="mt-1 text-sm font-medium text-[#25233a]">
                  {name}
                </p>
              </div>

            </div>


            <div className="flex items-center gap-4 px-7 py-5">

              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#f7f7fb] text-[#77758a]">
                <Mail size={17} />
              </div>

              <div>
                <p className="text-xs text-[#aaa8b6]">
                  Email
                </p>

                <p className="mt-1 text-sm font-medium text-[#25233a]">
                  {email}
                </p>
              </div>

            </div>

          </div>

        </div>


        <p className="mt-6 text-center text-xs text-[#aaa8b6]">
          Keep learning. Keep revising.
        </p>

      </div>

    </MainLayout>
  );
};

export default Profile;