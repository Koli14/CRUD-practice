import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit'
import { client } from '../../api/client'

const partnersAdapter = createEntityAdapter()

const initialState = partnersAdapter.getInitialState({
  status: 'idle',
  error: null
})

export const fetchPartners = createAsyncThunk('partners/fetchPartners', async () => {
  const response = await client.get('/partners')
  return response
})

export const addNewPartner = createAsyncThunk(
  'partners/addNewPartner',
  async (initialPartner) => {
    const response = await client.post('/partners', { ...initialPartner })
    return { ...response, companyTypeId: Number(response.companyTypeId), settlementId: Number(response.settlementId) }
  }
)

const partnersSlice = createSlice({
  name: 'partners',
  initialState,
  reducers: {},
  // {
  //   partnerAdded: {
  //     reducer (state, action) {
  //       state.partners.push(action.payload)
  //     },
  //     prepare (title, content, userId) {
  //       // omit prepare logic
  //     }
  //   },
  //   partnerUpdated (state, action) {
  //     const { id, title, content } = action.payload
  //     const existingPartner = state.partners.find(partner => partner.id === id)
  //     if (existingPartner) {
  //       existingPartner.title = title
  //       existingPartner.content = content
  //     }
  // },
  extraReducers: {
    [fetchPartners.pending]: (state, action) => {
      state.status = 'loading'
    },
    [fetchPartners.fulfilled]: (state, action) => {
      state.status = 'succeeded'
      // Add any fetched partners to the array
      partnersAdapter.upsertMany(state, action.payload)
    },
    [fetchPartners.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    },
    [addNewPartner.fulfilled]: partnersAdapter.addOne
  }
})
export const { partnerAdded, partnerUpdated } = partnersSlice.actions

export default partnersSlice.reducer

export const {
  selectAll: selectAllPartners,
  selectById: selectPartnerById,
  selectIds: selectPartnerIds
} = partnersAdapter.getSelectors(state => state.partners)
