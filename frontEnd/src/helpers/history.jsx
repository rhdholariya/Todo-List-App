import { createBrowserHistory as createHistory } from "history";

const history = createHistory();
history.listen(function (loc) {
  if (loc.action === "POP") {
    return;
  }

  // Allow the client to control scroll-to-top using location.state
  if (loc.state && loc.state.scroll !== undefined && !loc.state.scroll) {
    return;
  }

  // 200ms delay
  setTimeout(() => {
    window.scrollTo(0, 0);
  }, 200);
});

export default history;
