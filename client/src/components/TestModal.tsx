import { Modal, Box, Typography } from "@mui/material";
import { Test } from "../interfaces/Test";
import { useNavigate } from "react-router-dom";

interface TestModalProps {
  isOpen: boolean;
  onClose: () => void;
  test: Test;
  percents: string;
}

export default function TestModal({ isOpen, onClose, test, percents }: TestModalProps) {
  const navigate = useNavigate();

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box className='modal-box'>
        <div className='content'>
          <Typography variant='h3' component='h2'>
            {test.name}
          </Typography>
          <Typography sx={{ mt: 2 }}>{test.description}</Typography>
          <Typography variant='h6' sx={{ mt: 2 }}>
            Кількість учасників, які пройшли тест: 2
          </Typography>
          <Typography variant='h6' sx={{ mt: 2 }}>
            Ваша статистика пройденого:
            <div className='level-bar'>
              <div className='skills progress-level' style={{ width: `${percents}%` }}>
                {`${percents}%`}
              </div>
            </div>
          </Typography>
          <div className='modal-buttons'>
            <button
              className='btn sign-in'
              style={{ color: "white" }}
              onClick={() => navigate(`/quiz?id=${test._id}`)}
            >
              Розпочати тест
            </button>
            <button className='btn login' onClick={onClose}>
              Скасувати
            </button>
          </div>
        </div>
      </Box>
    </Modal>
  );
}
