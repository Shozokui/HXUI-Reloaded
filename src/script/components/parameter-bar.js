const ParameterBar = ({ width, height, color, value, maxValue }) => {
  let max = maxValue ? maxValue : 1000,
    val = value ? value : 500;
  let perc = val / max;

  const s = Snap(width + 2, height + 2);
  const bg_color = s.gradient("r(0,1,5)#08213F-#00112A");

  const fill_blue = s.gradient("l(0,0,0,1)#3596cc-#7bc6ef");
  const fill_red = s.gradient("l(0,0,0,1)#E06A6A-#FF9A9A");
  const fill_green = s.gradient("l(0,0,0,1)#98B958-#C0E17E");
  const fill_yellow = s.gradient("l(0,0,0,1)#C08C3D-#ECC769");

  const colors = {
    blue: fill_blue,
    red: fill_red,
    green: fill_green,
    yellow: fill_yellow,
  };

  const bg = s.rect(1, 1, width, height, 7);
  bg.attr({
    fill: bg_color,
    stroke: "#01112A",
    "stroke-width": 1,
  });

  const fill = s.rect(10.5, 2.5, width - 24, height - 3, 2);
  fill.attr({
    fill: color ? colors[color] : fill_blue,
    width: Math.round((width - 25) * perc),
  });

  const setValue = (current, maxVal) => {
    if (maxVal) max = maxVal;
    val = current;
    perc = val / max;

    fill.animate({ width: Math.round((width - 24) * perc) }, 100, mina.linear);
  };

  const bounds = bg.getBBox({ stroke: true });
  s.attr({});

  return {
    svg: s,
    setValue,
  };
};
export default ParameterBar;
