const AuthLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f7f7fb] px-5 py-10">

      <div className="w-full">
        {children}
      </div>

    </div>
  );
};

export default AuthLayout;