import axios from "axios"
import { dragDrop, dragEnter, dragLeave, dragOver } from "./modules/dragNdrop"
import { getData } from "./modules/http"
import { reload_tasks } from "./modules/ui"

export let TASK_BOXES = document.querySelectorAll(".item_mid");
export let garbage = document.querySelector(".garbage");
getData("/tasks").then((res) => {
  reload_tasks(res.data, TASK_BOXES);
});

TASK_BOXES.forEach((box) => {
  box.ondragover = dragOver;
  box.ondragenter = dragEnter;
  box.ondragleave = dragLeave;
  box.ondrop = dragDrop;
});



let delete_tasks = document.querySelector('.delete_task img')


delete_tasks.ondragover = dragOver

delete_tasks.ondragenter = dragEnter

delete_tasks.ondragleave = dragLeave



delete_tasks.ondrop = () => {

    let task_sucsess = document.getElementById("marked");

    getData("/tasks").then((res) => {
        res.data.forEach((item) => {
            if (item.title == task_sucsess.innerText) {
                axios.delete(import.meta.env.VITE_BASE_URL + "/tasks/" + item.id).then((res) => {
                    if (res.status !== 200 && res.status !== 201) return;
                    task_sucsess.remove();
                });
            }
        });
    });

}


