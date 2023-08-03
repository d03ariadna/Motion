import { useState } from "react";

export const [activeTasks, setActiveTasks] = useState(
        [
            {
                id: 1,
                name: "Buy a gift for Christina's Birthday",
                description: "elit. Optio iusto accusantium dolores id incidunt? Dolorem mollitia nihil esse molestias ipsum! Fuga optio enim, eveniet sint natus omnis debitis ad nesciunt.",
                date: "Today",
                status: "To Do",
            },
            {
                id: 2,
                name: "Take a rest",
                description: "elit. Optio iusto accusantium dolores id incidunt? Dolorem mollitia nihil esse molestias ipsum! Fuga optio enim, eveniet sint natus omnis debitis ad nesciunt.",
                date: "Wednesday",
                status: "To Do",
            },
            {
                id: 3,
                name: "Finish Zencon Project",
                description: "elit. Optio iusto accusantium dolores id incidunt? Dolorem mollitia nihil esse molestias ipsum! Fuga optio enim, eveniet sint natus omnis debitis ad nesciunt.",
                date: "Nov, 15th",
                status: "To Do",
            },
            {
                id: 4,
                name: "Richard's Birthday Party",
                description: "elit. Optio iusto accusantium dolores id incidunt? Dolorem mollitia nihil esse molestias ipsum! Fuga optio enim, eveniet sint natus omnis debitis ad nesciunt.",
                date: "Friday",
                status: "To Do",
            },
            {
                id: 5,
                name: "Buy the supplements for gym",
                description: "elit. Optio iusto accusantium dolores id incidunt? Dolorem mollitia nihil esse molestias ipsum! Fuga optio enim, eveniet sint natus omnis debitis ad nesciunt.",
                date: "Monday",
                status: "To Do",
            }
        ]);
    
export const [doneTasks, setDoneTasks] = useState(
        [
            {
                id: 6,
                name: "Task Done 1st",
                description: "elit. Optio iusto accusantium dolores id incidunt? Dolorem mollitia nihil esse molestias ipsum! Fuga optio enim, eveniet sint natus omnis debitis ad nesciunt.",
                date: "Today",
                status: "Done",
            },
            {
                id: 7,
                name: "Task Done 2nd",
                description: "elit. Optio iusto accusantium dolores id incidunt? Dolorem mollitia nihil esse molestias ipsum! Fuga optio enim, eveniet sint natus omnis debitis ad nesciunt.",
                date: "Wednesday",
                status: "Done",
            },
            {
                id: 8,
                name: "Task Done 3rd",
                description: "elit. Optio iusto accusantium dolores id incidunt? Dolorem mollitia nihil esse molestias ipsum! Fuga optio enim, eveniet sint natus omnis debitis ad nesciunt.",
                date: "Nov, 15th",
                status: "Done",
            }
    ]);
        


export function createTask(id, name, desc, date, status) {
        const newTask = {
            id: id,
            name: name,
            description: desc,
            date: date,
            status: status
        }

        setActiveTasks([...activeTasks, newTask]);
    }


export function updateTask(id, n_name, n_desc, n_date, n_status) {
        
        let updatedTasks;

        if (n_status === 'Done') {
            const newTask = {
                id: id,
                name: n_name,
                description: n_desc,
                date: n_date,
                status: n_status
            }

            setDoneTasks([...doneTasks, newTask]);

            updatedTasks = activeTasks.filter((task) => {
                return task.id != id;
            });

        } else {

            updatedTasks = activeTasks.map((task) => {
                if (task.id === id) {
                    return {
                        ...task,
                        name: n_name,
                        description: n_desc,
                        date: n_date,
                        status: n_status
                    }
                }
                return task;
            });
        }

        setActiveTasks(updatedTasks);
        
    }

export function deleteTask(id) {
        console.log(id);
        const updatedTasks = activeTasks.filter((task) => {
            return task.id !== id
        });

        setActiveTasks(updatedTasks);
        console.log('deleted Successfully');
    }
    