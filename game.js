const matrixSize = 8;
const introSteps = 12;
const state = { ready: false, clicked: false };

const randomColor = () => {
    return "#" + Math.floor(Math.random()*16777184).toString(16);
};

const shatterItem = (target, forced = false) => {
    if (!forced && !state.ready) return;
    target.classList.add("no-pointer-events");
    [...target.querySelectorAll(".item")].map(s => {
        s.classList.remove("maximized");
        s.classList.add("minimized");
        s.classList.add("sizeAnimated2");
    });
    setTimeout(() => {
        document.getElementById("container").removeChild(target);
    }, 1000);
};

const newStain = (x, y) => {  
    let c = randomColor();
    let g = document.createElement("div");
    let o = document.createElement("div");
    g.classList.add("object-grid");
    g.style.gridTemplateColumns = "repeat("+matrixSize+", 1fr)";
    g.style.gridTemplateRows = "repeat("+matrixSize+", 1fr)";
    o.classList.add("object");
    o.classList.add("sizeAnimated");
    o.style.left = x+"px";
    o.style.top = y+"px";
    o.onclick = () => { shatterItem(o); };
    o.ontouchstart = () => { shatterItem(o); };
    for (let i=0; i<(matrixSize*matrixSize);i++) {
        let ch = document.createElement("div");
        ch.style.background = c;
        ch.classList.add("item");
        ch.classList.add("maximized");
        g.appendChild(ch);
    }
    o.appendChild(g);
    document.getElementById("container").appendChild(o);
    setTimeout(() => {
        o.style.width = "max(300vw, 300vh)";
        o.style.height = "max(300vw, 300vh)";
        o.style.margin = "min(-150vw, -150vh) min(-150vw, -150vh)";
    }, 100);
};

const intro = (i = 0) => {
  if (i < 0) return;
  let y = Math.floor(Math.random()*window.innerHeight);
  let x = Math.floor(Math.random()*window.innerWidth);  
  let stain = newStain(x, y);
  setTimeout(() => { shatterItem(stain, true); }, 800);
  if (i > 0) {
    setTimeout(() => { intro(i - 1); }, 200);
  }
  if (i == 0) {
    setTimeout(() => {
      document.querySelector("#container > span").style.opacity = 1;
      state.ready = true;
    }, 1800);
  }
};

window.addEventListener("load", () => {
    let action = (event) => {
        if (!state.ready) return;
        event = event || window.event;
        let source = event.target || event.srcElement;
        if (source.id == "container") {
          if (!state.clicked) {
            state.clicked = true;
            document.querySelector("#container > span").style.opacity = 0.2;
          }
          newStain(event.pageX, event.pageY);
        }
    };
    document.getElementById("container").onclick = action;
    document.getElementById("container").ontouchstart = action;
    intro(introSteps);
});
