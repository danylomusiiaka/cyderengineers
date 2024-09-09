import React, { useState } from "react";
import TestModal from "./TestModal";
import { useAuth } from "../context/AuthContext";
import { Test } from "../interfaces/Test";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
const defaultImage =
  "https://static.vecteezy.com/system/resources/previews/004/141/669/original/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg";

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
    <div key={test._id} className='col-xl-3 col-md-4 col-sm-6 card-sector'>
      {/* <div>
        <img src='mainpage/crown.jpg' alt='' className='crown' />
        18/40
      </div> */}
      <Card>
        <CardMedia component='img' height='260' image={test.picture || defaultImage} />
        <CardContent>
          <Typography gutterBottom variant='h5' component='div'>
            {test.name}
          </Typography>
          <Typography variant='body1' sx={{ color: "text.secondary" }}>
            {test.option}
          </Typography>
          <Typography variant='body2' sx={{ color: "text.secondary" }}>
            {truncateDescription(test.description, 60)}
          </Typography>
          <div className='controls'>
            <button className='btn login' onClick={() => setIsModalOpen(true)}>
              Обрати
            </button>
            {test.author === user.email && (
              <button className='btn btn-danger' onClick={() => handleDeleteTest(test._id)}>
                Видалити
              </button>
            )}
          </div>
          <TestModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} test={test} />
        </CardContent>
      </Card>
    </div>
  );
}
