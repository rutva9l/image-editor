let imgInp = document.querySelector(".imgInp input");
let image = document.querySelector(".imgContainer img");
let textInp = document.getElementById("textVal");
let textColor = document.getElementById("textColor");
let downloadBtn = document.querySelector(".download");
let width,height;
const canvas = document.getElementById('imgCanvas');
const ctx = canvas.getContext("2d");
const textDiv = document.querySelector(".textDiv");
const sub = document.querySelector(".submit");
const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);

function updateImg() {
    if (imgInp.value.length) {
        canvas.style.display = "block";
        image.style.display = "none";
        img = new Image();
        img.setAttribute('crossorigin', 'anonymous');
        img.src = imgInp.value;
        img.onload = function () {
            if(img.width>1119){
                width = img.width/2;
                height = img.height/2;
            }
            else if(img.width>651 && img.width<1200){
                let ratio=img.height/(img.width);
                width=640;
                height=640*ratio;
            }
            else if(img.width<650){
                width = img.width;
                height = img.height;
            }
            canvas.width = width;
            canvas.height = height;
            ctx.drawImage(img, 0, 0, width, height);
            canvas.removeAttribute('data-caman-id');
        }
    }
    document.querySelector(".imgInp input").value = null;
}
$("input[type=range]").change(function () {
    let bright = document.getElementById("bright").value;
    let saturate = document.getElementById("saturate").value;
    let blur = document.getElementById("blur").value;
    let expose = document.getElementById("exposure").value;
    let sepia = document.getElementById("sepia").value;
    let contrast = document.getElementById("contrast").value;
    // canvas.style.filter = "brightness(" + bright + "%) saturate(" + saturate + "%) blur(" + blur + "px) grayscale(" + grey + "%) contrast(" + contrast + "%)";
    Caman('#imgCanvas', img, function () {
        this.revert(false);
        this.brightness(bright).saturation(saturate).stackBlur(blur).exposure(expose).sepia(sepia).contrast(contrast).render();
    });
})
downloadBtn.addEventListener("click", () => {
    download(canvas, "edited-pic.jpg");
});
document.querySelector(".invert").addEventListener("click", function () {
    Caman('#imgCanvas', img, function () {
        this.invert().render();
    });
});
document.querySelector(".grey").addEventListener("click", function () {
    Caman('#imgCanvas', img, function () {
        this.greyscale().render();
    });
});
document.querySelector(".vintage").addEventListener("click", function () {
    Caman('#imgCanvas', img, function () {
        this.vintage().render();
      });
});
document.querySelector(".orange").addEventListener("click", function () {
    Caman('#imgCanvas', img, function () {
        this.orangePeel().render();
    });
});
document.querySelector(".sun").addEventListener("click", function () {
    Caman('#imgCanvas', img, function () {
        this.sunrise().render();
    });
});
document.querySelector(".glowing").addEventListener("click", function () {
    Caman('#imgCanvas', img, function () {
        this.glowingSun().render();
    });
});
document.querySelector(".sin").addEventListener("click", function () {
    Caman('#imgCanvas', img, function () {
        this.sinCity().render();
      });
});
document.querySelector(".nostalgia").addEventListener("click", function () {
    Caman('#imgCanvas', img, function () {
        this.nostalgia().render();
      });
})

function download(canvas, filename) {
    if (filename != undefined) {
        let e;
        const link = document.createElement("a");
        link.download = filename;
        link.href = canvas.toDataURL("image/jpeg", 0.8);
        e = new MouseEvent("click");
        link.dispatchEvent(e);
    }
}
