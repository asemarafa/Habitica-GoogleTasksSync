function getGTasksId() {
  const getTaskIds = (tasks) => tasks.map(task => task.taskId);

  return [getTaskIds(gtasksListCompleted), getTaskIds(gtasksListNotCompleted)];
}

function getGTaskFromId(taskId) {
  const findTaskById = (tasks, id) => tasks.find(task => task.taskId === id);

  return findTaskById(gtasksListNotCompleted, taskId) || findTaskById(gtasksListCompleted, taskId) || "";
}

function gtasks_testing() {
  getGTasks();
  var id = "WlZuVGs4RF9iMFVtSU5faA";

  Logger.log(getGTaskFromId(id).text);
}