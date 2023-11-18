import { rubbish_box } from "../main"
import { deleteData, editData, getData } from "./http"
export function dragStart() {
    this.id = "marked"
    this.className += ' hold'
    setTimeout(() => (this.className = 'invisible'), 0)
    rubbish_box.classList.remove('invisible')
    rubbish_box.classList.add('visible')
}

export function dragEnd() {
    this.removeAttribute('id')
    this.className = 'task'
    rubbish_box.classList.remove('visible')
    rubbish_box.classList.add('invisible')
}


export function dragOver(event) {
    event.preventDefault()
}

export function dragEnter(event) {
    event.preventDefault()
}


export function dragLeave() {
    this.className = 'item_mid'
}

export function dragDrop() {
    let marked_div = document.getElementById('marked')
    this.className = 'item_mid'
    this.append(marked_div)
   
    editData('/tasks/' + marked_div.dataset.id, {status: this.dataset.status})
    .then(res=> {
        // console.log(res.data);
    })
}

export function dragDrop_rubbish() {
    let marked_div = document.getElementById('marked')
    deleteData('/tasks/' + marked_div.dataset.id)
        .then(res=> {
            marked_div.remove()
        })
    
}
