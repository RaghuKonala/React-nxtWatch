import {failureLightTheme, failureDarkTheme} from '../../assets/images'

import {
  CustomViewContainer,
  CustomViewImage,
  CustomViewTitle,
  CustomViewDescription,
  CustomViewRetryButton,
} from '../../assets/commonStyles'

const FailureView = props => {
  const {darkTheme, providedFunction} = props
  const failureImageUrl = darkTheme ? failureDarkTheme : failureLightTheme

  return (
    <CustomViewContainer>
      <CustomViewImage alt="failure view" src={failureImageUrl} />
      <CustomViewTitle isDarkTheme={darkTheme}>
        Oops! Something Went Wrong
      </CustomViewTitle>
      <CustomViewDescription>
        We are having some trouble to complete your request. Please try again.
      </CustomViewDescription>
      <CustomViewRetryButton type="button" onClick={() => providedFunction()}>
        Retry
      </CustomViewRetryButton>
    </CustomViewContainer>
  )
}

export default FailureView
