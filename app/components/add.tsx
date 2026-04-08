import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';
import { Text, View } from "react-native";

export default function Add() {
    const [selected, setSelected] = useState("1");

    return (
        <View style={{
            width:"100%",
            marginLeft:50,
            marginRight:50
        }}>
        <View style={{
            // margin:10,
            // marginHorizontal:10,
            width: "100%",
            borderWidth:2,
            borderStyle: 'solid',
            borderColor: '#afb0ad',
            borderRadius:20,
            position:"relative",
            marginTop:10,


        }}>
            <Text
            style={
                {
                    backgroundColor:'#fff',
                    color:'#afb0ad',
                    position:"absolute",
                    left:10,
                    top:-8,
                }
            }
            >Category</Text>
            <Picker
                selectedValue={selected}
                mode="dropdown"
                onValueChange={(itemValue) => setSelected(itemValue)}
            >
                <Picker.Item label="Pic a Category" value="1" />
                <Picker.Item label="Recharge" value="2" />
                <Picker.Item label="Bill Payment" value="3" />
                <Picker.Item label="Others" value="4" />
                <Picker.Item label="Electricity" value="5" />
            </Picker>
        </View>
        </View>
    );
}