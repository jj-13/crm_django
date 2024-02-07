
import { Provider } from 'react-redux'
import store from './Store'
import { BrowserRouter as Router } from 'react-router-dom'
import AnimatedRoutes from './Routes';

function App() { 

  return (
    <Provider store={store}>
      <Router>
        <AnimatedRoutes/>
      </Router>      
    </Provider>    
  )
}

export default App
