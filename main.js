import {
  dragDrop,
  dragEnter,
  dragLeave,
  dragOver,
  garbagedrop,
  garbageenter,
  garbageleave,
} from "./modules/dragNdrop";
import { getData } from "./modules/http";
import { reload_tasks, searcher_fun } from "./modules/ui";
// let searcher = document.querySelector(".searcher_inp");
// let main = document.querySelector(".content");
// let aside = document.querySelector("aside");
// searcher.onfocus = function() {
//   main.classList.add("blur");
//   aside.classList.add("blur");
// };
// searcher.onblur = function() {
//   main.classList.remove("blur");
//   aside.classList.remove("blur");
// };

export let TASK_BOXES = document.querySelectorAll(".item_mid");
export let garbage = document.querySelector(".garbage");
getData("/tasks").then((res) => {
  reload_tasks(res.data, TASK_BOXES);
  searcher_fun(res.data);
});

TASK_BOXES.forEach((box) => {
  box.ondragover = dragOver;
  box.ondragenter = dragEnter;
  box.ondragleave = dragLeave;
  box.ondrop = dragDrop;
});

garbage.ondragover = dragOver;
garbage.ondragenter = garbageenter;
garbage.ondragleave = garbageleave;
garbage.ondrop = garbagedrop;
