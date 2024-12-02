import React, {useState, useEffect} from 'react'
import Navbar from "./components/Navbar";
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import Home from "./pages";
import AddTalent from "./pages/adding_talents";

function App() {
  return (
      <Router>
          <nav className='navbar navbar-dark bg-primary'>
            <div className='container-fluid'>
              <a className='navbar-brand' href='#'>
                Сборник талантов игры Дюна: Приключения в Империи
              </a>
            </div>
          </nav>
          <Navbar />
          <Routes>
              <Route exact path="/" element={<Home />} />
              <Route path="/add_talent" element={<AddTalent />} />
          </Routes>
      </Router>
  );
}

export default App;

/*
const App = () => {
  const [talents, setTalents] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    source: '',
    requirements: '',
    flavor: '',
    text: ''
  });

  const fetchTalents = async () => {
    const response = await api.get('/talents/');
    setTalents(response.data)
  };

  useEffect(() => {
    fetchTalents();
  }, []);

  const handleInputChange = (event) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    setFormData({
      ... formData,
      [event.target.name] : value,
    });
  };
  // ПЕРЕПИСАТЬ ПОД ФОРМУ ПОИСКА
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    var str = [];
    for (var p in formData)
      if (p.length != 0) {
        str.push(p + "=" + formData[p]);
      }
    var querry = str.join("&");

    const response = await api.get('/talents/filter/?' + querry);
    setTalents(response.data);
    setFormData({
      name: '',
      source: '',
      requirements: '',
      flavor: '',
      text: ''
    });
  };


  return (
    <div>
      <nav className='navbar navbar-dark bg-primary'>
        <div className='container-fluid'>
          <a className='navbar-brand' href='#'>
            Сборник талантов игры Дюна: Приключения в Империи
          </a>
        </div>
      </nav>

      <div className='container-fluid'>
        <form onSubmit={handleFormSubmit}>
          <div className='row'>

            <div className='mb-3 col-sm'>
              <label htmlFor='name' className='form-label'>
                Название
              </label>
              <input type='text' className='form-control' id='name' name='name' onChange={handleInputChange} value={formData.name}></input>
            </div>

            <div className='mb-3 col-sm'>
              <label htmlFor='source' className='form-label'>
                Источник
              </label>
              <select type='text' className='form-control' aria-label="Default select example" id='source' name='source' onChange={handleInputChange} value={formData.source}>
                <option defaultValue=''>Любой источник</option>
                <option value='Основная Книга Правил'>Основная Книга Правил</option>
                <option value='Песок и Пыль'>Песок и Пыль</option>
                <option value='Власть и Пешки: Императорский Двор'>Власть и Пешки: Императорский Двор</option>
                <option value='Великая Игра: Дома Ландсраада'>Великая Игра: Дома Ландсраада</option>
              </select>
            </div>

            <div className='mb-3 col-sm'>
              <label htmlFor='requirements' className='form-label'>
                Требование
              </label>
              <input type='text' className='form-control' id='requirements' name='requirements' onChange={handleInputChange} value={formData.requirements}></input>
            </div>

            <div className='mb-3 col-sm'>
              <label htmlFor='flavor' className='form-label'>
                Описание
              </label>
              <input type='text' className='form-control' id='flavor' name='flavor' onChange={handleInputChange} value={formData.flavor}></input>
            </div>

            <div className='mb-3 col-sm'>
              <label htmlFor='text' className='form-label'>
                Текст
              </label>
              <input type='text' className='form-control' id='text' name='text' onChange={handleInputChange} value={formData.text}></input>
            </div>
          </div>

          <div className="text-center">
            <button type='submit' className='btn btn-primary'>
              Поиск
            </button>
          </div>
        </form>
      </div>



      <table className='table table-striped table-bordered table-hover'>
        <thead>
          <tr>
            <th>Название</th>
            <th>Источник</th>
            <th>Требования</th>
            <th>Описание</th>
            <th>Текст</th>
          </tr>
        </thead>
        <tbody>
          {talents.map((talent) => (
            <tr key={talent.id}>
              <td>{talent.name}</td>
              <td>{talent.source}</td>
              <td>{talent.requirements ? talent.requirements : 'Нет'}</td>
              <td>{talent.flavor}</td>
              <td>{talent.text}</td>
            </tr>
          ))}
        </tbody>

      </table>

    </div>
  )
}

export default App;

*/