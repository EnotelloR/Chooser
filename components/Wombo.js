import React, {useState} from 'react';
import { StyleSheet, View, Text, Image, Button, TextInput } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import * as Permissions from 'expo-permissions';

const WomboDreamApi = require('wombo-dream-api');

export const Wombo = props => {
    const [keyWord, setKeyWord] = useState("");
    const [img, setImg] = useState(null);
    const [pressed, setPressed] = useState(false);

    function downloadFile(){
        const uri = img;
        let fileUri = FileSystem.documentDirectory + "picture.jpg";
        FileSystem.downloadAsync(uri, fileUri)
            .then(({ uri }) => {
                saveFile(uri);
            })
            .catch(error => {
                console.error(error);
            })
    }

    const saveFile = async (fileUri) => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (status === "granted") {
            const asset = await MediaLibrary.createAssetAsync(fileUri)
            await MediaLibrary.createAlbumAsync("Download", asset, false)
        }
    }

    async function getImage() {
        setImg(null);
        setPressed(true);
        await WomboDreamApi.buildDefaultInstance()
            .generatePicture(keyWord, 1, (task) => {
                console.log(task.state, 'stage', task.photo_url_list.length);
            })
            .then((task) => setImg(task?.result.final))
            .catch(console.error);
    }

    return (
        <View style={styles.container}>
            <TextInput style={styles.input}
                       value={keyWord}
                       placeholder="Enter word to generate"
                       onChangeText={setKeyWord}/>
            {keyWord?
                <Button title={'Generate picture!'} onPress={getImage}/>
                :
                <Button disabled title={'Waiting for word!'} onPress={getImage}/>
            }
            {(pressed && img === null) &&
                <Text>Downloading...</Text>
            }
            {img !== null &&
            <View style={styles.imageHandler}>
                <Image style={styles.womboImage} source={{uri:img}}/>
                <Button title={'Download picture'} onPress={downloadFile}/>
            </View>
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
    imageHandler: {
        width: '80%',
        height: '60%',
    },
    womboImage: {
        marginTop: 20,
        marginBottom: 20,
        width: '100%',
        height: '100%',
    },
    input: {
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 4,
        borderStyle: 'solid',
        width: 200,
        marginBottom: 20,
        padding: 4,
    },
});
