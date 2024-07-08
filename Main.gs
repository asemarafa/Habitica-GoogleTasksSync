// Globals
const scriptProperties = PropertiesService.getScriptProperties();

function main() {
  try {
      // Initialize the data
      getGTasks();
      getTodosFromHabitica();

      // Get tasks from GTasks
      let [gtasksCompletedIDs, gtasksIncompleteIDs] = getGTasksId();

      // Get todos from Habitica. This entire list only contains incomplete tasks
      let habiticaTodoAliases = getHabiticaTodoAliases();

      // Copy incomplete tasks from GTasks to Habitica
      let incompleteGTaskIDsToCopy = gtasksIncompleteIDs.filter(x => !habiticaTodoAliases.includes(x));
      incompleteGTaskIDsToCopy.forEach(addGTaskToHabitica);

      // Mark all completed tasks as done
      let completeGTaskIDsToMarkAsDone = gtasksCompletedIDs.filter(x => habiticaTodoAliases.includes(x));
      completeGTaskIDsToMarkAsDone.forEach(markGTaskAsDone);

      // Update changes in due date
      let incompleteGTaskIDsInHabitica = gtasksIncompleteIDs.filter(x => habiticaTodoAliases.includes(x));
      incompleteGTaskIDsInHabitica.forEach(t => {
          let habiticaTodo = getHabiticaTodoFromAlias(t);
          let gtask = getGTaskFromId(t);
          if (gtask.dueDate) {
              let gtaskDueDate = new Date(gtask.dueDate);
              let habiticaDueDate = new Date(habiticaTodo.dueDate);
              if (gtaskDueDate.valueOf() !== habiticaDueDate.valueOf()) {
                  buildRequest("put", `tasks/${habiticaTodo.id}`, { "date": gtask.dueDate });
              }
          }
      });
  } catch (error) {
      Logger.log(`Error in main: ${error.message}`);
  }
}

