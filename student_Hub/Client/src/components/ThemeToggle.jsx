import React, { useEffect, useState } from 'react';

const ThemeToggle = () => {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");

        if (savedTheme === 'dark') {
            document.documentElement.classList.add('dark');
            setDarkMode(true);
        }
    }, []);

    const toggleTheme = () => {
        if (darkMode) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        }

        setDarkMode(!darkMode);
    };

    return (
        <button
            onClick={toggleTheme}
            className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white px-3 py-2 rounded-lg transition"
        >
            {darkMode ? (
                <i className="ri-toggle-line text-xl"></i>
            ) : (
                <i className="ri-toggle-fill text-xl"></i>
            )}
        </button>
    );
};

export default ThemeToggle;