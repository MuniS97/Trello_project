import { deleteData, getData, patchData } from "./http";

export function dragStart() {
  this.id = "marked";
  this.className += " hold";
  setTimeout(() => (this.className = "invisible"), 0);
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
  this.className = "item_mid";
  let status = this.getAttribute("data-status");

  getData("/tasks").then((res) => {
    res.data.forEach((task) => {
      if (task.title == marked_div.innerHTML) {
        patchData(`/tasks/${task.id}`, { status: status }).then((res) => {
          if (res.status !== 200 && res.status !== 201) {
            alert("Smth went wrong. Try again please");
            return;
          }
        });
      }
    });
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
  getData("/tasks").then((res) => {
    res.data.forEach((task) => {
      if (task.title == marked_div.innerHTML) {
        deleteData("/tasks/", task.id).then((res) => {
          if (res.status !== 200 && res.status !== 201) return;
          marked_div.remove();
        });
      }
    });
  });
}
