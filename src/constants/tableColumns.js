import React from 'react'

export const categoryColumns = [{
  title: 'ID',
  dataIndex: 'id'
}, {
  title: 'Display',
  dataIndex: 'img',
  render: text => <img src={text} alt={text} />
}, {
  title: 'Title',
  dataIndex: 'name'
}, {
  title: 'Date',
  dataIndex: 'date'
}]