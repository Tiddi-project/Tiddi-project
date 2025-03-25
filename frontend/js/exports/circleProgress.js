export default function circleProgress (circle,complete, total, progress){
    let totalTasks = progress.totalTask;
    let completedTasks = progress.totalComplete;
    const circumference = 2 * Math.PI * 50; // Longitud total del círculo
    let percent = (completedTasks / totalTasks) * 100;
    let offset = circumference - (percent / 100) * circumference;

    total.textContent = totalTasks
    complete.textContent = completedTasks
    circle.style.strokeDashoffset = offset;
}

