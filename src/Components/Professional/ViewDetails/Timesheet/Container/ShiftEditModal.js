import React from 'react'
import { Icon } from 'antd'
import { ModalBox } from '../../../../../utils/custom-components'
import ShiftsSelectBox from '../ShiftsSelectBox'

export const ShiftEditModal = (props) => {

  const {
    editShiftModal,
    selectedShift,
    addStartTime,
    addEndTime,
    selectShift,
    updateTimesheetShift,
    hideEditShiftModal
  } = props

  return (
    <ModalBox
      title={<><Icon type="edit" /> Edit Timesheet</>}
      visible={editShiftModal}
      size={500}
      content={
        <span className="edit-shift">
          <ShiftsSelectBox
            selectedShift={selectedShift}
            addStartTime={addStartTime}
            addEndTime={addEndTime}
            selectShift={selectShift}
          />
        </span>
      }
      submitText={<><Icon type="check" /> Update</>}
      cancelText={<><Icon type="close" /> Cancel</>}
      submitHandler={updateTimesheetShift}
      cancelHandler={hideEditShiftModal}
    />
  )
}
