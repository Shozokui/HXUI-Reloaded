import { PlayerHpBar, PlayerMpBar, PlayerTpBar } from ".";

const PlayerBar = () => {
  const { set: setHp } = PlayerHpBar({ hp: 1000, maxHp: 1000 });
  const { set: setMp } = PlayerMpBar({ mp: 300, maxMp: 300 });
  const { set: setTp } = PlayerTpBar({ tp: 0 });

  let val = 1000;
  setInterval(() => {
    val -= 5;
    if (val <= 0) val = 1000;
    setHp(val, 1000);
  }, 100);

  let mpVal = 300;
  setInterval(() => {
    mpVal -= 1;
    if (mpVal <= 0) val = mpVal = 300;
    setMp(mpVal, 300);
  }, 30);

  let tpVal = 0;
  setInterval(() => {
    tpVal += 100;
    if (tpVal >= 3000) tpVal = 0;
    setTp(tpVal);
  }, 100);
};
export default PlayerBar;
