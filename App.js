import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import StackNavigator from './StackNavigator';
import { NetworkProvider } from 'react-native-offline';
export default function App() {
  return (
    <>
      <NetworkProvider>
        <StackNavigator />
      </NetworkProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
