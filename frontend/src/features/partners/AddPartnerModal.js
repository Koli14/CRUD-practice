import Modal from 'react-modal'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'
import CreatableSelect from 'react-select/creatable'

import './AddPartnerModal.css'
import { addNewPartner } from './partnersSlice'
import { selectAllCompanyTypesOptions, addNewCompanyType } from '../companyTypes/companyTypesSlice'
import { selectAllSettlementsOptions, addNewSettlement } from '../settlements/settlementsSlice'

const initialPartner = {
  name: '',
  companyTypeId: '',
  taxNumber: '',
  companyRegistrationNumber: '',
  settlementId: '',
  address: '',
  phone: '',
  bankAccount: '',
  comment: ''
}
const AddPartnerModal = ({ isOpen, onRequestClose }) => {
  Modal.setAppElement('#root')
  const dispatch = useDispatch()
  const [partner, setPartner] = useState(initialPartner)
  const [addRequestStatus, setAddRequestStatus] = useState('idle')

  const [selectedCompanyType, setSelectedCompanyType] = useState()
  const companyTypesOptions = useSelector(selectAllCompanyTypesOptions)
  const [isLoadingCompanyTypes, setIsLoadingCompanyTypes] = useState(false)
  const handleCompanyTypeCreate = async (input) => {
    setIsLoadingCompanyTypes(true)
    try {
      const resultAction = await dispatch(addNewCompanyType(input))
      const newCompanyType = unwrapResult(resultAction)
      setSelectedCompanyType({ value: newCompanyType.id, label: newCompanyType.name })
      setPartner({ ...partner, companyTypeId: newCompanyType.id })
    } catch (err) {
      console.error('Failed to save the CompanyType: ', err)
    } finally {
      setIsLoadingCompanyTypes(false)
    }
  }

  const [selectedSettlement, setSelectedSettlement] = useState()
  const settlementsOptions = useSelector(selectAllSettlementsOptions)
  const [isLoadingSettlements, setIsLoadingSettlements] = useState(false)
  const handleSettlementCreate = async (input) => {
    setIsLoadingSettlements(true)
    try {
      const resultAction = await dispatch(addNewSettlement(input))
      const newSettlement = unwrapResult(resultAction)
      setSelectedSettlement({ value: newSettlement.id, label: newSettlement.name })
      setPartner({ ...partner, settlementId: newSettlement.id })
    } catch (err) {
      console.error('Failed to save the Settlement: ', err)
    } finally {
      setIsLoadingSettlements(false)
    }
  }

  const canSave =
    [partner.name, partner.settlementId].every(Boolean) && addRequestStatus === 'idle'

  const onSavePartnerClicked = async () => {
    if (canSave) {
      try {
        setAddRequestStatus('pending')
        const resultAction = await dispatch(addNewPartner(partner))
        unwrapResult(resultAction)
        setPartner(initialPartner)
        setSelectedCompanyType()
        setSelectedSettlement()
        onRequestClose()
      } catch (err) {
        console.error('Failed to save the partner: ', err)
      } finally {
        setAddRequestStatus('idle')
      }
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
      contentLabel='Add Partner Modal'
    >
      <form>
        <div>
          <label htmlFor='name'>Név:</label>
          <input
            type='text'
            id='name'
            name='name'
            value={partner.name}
            onChange={e => setPartner({ ...partner, name: e.target.value })}
          />
        </div>

        <div>
          <label htmlFor='companyType'>Cégforma:</label>
          <CreatableSelect
            isClearable
            isDisabled={isLoadingCompanyTypes}
            isLoading={isLoadingCompanyTypes}
            onChange={selected => setPartner({ ...partner, companyTypeId: selected.value })}
            onCreateOption={handleCompanyTypeCreate}
            options={companyTypesOptions}
            value={selectedCompanyType}
          />
        </div>

        <div>
          <label htmlFor='taxNumber'>Adószám:</label>
          <input
            type='text'
            id='taxNumber'
            name='taxNumber'
            value={partner.taxNumber}
            onChange={e => setPartner({ ...partner, taxNumber: e.target.value })}
          />
        </div>

        <div>
          <label htmlFor='companyRegistrationNumber'>Cégjegyzékszám:</label>
          <input
            type='text'
            id='companyRegistrationNumber'
            name='companyRegistrationNumber'
            value={partner.companyRegistrationNumber}
            onChange={e => setPartner({ ...partner, companyRegistrationNumber: e.target.value })}
          />
        </div>

        <div>
          <label htmlFor='settlement'>Település:</label>
          <CreatableSelect
            isClearable
            isDisabled={isLoadingSettlements}
            isLoading={isLoadingSettlements}
            onChange={selected => setPartner({ ...partner, settlementId: selected.value })}
            onCreateOption={handleSettlementCreate}
            options={settlementsOptions}
            value={selectedSettlement}
          />
        </div>

        <div>
          <label htmlFor='address'>Cím:</label>
          <input
            type='text'
            id='address'
            name='address'
            value={partner.address}
            onChange={e => setPartner({ ...partner, address: e.target.value })}
          />
        </div>

        <div>
          <label htmlFor='phone'>Telefonszám:</label>
          <input
            type='text'
            id='phone'
            name='phone'
            value={partner.phone}
            onChange={e => setPartner({ ...partner, phone: e.target.value })}
          />
        </div>

        <div>
          <label htmlFor='bankAccount'>Bankszámlaszám:</label>
          <input
            type='text'
            id='bankAccount'
            name='bankAccount'
            value={partner.bankAccount}
            onChange={e => setPartner({ ...partner, bankAccount: e.target.value })}
          />
        </div>

        <div>
          <label htmlFor='comment'>Megjegyzés:</label>
          <input
            type='text'
            id='comment'
            name='comment'
            value={partner.comment}
            onChange={e => setPartner({ ...partner, comment: e.target.value })}
          />
        </div>

      </form>
      <div className='buttons'>
        <button onClick={onSavePartnerClicked} disabled={!canSave}>Mentés</button>
        <button onClick={onRequestClose}>Mégsem</button>
      </div>

    </Modal>
  )
}

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: '36px'
  }
}

export default AddPartnerModal
