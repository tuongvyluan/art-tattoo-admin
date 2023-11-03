import { createContext, useContext, useEffect, useReducer } from "react";

const Context = createContext();
const { Provider } = Context;
let phone, prefersDark;

const saveToLocal = (state) => {
  let stateCopy = { ...state };
  delete stateCopy.mobile;
  delete stateCopy.name;
  localStorage.setItem("settings", JSON.stringify(stateCopy));
};

const reducer = (state, action) => {
  switch (action.type) {
    case "toggleFullscreen": {
      const element = document.querySelector("html");
      const isFullscreen =
        document.webkitIsFullScreen || document.mozFullScreen || false;

      element.requestFullScreen =
        element.requestFullScreen ||
        element.webkitRequestFullScreen ||
        element.mozRequestFullScreen ||
        function () {
          return false;
        };

      document.cancelFullScreen =
        document.cancelFullScreen ||
        document.webkitCancelFullScreen ||
        document.mozCancelFullScreen ||
        function () {
          return false;
        };

      isFullscreen ? document.cancelFullScreen() : element.requestFullScreen();

      return { ...state, fullscreen: !isFullscreen };
    }
    case "toggleCollapsed": {
      const newState = {
        ...state,
        collapsed:
          typeof action.value !== "undefined" ? action.value : !state.collapsed,
      };
      saveToLocal(newState);
      return newState;
    }
    case "toggleDarkMode": {
      const newState = {
        ...state,
        darkMode:
          typeof action.value !== "undefined" ? action.value : !state.darkMode,
      };
      saveToLocal(newState);
      return newState;
    }
    case "setMobile": {
      return {
        ...state,
        mobile:
          typeof action.value !== "undefined" ? action.value : !phone.matches,
      };
    }
    case "toggleStickySidebar": {
      const newState = {
        ...state,
        stickySidebar:
          typeof action.value !== "undefined"
            ? action.value
            : !state.stickySidebar,
      };
      saveToLocal(newState);
      return newState;
    }
    case "toggleAutoDarkMode": {
      let newState = {
        ...state,
        autoDarkMode:
          typeof action.value !== "undefined"
            ? action.value
            : !state.autoDarkMode,
      };
      return newState;
    }
    case "setSidebarColor": {
      const newState = { ...state, sidebarColor: action.value };
      saveToLocal(newState);
      return newState;
    }
    case "setLanguage": {
      const newState = { ...state, language: action.value };
      saveToLocal(newState);
      return newState;
    }
    case "initialSetup": {
      const settings = JSON.parse(localStorage.getItem("settings"));
      return {
        ...state,
        mobile: !phone.matches,
        ...settings,
      };
    }
    default:
      return state;
  }
};

const AppProvider = (props) => {
  //Template default options
  const [state, dispatch] = useReducer(reducer, {
    name: "ATL",
    mobile: false,
    stickyHeader: true,
    stickySidebar: true,
    collapsed: false,
    fullscreen: false,
    sidebarColor: "gray",
    rtl: false,
    darkMode: false,
    autoDarkMode: false,
    language: "en",
  });

  useEffect(() => {
    phone = window.matchMedia(`(min-width: 768px)`);
    phone.addListener(mediaQueryChanged);
    dispatch({ type: "initialSetup" });
    return () => {
      phone.removeListener(mediaQueryChanged);
    };
  }, []);

  useEffect(() => {
    if(state.darkMode) document.body.classList.add("dark");
    else document.body.classList.remove("dark");
  }, [state.darkMode])

  const mediaQueryChanged = () => {
    dispatch({ type: "setMobile" });
  };

  return <Provider value={[state, dispatch]}>{props.children}</Provider>;
};

export default AppProvider;
export const useAppState = () => useContext(Context);
