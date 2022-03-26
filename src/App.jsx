import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import { ThemeProvider } from 'styled-components';

import { theme } from './resources/theme';
import RoutesList from './routes/RoutesList';

import './App.css';

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider theme={theme}>
    <QueryClientProvider client={queryClient}>
      <RoutesList />
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
