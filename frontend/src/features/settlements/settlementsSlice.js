import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit'
import { client } from '../../api/client'

const settlementsAdapter = createEntityAdapter()

const initialState = settlementsAdapter.getInitialState()

export const fetchSettlements = createAsyncThunk('settlements/fetchSettlements', async () => {
  const response = await client.get('/settlements')
  return response
})

const settlementsSlice = createSlice({
  name: 'settlements',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchSettlements.fulfilled]: settlementsAdapter.setAll
  }
})

export default settlementsSlice.reducer

export const {
  selectAll: selectAllSettlements,
  selectById: selectSettlementById
} = settlementsAdapter.getSelectors(state => state.settlements)
