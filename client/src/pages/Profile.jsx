import { useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/profile.css";
import ConfirmationModal from "../components/ConfirmDelete";
import { useAlert } from "../context/AlertContext";

function Profile() {
  const { email, setAuth } = useAuth();
  const { showAlert } = useAlert();

  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpen2, setModalOpen2] = useState(false);

  const navigate = useNavigate();

  const logout = async () => {
    localStorage.removeItem("token");
    showAlert("Ви вийшли з облікового запису", "warning");
    setAuth(false);
    navigate("/");
  };

  const deleteAccount = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      await Axios.delete("http://localhost:3001/tests/deleteByAuthor", {
        data: {
          authorEmail: email,
        },
      });
      await Axios.delete("http://localhost:3001/users/delete", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      localStorage.removeItem("token");
      showAlert("Ваш обліковий запис був видалений", "warning");
      setAuth(false);
      navigate("/");
    }
  };

  const handleDeleteConfirm = () => {
    deleteAccount();
    setModalOpen(false);
  };

  const handleLogoutConfirm = () => {
    logout();
    setModalOpen2(false);
  };

  return (
    <>
      <div className='container'>
        <div className='row align-items-center'>
          <div className='col-sm-10'>
            <h1 className='Nickname'>{email}</h1>
            <p>
              <img className='clock' src='profile/clock.png' /> Приєднався y квітні 2024
            </p>
          </div>
          <img className='user-2' src='profile/user icon.png' />
          <div className='profile-controls'>
            <div>
              <button className='btn login mx-2' onClick={() => setModalOpen2(true)}>
                Вийти
              </button>
              <button className='btn btn-danger' onClick={() => setModalOpen(true)}>
                Видалити профіль
              </button>
            </div>
            <img className='user-2-mobile' src='profile/user icon.png' />
          </div>
        </div>
      </div>

      <div className='container main-info'>
        <div className='row align-items-center'>
          <div className='col-sm-3'>
            <h3 className='static'>Статистика</h3>
            <div className='block-days'>
              <img className='fire' src='profile/fire_streak.png' alt='Group Icon' />
              <span className='number'>12</span>
              <p className='description'>Кількість днів</p>
            </div>
            <div className='liga'>
              <img className='lig-name' src='profile/liga.png' alt='Group Icon' />
              <span className='number'>Ліга</span>
              <p className='description'>Поточна ліга</p>
            </div>
          </div>
          <div className='col-sm-3'>
            <div className='block-points'>
              <img className='mack' src='profile/lightning.png' alt='Group Icon' />
              <span className='number'>100</span>
              <p className='description'>Кількість балів</p>
            </div>
            <div className='liga'>
              <img className='medal' src='profile/level.png' alt='Group Icon' />
              <span className='number'>
                <strong>11</strong>
              </span>
              <p className='description'>Рівень</p>
            </div>
          </div>
          <div className='col-xl'>
            <div className='friend'>
              <img src='profile/invite_friends.png' alt='Your Image' />
              <div>
                <p>Запросіть своїх друзів</p>
                <p>Розкажи своїм друзям про YUkis</p>
              </div>
            </div>
            <div className='friend-container'>
              <button>Запросити друзів</button>
            </div>
          </div>
        </div>
      </div>
      <ConfirmationModal
        open={modalOpen2}
        onClose={() => setModalOpen2(false)}
        onConfirm={handleLogoutConfirm}
        str={"вийти з профілю"}
        buttonName={"Вийти"}
      />
      <ConfirmationModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        str={"видалити профіль"}
        buttonName={"Видалити"}
      />
    </>
  );
}

export default Profile;
