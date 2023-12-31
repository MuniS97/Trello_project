import { dragDrop, dragEnter, dragLeave, dragOver, del } from "./modules/dragNdrop";
import { getData } from "./modules/helpers";
import { reload_tasks } from "./modules/ui";



export let TASK_BOXES = document.querySelectorAll(".item_mid");

let basket = document.querySelector('.basket')
basket.ondragover = dragOver
basket.ondrop = dragDrop
basket.ondrop = del

getData("/tasks").then((res) => {
    reload_tasks(res.data, TASK_BOXES);
});

TASK_BOXES.forEach((box) => {
    box.ondragover = dragOver;
    box.ondragenter = dragEnter;
    box.ondragleave = dragLeave;
    box.ondrop = dragDrop;
});
