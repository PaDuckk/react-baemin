import styled from '@emotion/styled'
import React from 'react'
import Card from '../components/Card'
import Page from '../components/Page'

type Props = {}

const Cart = (props: Props) => {
  return (
    <PageWrapper>
      <Card>
        <div className="header">장바구니</div>
        <div className="body"></div>
        <div className="cart-button"></div>
      </Card>
    </PageWrapper>
  )
}

export default Cart

const PageWrapper = styled(Page)`
  .header {
    height: 30px;

    padding: 12px 24px;
    border-bottom: solid 1px;
  }

  .body {
  }

  .cart-button {
    padding: 12px 24px;
  }
`
