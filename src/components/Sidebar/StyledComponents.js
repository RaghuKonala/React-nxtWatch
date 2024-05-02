import styled from 'styled-components'

export const SidebarContainer = styled.div`
  display: none;
  @media screen and (min-width: 768px) {
    max-width: 220px;
    width: 100%;
    height: 88vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: ${props => props.bgColor};
  }
`

export const ContactUsContainer = styled.div`
  padding: 0px 24px;
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`
export const ContactUsContent = styled.p`
  font-size: 14px;
  font-family: 'Roboto';
  color: ${props => (props.isDarkTheme ? '#f8fafc' : '#1e293b')};
  font-weight: ${props => (props.isDarkTheme ? 500 : 'bold')};
  line-height: 1.5;
`

export const SocialMediaContainer = styled.ul`
  padding: 0px;
  margin: 0px;
  display: flex;
  align-items: center;
`
export const SocialMediaItem = styled.li`
  list-style-type: none;
  margin-right: 12px;
`
export const SocialMediaIcon = styled.img`
  height: 28px;
  width: 28px;
`
