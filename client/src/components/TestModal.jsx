import { Modal, Box, Typography } from "@mui/material";
import Axios from "axios";
import { useAlert } from "../context/AlertContext";
import { useAuth } from "../context/AuthContext";

export default function TestModal({ isOpen, onClose, test }) {
  const { showAlert } = useAlert();
  const { user } = useAuth();

  const handleStartTest = async () => {
    try {
      await Axios.post("http://localhost:3001/users/finish-test", {
        testId: test._id,
        email: user.email,
      });
      showAlert(`Вітаю! Ви пройши тест ${test.name} успішно!`, "success", "filled");
      onClose();
    } catch (error) {
      console.error("Error starting test", error);
    }
  };

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
            Ваша статистика пройденого
            <div className='level-bar'>
              <div className='skills progress-level'>60%</div>
            </div>
          </Typography>
          <div className='modal-buttons'>
            <button className='btn sign-in' style={{ color: "white" }} onClick={handleStartTest}>
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
