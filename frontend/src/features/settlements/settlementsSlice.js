import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { client } from '../../api/client'

const initialState = []

export const fetchSettlements = createAsyncThunk('settlements/fetchSettlements', async () => {
  const response = await client.get('/settlements')
  return response
})

const settlementsSlice = createSlice({
  name: 'settlements',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchSettlements.fulfilled]: (state, action) => {
      console.log(action)
      return action.payload
    }
  }
})

export default settlementsSlice.reducer
