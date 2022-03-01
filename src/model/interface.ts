export interface Menu {
  id: string
  category_id: string
  category_name: string
  name: string
  price: number
  count: number
}

export interface Discount {
  id: string
  name: string
  discount_rate: number
  exclude_item_ids: Record<string, boolean>
}

export interface MenuSection {
  category_id: string
  category_name: string
  menus: Menu[]
}
