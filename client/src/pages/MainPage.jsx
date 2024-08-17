import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import TestCard from "../components/TestCard"; 
import Dropdown from "../components/Dropdown";

function MainPage() {
  const [email, setEmail] = useState("");
  const [tests, setTests] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    const fetchData = async () => {
      try {
        const userResponse = await Axios.get("http://localhost:3001/users/status");
        setEmail(userResponse.data.user.email);

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

  const categories = Array.from(new Set(tests.map((test) => test.option)));

  const filteredTests = tests.filter(
    (test) =>
      (!selectedCategory || test.option === selectedCategory) &&
      test.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const userTests = filteredTests.filter((test) => test.author === email);
  const otherTests = filteredTests.filter((test) => test.author !== email);

  const handleDeleteTest = async (testId, author) => {
    if (author === email) {
      await Axios.delete(`http://localhost:3001/tests/${testId}`);
      const response = await Axios.get("http://localhost:3001/tests");
      setTests(response.data);
    }
  };

  if (loading) {
    return (
      <div className='loading-container'>
        <div className='loader'>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    );
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

          <Link className='btn sign-in add-btn' style={{ color: "white" }} to='/create-test'>
            Додати
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
          <TestCard key={test._id} test={test} email={email} handleDeleteTest={handleDeleteTest} />
        ))}
      </div>

      <div className='row cards'>
        {otherTests.length > 0 && (
          <div className='col-12'>
            <h3>Доступні тести:</h3>
          </div>
        )}

        {otherTests.map((test) => (
          <TestCard key={test._id} test={test} email={email} handleDeleteTest={handleDeleteTest} />
        ))}

        {userTests.length === 0 && otherTests.length === 0 && (
          <div className='col-12'>
            <h3>Ви ще не створили жодного тесту</h3>
          </div>
        )}
          </div>
          
    </section>
  );
}

export default MainPage;
