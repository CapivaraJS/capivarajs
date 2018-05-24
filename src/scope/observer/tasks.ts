import { Task } from "./task";

let nextHandle = 1; // Spec says greater than zero
const tasksByHandle = {};
let currentlyRunningATask = false;

const tasks = {
    addFromSetImmediateArguments: (args) => {
        const handler = args[0];
        const argsToHandle = Array.prototype.slice.call(args, 1);
        const task = new Task(handler, argsToHandle);
        const thisHandle = nextHandle++;
        tasksByHandle[thisHandle] = task;
        return thisHandle;
    },
    runIfPresent: (handle) => {
        if (!currentlyRunningATask) {
            const task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    task.run();
                } finally {
                    delete tasksByHandle[handle];
                    currentlyRunningATask = false;
                }
            }
        } else {
            global.setTimeout(() => tasks.runIfPresent(handle), 0);
        }
    },
    remove: (handle) => {
        delete tasksByHandle[handle];
    },
};

export default tasks;
