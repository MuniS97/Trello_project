import {
	garbage
} from "../main";
import axios from "axios";
import {
	editData,
	getData,
	deleteData
} from "./http";
import { reload_tasks } from "./ui";

export function dragStart() {
	garbage.classList.add('visible')
	this.id = "marked";
	this.className += " hold";
	setTimeout(() => (this.className = "invisible"), 0);
	//   console.log(this);
}

export function dragEnd() {
	garbage.classList.remove('visible')
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

	editData("/tasks/" + task_id, {
			status: box_id
		})
		.then((res) => {
			if (res.status !== 200 && res.status !== 201) return;
		});
}
export function garbagedrop() {
	let marked_div = document.getElementById("marked");

	let id = marked_div.getAttribute("data-id");
	if(navigator.onLine) {
		marked_div.classList.add('invisible')
		deleteData("/tasks/" + id)
			.then(res => {
				if(res.status !== 200 && res.status !== 201) {
					alert('error')
				}
			})
			marked_div.remove()
	} else {
		alert('connection error')
	}
}
export function garbageenter() {
	garbage.classList.add("garbage_active");
}
export function garbageleave() {
	garbage.classList.remove("garbage_active");
}