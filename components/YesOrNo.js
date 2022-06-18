import React, {useState} from 'react';
import { StyleSheet, View, Text, Image, Button } from 'react-native';

export const YesOrNo = props => {
    const [answer, setAnswer] = useState("");
    const [imgPath, setImgPath] = useState("");

    function getAnswer() {
        fetch("https://yesno.wtf/api")
            .then(res => res.json())
            .then(
                (result) => {
                    setAnswer(result.answer);
                    setImgPath(result.image);

                },
                (error) => {
                    console.log(error)
                }
            )
    }

    return (
        <View style={styles.container}>
            <Button title={'Get answer!'} onPress={getAnswer}/>
            <Text>Answer is... <Text style={styles.answerText}>{answer.toUpperCase()}</Text></Text>
            {imgPath !== "" &&
            <Image style={styles.answerImage} source={{uri: imgPath}}/>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    answerImage: {
        width: '80%',
        height: '50%',
    },
    answerText: {
        color: '#1d71ba',
        fontSize: 30,
    }
});
