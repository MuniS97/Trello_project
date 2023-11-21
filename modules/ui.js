import { dragEnd, dragStart } from "./dragNdrop";
import { getData } from "./http";
let searcher = document.querySelector(".searcher_inp");
let main = document.querySelector(".content");
let aside = document.querySelector("aside");
searcher.onfocus = function () {
  main.classList.add("blur");
  aside.classList.add("blur");
};
export function reload_tasks(arr, places) {
  places.forEach((el) => (el.innerHTML = ""));

  for (let item of arr) {
    let div = document.createElement("div");
    let b = document.createElement("b");
    let p = document.createElement("p");
    let deadline = document.createElement("span");
    let participants = document.createElement("p");

    div.classList.add("task");
    div.setAttribute("draggable", true);
    div.setAttribute("data-id", item.id);
    deadline.classList.add("deadline");
    b.classList.add("title");
    p.classList.add("description");
    participants.classList.add("participants");

    b.innerHTML = item.title;
    p.innerHTML = item.description;
    deadline.innerHTML = item.deadline;
    participants.innerHTML = item.participants;

    places[item.status].append(div);
    div.append(participants, b, p, deadline);

    // div.dataset.id;
    div.ondragstart = dragStart;
    div.ondragend = dragEnd;
  }
}
export function searcher_fun(arr) {
  let tasks = document.querySelectorAll(".task");
  searcher.oninput = function () {
    for (let item of arr) {
      let val = searcher.value;
      let title = item.title;

      if (title.includes(val)) {
        tasks.forEach((task) => {
          let rect = task.getBoundingClientRect();
          console.log(rect.top);
          if (task.dataset.id == item.id) {
            task.classList.add("found");
            console.log(task);
          } else {
            task.classList.remove("found");
          }
          searcher.onblur = () => {
            main.classList.remove("blur");
            aside.classList.remove("blur");
            task.classList.remove("found");
          };
        });
      }
    }
  };
}
