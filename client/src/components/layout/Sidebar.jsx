import { NavLink } from "react-router-dom";
import { navigation } from "../../config/navigation";

const Sidebar = () => {

  return (

    <aside
      className="
      w-64
      bg-white
      border-r
      border-gray-200
      flex
      flex-col
      "
    >

      <div className="px-6 py-6">

        <h1 className="text-xl font-semibold">

          Revision Buddy

        </h1>

      </div>

      <nav className="flex-1 px-3">

        {
          navigation.map((item) => {

            const Icon = item.icon;

            return (

              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `
                  flex
                  items-center
                  gap-3
                  px-4
                  py-3
                  rounded-lg
                  mb-2
                  transition

                  ${
                    isActive
                      ? "bg-blue-50 text-blue-600"
                      : "hover:bg-gray-100"
                  }
                  `
                }
              >

                <Icon size={20} />

                {item.title}

              </NavLink>

            );

          })
        }

      </nav>

    </aside>

  );

};

export default Sidebar;