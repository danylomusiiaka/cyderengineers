import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import TestCard from "../components/TestCard";
import Dropdown from "../components/Dropdown";
import Loading from "../components/Loading";
import ConfirmationModal from "../components/ConfirmDelete";
import { useAlert } from "../context/AlertContext"; 
import { useAuth } from "../context/AuthContext";

function MainPage() {
  const { email } = useAuth();
  const { showAlert } = useAlert(); 

  const [tests, setTests] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [testToDelete, setTestToDelete] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const testsResponse = await Axios.get("http://localhost:3001/tests");
        setTests(testsResponse.data);
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:3001");

    socket.addEventListener("message", (event) => {
      const message = JSON.parse(event.data);
      if (message.type === "add") {
        setTests((prevTests) => [...prevTests, message.test]);
      } else if (message.type === "delete") {
        setTests((prevTests) => prevTests.filter((test) => test._id !== message.testId));
      } else if (message.type === "deleteAllByAuthor") {
        setTests((prevTests) => prevTests.filter((test) => test.author !== message.authorEmail));
      }
    });
    return () => {
      socket.close();
    };
  }, []);

  const categories = Array.from(new Set(tests.map((test) => test.option)));

  const filteredTests = tests.filter(
    (test) =>
      (!selectedCategory || test.option === selectedCategory) &&
      test.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const userTests = filteredTests.filter((test) => test.author === email);
  const otherTests = filteredTests.filter((test) => test.author !== email);

  const handleDeleteTest = async () => {
    if (testToDelete) {
      try {
        await Axios.delete(`http://localhost:3001/tests/${testToDelete}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        showAlert("Вдалося! Ваш тест було видалено успішно!", "success", 'filled');
      } catch (error) {
        showAlert("Сталася помилка при видаленні тесту.", "error", 'filled');
      } finally {
        setModalOpen(false);
        setTestToDelete(null);
      }
    }
  };

  const openModal = (testId) => {
    setTestToDelete(testId);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setTestToDelete(null);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <section className='container'>
      <nav className='navbar'>
        <h2 className='text-break'>Вибери гру для себе</h2>
        <div className='d-flex align-items-center'>
        <input
          type='text'
          className='form-control'
          placeholder='Пошук...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
          <Dropdown
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />

          <Link className='btn sign-in' style={{ color: "white" }} to='/create-test'>
            Створити
          </Link>
        </div>
      </nav>

      {userTests.length > 0 && (
        <div className='col-12'>
          <h3>Ваші створені тести:</h3>
        </div>
      )}

      <div className='row cards'>
        {userTests.map((test) => (
          <TestCard
            key={test._id}
            test={test}
            email={email}
            handleDeleteTest={() => openModal(test._id)}
          />
        ))}
      </div>

      <div className='row cards'>
        {otherTests.length > 0 && (
          <div className='col-12'>
            <h3>Доступні тести:</h3>
          </div>
        )}

        {otherTests.map((test) => (
          <TestCard
            key={test._id}
            test={test}
            email={email}
            handleDeleteTest={() => openModal(test._id)}
          />
        ))}

        {userTests.length === 0 && otherTests.length === 0 && (
          <div className='col-12'>
            <h3>Жодного тесту ще не створено</h3>
          </div>
        )}
      </div>

      <ConfirmationModal
        open={modalOpen}
        onClose={closeModal}
        onConfirm={handleDeleteTest}
        str={"видалити цей тест"}
        buttonName={"Видалити"}
      />
    </section>
  );
}

export default MainPage;
