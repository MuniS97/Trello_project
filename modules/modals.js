import { TASK_BOXES } from "../main";
import { dragDrop } from "./dragNdrop";
import { getData, postData } from "./helpers";
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

let modal_main = document.querySelector('.modal_main')
let form_create = document.forms.create_new
let new_acc = document.forms.modal_add
let select_participants = document.querySelector('#participants')
let modal_add = document.querySelector('.modal_add')

let black_bg = document.querySelector('.black_bg')
let blur_bg = document.querySelector('.blur_bg')

let boxes = document.querySelectorAll('.box_avatar');
let selected

boxes.forEach(avatar => {
    avatar.onclick = () => {
        boxes.forEach(avatar => {
            avatar.classList.remove('box_selected')
        })
        avatar.classList.add('box_selected')
        selected = avatar.childNodes[1].src.split('img/').at(-1)
    }
})

let btns = document.querySelectorAll('button')
btns.forEach(btn => {
    btn.onclick = (e) => {
        e.preventDefault();
        if (btn.classList == 'create' || btn.classList == 'add_card') {
            search_inp.style.zIndex = '1'
            modal_main.classList.add('modal_anim')
            black_bg.classList.add('bg_anim')
            blur_bg.classList.add('bg_anim')
            black_bg.classList.remove('bg_anim_vanish')
            blur_bg.classList.remove('bg_anim_vanish')
        }
        if (btn.classList == 'button_x') {
            modal_main.classList.remove('modal_anim')
            modal_add.classList.remove('modal_anim')
            black_bg.classList.add('bg_anim_vanish')
            blur_bg.classList.add('bg_anim_vanish')
            search_inp.value = ''
            
            setTimeout(() => {
                black_bg.classList.remove('bg_anim')
                blur_bg.classList.remove('bg_anim')
            }, 500);
        }
        if (btn.classList == 'add_one') {
            modal_add.classList.add('modal_anim')
            black_bg.classList.add('bg_anim')
            blur_bg.classList.add('bg_anim')
            black_bg.classList.remove('bg_anim_vanish')
            blur_bg.classList.remove('bg_anim_vanish')
        }
        if (btn.classList == 'create_btn') {
            let task = {}

            let fm = new FormData(form_create)

            fm.forEach((value, key) => {
                task[key] = value
            })

            postData('/tasks', task)
                .then(res => {
                    if (res.status !== 200 && res.status !== 201) return

                    getData('/tasks')
                        .then(res => {
                            reload_tasks(res.data, TASK_BOXES)
                            dragDrop(res.data, TASK_BOXES)
                        })
                })
            form_create.reset()
            modal_main.classList.remove('modal_anim')
            black_bg.classList.remove('bg_anim')
            blur_bg.classList.remove('bg_anim')
        }
        if (btn.classList == 'create_acc') {

            let user = {}

            let fm = new FormData(new_acc)

            fm.forEach((value, key) => {
                user[key] = value

                user.avatar = selected

                postData('/users' , user)
                    .then(res => {
                        if(res.status !== 200 && res.status !== 201) return
                        form_create.reset()
                        modal_main.classList.remove('modal_anim')
                        modal_add.classList.remove('modal_anim')
                        black_bg.classList.remove('bg_anim')
                        blur_bg.classList.remove('bg_anim')
                        getData('/users')
                        .then(res => {
                            let option = new Option(res[key])
                            select_participants.append(option)
                        })
                    })
            })
        }
    }
})

let search_inp = document.querySelector('.searcher_inp')

search_inp.onfocus = () => {
    search_inp.style.zIndex = '3'
    search_inp.classList.add('focus')
    search_inp.classList.remove('compression')

    black_bg.classList.remove('bg_anim_vanish')
    black_bg.classList.add('bg_anim')
    
    blur_bg.classList.remove('bg_anim_vanish')
    blur_bg.classList.add('bg_anim')

}
search_inp.onblur = () => {
    let tasks_all = document.querySelectorAll('.task')
    tasks_all.forEach(task => {
        task.style = 'z-index: 0; box-shadow: none;'
    })
    
    search_inp.classList.remove('focus')
    search_inp.classList.add('compression')
    
    black_bg.classList.add('bg_anim_vanish')
    blur_bg.classList.add('bg_anim_vanish')
    search_inp.value = ''
    
    setTimeout(() => {
        black_bg.classList.remove('bg_anim')
        blur_bg.classList.remove('bg_anim')
    }, 500);
}

search_inp.oninput = () => {
    let input = document.querySelector('.searcher_inp')
    let result = input.value.toLowerCase()
    let tasks_all = document.querySelectorAll('.task')
    if(result !== '' && input.value.length > 3) {
        tasks_all.forEach(task => {
            if(task.innerText.toLowerCase().search(result) !== -1) {
                task.style = 'z-index: 3; box-shadow: 0 0 15px gold inset'

                let scrollTo = task.offsetTop

                let item_mid = task.closest('.item_mid')
                item_mid.scrollTo(0, scrollTo)
            }
        })
    }
    else {
        tasks_all.forEach(task => {
            task.style = 'z-index: 0; box-shadow: none'
        })
    }
}