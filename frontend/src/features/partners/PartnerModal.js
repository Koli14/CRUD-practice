import Modal from 'react-modal'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'
import CreatableSelect from 'react-select/creatable'

import './PartnerModal.css'
import { addNewPartner, updatePartner } from './partnersSlice'
import { selectAllCompanyTypesOptions, addNewCompanyType } from '../companyTypes/companyTypesSlice'
import { selectAllSettlementsOptions, addNewSettlement } from '../settlements/settlementsSlice'
import { emptyPartner, partnerParams, paramsTranslations } from './PartnerList'

const AddPartnerModal = ({ isOpen, onRequestClose, partner, setPartner }) => {
  Modal.setAppElement('#root')
  const dispatch = useDispatch()

  const [requestStatus, setRequestStatus] = useState('idle')

  const createOption = (options, id) => {
    return (options.find((option) => option.value === id))
  }

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
    [partner.name, partner.settlementId].every(Boolean) && requestStatus === 'idle'

  const onSavePartnerClicked = async () => {
    if (canSave) {
      try {
        setRequestStatus('pending')
        await dispatch(partner.id
          ? updatePartner(partner)
          : addNewPartner(partner))
        setPartner(emptyPartner)
        onRequestClose()
      } catch (err) {
        console.error('Failed to save the partner: ', err)
      } finally {
        setRequestStatus('idle')
      }
    }
  }

  const form = (
    <form>
      {partnerParams.map((param, index) => {
        if (param === 'companyTypeId') {
          return (
            <div>
              <label htmlFor='companyType'>Cégforma:</label>
              <CreatableSelect
                isDisabled={isLoadingCompanyTypes}
                isLoading={isLoadingCompanyTypes}
                onChange={selected => setPartner({ ...partner, companyTypeId: selected.value })}
                onCreateOption={handleCompanyTypeCreate}
                options={companyTypesOptions}
                value={createOption(companyTypesOptions, partner.companyTypeId)}
              />
            </div>
          )
        } else if (param === 'settlementId') {
          return (
            <div>
              <label htmlFor='settlement'>Település:</label>
              <CreatableSelect
                isDisabled={isLoadingSettlements}
                isLoading={isLoadingSettlements}
                onChange={selected => setPartner({ ...partner, settlementId: selected.value })}
                onCreateOption={handleSettlementCreate}
                options={settlementsOptions}
                value={createOption(settlementsOptions, partner.settlementId)}
              />
            </div>
          )
        } else {
          return (
            <div key={param}>
              <label htmlFor={param}>{paramsTranslations[index]}:</label>
              <input
                type='text'
                id={param}
                name={param}
                value={partner[param]}
                onChange={e => setPartner({ ...partner, [param]: e.target.value })}
              />
            </div>
          )
        }
      })}
    </form>
  )

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
      contentLabel='Add Partner Modal'
    >
      <div>
        {form}
        <div className='buttons'>
          <button onClick={onSavePartnerClicked} disabled={!canSave}>Mentés</button>
          <button onClick={onRequestClose}>Mégsem</button>
        </div>
      </div>

    </Modal>
  )
}

const customStyles = {
  content: {
    inset: '16px auto auto 50%',
    maxHeight: '82%',
    marginRight: '-50%',
    transform: 'translate(-50%, 0)',
    padding: '16px 32px'
  }
}

export default AddPartnerModal
