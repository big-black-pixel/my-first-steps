const count = (function() {
    let num = 10
    return function() {return num--; }
})()
function countDown() {
    const info = document.getElementById('info')
    let timerld = null 
    let num = count()

    if (num >= 0) {
        info.innerHTML = '<span>' + num + '</span>';
        timerld = window.setTimeout(countDown, 1000);
    }
    else {
        info.innerHTML = '<span>Lift Off! </span>';
        window.clearTimeout(timerld)
    }
}
countDown()

