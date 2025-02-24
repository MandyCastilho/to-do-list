document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
    let input = document.getElementById("taskInput");
    let taskText = input.value.trim();
    if (taskText === "") return;
    
    let li = document.createElement("li");
    li.innerHTML = `${taskText} <button onclick="editTask(this)">✏️</button> <button onclick="removeTask(this)">❌</button>`;
    li.addEventListener("click", toggleTask);
    document.getElementById("taskList").appendChild(li);
    
    saveTasks();
    input.value = "";
}

function removeTask(button) {
    button.parentElement.remove();
    saveTasks();
}

function toggleTask(event) {
    if (event.target.tagName !== "LI") return;
    event.target.classList.toggle("done");
    saveTasks();
}

function editTask(button) {
    let li = button.parentElement;
    let newText = prompt("Edite sua tarefa:", li.firstChild.textContent.trim());
    if (newText) {
        li.firstChild.textContent = newText + " ";
        saveTasks();
    }
}

function saveTasks() {
    let tasks = [];
    document.querySelectorAll("#taskList li").forEach(li => {
        tasks.push({ text: li.firstChild.textContent.trim(), done: li.classList.contains("done") });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => {
        let li = document.createElement("li");
        li.innerHTML = `${task.text} <button onclick="editTask(this)">✏️</button> <button onclick="removeTask(this)">❌</button>`;
        if (task.done) li.classList.add("done");
        li.addEventListener("click", toggleTask);
        document.getElementById("taskList").appendChild(li);
    });
}

function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
}

function filterTasks(filter) {
    document.querySelectorAll("#taskList li").forEach(li => {
        if (filter === "all") {
            li.style.display = "flex";
        } else if (filter === "pending" && li.classList.contains("done")) {
            li.style.display = "none";
        } else if (filter === "done" && !li.classList.contains("done")) {
            li.style.display = "none";
        } else {
            li.style.display = "flex";
        }
    });
}