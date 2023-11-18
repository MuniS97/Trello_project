import { garbage } from "../main";
import axios from "axios";
import { editData, getData, deleteData} from "./http";

export function dragStart() {
  this.id = "marked";
  this.className += " hold";
  setTimeout(() => (this.className = "invisible"), 0);
  //   console.log(this);
}

export function dragEnd() {
  this.removeAttribute("id");
  this.className = "task";
}

export function dragOver(event) {
  event.preventDefault();
}

export function dragEnter(event) {
  event.preventDefault();
  this.className += " hovered";
}

export function dragLeave() {
  this.className = "item_mid";
}

export function dragDrop() {
  let marked_div = document.getElementById("marked");
  let task_id = marked_div.getAttribute("data-id");
  let box_id = this.getAttribute("data-status");

  this.className = "item_mid";

  this.append(marked_div);

  getData("/tasks").then((res) => {
    let given_task = res.data.find((task) => task.id == task_id);

    if (res.status !== 200 && res.status !== 201) return;

    editData("/tasks/" + given_task.status, { status: box_id })
    .then((res) => {
      if (res.status !== 200 && res.status !== 201) return;
      console.log("code goes");
    });
  });
}
export function garbagedrop() {
  let marked_div = document.getElementById("marked");

  let id = marked_div.getAttribute("data-id");
  console.log(id);

  deleteData(id)

}
export function garbageenter() {
  garbage.classList.add("garbage_active");
}
export function garbageleave() {
  garbage.classList.remove("garbage_active");
}
