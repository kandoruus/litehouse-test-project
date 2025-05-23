import { CARDS_PER_PAGE, KITSU_DEFAULT_URL, KITSU_HEADERS } from "./utils/constants";
import MediaCardList from "./components/MediaCardList";
import PaginationControlBar from "./components/PaginationControlBar";
import AppState from "./state/AppState";
import "./styles.css";

// Entry point of the application
const initApp = async (): Promise<void> => {
  // Access the singleton instance of the AppState
  const state: AppState = AppState.instance;

  // Create a new instance of MediaCardList with the configured number of cards per page
  const main = document.getElementById("main") as HTMLElement;
  const mediaCardList: MediaCardList = new MediaCardList(CARDS_PER_PAGE);
  main.appendChild(mediaCardList);

  // Append the pagination bar to the footer element in the DOM
  const footer = document.getElementById("footer") as HTMLElement;
  const paginationBar: PaginationControlBar = new PaginationControlBar(state.handlePageChange);
  footer.appendChild(paginationBar);

  // Initialize the application state with configuration and the media card list update callback
  await state.init(
    CARDS_PER_PAGE,
    KITSU_DEFAULT_URL,
    KITSU_HEADERS,
    mediaCardList.updateMediaCardList
  );

  // Set the last page number in the pagination bar after state initialization
  paginationBar.lastPageNum = state.lastPageNum;

  // Append the media card list to the main container in the DOM
};

// Ensure the app initialization runs after the DOM is fully loaded
document.addEventListener("DOMContentLoaded", initApp);
