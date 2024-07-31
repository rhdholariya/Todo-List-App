import { createBrowserHistory as createHistory, Update } from "history";

const history = createHistory();

history.listen((update: Update) => {
  if (update.action === "POP") {
    return;
  }
  if (update.location.state && (update.location.state as { scroll?: boolean }).scroll !== undefined && !(update.location.state as { scroll?: boolean }).scroll) {
    return;
  }
  setTimeout(() => {
    window.scrollTo(0, 0);
  }, 200);
});

export default history;
