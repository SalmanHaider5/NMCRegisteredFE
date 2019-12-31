import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, initialize } from 'redux-form'
import { map, isNil } from 'ramda'
import { Card, Spin, Icon, BackTop, Row, Col, Modal, Button, notification, Popconfirm } from 'antd'
import { TextField, MultilineTextField, FileInput } from '../../../utils/custom-components/'
import { isRequired, isNumber, SERVER_URL } from '../../../constants'
import { getSingleProduct, addProductImage, updateProduct, deleteProductImage } from '../../../actions'

const ImageCard = ({ images, loadImage, deleteImage }) => {
  return map(image => {
    const imgUrl = `${SERVER_URL}products/${image.img}`
    return(
      <Col span={4} offset={1} className="gutter-row product-images" key={imgUrl}>
        <span className="delete-image-icon">
          <Popconfirm
            title={`Are you sure?`}
            onConfirm={() => deleteImage(image.img)}
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

class SingleProduct extends Component {

  constructor(props) {
    super(props)
    this.state = {
      readOnly: true,
      loadImageModal: false,
      modalImage: ''
    }
  }

  componentWillReceiveProps(nextProps){
    if(this.props.products.deleteImageRequest !== nextProps.products.deleteImageRequest){
      if(!nextProps.products.deleteImageRequest){
        notification.success({
          message: 'Delete Success',
          description: 'Product Image is successfully deleted',
          placement: 'bottomLeft',
          style: {
            backgroundColor: 'rgb(77, 141, 45)',
            color: '#fff'
          }
        })
      }
    }
    if(this.props.products.addImageRequest !== nextProps.products.addImageRequest){
      if(!nextProps.products.addImageRequest){
        notification.success({
          message: 'Add Success',
          description: 'Product Image is successfully uploaded.',
          placement: 'bottomLeft',
          style: {
            backgroundColor: 'rgb(77, 141, 45)',
            color: '#fff'
          }
        })
      }
    }
    if(this.props.products.updateRequest !== nextProps.products.updateRequest){
      if(!nextProps.products.updateRequest){
        notification.success({
          message: 'Edit Success',
          description: 'Product is successfully updated',
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
    const { dispatch, match: { params: { id } } } = this.props
    dispatch(getSingleProduct(id))
  }

  editForm = () => {
    const { dispatch, products: { product } } = this.props
    dispatch(initialize('product', product))
    this.setState({ readOnly: false, editIcon: false })
  }

  addImage = () => {
    const { dispatch, formValues: { values: { img } }, match: { params: { id } } } = this.props
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
      dispatch(addProductImage({img, id}))
    }
  }

  saveProduct = () => {
    const { dispatch, formValues: { values } } = this.props
    dispatch(updateProduct(values))
    this.setState({ readOnly: true })
  }

  loadImage = (img) => {
    this.setState({
      loadImageModal: true,
      modalImage: img
    })
  }

  deleteImage = image => {
    const { dispatch, match: { params: { id } } } = this.props
    console.log(id)
    dispatch(deleteProductImage(id, image))
  }

  closeModal = () => {
    this.setState({ loadImageModal: false })
  }

  render() {
    const {
      products: {
        isLoading,
        product: {
          id,
          title,
          price,
          discount,
          openlength,
          bladelength,
          handlelength,
          shipping,
          stock,
          description,
          tips,
          images = []
        }
      }
    } = this.props
  
    const { readOnly, loadImageModal, modalImage } = this.state

    return (
      <Spin spinning={isLoading} tip='Loading...'>
        <BackTop />
        <Card
          title={title}
          extra={
            <Icon
              type={readOnly ? 'edit' : 'save'}
              className="edit-icon"
              onClick={readOnly ? this.editForm : this.saveProduct}
            />
          }
          className="products-card"
        >
          <div className="form">
            <h2>Basic Information</h2>
            <div className="form-fields">
              <div className="field">
                <Field
                  name="id"
                  label="Product ID"
                  component={TextField}
                  hintText="Enter ID"
                  type="text"
                  fieldData={id}
                  validate={[isRequired]}
                  specialText="You can't edit this field"
                  readOnly={true}
                />
              </div>
              <div className="field">
                <Field
                  name="title"
                  label="Product Name"
                  component={TextField}
                  hintText="Enter Product Name"
                  value={title}
                  type="text"
                  fieldData={title}
                  validate={[isRequired]}
                  readOnly={readOnly}
                />
              </div>
            </div>
          </div>
          <div className="form">
            <h2>Dimensions</h2>
            <div className="form-fields">
              <div className="field">
                <Field
                  name="openlength"
                  label="Open Length"
                  component={TextField}
                  hintText="Enter Open Length e.g. 1.1"
                  fieldData={openlength}
                  type="text"
                  validate={[isNumber]}
                  readOnly={readOnly}
                />
              </div>
              <div className="field">
                <Field
                  name="handlelength"
                  label="Handle Length"
                  component={TextField}
                  hintText="Enter Handle Length e.g. 1.1"
                  type="text"
                  fieldData={handlelength}
                  validate={[isNumber]}
                  readOnly={readOnly}
                />
              </div>
            </div>
            <div className="form-fields">
              <div className="field">
                <Field
                  name="bladelength"
                  label="Blade Length"
                  component={TextField}
                  fieldData={bladelength}
                  hintText="Enter Blade Length e.g. 1.1"
                  type="text"
                  validate={[isNumber]}
                  readOnly={readOnly}
                />
              </div>
            </div>
          </div>
          <div className="form">
            <h2>Price and Shipping Details</h2>
            <div className="form-fields">
              <div className="field">
                <Field
                  name="price"
                  component={TextField}
                  label="Price"
                  fieldData={price}
                  hintText="Price in USD $ e.g. 60"
                  type="text"
                  validate={[isRequired, isNumber]}
                  readOnly={readOnly}
                />
              </div>
              <div className="field">
                <Field
                  name="discount"
                  label="Discount"
                  component={TextField}
                  fieldData={discount}
                  hintText="Discount in Percentage e.g. 10"
                  type="text"
                  validate={[isNumber]}
                  readOnly={readOnly}
                />
              </div>
            </div>
            <div className="form-fields">
              <div className="field">
                <Field
                  name="shipping"
                  label="Shipping Charges"
                  component={TextField}
                  fieldData={shipping}
                  hintText="Shipping Charges in USD $ e.g. 10"
                  type="text"
                  validate={[isNumber]}
                  readOnly={readOnly}
                />
              </div>
              <div className="field">
                <Field
                  name="stock"
                  label="In Stock"
                  component={TextField}
                  fieldData={stock}
                  hintText="Enter Quantity e.g. 10"
                  type="text"
                  validate={[isNumber]}
                  readOnly={readOnly}
                />
              </div>
            </div>
          </div>
          <div className="form">
            <h2>Description and Details</h2>
            <div className="form-fields">
              <div className="field">
                <Field
                  name="description"
                  label="Decripton"
                  fieldData={description}
                  component={MultilineTextField}
                  rows={4}
                  rowsMax={7}
                  placeholder="Enter Description..."
                  readOnly={readOnly}
                />
              </div>
              <div className="field">
                <Field
                  name="tips"
                  label="Tips"
                  fieldData={tips}
                  component={MultilineTextField}
                  rows={4}
                  rowsMax={7}
                  placeholder="Enter Tips..."
                  readOnly={readOnly}
                />
              </div>
            </div>
          </div>
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
                    <Icon type="check" />
                  </Button>
                </div>
              </div>
              <Row type="flex" gutter={18}>
                <ImageCard images={images} loadImage={this.loadImage} deleteImage={this.deleteImage} />
              </Row>
              <Modal visible={loadImageModal} footer={null} onCancel={this.closeModal}>
                <img src={modalImage} alt={modalImage} style={{height: '100%', width: '100%'}} />
              </Modal>
          </div>
        </Card>
      </Spin>
    );
  }
}
const mapStateToProps = state => {
  return {
    products: state.products,
    formValues: state.form.product
  }
}

export default connect(mapStateToProps)(SingleProduct)