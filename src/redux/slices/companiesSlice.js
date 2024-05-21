import { createSlice } from '@reduxjs/toolkit';
import companiesData from '../../companiesData.json';

const initialState = {
  companies: companiesData,
  selectedCompanyIds: [],
  selectedEmployeeIds: [],
};

const companiesSlice = createSlice({
  name: 'companies',
  initialState,
  reducers: {
    selectCompany: (state, action) => {
      const id = action.payload;
      if (state.selectedCompanyIds.includes(id)) {
        state.selectedCompanyIds = state.selectedCompanyIds.filter((companyId) => companyId !== id);
      } else {
        state.selectedCompanyIds.push(id);
      }
    },
    selectAllCompanies: (state, action) => {
      if (action.payload) {
        state.selectedCompanyIds = state.companies.map((company) => company.id);
      } else {
        state.selectedCompanyIds = [];
      }
    },
    updateCompany: (state, action) => {
      const { id, name, address } = action.payload;
      const companyToUpdate = state.companies.find((company) => company.id === id);
      if (companyToUpdate) {
        companyToUpdate.name = name;
        companyToUpdate.address = address;
      }
    },
    deleteSelectedCompanies: (state, action) => {
      const idsToDelete = action.payload;
      state.companies = state.companies.filter((company) => !idsToDelete.includes(company.id));
      state.selectedCompanyIds = [];
    },
    addCompany: (state, action) => {
      const newCompany = {
        id: state.companies.length + 1,
        name: action.payload.name || '',
        address: action.payload.address || '',
        staff: [],
      };
      console.log(state);
      state.companies.push(newCompany);
    },
    selectEmployee: (state, action) => {
      const id = action.payload;
      if (state.selectedEmployeeIds.includes(id)) {
        state.selectedEmployeeIds = state.selectedEmployeeIds.filter((employeeId) => employeeId !== id);
      } else {
        state.selectedEmployeeIds.push(id);
      }
    },
    selectAllEmployees: (state, action) => {
      const { employees, selectAll } = action.payload;
      if (selectAll) {
        state.selectedEmployeeIds = employees.map((employee) => employee.id);
      } else {
        state.selectedEmployeeIds = [];
      }
    },
    addEmployees: (state, action) => {
      const { companyId, name, secondName, position } = action.payload;
      const company = state.companies.find(company => company.id === companyId);
      if (company) {
        const newEmployee = {
          id: company.staff.length + 1,
          name: `${name} ${secondName}`,
          position
        };
        company.staff.push(newEmployee);
      }
    },
    deleteEmployees: (state, action) => {
      const idsToDelete = action.payload;
      state.companies.forEach((company) => {
        company.staff = company.staff.filter((employee) => !idsToDelete.includes(employee.id));
      });
      state.selectedEmployeeIds = [];
    },
  },
});

export const { selectCompany, selectAllCompanies, updateCompany, deleteSelectedCompanies, addCompany , 
  selectEmployee, selectAllEmployees , addEmployees, deleteEmployees
} = companiesSlice.actions;

export default companiesSlice.reducer;
