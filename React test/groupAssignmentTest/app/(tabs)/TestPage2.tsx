import { Text, View, StyleSheet } from 'react-native';
import {Link} from 'expo-router';

export default function TestPage2()
{
    return(
        <View style={styles.container}>
            <Text style={styles.text}>About screen</Text>
              
            <Link href="/explore" style={styles.button}>link to explore</Link>
            <Link href="/" style={styles.button}>link to home</Link>
        </View>
    );
}

const styles=StyleSheet.create({
    container:
    {
    flex: 1,
    backgroundColor: '#25292e',
    justifyContent: 'center',
    alignItems: 'center',
    },
    text:{
        color:"#fff",
    },
    button: {
        fontSize: 20,
        textDecorationLine: 'underline',
        color: '#fff',
      },
});