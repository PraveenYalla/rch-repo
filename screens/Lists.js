import { StyleSheet, Text, View, FlatList, Button, Modal, TouchableOpacity } from 'react-native'
import React, { useLayoutEffect, useState, useEffect } from 'react'
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Foundation, Feather } from '@expo/vector-icons';
import { CaptureFinger } from './scanner.js';


const Lists = () => {

    const [ancList, setancList] = useState([])
    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [currentItem, setcurrentItem] = useState(null);


    const _retrieveData = async () => {

        try {
            const jsonValue = await AsyncStorage.getItem('anclist');

            const data = jsonValue != null ? JSON.parse(jsonValue) : null;
            setancList(data);
        } catch (error) {
            // Error retrieving data
        }

    };

    const navigation = useNavigation();
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: true,
            title: "Users List",
            headerTitleStyle: {
                fontSize: 20,
                fontWeight: "bold",
                color: "white"
            },
            headerStyle: {
                backgroundColor: "#003580",
                height: 110
            }
        })
    }, [])

    useFocusEffect(
        React.useCallback(() => {
            _retrieveData();
        }, [ancList])
    );

    return (
        <View>
            <FlatList
                data={ancList}
                renderItem={({ item }) =>
                    <TouchableOpacity onPress={() => {
                        setcurrentItem(item);
                        setShowModal(!showModal);
                    }}>
                        <View style={[styles.itemBlock, { alignItems: "center" }]}>
                            <Foundation name="torso-female" size={64} color="black" style={styles.itemImage} />
                            <View style={styles.itemMeta}>
                                <Text style={styles.itemName}> RCH ID No: {item.rch_id_no}</Text>
                                <Text style={styles.itemLastMessage}>Health Provider: {item.health_provider_name}</Text>
                            </View>
                            <Feather name="edit" size={32} color="black" style={{ marginLeft: "auto", marginRight: 16 }} onPress={() => {
                                // setcurrentItem(item);
                                // setShowEditModal(true);
                                navigation.navigate("Edit", { item })
                            }} />
                        </View>
                    </TouchableOpacity>

                }

            />
            <Modal
                animationType={'slide'}
                transparent={false}
                visible={showModal}
                onRequestClose={() => {
                    console.log('Modal has been closed.');
                }}>
                {/*All views of Modal*/}
                {/*Animation can be slide, slide, none*/}
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        {/* <Text style={styles.text}>{currentItem?.rch_id_no}</Text>
                        <Button
                            title="Click To Close Modal"
                            onPress={() => {
                                setShowModal(!showModal);
                            }}
                        /> */}
                        <View style={[styles.itemBlock, styles.noBorder, { alignItems: "flex-start" }]}>
                            {/* <Image source={{ uri: item.picture }} style={styles.itemImage} /> */}
                            <Foundation name="torso-female" size={200} color="black" style={styles.itemImage} />
                            <View>
                                <View style={styles.itemMeta}>
                                    <Text style={[styles.itemName, { fontSize: 24 }]}> RCH ID No: {currentItem?.rch_id_no}</Text>
                                    <Text style={[styles.itemLastMessage, styles.itemLastMessage2]}>Health Provider: {currentItem?.health_provider_name}</Text>
                                    <Text style={[styles.itemLastMessage, styles.itemLastMessage2]}>Asha Name: {currentItem?.asha_name}</Text>
                                    <Text style={[styles.itemLastMessage, styles.itemLastMessage2]}>Site of ANC done: {currentItem?.site_of_ANC_done}</Text>
                                    <Text style={[styles.itemLastMessage, styles.itemLastMessage2]}>Place Name: {currentItem?.place_name}</Text>
                                    <Text style={[styles.itemLastMessage, styles.itemLastMessage2]}>ANC Date: {currentItem?.ANC_date}</Text>
                                    <Text style={[styles.itemLastMessage, styles.itemLastMessage2]}>Weight of PW: {currentItem?.weight_of_PW}</Text>
                                    <Text style={[styles.itemLastMessage, styles.itemLastMessage2]}>Maternal Death: {currentItem?.maternal_Death}</Text>
                                    {(currentItem?.maternal_Death === 'Yes') ?
                                        (
                                            <>
                                                <Text style={[styles.itemLastMessage, styles.itemLastMessage2]}>Death Date: {currentItem?.death_date || `-`}</Text>
                                                <Text style={[styles.itemLastMessage, styles.itemLastMessage2]}>Probable cause of Death: {currentItem?.probable_cause_of_death || `-`}
                                                </Text>
                                            </>)
                                        : ""
                                    }
                                </View>
                            </View>

                        </View>
                        <Button
                            title="Close"
                            onPress={() => {
                                setShowModal(!showModal);
                            }}
                        />
                    </View>
                </View>
            </Modal>


            <Modal
                animationType={'slide'}
                transparent={false}
                visible={showEditModal}
                onRequestClose={() => {
                    console.log('Modal has been closed.');
                }}>
                {/*All views of Modal*/}
                {/*Animation can be slide, slide, none*/}
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        {/* <Text style={styles.text}>{currentItem?.rch_id_no}</Text>
                        <Button
                            title="Click To Close Modal"
                            onPress={() => {
                                setShowModal(!showModal);
                            }}
                        /> */}
                        <View style={[styles.itemBlock, styles.noBorder, { alignItems: "flex-start" }]}>






                        </View>
                        <Button
                            title="Close"
                            onPress={() => {
                                setShowEditModal(!showEditModal);
                            }}
                        />
                    </View>
                </View>
            </Modal>




        </View>
    )
}

export default Lists

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    itemBlock: {
        flexDirection: 'row',
        paddingBottom: 10,
        paddingTop: 10,
        gap: 2,
        borderBottomWidth: 1,
        borderTopWidth: 1,
        marginBottom: 5,
        marginTop: 5,
        borderColor: "#aaa",
        flexWrap: 'wrap'

    },
    noBorder: {
        borderColor: "transparent",
    },
    itemImage: {
        margin: 5,
        padding: 5,
        borderColor: "#aaa",
        borderWidth: 1
    },
    itemMeta: {
        marginLeft: 10,
        justifyContent: 'center',
    },
    itemName: {
        fontSize: 20,
    },
    itemLastMessage: {
        fontSize: 14,
        color: "#111",
    },
    itemLastMessage2: {
        fontSize: 18,
        marginBottom: 10,
        marginTop: 10,
    }
})