import React from 'react'
import { equals, map } from 'ramda'
import { Drawer, Icon } from 'antd'
import { isEmptyOrNull } from '../../../../utils/helpers'
import { TERMS, TERMS_OF_PURCHASE as TOPs } from '../../../../constants'
import Terms from '../Terms'

export const TermsDrawer = (props) => {

  const {
    hideDrawer,
    drawerVisible,
    setDocType,
    docType
  } = props

  const termsTitle = 'NMC Terms & Conditions'
  const topsTitle = 'Terms of Purchase'

  const TermsTitle = () => {
    return <><Icon type="paper-clip" /> {termsTitle}  </>
  }

  const TopTitle = () => {
    return <><Icon type="arrow-left" onClick={() => setDocType('terms')} /> {topsTitle} </>
  }

  const TermsContent = () => {
    return <>
      <h2> {termsTitle} </h2>
      {
        map(term => {
          return(
            <span key={term.id}>
              <h3>{term.title}</h3>
              <p>{term.text}</p>
              {
                isEmptyOrNull(term.options) ? '' :
                <Terms options={term.options} setDocumentType={setDocType} />
              }
            </span>
          )
        }, TERMS)
      }
    </>
  }

  const TopsContent = () => {
    return <>
      <h2> {topsTitle} </h2>
      {
        map(term => {
          return(
            <span key={term.id}>
              <h3>{term.title}</h3>
              <p>{term.text}</p>
              {
                isEmptyOrNull(term.options) ? '' : <Terms options={term.options} />

              }
            </span>
          )
        }, TOPs)
      }
    </>
  }

  return (
    <Drawer
      title={equals(docType, 'terms') ? <TermsTitle /> : <TopTitle />}
      visible={drawerVisible}
      placement="right"
      className="terms-drawer "
      width={680}
      onClose={hideDrawer}
      closable={true}
    >
      {
        equals(docType, 'terms') ? <TermsContent /> : <TopsContent />
      }
    </Drawer>
  )
}
