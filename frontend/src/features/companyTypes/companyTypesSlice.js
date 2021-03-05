import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit'
import { client } from '../../api/client'

const companyTypesAdapter = createEntityAdapter()

const initialState = companyTypesAdapter.getInitialState()

export const fetchCompanyTypes = createAsyncThunk('companyTypes/fetchCompanyTypes', async () => {
  const response = await client.get('/companyTypes')
  return response
})

const companyTypesSlice = createSlice({
  name: 'companyTypes',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchCompanyTypes.fulfilled]: companyTypesAdapter.setAll
  }
})

export default companyTypesSlice.reducer

export const {
  selectAll: selectAllCompanyTypes,
  selectById: selectCompanyTypeById
} = companyTypesAdapter.getSelectors(state => state.companyTypes)
