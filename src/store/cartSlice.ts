import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
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
    deleteMenu(state, action: PayloadAction<string>) {
      state.items = state.items.filter((i) => i.id !== action.payload)
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
          state.items = state.items.filter((i) => i.id !== menuId)
        } else {
          menu.count--
        }
      }
    },
    addDiscount(state, action: PayloadAction<Discount>) {
      state.discounts.push(action.payload)
    },
    removeDiscount(state, action: PayloadAction<string>) {
      state.discounts = state.discounts.filter((d) => d.id !== action.payload)
    },
    addDiscountExcludeId(
      state,
      action: PayloadAction<{
        discountId: string
        menuId: string
      }>,
    ) {
      const discount = state.discounts.find((d) => d.id === action.payload.discountId)

      if (discount) {
        discount.exclude_item_ids[action.payload.menuId] = true
      }
    },
    removeDiscountExcludeId(
      state,
      action: PayloadAction<{
        discountId: string
        menuId: string
      }>,
    ) {
      const discount = state.discounts.find((d) => d.id === action.payload.discountId)

      if (discount) {
        delete discount.exclude_item_ids[action.payload.menuId]
      }
    },
  },
})

export const {
  addMenu,
  increaseMenuCount,
  decreaseMenuCount,
  addDiscount,
  removeDiscount,
  addDiscountExcludeId,
  removeDiscountExcludeId,
  deleteMenu,
} = cartSlice.actions

export default cartSlice.reducer

const selectMenus = (state: CartSlice) => state.items
const selectDiscounts = (state: CartSlice) => state.discounts

export const getTotalPrice = createSelector(selectMenus, selectDiscounts, (menus, discounts) => {
  const result =
    menus?.reduce((acc, menu) => {
      const sum = menu.count * menu.price

      const discountAmount = discounts.reduce((acc, discount) => {
        if (discount.exclude_item_ids[menu.id]) {
          return acc
        } else {
          return sum * (discount.discount_rate / 100)
        }
      }, 0)

      return acc + (sum - discountAmount)
    }, 0) ?? 0

  return result >= 0 ? result : 0
})
