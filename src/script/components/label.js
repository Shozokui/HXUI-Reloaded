import { truncate } from "../helpers";

const Label = ({ text, color, fontProps, maxLength, customBounds }) => {
  const max = maxLength;
  const s = Snap(
    customBounds ? customBounds.width : "100%",
    customBounds ? customBounds.height : 50
  );

  const gray_gradient = s.gradient("l(0,0,0,1)#e7ebef-#c5cde0");
  const blue_gradient = s.gradient("l(0,0,0,1)#7AC6EF-#3697CD");
  const white_gradient = s.gradient("l(0,0,0,1)#FFF8EB-#E4DED0");
  const mid_range_gradient = s.gradient("l(0,0,0,1)#C08C3D-#ECC769");
  const low_range_gradient = s.gradient("l(0,0,0,1)#C0553D-#ECA069");
  const critical_gradient = s.gradient("l(0,0,0,1)#E06A6A-#FF9A9A");
  const fill_green = s.gradient("l(0,0,0,1)#98B958-#C0E17E");

  const colors = {
    gray: gray_gradient,
    blue: blue_gradient,
    white: white_gradient,
    yellow: mid_range_gradient,
    orange: low_range_gradient,
    red: critical_gradient,
    green: fill_green,
  };

  const txt = s.text(
    fontProps["text-anchor"] === "end" ? "100%" : 1,
    "90%",
    maxLength ? truncate(text, maxLength) : text
  );
  txt.attr({
    ...{
      fill: color ? colors[color] : white_gradient,
      stroke: "#000",
      "stroke-width": "0.2rem",
      "font-size": "6rem",
      "line-height": 14,
      "letter-spacing": -5,
      "font-family": "Roboto",
      "font-weight": 900,
      "font-style": "italic",
      "transform-origin": "top center",
    },
    ...fontProps,
  });

  const updateBounds = (bounds) => {
    s.attr({
      width: bounds.width + 3,
      height: bounds.height,
    });
  };

  const setText = (text) => {
    txt.attr({ text: max ? truncate(text, max) : text });
    if (!customBounds) updateBounds(txt.getBBox({ stroke: true }));
  };

  if (!customBounds) {
    const bb = txt.getBBox({ clipped: true });
    console.log(bb);
    s.attr({
      width: bb.width + 3,
      height: bb.height,
    });
  }

  return {
    svg: s,
    txt,
    setText,
  };
};
export default Label;
