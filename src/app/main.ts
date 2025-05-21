import "./styles.css";
import AppStore from "./data/AppStore";
import NavBar from "./components/NavBar";

const initApp = (): void => {
  const appStore: AppStore = AppStore.instance;
  const footer = document.getElementById("footer") as HTMLElement;
  footer.appendChild(new NavBar());
  appStore.load();
};

document.addEventListener("DOMContentLoaded", initApp);
