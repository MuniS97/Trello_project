// import { getData, deleteData } from "./http"
import { garbage } from "../main"
import axios from "axios"

export function dragStart() {
    this.id = "marked"
    this.className += ' hold'
    setTimeout(() => (this.className = 'invisible'), 0)
    console.log(this);
    
}

export function dragEnd() {
    this.removeAttribute('id')
    this.className = 'task'
}


export function dragOver(event) {
    event.preventDefault()
}

export function dragEnter(event) {
    event.preventDefault()
    this.className += ' hovered'
}


export function dragLeave() {
    this.className = 'item_mid'
}

export function dragDrop() {
    let marked_div = document.getElementById('marked')
    this.className = 'item_mid'
    
    this.append(marked_div)
    console.log(this);
}
export function garbagedrop() {
    let marked_div = document.getElementById('marked')
    let id = marked_div.getAttribute('data-id')
    // console.log(id);
    // marked_div.remove()
    axios.delete(`/tasks/` + id)
    .then(res => console.log(`Deleted task with id ${id}`))
    .catch(err => console.error('task deleting', err))
}
export function garbageenter() {
    garbage.classList.add("garbage_active");
}
export function garbageleave() {
    garbage.classList.remove("garbage_active");
}