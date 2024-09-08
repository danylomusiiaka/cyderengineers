import React from "react";

export default function Dropdown({ categories, selectedCategory, setSelectedCategory }) {
  return (
    <div className='dropdown'>
      <button className='btn dropdown-toggle' data-bs-toggle='dropdown'>
        {selectedCategory ? selectedCategory : "Категорія"}
      </button>
      <ul className='dropdown-menu'>
        <li>
          <a className='dropdown-item' onClick={() => setSelectedCategory(null)}>
            Всі
          </a>
        </li>
        {categories.map((category, index) => (
          <li key={index}>
            <a
              className={`dropdown-item${selectedCategory === category ? " active" : ""}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
