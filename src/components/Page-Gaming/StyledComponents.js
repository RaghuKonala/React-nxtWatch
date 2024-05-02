import {Link} from 'react-router-dom'
import styled from 'styled-components'

export const GamingVideosContainer = styled.ul`
  margin: 0px;
  padding: 25px 0px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  @media screen and (min-width: 768px) {
    padding: 30px;
    justify-content: start;
  }
  @media screen and (min-width: 992px) {
    padding: 30px 50px;
  }
  @media screen and (min-width: 1140px) {
    padding: 40px 50px;
  }
`
export const GamingVideoItem = styled.li`
  list-style-type: none;
  margin-bottom: 25px;
  max-width: 48%;
  @media screen and (min-width: 576px) {
    max-width: 31%;
  }
  @media screen and (min-width: 768px) {
    max-width: 30%;
    margin-right: 3%;
  }
  @media screen and (min-width: 992px) {
    max-width: 22%;
    margin-right: 3%;
  }
`
export const GamingVideoLink = styled(Link)`
  text-decoration: none;
  display: flex;
  flex-direction: column;
  justify-content: start;
`

export const GamingVideoThumbnail = styled.img`
  width: 100%;
  margin-bottom: 15px;
`
