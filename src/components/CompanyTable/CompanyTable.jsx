import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectCompany, selectAllCompanies, updateCompany, deleteSelectedCompanies } from '../../redux/slices/companiesSlice';
import './CompanyTable.scss';

const CompanyTable = () => {
  const companies = useSelector((state) => state.companies.companies);
  const selectedCompanyIds = useSelector((state) => state.companies.selectedCompanyIds);
  const dispatch = useDispatch();

  const [editCompanyId, setEditCompanyId] = useState(null);
  const [editName, setEditName] = useState('');
  const [editAddress, setEditAddress] = useState('');

  const handleCheckboxChange = (id) => {
    dispatch(selectCompany(id));
  };

  const handleSelectAllChange = (e) => {
    dispatch(selectAllCompanies(e.target.checked));
  };

  const handleEdit = (id, name, address) => {
    setEditCompanyId(id);
    setEditName(name);
    setEditAddress(address);
  };

  const handleSave = () => {
    dispatch(updateCompany({ id: editCompanyId, name: editName, address: editAddress }));
    setEditCompanyId(null);
  };
  const handleDeleteSelectedRows = () => {
    dispatch(deleteSelectedCompanies(selectedCompanyIds));
  };

  return (
    <table className="company-table">
      <thead>
        <tr>
          <th>
            <input
              type="checkbox"
              checked={selectedCompanyIds.length === companies.length}
              onChange={handleSelectAllChange}
            />
            Выделить всё
          </th>
          <th>Название компании</th>
          <th>Кол-во сотрудников</th>
          <th>Адрес</th>
          <th>
            <button onClick={() => handleDeleteSelectedRows()}>Удалить выделенные</button>
          </th>
        </tr>
      </thead>
      <tbody>
        {companies.map((company) => (
          <tr
            key={company.id}
            className={selectedCompanyIds.includes(company.id) ? 'selected' : ''}
          >
            <td>
              <input
                type="checkbox"
                checked={selectedCompanyIds.includes(company.id)}
                onChange={() => handleCheckboxChange(company.id)}
              />
            </td>
            <td>
              {editCompanyId === company.id ? (
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  onBlur={handleSave}
                />
              ) : (
                <span onClick={() => handleEdit(company.id, company.name, company.address)}>{company.name}</span>
              )}
            </td>
            <td>{company.employees}</td>
            <td>
              {editCompanyId === company.id ? (
                <input
                  type="text"
                  value={editAddress}
                  onChange={(e) => setEditAddress(e.target.value)}
                  onBlur={handleSave}
                />
              ) : (
                <span onClick={() => handleEdit(company.id, company.name, company.address)}>{company.address}</span>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CompanyTable;

