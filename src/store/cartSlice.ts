import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Discount, Menu } from '../model/interface'

export interface CartSlice {
  items: Menu[]
  discounts: Discount[]
}

const initialState: CartSlice = {
  items: [],
  discounts: [],
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addMenu: (state, action: PayloadAction<Menu>) => {
      const menu = action.payload
      const exist = state.items.find((i) => i.id === menu.id)

      if (exist) {
        exist.count++
      } else {
        state.items.push(menu)
      }
    },
    increaseMenuCount(state, action: PayloadAction<string>) {
      const menu = state.items.find((i) => i.id === action.payload)

      if (menu) {
        menu.count++
      }
    },
    decreaseMenuCount(state, action: PayloadAction<string>) {
      const menuId = action.payload
      const menu = state.items.find((i) => i.id === menuId)

      if (menu) {
        if (menu.count === 1) {
          menu.count--
        } else {
          state.items = state.items.filter((i) => i.id !== menuId)
        }
      }
    },
    addDiscount(state, action: PayloadAction<Discount>) {
      state.discounts.push(action.payload)
    },
  },
})

export const { addMenu, increaseMenuCount, decreaseMenuCount, addDiscount } = cartSlice.actions

export default cartSlice.reducer
