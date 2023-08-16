function createTask(id, name, desc, date, status) {
        const newTask = {
            id: id,
            name: name,
            description: desc,
            date: date,
            status: status
        }

        setTasks([newTask, ...tasks]);
        setTrigger(!trigger);
    }



function updateTask(id, n_name, n_desc, n_date, n_status) {
    
    const updatedTasks = tasks.map((task) => {
        if (task.id === id) {
            return {
                ...task,
                name: n_name,
                description: n_desc,
                date: n_date,
                status: n_status
            }
        }
        return task
    });

    setTasks(updatedTasks);
    setTrigger(!trigger);

}




function deleteTask(id) {
    const updatedTasks = tasks.filter((task) => {
        return task.id !== id
    });

    setTasks(updatedTasks);
    setTrigger(!trigger);
}