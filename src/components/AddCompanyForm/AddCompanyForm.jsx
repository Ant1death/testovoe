import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addCompany } from '../../redux/slices/companiesSlice';

const AddCompanyForm = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addCompany({ name, address }));
    setName('');
    setAddress('');
  };

  return (
    <form onSubmit={handleSubmit} style={{display:'flex'}}>
      <label>
        Название компании:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <label>
        Адрес:
        <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
      </label>
      <button type="submit">Добавить компанию</button>
    </form>
  );
};

export default AddCompanyForm;
