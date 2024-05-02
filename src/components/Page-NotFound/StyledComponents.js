import styled from 'styled-components'

export const NotFoundContentContainer = styled.div`
  width: 100%;
  height: 88vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: transparent;
  flex-grow: 1;
  background-color: ${props => props.bgColor};
`
export const NotFoundDescription = styled.p`
  color: ${props => (props.isDarkTheme ? '#ebebeb' : '#616e7c')};
  font-size: 16px;
  font-weight: 500;
  font-family: 'Roboto';
  text-align: center;
  line-height: 1.3;
`
