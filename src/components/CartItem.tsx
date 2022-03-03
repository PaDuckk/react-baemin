import styled from '@emotion/styled'
import React from 'react'
import { Menu } from '../model/interface'
import { formatCurrency } from '../util/formatCurrency'
import Counter from './Counter'
import { CloseIcon } from '@chakra-ui/icons'
import { useDispatch } from 'react-redux'
import { decreaseMenuCount, increaseMenuCount } from '../store/cartSlice'

type Props = {
  menu: Menu
}

const CartItem = ({ menu }: Props) => {
  const dispatch = useDispatch()

  return (
    <Wrapper className="cart">
      <div className="left">
        <div className="name">{menu.name}</div>
        <div className="price">{formatCurrency(menu.price)}</div>
      </div>
      <div className="right">
        <div className="remove-btn-wrapper" onClick={() => dispatch(decreaseMenuCount(menu.id))}>
          <CloseIcon w="15px" h="15px" color="gray.500" />
        </div>
        <Counter
          value={menu.count}
          onMinusClick={() => dispatch(decreaseMenuCount(menu.id))}
          onPlusClick={() => dispatch(increaseMenuCount(menu.id))}
        />
      </div>
    </Wrapper>
  )
}

export default CartItem

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: white;

  height: 100px;
  padding: 18px 24px;

  .left {
    display: flex;
    flex-direction: column;

    .name {
      font-size: 18px;
      font-weight: bold;
    }

    .price {
      font-size: 14px;
      color: gray;
    }
  }

  .right {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .remove-btn-wrapper {
      cursor: pointer;
      display: flex;
      flex-direction: row-reverse;
    }
  }
`
