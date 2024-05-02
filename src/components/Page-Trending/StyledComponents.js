import {Link} from 'react-router-dom'
import styled from 'styled-components'

export const TrendingVideosContainer = styled.ul`
  margin: 0px;
  padding: 25px 0px;
  display: flex;
  flex-direction: column;
  @media screen and (min-width: 768px) {
    padding: 30px;
  }
  @media screen and (min-width: 992px) {
    padding: 30px 50px;
  }
  @media screen and (min-width: 1140px) {
    padding: 40px 50px;
  }
`
export const TrendingVideoItem = styled.li`
  margin-bottom: 25px;
  list-style-type: none;
  @media screen and (min-width: 992px) {
    max-width: 786px;
  }
`
export const TrendingVideoLink = styled(Link)`
  text-decoration: none;
  display: flex;
  flex-direction: column;
  @media screen and (min-width: 576px) {
    flex-direction: row;
    align-items: start;
  }
`

export const TrendingVideoThumbnail = styled.img`
  width: 100%;
  margin-bottom: 15px;
  @media screen and (min-width: 576px) {
    width: 300px;
    max-height: 170px;
    margin: 0px;
    margin-right: 20px;
  }
`

export const ChannelProfileImage = styled.img`
  width: 30px;
  height: 30px;
  margin-right: 10px;
  @media screen and (min-width: 576px) {
    display: none;
  }
`
