import { dragEnd, dragStart } from "./dragNdrop"
import { deleteData } from "./http"

export function reload_tasks(arr, places) {
    places.forEach(el => el.innerHTML = "")

    for(let item of arr) {
        let div = document.createElement('div')
        let date = document.createElement('p')

        div.classList.add('task')
        div.setAttribute('data-id', item.id)
        div.setAttribute('draggable', true)

        div.innerHTML = item.title
        date.innerHTML = item.deadline
        places[item.status].append(div)
        div.append(date)

        div.ondragstart = dragStart
        div.ondragend = dragEnd
    }
}
