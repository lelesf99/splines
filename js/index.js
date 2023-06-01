const app = new App();
app.run();

const inputs = document.querySelectorAll('input');
inputs.forEach((input) => {
    input.addEventListener('click', (event) => {
        const clickedInput = event.target;
        inputs.forEach((input) => {
            input.classList.remove('selected');
        });
        clickedInput.classList.add('selected');
        app.selected = clickedInput.value;
    });
});

// const mouseMoveCallback = (event) => {
//     bezier.moveSelected(event.clientX, event.clientY);
// };

// window.addEventListener('keyup', function (event) {
//     if (event.key === 'Delete') {
//         bezier.deleteSelectedPoint();
//     }
// });

// window.addEventListener('keydown', function (event) {
//     let tIncrement = 10;
//     if(event.ctrlKey){
//         tIncrement = 1;
//     } 
//     if(event.key === 'ArrowLeft') {
//         bezier.moveSelectedBy(-tIncrement, 0);
//     }
//     if(event.key === 'ArrowRight') {
//         bezier.moveSelectedBy(tIncrement, 0);
//     }
//     if(event.key === 'ArrowUp') {
//         bezier.moveSelectedBy(0, -tIncrement);
//     }
//     if(event.key === 'ArrowDown') {
//         bezier.moveSelectedBy(0, tIncrement);
//     }
// });

