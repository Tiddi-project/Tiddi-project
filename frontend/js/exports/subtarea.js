const d = document

export default function subtask($subtaskContainer){

    let count = parseInt($subtaskContainer.dataset.count)+1
    $subtaskContainer.dataset.count = count; // Guardar el nuevo valor
        
    const subtaskId = `subtask-${count}`;
    const subtaskCreate = d.createElement("div")
    subtaskCreate.classList.add("subtask-item")
    subtaskCreate.innerHTML = `
        <input type="checkbox" name="subtaskCheckbox" class="subtaskCheckbox" id="${subtaskId}">
        <label for="${subtaskId}"></label>
        <input type="text" name="subtasks[]" class="subtask-input" placeholder="Subtarea" required>
        <button type="button" class="remove-subtask">&#8722</button>
    `;

    $subtaskContainer.append(subtaskCreate)
}
    