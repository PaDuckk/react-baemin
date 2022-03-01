import styled from '@emotion/styled'
import React from 'react'

type Props = {
  children?: React.ReactNode
}

const Card = ({ children }: Props) => {
  return <Wrapper>{children}</Wrapper>
}

export default Card

const Wrapper = styled.div`
  width: 400px;
  height: 800px;
  border-radius: 15px;
  box-shadow: 4px 5px 11px 1px;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  background-color: #efefef;
  position: relative;
`
