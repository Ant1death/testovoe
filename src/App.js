import React from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import CompanyTable from './components/CompanyTable/CompanyTable';
import EmployeeTable from './components/EmployeeTable/EmployeeTable';
import AddCompanyForm from './components/AddCompanyForm/AddCompanyForm';
import './App.scss';

const App = () => {
  return (
    <Provider store={store}>
      <div className="app-container">
        <div className="company-section">
          <h2>Компании</h2>
          <CompanyTable />
          <AddCompanyForm />
        </div>
        <div className="employee-section">
          <h2>Сотрудники</h2>
          <EmployeeTable />
        </div>
      </div>
    </Provider>
  );
};

export default App;

