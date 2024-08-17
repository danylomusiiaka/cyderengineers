import { Link } from "react-router-dom";

export default function TestCard({ test, email, handleDeleteTest }) {
  return (
    <div key={test._id} className='col-md-4 col-sm-6'>
      <div>
        <img src='mainpage/crown.jpg' alt='' className='crown' />
        18/40
      </div>
      <div className='card'>
        <div className='card-body'>
          <h5 className='card-title'>{test.name}</h5>
          <p className='card-text'>{test.description}</p>
          <p>{test.option}</p>
          <Link className='btn login' to={`/view-test/${test._id}`}>
            Обрати
          </Link>
          {test.author === email && (
            <button
              className='btn btn-danger'
              onClick={() => handleDeleteTest(test._id, test.author)}
            >
              Видалити
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
