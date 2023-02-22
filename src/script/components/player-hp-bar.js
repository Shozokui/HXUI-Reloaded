import { Label, ParameterBar } from ".";

const PlayerHpBar = ({ hp, maxHp }) => {
  let value = hp ? hp : 1000,
    maxValue = maxHp ? maxHp : 1000;

  const barStub = `<svg class="bar-stub left" width="7" height="13" viewBox="0 0 7 13" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g filter="url(#filter0_i_1767_5492)">
      <path d="M0 6C0 2.68629 2.68629 0 6 0C6.55228 0 7 0.447715 7 1V12C7 12.5523 6.55228 13 6 13C2.68629 13 0 10.3137 0 7V6Z" fill="url(#paint0_linear_1767_5492)"/>
    </g>
    <defs>
    <filter id="filter0_i_1767_5492" x="0" y="0" width="7" height="13" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
    <feFlood flood-opacity="0" result="BackgroundImageFix"/>
    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
    <feMorphology radius="0.5" operator="erode" in="SourceAlpha" result="effect1_innerShadow_1767_5492"/>
    <feOffset/>
    <feGaussianBlur stdDeviation="0.5"/>
    <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
    <feColorMatrix type="matrix" values="0 0 0 0 0.2 0 0 0 0 0.14902 0 0 0 0 0.0784314 0 0 0 0.5 0"/>
    <feBlend mode="normal" in2="shape" result="effect1_innerShadow_1767_5492"/>
    </filter>
    <linearGradient id="paint0_linear_1767_5492" x1="3.5" y1="0" x2="3.5" y2="13" gradientUnits="userSpaceOnUse">
    <stop stop-color="#142433"/>
    <stop offset="0.458333" stop-color="#B5D0EA"/>
    <stop offset="0.53125" stop-color="#91A7BC"/>
    <stop offset="1" stop-color="#142433"/>
    </linearGradient>
    </defs>
  </svg>`;

  $(barStub).appendTo("#hp-bar");
  $(barStub).removeClass("left").addClass("right").appendTo("#hp-bar");

  const { svg: labelSvg } = Label({
    text: "HP",
    color: "gray",
    fontProps: {
      "font-size": "10px",
      "line-height": "12px",
      "letter-spacing": "-0.01em",
      "stroke-width": 0.6,
    },
  });

  $(labelSvg.node).addClass("label").appendTo("#hp-bar");

  const { svg: barSvg, setValue } = ParameterBar({
    width: 138,
    height: 15,
    color: "red",
    value,
    maxValue,
  });

  $(barSvg.node).addClass("bar");
  $(barSvg.node).appendTo("#hp-bar");

  const { svg: hpLabelSvg, setText: setHp } = Label({
    text: value,
    color: "red",
    fontProps: {
      "font-size": "16px",
      "line-height": "19px",
      "letter-spacing": "-0.01em",
      "stroke-width": 1,
      "text-anchor": "end",
    },
    customBounds: {
      width: 300,
      height: 90,
    },
  });

  $(hpLabelSvg.node).addClass("number").appendTo("#hp-bar");

  const set = (hp, maxHp) => {
    setValue(hp, maxHp);
    setHp(hp);
  };

  return {
    set,
  };
};

export default PlayerHpBar;
