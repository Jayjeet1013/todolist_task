"use client";
import React, { useState, useEffect } from 'react';

const YourComponent = () => {
  const [tasks, setTasks] = useState<string[]>([]);
  const [newTask, setNewTask] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Load tasks from localStorage on component mount
  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, newTask]);
      setNewTask('');
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

  return (
    <div className='min-h-screen bg-white text-black'>
      <main>
        <div>
          <h1 className='text-center pt-10 text-4xl'>To Do List</h1>
        </div>
        <div className='text-center pt-6'>
          <input
            placeholder='Task'
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            className='border border-black p-1 rounded-md text-center mr-3'
          />
          <button
            onClick={addTask}
            className='border bg-green-600 rounded-md px-2 py-1'
          >
            Add
          </button>
        </div>
        <div className='text-center pt-6'>
          <input
            type='text'
            placeholder='Search tasks'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='border border-black p-1 rounded-md text-center'
          />
        </div>
        <div className='text-center pt-6'>
          <ul>
            {filteredTasks.map((task, index) => (
              <li key={index} className='py-2'>
                {task}{' '}
                <button
                  onClick={() => deleteTask(index)}
                  className='text-red-600 ml-2'
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
};

export default YourComponent;
