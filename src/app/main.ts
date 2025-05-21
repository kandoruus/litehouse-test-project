import "./styles.css";
import AppStore from "./data/AppStore";

const initApp = (): void => {
  const appStore: AppStore = AppStore.instance;
  appStore.load();
};

document.addEventListener("DOMContentLoaded", initApp);
