import React from 'react'
import { Card, List, Switch, Icon } from 'antd'

const SingleTimesheet = ({ days }) => {
  return (
    <Card className="timesheet-card" title="Week 1" extra={<Icon type="delete" theme="filled" />}>
      <List
        itemLayout="horizontal"
        dataSource={days}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta
              title={item.name}
              description="February 18, 2020"
            />
            <div style={{textAlign: 'center', paddingRight: '50px'}}>
              <h4 style={{fontSize: '14px', color: 'rgba(0, 0, 0, 0.65)'}}>Early Shift</h4>
              <span style={{fontSize: '14px', color: 'rgba(0, 0, 0, 0.45)'}}>07:00 AM - 09:00 PM</span>
            </div>
            <Switch defaultChecked />
          </List.Item>
        )}
      />
    </Card>
  )
}
export default SingleTimesheet
