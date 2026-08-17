import { Search } from "lucide-react";

const Navbar = () => {

  return (

    <header
      className="
      h-16
      bg-white
      border-b
      border-gray-200
      flex
      items-center
      justify-between
      px-8
      "
    >

      <div
        className="
        flex
        items-center
        gap-3
        border
        rounded-lg
        px-3
        py-2
        w-80
        "
      >

        <Search
          size={18}
          className="text-gray-400"
        />

        <input
          placeholder="Search documents..."
          className="
          flex-1
          outline-none
          "
        />

      </div>

      <div
        className="
        flex
        items-center
        gap-3
        "
      >

        <div
          className="
          h-10
          w-10
          rounded-full
          bg-blue-600
          text-white
          flex
          items-center
          justify-center
          "
        >

          S

        </div>

      </div>

    </header>

  );

};

export default Navbar;