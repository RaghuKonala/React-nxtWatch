import styled from 'styled-components'
import {CgPlayListAdd} from 'react-icons/cg'
import {AiOutlineLike, AiOutlineDislike} from 'react-icons/ai'

export const VideoItemDetailsContainer = styled.div`
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

export const VideoPlayerContainer = styled.div`
  height: 30vh;
  @media screen and (min-width: 375px) {
    height: 35vh;
  }
  @media screen and (min-width: 430px) {
    height: 40vh;
  }
  @media screen and (min-width: 485px) {
    height: 45vh;
  }
  @media screen and (min-width: 545px) {
    height: 50vh;
  }
  @media screen and (min-width: 635px) {
    height: 55vh;
  }
  @media screen and (min-width: 768px) {
    height: 48vh;
  }
  @media screen and (min-width: 855px) {
    height: 52vh;
  }
  @media screen and (min-width: 965px) {
    height: 58vh;
  }
  @media screen and (min-width: 1140px) {
    height: 64vh;
  }
  @media screen and (min-width: 1200px) {
    height: 68vh;
  }
`
export const ViewsButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  @media screen and (min-width: 768px) {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`

export const CustomButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 240px;
  margin-top: 10px;
  @media screen and (min-width: 768px) {
    margin: 0px;
  }
`

export const CustomButton = styled.button`
  outline: none;
  border: none;
  padding: 0px;
  cursor: pointer;
  background-color: transparent;
  color: ${props => (props.isActive ? '#2563eb' : '#64748b')};
  display: flex;
  align-items: center;
  font-size: 13px;
  font-weight: 500;
  font-family: 'Roboto';
  @media screen and (min-width: 768px) {
    font-size: 14px;
  }
`

export const ThematicBreak = styled.hr`
  color: #cccccc;
  width: 100%;
  margin: 15px 0px;
`

export const ChannelProfileImage = styled.img`
  width: 45px;
  height: 45px;
  margin-right: 15px;
`

export const VideoTitle = styled.p`
  color: ${props => (props.isDarkTheme ? '#f1f1f1' : '#181818')};
  font-size: 14px;
  font-weight: 500;
  font-family: 'Roboto';
  line-height: 1.8;
  @media screen and (min-width: 768px) {
    font-size: 16px;
  }
`
export const VideoInfo = styled.p`
  color: #909090;
  font-size: 13px;
  font-weight: 500;
  font-family: 'Roboto';
  margin: 0px;
  line-height: 2;
`
export const ChannelTitle = styled.p`
  color: ${props => (props.isDarkTheme ? '#f1f1f1' : '#181818')};
  font-size: 12px;
  font-weight: 400;
  font-family: 'Roboto';
  line-height: 1.7;
  margin: 0px;
  @media screen and (min-width: 768px) {
    font-size: 14px;
  }
`
export const ChannelSubscribers = styled(VideoInfo)`
  font-size: 11px;
`

export const VideoDescription = styled.p`
  color: #909090;
  font-size: 13px;
  font-weight: 500;
  font-family: 'Roboto';
  line-height: 1.5;
  margin-top: 15px;
`

export const LikeIcon = styled(AiOutlineLike)`
  width: 19px;
  height: 19px;
  margin-right: 5px;
`
export const DislikeIcon = styled(AiOutlineDislike)`
  width: 19px;
  height: 19px;
  margin-right: 5px;
`
export const SaveIcon = styled(CgPlayListAdd)`
  width: 19px;
  height: 19px;
  margin-right: 5px;
`
