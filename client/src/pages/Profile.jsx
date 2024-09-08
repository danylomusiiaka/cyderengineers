import { useEffect, useState } from "react";
import Axios from "axios";
import "../styles/profile.css";
import ConfirmationModal from "../components/ConfirmDelete";
import { useAuth } from "../context/AuthContext";
import { useAlert } from "../context/AlertContext";
import TestCard from "../components/TestCard";
import Loading from "../components/Loading";

function Profile() {
  const { user, setAuth, apiUrl } = useAuth();
  const { showAlert } = useAlert();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpen2, setModalOpen2] = useState(false);
  const [loading, setLoading] = useState(true);
  const [completedTests, setCompletedTests] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const completedTests = await Axios.get(`${apiUrl}/tests/all-completed`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCompletedTests(completedTests.data);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          localStorage.removeItem("token");
          setAuth(false);
          showAlert("Термін сесії скінчився. Будь ласка, залогуйтесь знову", "warning");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const logout = async () => {
    localStorage.removeItem("token");
    showAlert("Ви вийшли з облікового запису", "warning");
    setAuth(false);
    navigate("/");
  };

  const handleLogoutConfirm = () => {
    logout();
    setModalOpen2(false);
  };

  const deleteAccount = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      await Axios.delete(`${apiUrl}/tests/deleteByAuthor`, {
        data: {
          authorEmail: user.email,
        },
      });
      await Axios.delete(`${apiUrl}/users/delete`, {
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

  if (loading) {
    return <Loading/>
  }

  return (
    <>
      <div className='container'>
        <div className='row align-items-center'>
          <div className='col-sm-10'>
            <h1 className='Nickname'>{user.email}</h1>
            <p>
              <img className='clock' src='profile/clock.png' /> Приєднався в {user.createdAt}
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
        {completedTests.length > 0 && (
          <div className='col-12'>
            <h3>Ваші пройдені тести:</h3>
          </div>
        )}
        <div className='row cards'>
          {completedTests.map((test) => (
            <TestCard
              key={test._id}
              test={test}
              email={user.email}
              handleDeleteTest={() => openModal(test._id)}
            />
          ))}
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
