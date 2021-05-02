import React from 'react'
import Geolocation from 'react-geolocation'
import { Alert, Button, Icon } from 'antd'
import { defaultTo } from 'ramda'

export const Location = ({
  captureLocation,
  setLocationCoords
}) => {
  return (
    <Geolocation 
      lazy
      onSuccess={position => {
        const { coords = {} } = defaultTo({}, position)
        const { longitude, latitude } = coords
        const values = {}
        values.longitude = longitude.toFixed(3)
        values.latitude = latitude.toFixed(3)
        setLocationCoords(values)
        captureLocation(true)
      }}
      render={props => {
          const {
            getCurrentPosition,
          } = props
          return(
            <div className="location-container">
              <Alert
                showIcon
                type="warning"
                message="Permission Required"
                description="Please allow your browser to access your location"
              />
              <div style={{ padding: '30px 0 30px 10px' }}>
                <p>
                  This is a single site license. You can only login through the registered "site location".
                </p>
                <p>
                  If you are not on the site where this licence will be used and you continue with the purchase your next login will determine the registered "site location" which cannot then be changed. 
                </p>
                <Button type="primary" shape="round" onClick={getCurrentPosition}>
                  <Icon type="check" />Yes 
                </Button>
              </div>
            </div>
          )
      }}
    />
  )
}
