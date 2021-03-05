import Modal from 'react-modal'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'
import CreatableSelect from 'react-select/creatable'

import './Modal.css'
import { updatePartner, selectPartnerById } from './partnersSlice'
import { selectAllCompanyTypesOptions, addNewCompanyType } from '../companyTypes/companyTypesSlice'
import { selectAllSettlementsOptions, addNewSettlement } from '../settlements/settlementsSlice'

const UpdatePartnerModal = ({ isOpen, onRequestClose, partnerId }) => {
  Modal.setAppElement('#root')
  const dispatch = useDispatch()
  const initialPartner = useSelector(state => selectPartnerById(state, partnerId))

  const [partner, setPartner] = useState(initialPartner)
  const [updateRequestStatus, setUpdateRequestStatus] = useState('idle')

  const companyTypesOptions = useSelector(selectAllCompanyTypesOptions)
  const [isLoadingCompanyTypes, setIsLoadingCompanyTypes] = useState(false)
  const handleCompanyTypeCreate = async (input) => {
    setIsLoadingCompanyTypes(true)
    try {
      const resultAction = await dispatch(addNewCompanyType(input))
      const newCompanyType = unwrapResult(resultAction)
      setPartner({ ...partner, companyTypeId: newCompanyType.id })
    } catch (err) {
      console.error('Failed to save the CompanyType: ', err)
    } finally {
      setIsLoadingCompanyTypes(false)
    }
  }

  const settlementsOptions = useSelector(selectAllSettlementsOptions)
  const [isLoadingSettlements, setIsLoadingSettlements] = useState(false)
  const handleSettlementCreate = async (input) => {
    setIsLoadingSettlements(true)
    try {
      const resultAction = await dispatch(addNewSettlement(input))
      const newSettlement = unwrapResult(resultAction)
      setPartner({ ...partner, settlementId: newSettlement.id })
    } catch (err) {
      console.error('Failed to save the Settlement: ', err)
    } finally {
      setIsLoadingSettlements(false)
    }
  }

  const canSave =
    [partner.name, partner.settlementId].every(Boolean) && updateRequestStatus === 'idle'

  const onSavePartnerClicked = async () => {
    if (canSave) {
      try {
        setUpdateRequestStatus('pending')
        await dispatch(updatePartner(partner))
        onRequestClose()
      } catch (err) {
        console.error('Failed to save the partner: ', err)
      } finally {
        setUpdateRequestStatus('idle')
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
            isDisabled={isLoadingCompanyTypes}
            isLoading={isLoadingCompanyTypes}
            onChange={selected => setPartner({ ...partner, companyTypeId: selected.value })}
            onCreateOption={handleCompanyTypeCreate}
            options={companyTypesOptions}
            value={
              partner.companyTypeId
                ? {
                    value: partner.companyTypeId,
                    label: companyTypesOptions.find(o => o.value === partner.companyTypeId).label
                  }
                : ''
            }
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
            isDisabled={isLoadingSettlements}
            isLoading={isLoadingSettlements}
            onChange={selected => setPartner({ ...partner, settlementId: selected.value })}
            onCreateOption={handleSettlementCreate}
            options={settlementsOptions}
            value={
              partner.settlementId
                ? {
                    value: partner.settlementId,
                    label: settlementsOptions.find(o => o.value === partner.settlementId).label
                  }
                : ''
            }
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

export default UpdatePartnerModal
