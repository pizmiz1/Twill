import AppNav from "./navigation/navigation";
import GlobalProvider from "./store/globalProvider";
import { SafeAreaProvider } from "react-native-safe-area-context";

const App = () => {
  return (
    <SafeAreaProvider>
      <GlobalProvider>
        <AppNav />
      </GlobalProvider>
    </SafeAreaProvider>
  );
};

export default App;
