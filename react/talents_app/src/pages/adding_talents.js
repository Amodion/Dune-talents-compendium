import React, {useState, useEffect} from 'react'
import api from '../api'

const AddTalent = () => {
  const [messege, setMessege] = useState({
    text: '',
  });
  const [formData, setFormData] = useState({
    name: '',
    source: '',
    requirements: '',
    flavor: '',
    text: ''
  });

  useEffect(() => {
    setMessege();
  }, {});

  const handleInputChange = (event) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    setFormData({
      ... formData,
      [event.target.name] : value,
    });
  };
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const response = await api.post('/talents/add', formData);
    setMessege(response.data)
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
      <div className='container-fluid'>
        <form onSubmit={handleFormSubmit}>
           <div className='mb-3 mt-3'>
            <label htmlFor='name' className='form-label'>
                Название
            </label>
            <input type='text' className='form-control' id='name' name='name' onChange={handleInputChange} value={formData.name} required></input>
            <div class="invalid-feedback">Введите Название!</div>
           </div>

           <div className='form-group'>
              <label htmlFor='source' className='form-label'>
                Источник
              </label>
              <select type='text' className='form-select' aria-label="Default select example" id='source' name='source' onChange={handleInputChange} value={formData.source} required>
                <option value=''>Выберите источник</option>
                <option value='Основная Книга Правил'>Основная Книга Правил</option>
                <option value='Песок и Пыль'>Песок и Пыль</option>
                <option value='Власть и Пешки: Императорский Двор'>Власть и Пешки: Императорский Двор</option>
                <option value='Великая Игра: Дома Ландсраада'>Великая Игра: Дома Ландсраада</option>
              </select>
              <div class="invalid-feedback">Нужно выбрать источник!</div>
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
              <textarea className='form-control' id='flavor' name='flavor' onChange={handleInputChange} value={formData.flavor} required></textarea>
            </div>

            <div className='mb-3 col-sm'>
              <label htmlFor='text' className='form-label'>
                Текст
              </label>
              <textarea className='form-control' id='text' name='text' rows='3' onChange={handleInputChange} value={formData.text} required></textarea>
            </div>

          <div className="text-center">
            <button type='submit' className='btn btn-primary'>
              Добавить
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}


export default AddTalent;