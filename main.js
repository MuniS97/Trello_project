import { dragDrop, dragEnter, dragLeave, dragOver, del} from "./modules/dragNdrop"
import { getData } from "./modules/http"
import { reload_tasks } from "./modules/ui"

export let TASK_BOXES = document.querySelectorAll('.item_mid')

getData('/tasks')
    .then(res => {
        reload_tasks(res.data, TASK_BOXES)
    })

TASK_BOXES.forEach(box => {
    box.ondragover = dragOver
    box.ondragenter = dragEnter
    box.ondragleave = dragLeave
    box.ondrop = dragDrop
})

let basket = document.querySelector('.basket')
basket.ondragover = dragOver
basket.ondrop = del;

let input_search = document.querySelector('.searcher_inp')

input_search.onfocus = () => {

    input_search.classList.add('search_anim')

    let black_bg = document.querySelector('.black_bg')
    let blur_bg = document.querySelector('.blur_bg')

    black_bg.style.display = 'block'
    blur_bg.style.display = 'block'

    input_search.onkeyup = () => {
        let value = input_search.value

        console.log(document.queselector(value));
    }
    
    input_search.onblur = () => {
        input_search.classList.remove('search_anim')
        
        black_bg.style.display = 'none'
        blur_bg.style.display = 'none'
        input_search.style.width = '200px'
    }
}