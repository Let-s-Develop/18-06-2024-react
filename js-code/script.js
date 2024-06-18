// Load tasks from local storage on page load
document.addEventListener("DOMContentLoaded", function() {
    var tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(function(task) {
        addTaskToList(task);
    });
});

function addTask() {
    var taskInput = document.getElementById("taskInput");
    var taskText = taskInput.value.trim();

    if (taskText !== "") {
        addTaskToList(taskText);
        saveTasksToLocalStorage(taskText);
        taskInput.value = "";
    } else {
        alert("Please enter a task.");
    }
}

function addTaskToList(taskText) {
    var taskList = document.getElementById("taskList");

    var li = document.createElement("li");
    li.textContent = taskText;

    var deleteButton = document.createElement("span");
    deleteButton.textContent = "❌";
    deleteButton.className = "delete";
    deleteButton.onclick = function() {
        taskList.removeChild(li);
        removeTaskFromLocalStorage(taskText);
    };

    var completeButton = document.createElement("span");
    completeButton.textContent = "✓";
    completeButton.className = "complete";
    completeButton.onclick = function() {
        li.classList.toggle("completed");
    };

    li.appendChild(completeButton);
    li.appendChild(deleteButton);
    taskList.appendChild(li);
}

function saveTasksToLocalStorage(taskText) {
    var tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(taskText);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function removeTaskFromLocalStorage(taskText) {
    var tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    var index = tasks.indexOf(taskText);
    if (index !== -1) {
        tasks.splice(index, 1);
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
}
