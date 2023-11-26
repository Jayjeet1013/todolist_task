"use client"
import React, { useState, useEffect } from "react";

const App = () => {
  const [tasks, setTasks] = useState<string[]>([]);
  const [newTask, setNewTask] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 5; // Number of tasks per page

  // Load tasks from localStorage on component mount
  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTask.trim() !== "") {
      setTasks([...tasks, newTask]);
      setNewTask("");
      
      // Recalculate current page based on the updated tasks
      const totalPages = Math.ceil(tasks.length / pageSize);
      const lastPage = totalPages || 1; // If there are no tasks, set to page 1
      setCurrentPage(lastPage);
    }
  };

  const deleteTask = (index: number) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  const filteredTasks = tasks.filter((task) =>
    task.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredTasks.length / pageSize);

  const visibleTasks = filteredTasks.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="min-h-screen bg-white text-black">
      <main>
        <div>
          <h1 className="text-center pt-10 text-4xl">To Do List</h1>
        </div>
        <div className="text-center pt-6">
          <input
            placeholder="Task"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            className="border border-black p-1 rounded-md text-center mr-3 "
          />
          <button
            onClick={addTask}
            className="border bg-green-600 rounded-md px-2 py-1 text-white"
          >
            Add
          </button>
        </div>
        <div className="text-center pt-6">
          <input
            type="text"
            placeholder="Search tasks"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-black p-1 rounded-md text-center"
          />
        </div>
        <div className="text-center pt-6">
          <ul>
            {visibleTasks.map((task, index) => (
              <li key={index} className="py-2">
                {task}{" "}
                <button
                  onClick={() => deleteTask(index + (currentPage - 1) * pageSize)}
                  className="border bg-green-600 rounded-md px-2 py-1 text-white"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="text-center pt-6">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            className="border bg-blue-500 text-white rounded-md px-2 py-1"
          >
            Previous
          </button>{" "}
          <span>{`Page ${currentPage} of ${totalPages}`}</span>{" "}
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
            className="border bg-blue-500 text-white rounded-md px-2 py-1"
          >
            Next
          </button>
        </div>
      </main>
    </div>
  );
};

export default App;
