import { CARDS_PER_PAGE, KITSU_DEFAULT_URL, KITSU_HEADERS } from "./app_definitions/constants";
import MediaCardList from "./components/MediaCardList";
import PaginationControlBar from "./components/PaginationControlBar";
import AppState from "./state/AppState";
import "./styles.css";

const initApp = async (): Promise<void> => {
  const mediaCardList: MediaCardList = new MediaCardList(CARDS_PER_PAGE);
  const state: AppState = AppState.instance;
  const paginationBar: PaginationControlBar = new PaginationControlBar(state.handlePageChange);

  const footer = document.getElementById("footer") as HTMLElement;
  footer.appendChild(paginationBar);

  await state.init(
    CARDS_PER_PAGE,
    KITSU_DEFAULT_URL,
    KITSU_HEADERS,
    mediaCardList.updateMediaCardList
  );
  paginationBar.lastPageNum = state.lastPageNum;

  const main = document.getElementById("main") as HTMLElement;
  main.appendChild(mediaCardList);
};

document.addEventListener("DOMContentLoaded", initApp);
