
/*contadores de likes*/
var likesPost1 = 0;
var likesPost2 = 0;
var likesPost3 = 0;

var span1 = document.querySelector("#likes1");
var span2 = document.querySelector("#likes2");
var span3 = document.querySelector("#likes3");

var btn1 = document.querySelector("#boton1");
var btn2 = document.querySelector("#boton2");
var btn3 = document.querySelector("#boton3");

btn1.addEventListener("click", function() {
    likesPost1++;
    span1.innerText = likesPost1 + " like(s)";
});

btn2.addEventListener("click", function() {
    likesPost2++;
    span2.innerText = likesPost2 + " like(s)";
});

btn3.addEventListener("click", function() {
    likesPost3++;
    span3.innerText = likesPost3 + " like(s)";
});