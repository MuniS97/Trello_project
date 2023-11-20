import {
  dragDrop,
  dragEnter,
  dragLeave,
  dragOver,
  ondragenter,
  ondragleave,
  ondropbin,
} from "./modules/dragNdrop";
import { getData } from "./modules/http";
import { reload_tasks } from "./modules/ui";

export let TASK_BOXES = document.querySelectorAll(".item_mid");
let trushBin = document.querySelector(".trush_bin");
export let searchInp = document.querySelector(".searcher_inp");
let body = document.querySelector("main");

getData("/tasks").then((res) => {
  if (res.status !== 200 && res.status !== 201) return;
  reload_tasks(res.data, TASK_BOXES);
});

TASK_BOXES.forEach((box) => {
  box.ondragover = dragOver;
  box.ondragenter = dragEnter;
  box.ondragleave = dragLeave;
  box.ondrop = dragDrop;
});

trushBin.ondragover = dragOver;
trushBin.ondragenter = ondragenter;
trushBin.ondragleave = ondragleave;
trushBin.ondrop = ondropbin;

searchInp.onfocus = () => {
  body.classList.add("blur");
};
searchInp.onblur = () => {
  body.classList.remove("blur");
};

searchInp.onkeyup = () => {
  let value = searchInp.value.trim();

  getData("/tasks").then((res) => {
    res.data.filter((item) => {
      let tasks = document.querySelectorAll(".task");

      if (item.title == value) {
        tasks.forEach((task) => {
          task.classList.remove("fond");

          if (task.innerHTML.includes(value)) {
            let y = task.getBoundingClientRect().y;
            window.scrollTo({ top: y - 200, left: 0, behavior: "smooth" });
            task.classList.add("fond");
          }
        });
      }
    });
  });
};
