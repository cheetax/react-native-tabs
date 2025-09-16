import Tabs from './Tabs/Tabs';
//import Tabs from '@cheetax/react-native-tabs';
import { StatusBar } from 'expo-status-bar';
import { LayoutChangeEvent, StyleSheet, Text, View } from 'react-native';

export default function App() {

  const onLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent?.layout || { width: 0, height: 0 }
    console.log(`Width: ${width}, Height: ${height}`);
  }
  return (
    <View style={styles.container} onLayout={onLayout}>
      {/* <Text>Open up App.tsx to start working on your app!</Text> */}
      {/* <StatusBar style="auto" /> */}
      <Tabs content={['Test1', 'Test2', 'Test3r', 'Test1', 'Test1', 'Test1']}
        mode='primary' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // height: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
