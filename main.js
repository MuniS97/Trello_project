let close_aside = document.querySelector(".close_aside");
let open_aside = document.querySelector(".open_aside");
let aside = document.querySelector("aside");
let aside_class = document.querySelector(".aside");
// let container = document.querySelector(".container");

// container.classList.add('container_min_width')
open_aside.onclick = () => {
  aside.classList.remove("hide_main");
  aside_class.classList.remove("hide_aside");
  aside_class.classList.remove("hide");
  open_aside.classList.add('hide')
};

close_aside.onclick = () => {
  // container.classList.remove('container_min_width')
  aside_class.classList.add("hide_aside");
  aside.classList.add("hide_main");
  
  setTimeout(function close_open() {
    open_aside.classList.remove("hide");
  }, 1000);

  setTimeout(function close() {
    aside_class.classList.add("hide");
  }, 1000);
};