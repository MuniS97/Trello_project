

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
    let marked_div = document.getElementById('marked')
    this.className = 'item_mid'

    this.append(marked_div)
}

export function del() {


    let task = document.getElementById('marked')
    task.remove();
}