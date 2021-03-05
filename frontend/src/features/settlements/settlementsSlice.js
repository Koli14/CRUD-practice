import { createSlice, createAsyncThunk, createEntityAdapter, createSelector } from '@reduxjs/toolkit'
import { client } from '../../api/client'

const settlementsAdapter = createEntityAdapter()

const initialState = settlementsAdapter.getInitialState()

export const fetchSettlements = createAsyncThunk('settlements/fetchSettlements', async () => {
  const response = await client.get('/settlements')
  return response
})

export const addNewSettlement = createAsyncThunk(
  'settlements/addNewSettlement',
  async (newSettlement) => {
    const response = await client.post('/settlements', { name: newSettlement })
    return { ...response }
  }
)

const settlementsSlice = createSlice({
  name: 'settlements',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchSettlements.fulfilled]: settlementsAdapter.setAll,
    [addNewSettlement.fulfilled]: settlementsAdapter.addOne

  }
})

export default settlementsSlice.reducer

export const {
  selectAll: selectAllSettlements,
  selectById: selectSettlementById
} = settlementsAdapter.getSelectors(state => state.settlements)

export const selectAllSettlementsOptions = createSelector(
  [selectAllSettlements],
  (settlements) => settlements.map((settlement) => (
    { value: settlement.id, label: settlement.name }
  ))
)
