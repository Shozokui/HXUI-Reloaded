import { PlayerBar, ZoneIntro } from "./components";

const documentReady = () => {
  // Label({
  //   text: "Shozokui",
  //   color: "blue",
  //   fontProps: {
  //     "font-size": "4.5rem",
  //   },
  // });
  PlayerBar();

  const { animateIn, animateOut } = ZoneIntro();
  setTimeout(() => animateIn(), 1000);
  setTimeout(() => animateOut(), 3000);
};

document.addEventListener("DOMContentLoaded", documentReady);
