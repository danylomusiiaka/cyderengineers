import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useAuth } from "../context/AuthContext";
import Loading from "../components/Loading";
import "../styles/rating.css";

interface User {
  email: string;
  completed_tests: string[];
}

export default function Rating() {
  const { apiUrl } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await Axios.get(`${apiUrl}/users/rating`);
        const sortedUsers = response.data.sort(
          (a: User, b: User) => b.completed_tests.length - a.completed_tests.length
        );

        setUsers(sortedUsers);
      } catch (error) {
        console.error("Error fetching user data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className='rating-container'>
      <div className="rating-header">
        <img src='mainpage/crown.jpg' alt='' className='crown' />
        <h2>Рейтинг учасників</h2>
      </div>
      <div className='rating-list'>
        <ul>
          {users.map((user, index) => (
            <li key={user.email}>
              {index + 1}. {user.email} - Тестів завершено: {user.completed_tests.length}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
