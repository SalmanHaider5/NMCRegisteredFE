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
                  To continue, you need to register your location. You can login only through registered location.
                </p>
                <p>
                  You may logout to register other than current location. Are you sure to Register current location?
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
