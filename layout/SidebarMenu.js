import { Logo } from "ui";
import Menu from "./Sidebar/Menu";
import { useAppState } from "components/AppProvider";

const SidebarContent = () => {
  const [state] = useAppState();

  return (
    <div
      className={`h-full flex flex-col flex-1 bg-${state.sidebarColor}-600 transition-all duration-150 ease-in-out dark:shadow-lg border-r border-${state.sidebarColor}-600`}
    >
      <div className={`flex items-center justify-between flex-wrap h-16 mx-3`}>
        <a className="flex items-center text-white px-2 py-3 w-full">
          <span className="flex font-medium items-center md:justify-start justify-start">
            <Logo height={24} width={24} />{" "}
            <span className="ltr:ml-4 rtl:mr-4 font-bold text-base">
              {state.name}
            </span>
          </span>
        </a>
      </div>

      <Menu />
    </div>
  );
};

export default SidebarContent;
