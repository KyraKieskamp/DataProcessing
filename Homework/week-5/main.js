/* use this to test out your function */
window.onload = function() {

    // Albania, light blue
 	changeColor("al", "#00FFFF");

    // Hungary, orange
    changeColor("hu", "#ff9933");

    // Bosnia and Herzegovina, yellow
    changeColor("ba", "#ffff00");

    // Serbia, purple
    changeColor("rs-", "#660066");
}

/* changeColor takes a path ID and a color (hex value)
   and changes that path's fill color */
function changeColor(id, color) {
    console.log("hoi");
    document.getElementById(id).style.fill = color
}
