import "./styles.css";
import AppStore from "./data/AppStore";
import MediaModal from "./components/MediaModal";

const initApp = (): void => {
  const mediaModal: MediaModal = new MediaModal();
  document.body.appendChild(mediaModal);
  mediaModal.show();
  const appStore: AppStore = AppStore.instance;
  appStore.load();
};

document.addEventListener("DOMContentLoaded", initApp);
