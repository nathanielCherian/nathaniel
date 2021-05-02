
window.addEventListener('load', (event) => {

    document.getElementById('question').onclick = function changeContent() {
        document.getElementById("popup").style.display = "block";
    }

    document.getElementById('popup').onclick = function changeContent() {
        document.getElementById("popup").style.display = "none";
    }

    document.getElementById('close-button').onclick = function changeContent() {
        document.getElementById("popup").style.display = "none";
    }

    document.addEventListener('keyup', (e) => {
        if (e.keyCode == 27){
            document.getElementById("popup").style.display = "none";
        }
    });

});