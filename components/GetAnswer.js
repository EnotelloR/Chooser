import React, {useState} from 'react';
import { StyleSheet, Text, View, Button, TextInput, ScrollView } from 'react-native';

export const GetAnswer = props => {
    const [optionList, setOptionList] = useState(['','']);
    const [chosenNum, setChosenNum] = useState(-1);
    const [numFact, setNumFact] = useState("");
    const [chosenOption, setChosenOption] = useState("");

    function addNewOption(e) {
        let joined = optionList.concat('');
        setOptionList(joined);
    }
    function ChangeOption(index, option) {
        let temp = [...optionList];
        temp[index] = option;
        setOptionList(temp);
    }

    function makeChoice() {
        let rndNum = Math.floor(Math.random() * optionList.length);
        setChosenOption(optionList[rndNum]);
        fetch(`http://numbersapi.com/`+rndNum)
            .then(res => res.text())
            .then(
                (result) => {
                    setNumFact(result);
                },
                (error) => {
                    console.log(error);
                }
            );
        setChosenNum(rndNum);
    }
    return (
        <View style={styles.container}>
            <ScrollView style={styles.optionsHandler}>
                {optionList.map((option,index) =>
                    <View key={index}>
                        <Text>{index}. </Text>
                        <TextInput style={styles.inputOption}
                                   value={option}
                                   placeholder="Enter option"
                                   onChangeText={newOption => ChangeOption(index, newOption)}/>
                    </View>
                )}
            </ScrollView>
            <View style={styles.buttonHandler}>
                <Button onPress={addNewOption} title='Add new option'/>
            </View>
            <View style={styles.buttonHandler}>
                <Button style={styles.button} onPress={makeChoice} title='Make choice!'/>
            </View>
            {chosenNum >= 0 &&
            <View>
                <Text style={styles.coolText}>I chose... {chosenOption}</Text>
                <Text style={styles.coolText}>It's {chosenNum} option</Text>
                <Text style={styles.fact}>Interesting fact: {numFact} </Text>
            </View>
            }
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
    fact: {
        color: '#1d71ba',
        fontStyle: "italic"
    },
    optionsHandler: {
        maxHeight: '50%',
    },
    inputOption: {
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 4,
        borderStyle: 'solid',
        width: 200,
        marginBottom: 20,
        padding: 4,
    },
    coolText: {
        fontSize: 18,
        fontStyle: "italic"
    },
    buttonHandler: {
        marginBottom: 20,
    }
});

