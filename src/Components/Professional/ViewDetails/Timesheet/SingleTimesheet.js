import React from 'react'
import moment from 'moment'
import { isNil, prop, isEmpty } from 'ramda'
import { Card, List, Switch, Icon, Popconfirm, Button } from 'antd'
import { DATE_FORMAT as dateFormat } from '../../../../constants'

const SingleTimesheet = ({
  days,
  timesheet,
  getTimesheetShiftByDay,
  deleteTimesheet,
  changeShiftAvailability,
  showEditShiftModal
}) => {
  const { startingDay, endingDay } = timesheet
  return (
    <Card
      className="timesheet-card"
      title={
        <span>
          <Icon type="appstore" /> {moment(startingDay).format(dateFormat)} - {moment(endingDay).format(dateFormat)}
        </span>
      }
      extra={
        <span>
          <Popconfirm
            title="Are you sure to delete this timesheet?"
            onConfirm={() => deleteTimesheet(timesheet.id)}
            okText="Yes"
            cancelText="No"
          >
            <Icon
              type="delete"
              theme="filled"
            />
          </Popconfirm>
        </span>
      }
    >
      <List
        itemLayout="horizontal"
        dataSource={days}
        renderItem={day => {
          const schedule = getTimesheetShiftByDay(timesheet, day)
          return (
            <List.Item>
              <List.Item.Meta
                title={day.name}
                description={<span>{prop('date', schedule)}</span>}
                
              />
              <div className='single-timesheet-switch'>
                <h4 className='timesheet-card-h4' >
                  <Switch
                    id={{ id: schedule.id, timesheet: timesheet.id}}
                    defaultChecked={false}
                    checked={schedule.status ? true : false}
                    disabled={isEmpty(schedule.name)  ? true : false}
                    onChange={(checked) => changeShiftAvailability(checked, schedule.id, timesheet.id)}
                  />
                </h4>
                <span className='timesheet-available'>
                  {schedule.status ? 'Available' : 'Not Available'}
                </span>
              </div>
              <div className='single-timesheet-card-shift'>
                <h4 style={{fontSize: '14px', color: 'rgba(0, 0, 0, 0.65)'}}>
                  { isNil(schedule) ? '-' : prop('name', schedule) }
                </h4>
                <span style={{fontSize: '14px', color: 'rgba(0, 0, 0, 0.45)'}}>
                  { isNil(schedule) ? '00:00 AA - 00:00 AA' : `${prop('time', schedule)}` }
                </span>
              </div>
              <Button type="link" disabled={prop('expiryStatus', schedule)} onClick={() => showEditShiftModal(timesheet.id, schedule.id)}>
                <Icon type="edit" style={{ fontSize: '26px' }} />
              </Button>
            </List.Item>
          )
        }}
      />
    </Card>
  )
}
export default SingleTimesheet
