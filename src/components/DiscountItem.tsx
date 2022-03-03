import { Button, Checkbox, useDisclosure } from '@chakra-ui/react'
import styled from '@emotion/styled'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Discount } from '../model/interface'
import { addDiscount, removeDiscount } from '../store/cartSlice'
import { ReduxState } from '../store/store'
import MenuSelectModal from './MenuSelectModal'

type Props = {
  discount: Discount
}

const DiscountItem = ({ discount }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const discountsInCart = useSelector<ReduxState, Discount[]>((state) => state.cart.discounts)
  const dispatch = useDispatch()

  const discountInCart = discountsInCart.find((d) => d.id === discount.id)
  const isInCart = Boolean(discountInCart)

  return (
    <>
      <Wrapper>
        <div className="left">
          <Checkbox
            isChecked={isInCart}
            onChange={(e) => {
              if (e.currentTarget.checked) {
                dispatch(addDiscount(discount))
              } else {
                dispatch(removeDiscount(discount.id))
              }
            }}
          />
          <div className="discount-texts">
            <div className="discount-name">{discount.name}</div>
            <div className="discount-rate">{discount.discount_rate}%</div>
          </div>
        </div>
        <div className="right">
          <Button size={'sm'} onClick={onOpen} disabled={!isInCart}>
            메뉴 선택
          </Button>
        </div>
      </Wrapper>
      {discountInCart && <MenuSelectModal discount={discountInCart} onClose={onClose} isOpen={isOpen} />}
    </>
  )
}

export default DiscountItem

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 24px;

  .left {
    display: flex;
    align-items: center;
    gap: 12px;
    .discount-texts {
      .discount-name {
        font-size: 16px;
        font-weight: bold;
      }

      .discount-rate {
        font-size: 12px;
        color: gray;
      }
    }
  }

  .right {
  }
`
