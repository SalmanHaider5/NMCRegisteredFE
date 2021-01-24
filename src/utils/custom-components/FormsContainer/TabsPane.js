import { Button, Icon, Divider, Tabs } from 'antd'
import { equals, length, map, toString } from 'ramda'
import React, { useState } from 'react'

export const TabsPane = (props) => {

  const [tabKey, setTabKey] = useState('1')

  const changeTab = key => {
    setTabKey(key)
  }

  const nextTab = () => {
    const key = toString(parseInt(tabKey) + 1)
    setTabKey(key)
  }

  const prevTab = () => {
    const key = toString(parseInt(tabKey) - 1)
    setTabKey(key)
  }

  const validate = key => {
    const index = parseInt(key) - 1
    const { validation } = tabsData[index]
    return validation
  }

  const { TabPane } = Tabs,
    { tabsData = [], tabsSubmit  } = props
  
  return (
    <>
      <Tabs onChange={changeTab} activeKey={tabKey}>
        {
          map(tabContent => {
            const { wrapper, icon, label, key } = tabContent
            return (
              <TabPane
                key={key}
                tab={
                  <span>
                    <Icon type={icon} /> {label}
                  </span>
                }
              >
                <div className="tabs-content">
                  {wrapper}
                </div>
              </TabPane>
            )
          }, tabsData)
        }
      </Tabs>
      <div className="tab-btns">
        <Divider />
        {
          equals(tabKey, '1') ? '' :
          <Button shape="round" className="left-btn" type="primary" onClick={prevTab}>
            <Icon type="left" />Back
          </Button>
        }

        {
          equals(tabKey, toString(length(tabsData))) ?
          <Button shape="round" type="primary" disabled={validate(tabKey)} className="success-btn right-btn" onClick={tabsSubmit}>
            <Icon type="check" /> Save
          </Button> :
          <Button shape="round" type="primary" className="right-btn" onClick={nextTab}>
            Next <Icon type="right" />
          </Button>
        }
      </div>
      {/* <Row className="action-buttons">
        <Col span={5} offset={3}>
        {
          equals(tabKey, '1') ? '' :
          <Button shape="round" type="primary" onClick={prevTab}>
            <Icon type="left" />Back
          </Button>
        }
        </Col>
        <Col span={12} offset={1} className="form-actions">
        {
          equals(tabKey, toString(length(tabsData))) ?
          <Button shape="round" type="primary" disabled={validate(tabKey)} className="success-btn next-btn" onClick={tabsSubmit}>
            <Icon type="check" /> Save
          </Button> :
          <Button shape="round" type="primary" className="next-btn" onClick={nextTab}>
            Next <Icon type="right" />
          </Button>
        }
        </Col>
      </Row> */}
    </>
  )
}
