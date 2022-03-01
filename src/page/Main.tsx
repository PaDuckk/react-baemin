import { Badge } from '@chakra-ui/react'
import styled from '@emotion/styled'
import React from 'react'
import { useSelector } from 'react-redux'
import Card from '../components/Card'
import MenuList from '../components/MenuList'
import Page from '../components/Page'
import { Menu } from '../model/interface'
import { ReduxState } from '../store/store'

type Props = {}

const Main = (props: Props) => {
  const menus = useSelector<ReduxState, Menu[]>((state) => state.app.items)
  const menusInCart = useSelector<ReduxState, Menu[]>((state) => state.cart.items)

  return (
    <PageWrapper>
      <Card>
        <div className="header">
          <h1>오모가리 김치찌개</h1>
          <div className="cart">
            Cart <Badge colorScheme="facebook">{menusInCart.reduce((acc, curr) => acc + curr.count, 0)}</Badge>
          </div>
        </div>
        <div className="body">
          <MenuList menus={menus} />
        </div>
      </Card>
    </PageWrapper>
  )
}

export default Main

const PageWrapper = styled(Page)`
  position: relative;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 24px;
    border-bottom: solid 1px #efefef;
    font-weight: bold;
    font-size: 24px;
    background-color: white;

    .cart {
      font-size: 18px;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 12px;
    }
  }

  .body {
  }
`
