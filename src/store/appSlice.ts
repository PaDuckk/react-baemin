import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Discount, Menu } from '../model/interface'

export const fetchMerchantInfo = createAsyncThunk('app/fetchMerchantInfo', async () => {
  const response = await fetch('https://us-central1-react-baemin.cloudfunctions.net/merchantInfo')
  const data = await response.json()

  return data
})

export interface AppSlice {
  loading: boolean
  items: Menu[]
  discounts: Discount[]
  minimum_order_price: number
  merchant_name: string
}

const initialState = {
  loading: false,
  minimum_order_price: 0,
  merchant_name: '',
  items: [],
  discounts: [],
}

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(fetchMerchantInfo.pending, (state, action) => {
        state.loading = true
      })
      .addCase(fetchMerchantInfo.fulfilled, (state, action) => {
        state.loading = false

        const { items, discounts, minimum_order_price, merchant_name } = action.payload
        state.minimum_order_price = minimum_order_price
        state.merchant_name = merchant_name
        state.items = items.map((item: any) => ({ ...item, count: 1 }))
        state.discounts = discounts.map((discount: any) => ({ ...discount, exclude_item_ids: {} }))
      })
      .addCase(fetchMerchantInfo.rejected, (state) => {
        state.loading = false
      }),
})

export const {} = appSlice.actions

export default appSlice.reducer
