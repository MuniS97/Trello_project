import { dragEnd, dragStart } from "./dragNdrop"
import { deleteData } from "./http"

export function reload_tasks(arr, places) {
    places.forEach(el => el.innerHTML = "")

    for(let item of arr) {
        let div = document.createElement('div')
        let date = document.createElement('p')
        let description = document.createElement('p')
        let participants = document.createElement('p')

        div.classList.add('task')
        date.classList.add('time')
        description.classList.add('description')
        participants.classList.add('participants')
        div.setAttribute('data-id', item.id)
        div.setAttribute('draggable', true)

        div.innerHTML = item.title
        date.innerHTML = item.deadline
        description.innerHTML = item.description
        participants.innerHTML = item.participants
        places[item.status].append(div)
        div.append(description,participants, date)

        div.ondragstart = dragStart
        div.ondragend = dragEnd
    }
}
