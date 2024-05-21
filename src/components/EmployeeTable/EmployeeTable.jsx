import React , { useState}from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectEmployee, selectAllEmployees, addEmployees, deleteEmployees } from '../../redux/slices/companiesSlice';
import './EmployeeTable.scss';

const EmployeeTable = () => {
  const companies = useSelector((state) => state.companies.companies);
  const selectedCompanyIds = useSelector((state) => state.companies.selectedCompanyIds);
  
  const selectedCompanies = companies.filter((company) => selectedCompanyIds.includes(company.id));
  const selectedEmployeeIds = useSelector((state) => state.companies.selectedEmployeeIds);
  const dispatch = useDispatch();

  const handleEmployeeCheckboxChange = (id) => {
    console.log(`handleEmployeeCheckboxChange: ${id}`);
    dispatch(selectEmployee(id));
  };

  const handleSelectAllEmployeesChange = (companyStaff, e) => {
    dispatch(selectAllEmployees({ employees: companyStaff, selectAll: e.target.checked }));
  };
  const handleDeleteSelectedEmployees = () => {
    dispatch(deleteEmployees(selectedEmployeeIds));
  };
  const [name, setName] = useState('');
  const [secondName, setSecondName] = useState('');
  const [position, setPosition] = useState('');
  const handleSubmit = (selectedCompanyId) => (e) => {
    e.preventDefault();
    const companyId = selectedCompanyId; 
    dispatch(addEmployees({ companyId, name, secondName, position }));
    setSecondName('');
    setName('');
    setPosition('');
  };
  return (
    <div className="employee-table-container">
      {selectedCompanies.length === 0 ? (
        <div className="employee-table">Выберите компанию для просмотра сотрудников.</div>
      ) : (
        selectedCompanies.map((company) => (
          <div key={company.id}>
            <h3>Сотрудники {company.name}</h3>
            <table className="employee-table">
              <thead>
                <tr>
                  <th>
                    <input
                      type="checkbox"
                      checked={
                        company.staff.length > 0 &&
                        company.staff.every((employee) => selectedEmployeeIds.includes(employee.id))
                      }
                      onChange={(e) => handleSelectAllEmployeesChange(company.staff, e)}
                    />
                    Выделить всё
                  </th>
                  <th>Фамилия</th>
                  <th>Имя</th>
                  <th>Должность</th>
                  <th>
                    <button onClick={() => handleDeleteSelectedEmployees()}>Удалить выделенные</button>
                  </th>
                </tr>
              </thead>
              <tbody>
                {company.staff.map((employee, index) => (
                  <tr
                    key={index}
                    className={selectedEmployeeIds.includes(employee.id) ? 'selected' : ''}
                    
                  >
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedEmployeeIds.includes(employee.id)}
                        onChange={() => handleEmployeeCheckboxChange(employee.id)}
                      />
                    </td>
                    <td>{employee.name.split(' ')[0]}</td>
                    <td>{employee.name.split(' ')[1]}</td>
                    <td>{employee.position}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <form onSubmit={handleSubmit(company.id)} style={{display:'flex'}}>
              <label>
                Фамилия
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
              </label>
              <label>
                Имя
                <input type="text" value={secondName} onChange={(e) => setSecondName(e.target.value)} />
              </label>
              <label>
                Должность
                <input type="text" value={position} onChange={(e) => setPosition(e.target.value)} />
              </label>
              <button type="submit">Добавить сотрудника</button>
            </form>
          </div>
          
        ))
      )}
    </div>
  );
};

export default EmployeeTable;
