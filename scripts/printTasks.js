const fs = require("fs");

const data = JSON.parse(
  fs.readFileSync("./docs/sample-data.json", "utf8")
);

const tasks = data.tasks;

const groupedTasks = {
  Completed: [],
  "In Progress": [],
  Pending: []
};

for (const task of tasks) {

//   console.log(task.status);

  groupedTasks[task.status].push(task);
}

groupedTasks["Completed"].sort((a, b) => {
    return new Date(a.dueDate) - new Date(b.dueDate);
});

console.log(groupedTasks);
