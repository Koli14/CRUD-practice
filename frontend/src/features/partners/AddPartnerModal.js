import Modal from 'react-modal'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'

import './AddPartnerModal.css'
import { addNewPartner } from './partnersSlice'

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
  const [partner, setPartner] = useState(initialPartner)
  const [addRequestStatus, setAddRequestStatus] = useState('idle')
  const dispatch = useDispatch()
  const companyTypes = useSelector((state) => state.companyTypes)
  const settlements = useSelector((state) => state.settlements)

  const canSave =
    [partner.name, partner.settlementId].every(Boolean) && addRequestStatus === 'idle'

  const onSavePartnerClicked = async () => {
    if (canSave) {
      try {
        setAddRequestStatus('pending')
        const resultAction = await dispatch(
          addNewPartner(partner)
        )
        unwrapResult(resultAction)
        setPartner(initialPartner)
        onRequestClose()
      } catch (err) {
        console.error('Failed to save the partner: ', err)
      } finally {
        setAddRequestStatus('idle')
      }
    }
  }

  const companyTypesOptions = companyTypes.map((companyType) => (
    <option key={companyType.id} value={companyType.id}>
      {companyType.name}
    </option>
  ))

  const settlementsOptions = settlements.map((settlement) => (
    <option key={settlement.id} value={settlement.id}>
      {settlement.name}
    </option>
  ))

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={customStyles} contentLabel='Add Partner Modal'>
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
          <select
            id='companyType'
            value={partner.companyTypeId}
            onChange={e => setPartner({ ...partner, companyTypeId: e.target.value })}
          >
            <option value='' />
            {companyTypesOptions}
          </select>
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
          <select
            id='settlement'
            value={partner.settlementId}
            onChange={e => setPartner({ ...partner, settlementId: e.target.value })}
          >
            <option value='' />
            {settlementsOptions}
          </select>
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
