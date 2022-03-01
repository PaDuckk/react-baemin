import React from 'react'
import styled from '@emotion/styled'
import { Menu, MenuSection } from '../model/interface'
import { formatCurrency } from '../util/formatCurrency'
import { addMenu } from '../store/cartSlice'
import { useDispatch } from 'react-redux'

type Props = {
  menus: Menu[]
}

const MenuList = ({ menus }: Props) => {
  const dispatch = useDispatch()

  const handleMenuClick = (menu: Menu) => {
    dispatch(addMenu(menu))
  }

  const sections = menus.reduce<MenuSection[]>((sections, menu) => {
    const section = sections.find((s) => s.category_id === menu.category_id)

    if (section) {
      section.menus.push(menu)
    } else {
      sections.push({
        category_id: menu.category_id,
        category_name: menu.category_name,
        menus: [menu],
      })
    }

    return sections
  }, [])

  return (
    <Wrapper>
      {sections.map((section) => {
        return (
          <SectionCard key={section.category_id}>
            <div className="title">{section.category_name}</div>
            <div className="menu-wrapper">
              {section.menus.map((menu) => {
                return (
                  <div className="menu" key={menu.id} onClick={() => handleMenuClick(menu)}>
                    <div className="name">{menu.name}</div>
                    <div className="price">{formatCurrency(menu.price)}</div>
                  </div>
                )
              })}
            </div>
          </SectionCard>
        )
      })}
    </Wrapper>
  )
}

export default MenuList

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding-top: 24px;
`

const SectionCard = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  padding: 24px 0;

  .title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 18px;
    padding: 0 24px;
  }

  .menu-wrapper {
    display: flex;
    flex-direction: column;

    .menu {
      display: flex;
      flex-direction: column;
      cursor: pointer;
      padding: 12px 0;

      &:hover {
        background-color: aliceblue;
      }

      .name {
        font-size: 18px;
        font-weight: bold;
        padding: 0 24px;
      }

      .price {
        font-size: 14px;
        color: gray;
        padding: 0 24px;
      }
    }
  }
`
