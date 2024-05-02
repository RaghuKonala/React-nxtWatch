import {Route, Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import Header from '../Header'
import Sidebar from '../Sidebar'
import {AppContainer, AppResponsiveContainer} from '../../assets/commonStyles'

const ProtectedRoute = props => {
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken === undefined) {
    return <Redirect to="/login" />
  }
  return (
    <AppContainer>
      <Header />
      <AppResponsiveContainer>
        <Sidebar />
        <Route {...props} />
      </AppResponsiveContainer>
    </AppContainer>
  )
}

export default ProtectedRoute
