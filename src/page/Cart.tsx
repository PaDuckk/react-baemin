import styled from '@emotion/styled'
import React from 'react'
import Card from '../components/Card'
import Page from '../components/Page'
import { ChevronLeftIcon } from '@chakra-ui/icons'
import { useNavigate } from 'react-router'
import { ReduxState } from '../store/store'
import { Discount, Menu } from '../model/interface'
import { useSelector } from 'react-redux'
import CartItem from '../components/CartItem'
import DiscountItem from '../components/DiscountItem'
import { formatCurrency } from '../util/formatCurrency'
import { getTotalPrice } from '../store/cartSlice'
import { Button } from '@chakra-ui/react'

type Props = {}

const Cart = (props: Props) => {
  const navigate = useNavigate()
  const discounts = useSelector<ReduxState, Discount[]>((state) => state.app.discounts)
  const menusInCart = useSelector<ReduxState, Menu[]>((state) => state.cart.items)
  const totalPrice = useSelector<ReduxState, number>((state) => getTotalPrice(state.cart))

  return (
    <PageWrapper>
      <Card>
        <div className="header">
          <div className="back" onClick={() => navigate(-1)}>
            <ChevronLeftIcon />
          </div>
        </div>
        <div className="body">
          <div className="carts">
            {menusInCart.map((menu) => (
              <CartItem key={menu.id} menu={menu} />
            ))}
          </div>
          <div className="discounts">
            <div className="discount-header">
              <h1>할인</h1>
            </div>
            {discounts.map((discount) => (
              <DiscountItem key={discount.id} discount={discount} />
            ))}
          </div>
        </div>
        <div className="footer">
          <div>총 주문금액</div>
          <div>{formatCurrency(totalPrice)}</div>
        </div>
      </Card>
    </PageWrapper>
  )
}

export default Cart

const PageWrapper = styled(Page)`
  position: sticky;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 24px;
    border-bottom: solid 1px #efefef;
    font-weight: bold;
    font-size: 24px;
    background-color: white;

    .back {
      cursor: pointer;
    }
  }

  .body {
    padding-top: 20px;
    padding-bottom: 20px;
    height: 690px;
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
    gap: 20px;

    .carts {
      .cart + .cart {
        border-top: solid 1px #efefef;
      }
    }

    .discounts {
      background-color: white;
      padding: 12px 0;

      .discount-header {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding: 0 24px;

        h1 {
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 18px;
        }
      }
    }
  }

  .footer {
    display: flex;
    justify-content: space-between;
    padding: 12px 24px;
    background-color: white;

    font-size: 20px;

    .some-component {
      position: sticky;
      bottom: 0;
    }
  }
`
