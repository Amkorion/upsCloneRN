import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { NavigationContainer } from "@react-navigation/native";
import RootNavigator from "./navigator/RootNavigator";
import { STEPZEN_URI, STEPZEN_APIKEY } from "@env";

const client = new ApolloClient({
  uri: STEPZEN_URI,
  headers: {
    Authorization: STEPZEN_APIKEY,
  },

  cache: new InMemoryCache(),
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </ApolloProvider>
  );
}
