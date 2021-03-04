import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { client } from '../../api/client'

const initialState = {
  partners: [],
  status: 'idle',
  error: null
}

export const fetchPartners = createAsyncThunk('partners/fetchPartners', async () => {
  const response = await client.get('/partners')
  return response
})

export const addNewPartner = createAsyncThunk(
  'partners/addNewPartner',
  async (initialPartner) => {
    const response = await client.partner('/partners', { partner: initialPartner })
    return response
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
      state.partners = state.partners.concat(action.payload)
    },
    [fetchPartners.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    },
    [addNewPartner.fulfilled]: (state, action) => {
      state.partners.push(action.payload)
    }
  }
})
export const { partnerAdded, partnerUpdated, reactionAdded } = partnersSlice.actions

export default partnersSlice.reducer

export const selectAllPartners = (state) => state.partners.partners

export const selectPartnerById = (state, partnerId) =>
  state.partners.partners.find((partner) => partner.id === partnerId)
