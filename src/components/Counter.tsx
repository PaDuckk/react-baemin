import { AddIcon, MinusIcon } from '@chakra-ui/icons'
import { Button, ButtonGroup, IconButton } from '@chakra-ui/react'
import styled from '@emotion/styled'
import React, { MouseEventHandler } from 'react'

type Props = {
  value: number
  onPlusClick: MouseEventHandler<HTMLButtonElement>
  onMinusClick: MouseEventHandler<HTMLButtonElement>
}

const Counter = ({ value, onPlusClick, onMinusClick }: Props) => {
  return (
    <Wrapper>
      <ButtonGroup size="sm" isAttached variant="outline">
        <IconButton aria-label="Add to friends" icon={<MinusIcon />} onClick={onMinusClick} />
        <Button mr="-px">{value}</Button>
        <IconButton aria-label="Add to friends" icon={<AddIcon />} onClick={onPlusClick} />
      </ButtonGroup>
    </Wrapper>
  )
}

export default Counter

const Wrapper = styled.div`
  display: flex;
`
