import {removeData, editData} from '../modules/helpers' 

let basket_remove = document.querySelector('.basket_remove')
let basket = document.querySelector('.basket')

export function dragStart() {
    this.id = "marked"
    this.className += ' hold'
    setTimeout(() => (this.className = 'invisible'), 0)
    
    basket_remove.style.display = 'block'
    basket.style.display = 'block'
}

export function dragEnd() {
    this.removeAttribute('id')
    this.className = 'task'
    
    basket_remove.style.display = 'none'
    basket.style.display = 'none'
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
    let task = document.getElementById('marked')
    this.className = 'item_mid'

    this.append(task)

    editData('/tasks' + task.dataset.id, {status: this.dataset.status})
        .then(res => {
            console.log(res);
        })
}

export function del() {
    let task = document.getElementById('marked')
    
    task.remove();
    removeData('/tasks', task.dataset.id)
    .then(res => {
            console.log(task);
    })
}