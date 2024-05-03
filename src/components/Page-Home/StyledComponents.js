import styled from 'styled-components'
import {bannerBgImage} from '../../assets/images'

export const HomeBannerContainer = styled.div`
  padding: 25px;
  display: flex;
  justify-content: space-between;
  background-image: url(${bannerBgImage});
  background-size: cover;
  margin-bottom: 25px;
  @media screen and (min-width: 768px) {
    margin: 0px;
    padding: 30px;
  }
  @media screen and (min-width: 992px) {
    padding: 30px 50px;
  }
`
export const HomeBannerContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: start;
  max-width: 320px;
`
export const HomeBannerImage = styled.p`
  color: #313131;
  font-size: 22px;
  margin-bottom: 10px;
  font-weight: 500;
  font-family: 'Roboto';
`
export const BannerDescription = styled.p`
  color: #000000;
  font-size: 16px;
  font-weight: 500;
  font-family: 'Roboto';
  line-height: 1.8;
`
export const BannerGetItButton = styled.button`
  outline: none;
  cursor: pointer;
  padding: 10px 16px;
  border: 1px solid #000000;
  background: transparent;
  color: #000000;
  font-size: 12px;
  font-weight: 500;
  font-family: 'Roboto';
`
export const BannerCloseButton = styled.button`
  outline: none;
  border: none;
  cursor: pointer;
  padding: 3px;
  width: 20px;
  height: 20px;
  color: #000000;
  background: transparent;
  align-self: flex-start;
`
export const HomeContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
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

export const SearchContainer = styled.form`
  height: 35px;
  margin-bottom: 30px;
  display: flex;
  align-items: center;
  border: 1px solid #cdcdcd;
  @media screen and (min-width: 576px) {
    width: 97%;
  }
  @media screen and (min-width: 768px) {
    width: 100%;
    max-width: 540px;
  }
`
export const SearchField = styled.input`
  border: none;
  outline: none;
  flex: 1;
  height: 100%;
  padding: 8px 16px;
  color: #212121;
  font-size: 15px;
  font-family: 'Roboto';
  background-color: #ffffff;
`
export const SearchButton = styled.button`
  padding: 0px;
  width: 80px;
  height: 100%;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: #cccccc;
  }
`

export const HomeVideosContainer = styled.ul`
  padding: 0px;
  margin: 0px;
  display: flex;
  flex-direction: column;
  @media screen and (min-width: 576px) {
    flex-direction: row;
    flex-wrap: wrap;
  }
`
