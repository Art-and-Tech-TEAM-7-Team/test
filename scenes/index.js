import { makeStartSketch } from "./start.js";
import { makeHouseSketch } from "./move.js";
import { makeDeskSketch } from "./desk.js";
// import { makeParkSketch } from "./park.js";
import { makeCoffeeSHopSketch } from "./coffeeShop.js";
import { makeCarInsideSketch } from "./carInside.js";
import { makeContrastSketch } from "./contrast.js";
import { makeCompanySketch } from "./company.js";
import { makeEndingcreditSketch } from "./endingcredit.js";
import { make교통통Sketch } from "./sketch.js";

export const SCENE_MAP = {
  start:        () => makeStartSketch(),
  house:        () => makeHouseSketch(),
  desk:         () => makeDeskSketch(),
  // park:         () => makeParkSketch(),
  coffeeShop:   () => makeCoffeeSHopSketch(),
  carInside:    () => makeCarInsideSketch(),
  contrast:     () => makeContrastSketch(),
  company:      () => makeCompanySketch(),
  endingcredit: () => makeEndingcreditSketch(),
  sketch:       () => make교통통Sketch()
};

// 이벤트 이름 <-> 장면 이름 매핑 (scene 추가/수정시 여기만 고치면 됨)
export const EVENT_TO_SCENE = {
  goToHouse: "house",
  goToDesk: "desk",
  // goToPark: "park",
  goToCoffeeShop: "coffeeShop",
  goToContrast: "contrast",
  goToCompany: "company",
  goToEndingcredit: "endingcredit",
  goToCar: "carInside",
  goToStair: "sketch"
};