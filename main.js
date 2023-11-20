import { dragDrop, dragDrop_rubbish, dragEnter, dragLeave, dragOver } from "./modules/dragNdrop"
import { getData } from "./modules/http"
import { reload_tasks } from "./modules/ui"

export let TASK_BOXES = document.querySelectorAll('.item_mid')
export let rubbish_box = document.querySelector('.rubbish_box')
let body = document.body
let inp_search = document.querySelector('.searcher_inp')
let modal_bg = document.querySelector('.modal_bg')


rubbish_box.classList.add('invisible')

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

body.ondragenter= dragEnter
body.ondragover = dragOver

rubbish_box.ondragOver = dragOver
rubbish_box.ondragEnter = dragEnter
rubbish_box.dragLeave = dragLeave
rubbish_box.ondrop = dragDrop_rubbish



inp_search.onfocus = () => {
    modal_bg.classList.add('inp_onfocus')
}

inp_search.onblur = () => {
    modal_bg.classList.remove('inp_onfocus')
    let all_tasks = document.querySelectorAll('.task')
    all_tasks.forEach(task=> {
        task.classList.remove('finded_tasks')
    })
}


inp_search.onkeyup = () => {
    let all_tasks = document.querySelectorAll('.task')
    all_tasks.forEach(task=> {
        task.classList.remove('finded_tasks')
    })
    getData('/tasks?title=' + inp_search.value)
        .then(res => {
            if(res.status !== 200 && res.status !==201) return
            if(res.data.length == 0) {
                // alert('no tasks')
                console.log('no tasks');
                return
            }
            
            // let finded_tasks_scroll = []
            // let num = 0
            res.data.forEach(data => {
                let finded_tasks = document.querySelector(`[data-id="${data.id}"]`)
                // finded_tasks_scroll.push(finded_tasks.getBoundingClientRect().y) 
                finded_tasks.classList.add('finded_tasks')
                window.scrollTo({
                    top: finded_tasks.getBoundingClientRect().y-200,
                    behavior: "smooth",
                  });
            });
            // next_btn.onclick = () => {
            //     num++
            //     window.scrollTo(0,  finded_tasks_scroll[num]-200)
            //     if(num = finded_tasks_scroll.length){
            //         num = 0
            //     }
            // }
            
        })
}

