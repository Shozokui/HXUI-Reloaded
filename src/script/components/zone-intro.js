import { Label } from ".";

const ZoneIntro = () => {
  const { svg: h2, txt: h2txt } = Label({
    text: "Republic of Bastok",
    color: "gray",
    fontProps: {
      "font-size": "20px",
      "font-weight": 900,
      "font-style": "italic",
      "line-height": "23.44px",
      "letter-spacing": "-0.01em",
      "text-transform": "uppercase",
      "stroke-width": 1,
    },
  });
  h2txt.attr({ opacity: 0, transform: "scale(0.9)" });
  $(h2.node).appendTo("#zone-intro");

  const { svg: h1, txt: h1txt } = Label({
    text: "Bastok Markets",
    color: "gray",
    fontProps: {
      "font-size": "96px",
      "font-weight": 400,
      "font-style": "italic",
      "line-height": "96px",
      "letter-spacing": "0.04em",
      "font-family": "Highwind Italic",
      "text-transform": "uppercase",
      "stroke-width": 1,
    },
    customBounds: {
      width: 457,
      height: 97,
    },
  });
  h1txt.attr({ opacity: 0, transform: "scale(0.9)" });
  $(h1.node).appendTo("#zone-intro");

  const animateIn = () => {
    h2txt.animate({ opacity: 1, transform: "scale(1.2)" }, 1000, mina.easein);
    setTimeout(
      () =>
        h1txt.animate(
          { opacity: 1, transform: "scale(1.2)" },
          1000,
          mina.easein
        ),
      500
    );
  };

  const animateOut = () => {
    h2txt.animate({ opacity: 0 }, 250, mina.linear, () =>
      h2txt.attr({ transform: "scale(0.9) translateY(25)" })
    );
    h1txt.animate({ opacity: 0 }, 250, mina.linear, () =>
      h1txt.attr({ transform: "scale(0.9) translateY(25)" })
    );
  };

  return {
    animateIn,
    animateOut,
  };
};
export default ZoneIntro;
