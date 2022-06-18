import React, {useState} from 'react';
import { StyleSheet, View, Text, Image, Button, TextInput, ScrollView } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import { Buffer } from 'buffer'

const WomboDreamApi = require('wombo-dream-api');

export const Wombo = props => {
    const [keyWord, setKeyWord] = useState("");
    const [style, setStyle] = useState("3");
    const [img, setImg] = useState(null);
    const [uploadedImg, setUploadedImg] = useState(null);
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

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [3, 4],
            quality: 1,
        });
        if (!result.cancelled) {
            setUploadedImg(result.uri);
        }
    };

    async function getImage() {
        setImg(null);
        setPressed(true);
        uploadedImg? await getImageFromReference() : await getImageWithoutReference();
    }

    async function getImageWithoutReference() {
        await WomboDreamApi.buildDefaultInstance()
            .generatePicture(keyWord, style, (task) => {
                console.log(task.state, 'stage', task.photo_url_list.length);
            })
            .then((task) => setImg(task?.result.final))
            .catch(console.error);
    }

    async function getImageFromReference() {
        await FileSystem.readAsStringAsync(uploadedImg, {encoding: FileSystem.EncodingType.Base64})
            .then((base64)=> {
                const instance = WomboDreamApi.buildDefaultInstance();
                instance
                    .uploadImage(Buffer.from(base64, 'base64'))
                    .then((uploadedImageInfo) => {
                        instance
                            .generatePicture(
                                keyWord,
                                style,
                                (task) => {
                                    console.log(task.state, 'stage', task.photo_url_list.length);
                                },
                                {
                                    mediastore_id: uploadedImageInfo.id,
                                    weight: 'HIGH',
                                }
                            )
                            .then((task) => setImg(task?.result.final))
                            .catch(console.error);
                    })
                    .catch(console.error);
            });
    }

    return (
        <View style={styles.container}>
            <TextInput style={styles.input}
                       value={keyWord}
                       placeholder="Enter word to generate"
                       onChangeText={setKeyWord}/>
            <Picker
                style={styles.picker}
                selectedValue={style}
                onValueChange={(itemValue, itemIndex)  => setStyle(itemValue)}
            >
                <Picker.Item label='No Style' value="3" />
                <Picker.Item label='Synthwave' value="1" />
                <Picker.Item label='Ukiyoe' value="2" />
                <Picker.Item label='Steampunk' value="4" />
                <Picker.Item label='Fantasy Art' value="5" />
                <Picker.Item label='Vibrant' value="6" />
                <Picker.Item label='HD' value="7" />
                <Picker.Item label='Psychic' value="9" />
                <Picker.Item label='Dark Fantasy' value="10" />
                <Picker.Item label='Mystical' value="11" />
                <Picker.Item label='Baroque' value="13" />
                <Picker.Item label='Etching' value="14" />
                <Picker.Item label='S.Dali' value="15" />
                <Picker.Item label='Wuhtercuhler' value="16" />
                <Picker.Item label='Provenance' value="17" />
                <Picker.Item label='Rose Gold' value="18" />
                <Picker.Item label='Moonwalker' value="19" />
                <Picker.Item label='Blacklight' value="20" />
                <Picker.Item label='Psychedelic' value="21" />
                <Picker.Item label='Ghibli' value="22" />
                <Picker.Item label='Surreal' value="23" />
                <Picker.Item label='Love' value="24" />
                <Picker.Item label='Death' value="25" />
                <Picker.Item label='Robots' value="26" />
                <Picker.Item label='Radioactive' value="27" />
            </Picker>
            <View style={styles.uploadHandler}>
                <Button title={"Upload reference (optional)"} onPress={pickImage} />
                {uploadedImg &&
                    <Text>Reference uploaded!</Text>
                }
            </View>
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
        height: '50%',
    },
    womboImage: {
        marginTop: 20,
        marginBottom: 20,
        width: '80%',
        height: '100%',
        alignSelf: 'center'
    },
    input: {
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 4,
        borderStyle: 'solid',
        width: 200,
        marginBottom: 10,
        padding: 4,
    },
    picker: {
        width: 200,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 4,
        borderStyle: 'solid',
        backgroundColor: "#f1f1f1",
        marginBottom: 10,
    },
    uploadHandler: {
        marginBottom: 10,
        alignItems: 'center',
    }
});
