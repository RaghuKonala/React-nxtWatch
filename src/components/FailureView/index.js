import AppContext from '../../context/AppContext'

import {
  CustomViewContainer,
  CustomViewImage,
  CustomViewTitle,
  CustomViewDescription,
  CustomRetryButton,
} from '../../styles/CommonStyles'

const imgLightTheme =
  'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'

const imgDarkTheme =
  'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'

const FailureView = props => {
  const {retryApiCall} = props

  const onClickRetry = () => retryApiCall()
  return (
    <AppContext.Consumer>
      {value => {
        const {isDarkTheme} = value
        const failureImageUrl = isDarkTheme ? imgDarkTheme : imgLightTheme
        return (
          <CustomViewContainer>
            <CustomViewImage alt="failure view" src={failureImageUrl} />
            <CustomViewTitle isDarkTheme={isDarkTheme}>
              Oops! Something Went Wrong
            </CustomViewTitle>
            <CustomViewDescription>
              We are having some trouble to complete your request. Please try
              again.
            </CustomViewDescription>
            <CustomRetryButton type="button" onClick={onClickRetry}>
              Retry
            </CustomRetryButton>
          </CustomViewContainer>
        )
      }}
    </AppContext.Consumer>
  )
}

export default FailureView
