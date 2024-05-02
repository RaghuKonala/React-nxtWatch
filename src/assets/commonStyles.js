import styled from 'styled-components'

export const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`

export const AppResponsiveContainer = styled.div`
  width: 100%;
  max-width: 100vw;
  display: flex;
  justify-content: flex-start;
  align-items: start;
`

export const AppContentContainer = styled.div`
  background-color: ${props => props.bgColor};
  width: 100%;
  height: 88vh;
  padding: 25px 30px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  @media screen and (min-width: 576px) {
    padding: 30px;
  }
  @media screen and (min-width: 768px) {
    padding: 0px;
  }
`
export const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
`
export const FlexContainer = styled.div`
  display: flex;
  align-items: center;
  @media screen and (min-width: 576px) {
    flex-direction: column;
    align-items: start;
  }
`
export const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
`
export const RowContainer = styled.div`
  display: flex;
  align-items: center;
`
export const VideoDetailsContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: start;
  height: 100%;
`

export const CustomTitle = styled.p`
  color: ${props => (props.isDarkTheme ? '#f1f1f1' : '#181818')};
  font-size: 13px;
  font-weight: 500;
  font-family: 'Roboto';
  flex: 1;
  margin: 0px;
  line-height: 1.5;
  margin-bottom: 10px;
  @media screen and (min-width: 768px) {
    font-size: 14px;
  }
  @media screen and (min-width: 992px) {
    font-size: 15px;
  }
`
export const CustomInfo = styled.p`
  color: ${props => (props.isDarkTheme ? '#94a3b8' : '#606060')};
  font-size: 11px;
  font-weight: 400;
  font-family: 'Roboto';
  margin: 0px;
  line-height: 2;
  @media screen and (min-width: 768px) {
    font-size: 12px;
  }
  @media screen and (min-width: 992px) {
    font-size: 13px;
  }
`
export const CustomBullet = styled(CustomInfo)`
  margin: 0px 4px;
`
export const CustomBullet2 = styled(CustomBullet)`
  @media screen and (min-width: 576px) {
    display: none;
  }
`

export const CustomBanner = styled.div`
  width: 100%;
  min-height: 75px;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  background-color: ${props => (props.isDarkTheme ? '#231f20' : '#f1f1f1')};
  @media screen and (min-width: 576px) {
    min-height: 85px;
  }
  @media screen and (min-width: 768px) {
    min-height: 95px;
    padding: 10px 30px;
  }
  @media screen and (min-width: 992px) {
    min-height: 100px;
    padding: 10px 50px;
  }
`
export const CustomBannerLogo = styled.div`
  height: 40px;
  width: 40px;
  border-radius: 20px;
  background-color: ${props => (props.isDarkTheme ? '#181818' : '#cbd5e1')};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 9px;
  @media screen and (min-width: 576px) {
    height: 50px;
    width: 50px;
    border-radius: 25px;
  }
  @media screen and (min-width: 768px) {
    height: 65px;
    width: 65px;
    border-radius: 35px;
  }
`
export const CustomBannerTitle = styled.h1`
  margin-left: 15px;
  color: ${props => (props.isDarkTheme ? '#ffffff' : '#0f0f0f')};
  font-size: 20px;
  font-weight: 600;
  font-family: 'Roboto';
  @media screen and (min-width: 768px) {
    font-size: 22px;
  }
`

export const CustomViewContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: transparent;
  flex-grow: 1;
  margin: 20px 30px;
`
export const CustomViewImage = styled.img`
  width: 85%;
  max-width: 460px;
`
export const CustomViewTitle = styled.h1`
  color: ${props => (props.isDarkTheme ? '#f1f1f1' : '#181818')};
  font-size: 24px;
  font-weight: 600;
  font-family: 'Roboto';
  margin: 25px 0px 0px;
  text-align: center;
`
export const CustomViewDescription = styled.p`
  color: ${props => (props.isDarkTheme ? '#ebebeb' : '#616e7c')};
  font-size: 16px;
  font-family: 'Roboto';
  text-align: center;
  max-width: 380px;
  line-height: 1.3;
`
export const CustomViewRetryButton = styled.button`
  border: none;
  outline: none;
  cursor: pointer;
  color: #ffffff;
  font-size: 14px;
  font-weight: 500;
  font-family: 'Roboto';
  background-color: #4f46e5;
  padding: 10px 16px;
  border-radius: 5px;
`
