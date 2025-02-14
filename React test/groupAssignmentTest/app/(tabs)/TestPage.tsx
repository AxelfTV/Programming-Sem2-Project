import { Text, View, StyleSheet } from 'react-native';
import {Link} from 'expo-router';
import React,{ useState } from 'react';//use useState to repalce global varible or it does't update

import CircleButton from '@/components/CircleButton';

const listTest=[
{name:"name1", id:1},
{name:"name2",id:2},
{name:"name3",id:3},
];
export default function TestPage()
{
    let [pressNum, setPressNum] = useState(0);
    const listItems=listTest.map(listitem=>
        <li key={listitem.id} style={styles.text}>
            {listitem.name}
            </li>
    );

    const onPressCircleBtn=()=>{ 
        console.log("press");
        setPressNum(prev => prev + 1);
     }
    return(
        <>
        <View style={styles.container}>
            <Text style={styles.text}>About screen</Text>
              
            <Link href="/explore" style={styles.button}>link to explore</Link>
            <Link href="/" style={styles.button}>link to home</Link>
            <h1>HI</h1>
            <ul>{listItems}</ul>
        </View>

    <View style={styles.optionsContainer}>
        <View style={styles.optionsRow}>       
        <CircleButton onPress={onPressCircleBtn} />
        <Text style={styles.text}>Press Times: {pressNum}</Text>
    </View>


    </View>
</>
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

      optionsContainer: {
        position: 'absolute',
        bottom: 80,
      },
      optionsRow: {
        alignItems: 'center',
        flexDirection: 'row',
      },
});