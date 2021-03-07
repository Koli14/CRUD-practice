import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchPartners, selectPartnerIds, selectPartnerById, deletePartner } from './partnersSlice'
import { selectCompanyTypeById } from '../companyTypes/companyTypesSlice'
import { selectSettlementById } from '../settlements/settlementsSlice'
import './PartnerList.css'
import PartnerModal from './PartnerModal'
import { unwrapResult } from '@reduxjs/toolkit'

const partnerParams = ['name', 'companyTypeId', 'taxNumber', 'companyRegistrationNumber', 'settlementId', 'address', 'phone', 'bankAccount', 'comment']
const paramsTranslations = ['Név', 'Cégforma', 'Adószám', 'Cégjegyzékszám', 'Település', 'Cím', 'Telefonszám', 'Bankszámlaszám', 'Megjegyzés']

export const emptyPartner = partnerParams.reduce((o, key) => ({ ...o, [key]: '' }), {})

const PartnerRow = ({ partnerId, setSelectedPartner, setIsOpen }) => {
  const dispatch = useDispatch()

  const partner = useSelector(state => selectPartnerById(state, partnerId))
  const companyType = useSelector(state => selectCompanyTypeById(state, partner.companyTypeId))
  const settlement = useSelector(state => selectSettlementById(state, partner.settlementId)
  )
  const [deleteRequestStatus, setDeleteRequestStatus] = useState('idle')

  const onDeleteClicked = async () => {
    if (deleteRequestStatus === 'idle') {
      try {
        setDeleteRequestStatus('pending')
        const resultAction = await dispatch(deletePartner({ partnerId }))
        unwrapResult(resultAction)
      } catch (error) {
        console.error('Failed to delete the Partner: ', error)
      } finally {
        setDeleteRequestStatus('idle')
      }
    }
  }

  return (
    <tr>
      <td>{partner.name}</td>
      <td>{companyType && companyType.name}</td>
      <td>{partner.taxNumber}</td>
      <td>{partner.companyRegistrationNumber}</td>
      <td>{settlement && settlement.name}</td>
      <td>{partner.address}</td>
      <td>{partner.phone}</td>
      <td>{partner.bankAccount}</td>
      <td>{partner.comment}</td>
      <td>
        <button onClick={() => { setSelectedPartner(partner); setIsOpen(true) }}>Szerkesztés</button>
      </td>
      <td>
        <button onClick={onDeleteClicked} disabled={deleteRequestStatus !== 'idle'}>
          Törlés
        </button>
      </td>
    </tr>
  )
}

const PartnerTable = ({ partnerIds, setSelectedPartner, setIsOpen }) => {
  return (
    <table>
      <thead>
        <tr>
          {paramsTranslations.map(t => <th key={t}>{t}</th>)}
          <th>Szerkesztés</th>
          <th>Törlés</th>
        </tr>
      </thead>
      <tbody>
        {partnerIds.map(partnerId =>
          <PartnerRow
            key={partnerId}
            partnerId={partnerId}
            setSelectedPartner={setSelectedPartner}
            setIsOpen={setIsOpen}
          />
        )}
      </tbody>
    </table>
  )
}

const PartnerList = () => {
  const [modalIsOpen, setIsOpen] = useState(false)
  const [selectedPartner, setSelectedPartner] = useState(emptyPartner)
  const dispatch = useDispatch()
  const partnerIds = useSelector(selectPartnerIds)
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
    table = (
      <PartnerTable
        partnerIds={partnerIds}
        setSelectedPartner={setSelectedPartner}
        setIsOpen={setIsOpen}
      />
    )
  } else if (partnerStatus === 'error') {
    table = <div>{error}</div>
  }

  return (
    <section className='partners-list'>
      <div>
        <h2>Partnerek</h2>
        <button onClick={() => { setSelectedPartner(emptyPartner); setIsOpen(true) }}>
          Új Partner létrehozása
        </button>
      </div>
      {table}
      <PartnerModal
        isOpen={modalIsOpen}
        onRequestClose={() => setIsOpen(false)}
        selectedPartner={selectedPartner}
      />
    </section>
  )
}

export default PartnerList
