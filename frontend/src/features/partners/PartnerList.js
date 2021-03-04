import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectAllPartners, fetchPartners } from './partnersSlice'
import './PartnerList.css'

const PartnerRow = ({ partner }) => {
  const companyType = useSelector((state) =>
    state.companyTypes.find((companyType) => companyType.id === partner.companyTypeId)
  )
  const settlement = useSelector((state) =>
    state.settlements.find((settlement) => settlement.id === partner.settlementId)
  )
  console.log(companyType, settlement)
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

  let content

  if (partnerStatus === 'loading') {
    content = <div className='loader'>Loading...</div>
  } else if (partnerStatus === 'succeeded') {
    content = <PartnerTable partners={partners} />
  } else if (partnerStatus === 'error') {
    content = <div>{error}</div>
  }

  return (
    <section className='partners-list'>
      <h2>Partnerek</h2>
      {content}
    </section>
  )
}

export default PartnerList
