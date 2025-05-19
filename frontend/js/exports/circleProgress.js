export default function circleProgress (completadas, totalTareasPorDia){
    const $circle = document.getElementById("progress-circle")
    const $tCompleted = document.querySelector(".task-completed")
    const $tTotal = document.querySelector(".task-total")

    let totalTasks = totalTareasPorDia;
    let completedTasks = completadas;
    const circumference = 2 * Math.PI * 50; // Longitud total del círculo 
    let percent = (completedTasks / totalTasks) * 100;
    let offset = circumference - (percent / 100) * circumference;


    $tTotal.textContent = totalTasks
    $tCompleted.textContent = completedTasks
    $circle.style.strokeDashoffset = offset;
}

