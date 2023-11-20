import { searchInp } from "../main";
import { deleteData, patchData } from "./http";

export function dragStart() {
  let bin = document.querySelector(".trush_bin");
  bin.classList.add("visible");
  searchInp.value = "";
  this.id = "marked";
  this.className += " hold";
  setTimeout(() => (this.className = "invisible"), 0);
}

export function dragEnd() {
  this.removeAttribute("id");
  this.className = "task";
  let bin = document.querySelector(".trush_bin");
  bin.classList.remove("visible");
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
  this.className = "item_mid";
  let status = this.getAttribute("data-status");
  let id = marked_div.getAttribute("data-id");

  patchData(`/tasks/${id}`, {
    status: status,
  }).then((res) => {
    if (res.status !== 200 && res.status !== 201) {
      alert("Smth went wrong. Try again please");
      return;
    }
  });
  this.append(marked_div);
}

export function ondragenter(event) {
  event.preventDefault();
}
export function ondragleave() {
  this.className = "trush_bin";
}

export function ondropbin() {
  let marked_div = document.getElementById("marked");
  let id = marked_div.getAttribute("data-id");

  console.log(id);

  deleteData("/tasks/", id).then((res) => {
    if (res.status !== 200 && res.status !== 201) return;
    marked_div.remove();
  });
}
