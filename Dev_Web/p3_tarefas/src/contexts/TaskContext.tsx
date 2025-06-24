import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Task, Category, TaskContextType } from '../types';

export const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [tasks, setTasks] = useState<Task[]>([]);

    const addCategory = (name: string) => {
        const newCategory: Category = {
            id: Date.now().toString(), // ID simples por enquanto
            name: name.trim()
        };
        setCategories(prev => [...prev, newCategory]);
    };

    const addTask = (title: string, categoryId: string) => {
        const newTask: Task = {
            id: Date.now().toString() + Math.random(), // ID único
            title: title.trim(),
            completed: false,
            categoryId
        };
        setTasks(prev => [...prev, newTask]);
    };

    const toggleTaskComplete = (taskId: string) => {
        setTasks(prev =>
            prev.map(task =>
                task.id === taskId
                    ? { ...task, completed: !task.completed }
                    : task
            )
        );
    };

    const getTasksByCategory = (categoryId: string): Task[] => {
        return tasks.filter(task => task.categoryId === categoryId);
    };

    const value: TaskContextType = {
        categories,
        tasks,
        addCategory,
        addTask,
        toggleTaskComplete,
        getTasksByCategory
    };

    return (
        <TaskContext.Provider value={value}>
            {children}
        </TaskContext.Provider>
    );
};
