import { createSlice, createAsyncThunk, createEntityAdapter, createSelector } from '@reduxjs/toolkit'
import { client } from '../../api/client'

const companyTypesAdapter = createEntityAdapter()

const initialState = companyTypesAdapter.getInitialState()

export const fetchCompanyTypes = createAsyncThunk('companyTypes/fetchCompanyTypes', async () => {
  const response = await client.get('/companyTypes')
  return response
})

export const addNewCompanyType = createAsyncThunk(
  'companyTypes/addNewCompanyType',
  async (newCompanyType) => {
    const response = await client.post('/companyTypes', { name: newCompanyType })
    return { ...response }
  }
)

const companyTypesSlice = createSlice({
  name: 'companyTypes',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchCompanyTypes.fulfilled]: companyTypesAdapter.setAll,
    [addNewCompanyType.fulfilled]: companyTypesAdapter.addOne
  }
})

export default companyTypesSlice.reducer

export const {
  selectAll: selectAllCompanyTypes,
  selectById: selectCompanyTypeById
} = companyTypesAdapter.getSelectors(state => state.companyTypes)

export const selectAllCompanyTypesOptions = createSelector(
  [selectAllCompanyTypes],
  (companyTypes) => companyTypes.map((companyType) => (
    { value: companyType.id, label: companyType.name }
  ))
)
