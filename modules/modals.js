import { getData, postData } from "./helpers";

let close_aside = document.querySelector(".close_aside");
let open_aside = document.querySelector(".open_aside");
let aside = document.querySelector("aside");
let aside_class = document.querySelector(".aside");
let content = document.querySelector("main");

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

let open_modal_btn = document.querySelector(".create");
let modal_main = document.querySelector(".modal_main");
let close_modal_btn = document.querySelectorAll(".button_x");
let form_create = document.forms.create_new;
let select_participants = document.querySelector("#participants");
let form_add = document.forms.add_new;
let modal_add = document.querySelector(".modal_add");
let add_one = document.querySelector(".add_one");
let boxes = document.querySelectorAll(".box_avatar");

let res = ["alex", "adams", "john", "mike"];

for (let key in res) {
  let option = new Option(res[key]);

  select_participants.append(option);
}

open_modal_btn.onclick = () => {
  modal_main.classList.add("block");
};
close_modal_btn.forEach((btn) => {
  btn.onclick = () => {
    btn.parentElement.classList.remove("block");
  };
});

add_one.onclick = () => {
  modal_add.classList.add("block");
};

form_create.onsubmit = (e) => {
  e.preventDefault();

  let task = {};

  let fm = new FormData(form_create);

  fm.forEach((value, key) => {
    task[key] = value;
  });

  postData("/tasks", task).then((res) => {
    if (res.status !== 200 && res.status !== 201) return;
    getData("/tasks").then((res) => {
      if (res.status !== 200 && res.status !== 201) return;
      reload(res.data);
    });
  });

  form_create.reset();
  modal_main.classList.remove("block");
};

let choosed_avatar;

boxes.forEach((box) => {
  box.onclick = () => {
    boxes.forEach((box) => {
      box.classList.remove("box_selected");
    });
    box.classList.add("box_selected");
    choosed_avatar = box.childNodes[1].src.split(5175).at(-1);
    console.log(box.childNodes[1].src.split("img/").at(-1));
  };
});

form_add.onsubmit = (e) => {
  e.preventDefault();

  let arr = {
    img: choosed_avatar,
  };

  let fm = new FormData(form_add);

  fm.forEach((value, key) => {
    arr[key] = value;
  });

  form_create.reset();
  modal_add.classList.remove("block");
};

const itemMids = document.querySelectorAll(".item_mid");

getData("/tasks").then((res) => {
  if (res.status !== 200 && res.status !== 201) return;
  reload(res.data);
});

function reload(arr) {
  itemMids.forEach((item_mid) => (item_mid.innerHTML = ""));
  for (let item of arr) {
    let div = document.createElement("div");
    let b = document.createElement("b");
    let p = document.createElement("p");

    div.setAttribute("id", item.id);
    div.setAttribute("class", "task");
    div.setAttribute("draggable", true);

    b.innerHTML = item.name;
    p.innerHTML = item.description;

    div.append(b, p);

    switch (item.status) {
      case "todo":
        itemMids[0].append(div);
        break;
      case "inprogress":
        itemMids[1].append(div);
        break;
      case "done":
        itemMids[2].append(div);
        break;
    }

    div.addEventListener("dragstart", dragStart);
    div.addEventListener("dragend", dragEnd);
  }
}

for (let itemMId of itemMids) {
  itemMId.addEventListener("dragover", dragOver);
  itemMId.addEventListener("dragenter", dragEnter);
  itemMId.addEventListener("dragleave", dragLeave);
  itemMId.addEventListener("drop", dragDrop);
}

let temp_id;

function dragStart() {
  console.log("dragStart");
  temp_id = this.id;
  this.className += " hold";
  setTimeout(() => (this.className = "invisible"), 0);
}

function dragEnd() {
  console.log("dragEnd");
  this.className = "task";
}

function dragOver(event) {
  event.preventDefault();
}

function dragEnter(event) {
  event.preventDefault();
  this.className += " hovered";
}

function dragLeave() {
  this.className = "item_mid";
}

function dragDrop() {
  let temp = document.querySelectorAll(".item_mid div");
  this.className = "item_mid";
  temp.forEach((item) => {
    if (item.id === temp_id) {
      this.append(item);
    }
  });
}
