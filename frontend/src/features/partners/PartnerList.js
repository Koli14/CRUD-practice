import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectAllPartners, fetchPartners } from './partnersSlice'
import './PartnerList.css'
import AddPartnerModal from './AddPartnerModal'

const PartnerRow = ({ partner }) => {
  const companyType = useSelector((state) =>
    state.companyTypes.find((companyType) => companyType.id === partner.companyTypeId)
  )
  const settlement = useSelector((state) =>
    state.settlements.find((settlement) => settlement.id === partner.settlementId)
  )

  if (companyType && settlement) {
    return (
      <tr>
        <td>{partner.name}</td>
        <td>{companyType.name}</td>
        <td>{partner.taxNumber}</td>
        <td>{partner.companyRegistrationNumber}</td>
        <td>{settlement.name}</td>
        <td>{partner.address}</td>
        <td>{partner.phone}</td>
        <td>{partner.bankAccount}</td>
        <td>{partner.comment}</td>
      </tr>
    )
  } else {
    return <div className='loader'>Loading...</div>
  }
}

const PartnerTable = ({ partners }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Név</th>
          <th>Cégforma</th>
          <th>Adószám</th>
          <th>Cégjegyzékszám</th>
          <th>Település</th>
          <th>Cím</th>
          <th>Telefonszám</th>
          <th>Bankszámlaszám</th>
          <th>Megjegyzés</th>
        </tr>
      </thead>
      <tbody>
        {partners.map(partner =>
          <PartnerRow key={partner.id} partner={partner} />
        )}
      </tbody>
    </table>
  )
}

const PartnerList = () => {
  const dispatch = useDispatch()
  const partners = useSelector(selectAllPartners)
  const partnerStatus = useSelector(state => state.partners.status)
  const error = useSelector((state) => state.partners.error)
  useEffect(() => {
    if (partnerStatus === 'idle') {
      dispatch(fetchPartners())
    }
  }, [partnerStatus, dispatch])

  let table

  if (partnerStatus === 'loading') {
    table = <div className='loader'>Loading...</div>
  } else if (partnerStatus === 'succeeded') {
    table = <PartnerTable partners={partners} />
  } else if (partnerStatus === 'error') {
    table = <div>{error}</div>
  }

  const [modalIsOpen, setIsOpen] = React.useState(false)

  return (
    <section className='partners-list'>
      <div>
        <h2>Partnerek</h2>
        <button onClick={() => setIsOpen(true)}>Új Partner létrehozása</button>
      </div>
      {table}
      <AddPartnerModal isOpen={modalIsOpen} onRequestClose={() => setIsOpen(false)} />
    </section>
  )
}

export default PartnerList
