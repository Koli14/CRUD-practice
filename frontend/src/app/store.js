import { configureStore } from '@reduxjs/toolkit'
import partnerReducer from '../features/partners/partnersSlice'
import companyTypesReducer from '../features/companyTypes/companyTypesSlice'
import settlementsReducer from '../features/settlements/settlementsSlice'

export default configureStore({
  reducer: {
    partners: partnerReducer,
    companyTypes: companyTypesReducer,
    settlements: settlementsReducer
  }
})
