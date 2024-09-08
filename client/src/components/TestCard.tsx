import React, { useState } from "react";
import TestModal from "./TestModal";
import { useAuth } from "../context/AuthContext";
import { Test } from "../interfaces/Test";

interface TestCardProps {
  test: Test;
  handleDeleteTest: (id: string) => void;
}

export default function TestCard({ test, handleDeleteTest }: TestCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useAuth();

  const truncateDescription = (description: string, length: number) => {
    return description.length > length ? description.substring(0, length) + "..." : description;
  };

  return (
    <div key={test._id} className='col-md-4 col-sm-6 card-sector'>
      <div>
        <img src='mainpage/crown.jpg' alt='' className='crown' />
        18/40
      </div>
      <div className='card'>
        <div className='card-body'>
          <h5 className='card-title'>{test.name}</h5>
          <p className='card-text'>{truncateDescription(test.description, 60)}</p>
          <p>{test.option}</p>
          <button className='btn login' onClick={() => setIsModalOpen(true)}>
            Обрати
          </button>
          {test.author === user.email && (
            <button
              className='btn btn-danger'
              onClick={() => handleDeleteTest(test._id)}
            >
              Видалити
            </button>
          )}
        </div>
      </div>
      <TestModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} test={test} />
    </div>
  );
}
