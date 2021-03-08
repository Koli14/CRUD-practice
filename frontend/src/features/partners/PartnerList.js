import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchPartners, selectPartnerIds, selectPartnerById, deletePartner } from './partnersSlice'
import { selectCompanyTypeById } from '../companyTypes/companyTypesSlice'
import { selectSettlementById } from '../settlements/settlementsSlice'
import './PartnerList.css'
import PartnerModal from './PartnerModal'
import { unwrapResult } from '@reduxjs/toolkit'

export const partnerParams = ['name', 'companyTypeId', 'taxNumber', 'companyRegistrationNumber', 'settlementId', 'address', 'phone', 'bankAccount', 'comment']
export const paramsTranslations = ['Név', 'Cégforma', 'Adószám', 'Cégjegyzékszám', 'Település', 'Cím', 'Telefonszám', 'Bankszámlaszám', 'Megjegyzés']

export const emptyPartner = partnerParams.reduce((o, key) => ({ ...o, [key]: '' }), {})

const PartnerRow = ({ partnerId, setSelectedPartner, setIsOpen, filters }) => {
  const dispatch = useDispatch()

  const partner = useSelector(state => selectPartnerById(state, partnerId))
  const companyType = useSelector(state => selectCompanyTypeById(state, partner.companyTypeId))
  const settlement = useSelector(state => selectSettlementById(state, partner.settlementId)
  )
  const [deleteRequestStatus, setDeleteRequestStatus] = useState('idle')

  const onEdit = () => {
    setSelectedPartner(partner)
    setIsOpen(true)
  }

  const onDelete = async () => {
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
  const isFiltered = () => {
    return Object.entries(filters).every(filter => {
      if (filter[1] !== '') {
        if (filter[0] === 'companyType') {
          return companyType?.name.toUpperCase().includes(filter[1].toUpperCase())
        } else if (filter[0] === 'settlement') {
          return settlement.name.toUpperCase().includes(filter[1].toUpperCase())
        } else {
          return partner[filter[0]].toUpperCase().includes(filter[1].toUpperCase())
        }
      } else {
        return true
      }
    })
  }
  if (isFiltered()) {
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
          <button onClick={onEdit}>Szerkesztés</button>
        </td>
        <td>
          <button onClick={onDelete} disabled={deleteRequestStatus !== 'idle'}>
            Törlés
          </button>
        </td>
      </tr>
    )
  } else {
    return ''
  }
}

const PartnerList = () => {
  const [modalIsOpen, setIsOpen] = useState(false)
  const [selectedPartner, setSelectedPartner] = useState(emptyPartner)
  const [filters, setFilters] = useState({})

  const dispatch = useDispatch()
  const partnerIds = useSelector(selectPartnerIds)
  const partnerStatus = useSelector(state => state.partners.status)
  const error = useSelector((state) => state.partners.error)

  const onNew = () => {
    setSelectedPartner(emptyPartner)
    setIsOpen(true)
  }

  const onDownload = (e) => {
    e.preventDefault()
    window.location.href = 'http://localhost:5000/api/admin/downloadPartners'
  }

  useEffect(() => {
    if (partnerStatus === 'idle') {
      dispatch(fetchPartners())
    }
  }, [partnerStatus, dispatch])

  const PartnerTable = (
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
            filters={filters}
          />
        )}
      </tbody>
    </table>
  )

  let content

  if (partnerStatus === 'loading') {
    content = <div className='loader'>Loading...</div>
  } else if (partnerStatus === 'succeeded') {
    content = PartnerTable
  } else if (partnerStatus === 'error') {
    content = <div>{error}</div>
  }

  return (
    <section className='Partners-list'>
      <h2>Partnerek</h2>
      <div className='Header'>
        <div className='Buttons'>
          <button onClick={onNew}>
            Új Partner létrehozása
          </button>
          <button onClick={onDownload}>
            Összes partner letöltése Excel-ben
          </button>
        </div>
        <div className='SearchSection'>
          <h4>Keresés:</h4>
          <div className='SearchFields'>
            <div>
              <label htmlFor='name'>Partner nevére:</label>
              <input
                id='name'
                type='text'
                onChange={e => setFilters({ ...filters, name: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor='companyType'>Cégfromára:</label>
              <input
                id='companyType'
                type='text'
                onChange={e => setFilters({ ...filters, companyType: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor='settlement'>Településre:</label>
              <input
                id='settlement'
                type='text'
                onChange={e => setFilters({ ...filters, settlement: e.target.value })}
              />
            </div>
          </div>

        </div>
      </div>
      {content}
      <PartnerModal
        isOpen={modalIsOpen}
        onRequestClose={() => setIsOpen(false)}
        partner={selectedPartner}
        setPartner={setSelectedPartner}
      />
    </section>
  )
}

export default PartnerList
