import { BrowserRouter } from 'react-router-dom';
import ThemeProvider from './theme';
import ReduxProvider from './redux';
import ApolloProvider from './graphql';
import Router from './routes';

function App() {

  return (
    <ReduxProvider>
      <ApolloProvider>
        <BrowserRouter>
          <ThemeProvider>
            <Router />
          </ThemeProvider>
        </BrowserRouter>
      </ApolloProvider>
    </ReduxProvider>
  )
}

export default App;
