import { isToday, startOfToday } from "date-fns";
import { TASK_BOXES } from "../main";
import { dragDrop } from "./dragNdrop";
import { getData, postData } from "./http";
import { reload_tasks } from "./ui";

let close_aside = document.querySelector(".close_aside");
let open_aside = document.querySelector(".open_aside");
let aside = document.querySelector("aside");
let aside_class = document.querySelector(".aside");
let content = document.querySelector("main");

function date() {
    let date = document.querySelector('.date')

    let newDate = new Date()
    let seporate = newDate.toLocaleDateString().split('.')
    let day = seporate[0]
    let month = seporate[1]
    let year = seporate[2]

    date.value = `${year}-${month}-${day}`
}
date()

open_aside.onclick = () => {
    aside.classList.remove("hide_main");
    aside_class.classList.remove("hide_aside");
    aside_class.classList.remove("hide");
    open_aside.classList.add("hide");
    content.classList.add("contentFlex");
};

close_aside.onclick = () => {
    aside_class.classList.add("hide_aside");
    aside.classList.add("hide_main");
    content.classList.remove("contentFlex");
    setTimeout(function close_open() {
        open_aside.classList.remove("hide");
    }, 1000);

    setTimeout(function close() {
        aside_class.classList.add("hide");
    }, 1000);
};

// rukhshona's code

let open_modal_btn = document.querySelector('.create')
let modal_main = document.querySelector('.modal_main')
let close_modal_btn = document.querySelectorAll('.button_x')
let form_create = document.forms.create_new
let select_participants = document.querySelector('#participants')
let form_add = document.forms.add_new
let modal_add = document.querySelector('.modal_add')
let add_one = document.querySelector('.add_one')
let boxes = document.querySelectorAll('.box_avatar');

let black_bg = document.querySelector('.black_bg')
let blur_bg = document.querySelector('.blur_bg')
let add_card = document.querySelectorAll('.add_card')

let res = ['alex', 'adams', 'john', 'mike']

for (let key in res) {
    let option = new Option(res[key])

    select_participants.append(option)
}

let btns = document.querySelectorAll('button')

let choosed_avatar

boxes.forEach(box => {
    box.onclick = () => {
        boxes.forEach(box => {
            box.classList.remove('box_selected')
        })
        box.classList.add('box_selected')
        choosed_avatar = box.childNodes[1].src.split(5175).at(-1)
        console.log(box.childNodes[1].src.split('img/').at(-1));
    }
})

form_add.onsubmit = (e) => {
    e.preventDefault();

    let user = {
        img: choosed_avatar
    }

    let fm = new FormData(form_add)

    fm.forEach((value, key) => {
        user[key] = value
    })

    console.log(user);

    form_create.reset()
    modal_add.classList.remove('block')
}

btns.forEach(btn => {
    btn.onclick = (e) => {
        e.preventDefault();
        if(btn.classList == 'create' || btn.classList == 'add_card') {
            modal_main.classList.add('modal_anim')
            modal_main.classList.add('modal_z-index')
            black_bg.classList.add('bg_anim')
            blur_bg.classList.add('bg_anim')
        }
        if(btn.classList == 'button_x') {
            modal_main.classList.remove('modal_anim')
            modal_add.classList.remove('modal_anim')
            black_bg.classList.remove('bg_anim')
            blur_bg.classList.remove('bg_anim')
        }
        if(btn.classList == 'add_one') {
            modal_add.classList.add('modal_anim')
            modal_add.classList.add('modal_z-index')
            black_bg.classList.add('bg_anim')
            blur_bg.classList.add('bg_anim')
        }
        if(btn.classList == 'create_btn') {
            let task = {}

            let fm = new FormData(form_create)
        
            fm.forEach((value, key) => {
                task[key] = value
            })
        
            postData('/tasks', task)
                .then(res => {
                    if(res.status !== 200 && res.status !== 201) return 
        
                    getData('/tasks')
                        .then(res => {
                            reload_tasks(res.data, TASK_BOXES)
                            dragDrop(res.data, TASK_BOXES)
                        })
                })
        
            form_create.reset()
            modal_main.classList.remove('block')
        }
    }
})