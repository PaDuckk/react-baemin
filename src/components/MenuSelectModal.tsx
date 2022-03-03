import { Checkbox, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/react'
import styled from '@emotion/styled'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Discount, Menu } from '../model/interface'
import { addDiscountExcludeId, removeDiscountExcludeId } from '../store/cartSlice'
import { ReduxState } from '../store/store'
import { formatCurrency } from '../util/formatCurrency'

type Props = {
  isOpen: boolean
  onClose: () => void
  discount: Discount
}

const MenuSelectModal = ({ isOpen, onClose, discount }: Props) => {
  const menus = useSelector<ReduxState, Menu[]>((state) => state.cart.items)
  const dispatch = useDispatch()

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent height={'600px'}>
          <ModalHeader>{discount.name}</ModalHeader>
          <ModalCloseButton />
          <MenuWrapper>
            {menus.map((m) => (
              <div className="checkbox-row" key={m.id}>
                <Checkbox
                  isChecked={!discount.exclude_item_ids[m.id]}
                  onChange={(e) => {
                    if (e.currentTarget.checked) {
                      dispatch(removeDiscountExcludeId({ discountId: discount.id, menuId: m.id }))
                    } else {
                      dispatch(addDiscountExcludeId({ discountId: discount.id, menuId: m.id }))
                    }
                  }}
                />
                <div className="checkbox-texts">
                  <div className="title">
                    {m.name} x {m.count}
                  </div>
                  <div className="amount">
                    <span className="discount-amount">
                      - {formatCurrency(m.price * m.count * (discount.discount_rate / 100))}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </MenuWrapper>
        </ModalContent>
      </Modal>
    </>
  )
}

export default MenuSelectModal

const MenuWrapper = styled.div`
  display: flex;
  flex-direction: column;

  .checkbox-row {
    display: flex;
    gap: 12px;
    padding: 12px 24px;

    &:hover {
      background-color: aliceblue;
    }

    .checkbox-texts {
      flex-direction: column;
    }
    .title {
      font-weight: bold;
    }
  }

  .amount {
    font-size: 12px;
    .discount-amount {
      color: red;
    }
  }

  .checkbox-row + .checkbox-row {
    margin-top: 12px;
  }
`
