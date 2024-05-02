import {Link} from 'react-router-dom'
import styled from 'styled-components'

export const HomeVideoItem = styled.li`
  list-style-type: none;
  width: 100%;
  margin-bottom: 30px;
  @media screen and (min-width: 576px) {
    width: 47%;
    margin-right: 3%;
  }
  @media screen and (min-width: 768px) {
    width: 75%;
  }
  @media screen and (min-width: 825px) {
    width: 47%;
    margin-right: 3%;
  }
  @media screen and (min-width: 1160px) {
    width: 30%;
    margin-right: 3%;
  }
`
export const HomeVideoLink = styled(Link)`
  text-decoration: none;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
`
export const HomeVideoThumbnail = styled.img`
  width: 100%;
  margin-bottom: 15px;
`
export const ChannelProfileImage = styled.img`
  width: 30px;
  height: 30px;
  margin-right: 10px;
  margin-top: 3px;
  @media screen and (min-width: 768px) {
    width: 40px;
    height: 40px;
  }
`
