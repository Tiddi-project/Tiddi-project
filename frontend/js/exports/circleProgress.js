export default function circleProgress (tareasDelDia){
    const completadas = tareasDelDia.filter(t => t.complete === 1).length;
    const totalTareasPorDia = tareasDelDia.length


    const $circle = document.getElementById("progress-circle")
    const $tCompleted = document.querySelector(".task-completed")
    const $tTotal = document.querySelector(".task-total")
    
    const circumference = 2 * Math.PI * 50; // Longitud total del círculo 
    $circle.style.strokeDasharray = circumference;

    let totalTasks = totalTareasPorDia;
    let completedTasks = completadas;
    // let percent = (completedTasks / totalTasks) * 100;
    // let offset = circumference - (percent / 100) * circumference;
    
    const percent = totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;
    const offset = circumference - (percent / 100) * circumference;
    $circle.style.strokeDashoffset = offset;
    
    $tTotal.textContent = totalTasks
    $tCompleted.textContent = completedTasks
    // console.log(`Completadas: ${completedTasks}, Total: ${totalTasks}, Offset: ${offset}`);

}




    // const $circle = document.getElementById("progress-circle");
    // const $tCompleted = document.querySelector(".task-completed");
    // const $tTotal = document.querySelector(".task-total");

    // let totalTasks = totalTareasPorDia;
    // let completedTasks = completadas;
    // const radius = 50;
    // const circumference = 2 * Math.PI * radius; // Longitud total del círculo 
    // // const circumference = 2 * Math.PI * 50; // Longitud total del círculo 
    // $circle.style.strokeDasharray = circumference;
    // let percent = totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;
    // let offset = circumference - (percent / 100) * circumference;

    // $tTotal.textContent = totalTasks;
    // $tCompleted.textContent = completedTasks;
    // $circle.style.strokeDashoffset = offset;

