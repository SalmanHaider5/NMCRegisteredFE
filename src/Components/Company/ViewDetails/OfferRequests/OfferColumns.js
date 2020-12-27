import React from 'react'
import { map, head, split } from 'ramda'
import { ActionButtons } from './ActionButtons'

export const getOfferColumns = (viewClickHandler, updateOfferStatus) => {
  return [
    {
      title: 'Shifts',
      dataIndex: 'shifts',
      key: 'Shifts',
      render: shifts => map(shift => {

        return <ul className="shifts-list" key={shift}>
            <li> {head(split('(', shift))} </li>
          </ul>

      }, split(',', shifts))
    },
    {
      title: 'Shift Rate (per hour)',
      dataIndex: 'shiftRate',
      key: 'shiftRate',
      render: value => `${value} GBP`
    },
    {
      title: 'Professional Name',
      dataIndex: 'professionalName',
      key: 'professionalName'
    },
    {
      title: 'Professional NMC Pin',
      dataIndex: 'professionalNmc',
      key: 'professionalNmc'
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      className: 'status-column'
    },
    {
      title: 'Actions',
      dataIndex: 'id',
      key: 'id',
      className: 'action-column',
      render: (id, row) => {
        return <ActionButtons
          id={id}
          offer={row}
          viewClickHandler={viewClickHandler}
          updateOfferStatus={updateOfferStatus}
        />
      }
    }
  ]
}