import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { client } from '../../api/client'

const initialState = []

export const fetchCompanyTypes = createAsyncThunk('companyTypes/fetchCompanyTypes', async () => {
  const response = await client.get('/companyTypes')
  return response
})

const companyTypesSlice = createSlice({
  name: 'companyTypes',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchCompanyTypes.fulfilled]: (state, action) => {
      return action.payload
    }
  }
})

export default companyTypesSlice.reducer
