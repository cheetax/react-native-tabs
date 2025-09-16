# @cheetax/react-native-tabs

It works using packages [react-native-paper] and [react-native-reanimated]

#### [Demo]()

# Install
```npm i @cheetax/react-native-tabs```

# Use
```ts and react-native
import Tabs from '@cheetax/react-native-tabs';
import { LayoutChangeEvent, StyleSheet, Text, View } from 'react-native';

export default function App() {

  const onLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent?.layout || { width: 0, height: 0 }
    console.log(`Width: ${width}, Height: ${height}`);
  }
  return (
    <View style={styles.container} onLayout={onLayout}>
      <Tabs content={['Test1', 'Test2', 'Test3r', 'Test1', 'Test1', 'Test1']}
        mode='primary' />
    </View>
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

```
## Props

Common props you may want to specify include:

* `content` - ['Array string'] or ['Array {
                                        icon: IconType
                                        name: string
                                    }'] 
* `mode` - ['primary'] or ['secondary'] Default 'primary'
* `onTabPress` - [function] Will call and return index when choosing a tab
* `duration` - [number] Animation duration
* `theme` - [MD3Theme] MD3Theme from the package [react-native-paper]