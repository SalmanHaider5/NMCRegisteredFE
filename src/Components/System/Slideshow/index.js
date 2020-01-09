import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Field, getFormValues, reduxForm } from 'redux-form'
import { map, isNil } from 'ramda'
import { Icon, Row, Col, Modal, Button, notification, Popconfirm } from 'antd'
import { FileInput } from '../../../utils/custom-components/'
import { SERVER_URL } from '../../../constants'
import { getSlideshowImages, addSlideshowImage, deleteSlideshowImage } from '../../../actions'

const ImageCard = ({ images, loadImage, deleteImage }) => {
  return map(image => {
    const imgUrl = `${SERVER_URL}slideshowImages/${image.img}`
    return(
      <Col span={4} offset={1} className="gutter-row product-images" key={imgUrl}>
        <span className="delete-image-icon">
          <Popconfirm
            title={`Are you sure?`}
            onConfirm={() => deleteImage(image.id)}
            okText="Yes"
            cancelText="No"
          >
            <Icon type="delete" theme="filled" />
          </Popconfirm>
        </span>
        <div className="img-card">
          <img
            alt={imgUrl}
            src={imgUrl}
            onClick={() => loadImage(imgUrl)}
          />
        </div>
      </Col>
    )
  }, images)
} 

class Slideshow extends Component {

  constructor(props) {
    super(props)
    this.state = {
      loadImageModal: false,
      modalImage: ''
    }
  }

  componentWillReceiveProps(nextProps){
    if(this.props.settings.deleteSlideshowImageRequest !== nextProps.settings.deleteSlideshowImageRequest){
      if(!nextProps.settings.deleteSlideshowImageRequest){
        notification.success({
          message: 'Delete Success',
          description: 'Image is successfully deleted',
          placement: 'bottomLeft',
          style: {
            backgroundColor: 'rgb(77, 141, 45)',
            color: '#fff'
          }
        })
      }
    }
    if(this.props.settings.addSlideshowImageRequest !== nextProps.settings.addSlideshowImageRequest){
      if(!nextProps.settings.addSlideshowImageRequest){
        notification.success({
          message: 'Add Success',
          description: 'New Image is successfully uploaded.',
          placement: 'bottomLeft',
          style: {
            backgroundColor: 'rgb(77, 141, 45)',
            color: '#fff'
          }
        })
      }
    }
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(getSlideshowImages())
  }


  addImage = () => {
    const { dispatch, formValues: { img } } = this.props
    if(isNil(img)){
      notification.error({
        message: 'Image Upload Error',
        description: "You've not added image yet.",
        placement: 'topRight',
        style: {
          backgroundColor: 'rgb(77, 141, 45)',
          color: '#fff'
        }
      })
    }else{
      dispatch(addSlideshowImage(img))
    }
  }

  loadImage = (img) => {
    this.setState({
      loadImageModal: true,
      modalImage: img
    })
  }

deleteImage = id => {
    const { dispatch } = this.props
    dispatch(deleteSlideshowImage(id))
}

  closeModal = () => {
    this.setState({ loadImageModal: false })
  }

  render() {
    const { settings: { slideshowImages } } = this.props
  
    const { loadImageModal, modalImage } = this.state

    return (
        <div className="form">
        <h2>Images</h2>
            <div className="form-fields">
            <div className="field image-upload-field">
                <Field
                name="img"
                label="Choose an Image"
                component={FileInput}
                />
                <Button className="add-image" type="primary" onClick={this.addImage}>
                <Icon type="check" /> Save
                </Button>
            </div>
            </div>
            <Row type="flex" gutter={18}>
                <ImageCard images={slideshowImages} loadImage={this.loadImage} deleteImage={this.deleteImage} />
            </Row>
            <Modal visible={loadImageModal} footer={null} onCancel={this.closeModal}>
            <img src={modalImage} alt={modalImage} style={{height: '100%', width: '100%'}} />
            </Modal>
        </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    settings: state.settings,
    formValues: getFormValues('slideshow')(state)
  }
}

export default withRouter(connect(mapStateToProps)(
    reduxForm({
      form: 'slideshow'
    })(Slideshow)
  ))