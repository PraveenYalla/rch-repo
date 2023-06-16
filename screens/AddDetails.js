import { Pressable, StyleSheet, Text, View, ScrollView, Button, TextInput, Alert, Keyboard } from 'react-native'
import React, { useEffect, useState, useLayoutEffect, useRef } from 'react'
import { useNavigation } from '@react-navigation/native'
import { SelectList } from 'react-native-dropdown-select-list'
import DatePicker from 'react-native-date-ranges';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsConnected } from 'react-native-offline';
import { Dropdown } from 'react-native-element-dropdown';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { AntDesign } from '@expo/vector-icons';
import moment from "moment";


var AWS = require('aws-sdk/dist/aws-sdk-react-native')

AWS.config.update({
    region: 'ap-southeast-1',
    apiVersion: 'latest',
    credentials: {
        accessKeyId: 'AKIATHZTFH2NMGG445PN',
        secretAccessKey: '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'
    }
})


const AddDetails = () => {

    const [rchList, setrchList] = useState([]);



    const [rchId, setrchId] = useState(null);
    const [healhProviderName, sethealhProviderName] = useState("");
    const [ashaName, setashaName] = useState(null);
    const [deathDate, setDeathDate] = useState(null);
    const [ancSite, setancSite] = useState(null);
    const [placeName, setplaceName] = useState(null);
    const [ancDate, setancDate] = useState(null);
    const [weightPW, setweightPW] = useState(null);
    const [causeOfDeath, setcauseOfDeath] = useState(null);
    const [maternalDeath, setmaternalDeath] = useState(null);

    const [maternalStatus, setmaternalStatus] = useState(false);
    const [OtherCause, setOtherCause] = useState(false);
    const [disableBtn, setdisableBtn] = useState(true);

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isDatePickerVisible1, setDatePickerVisibility1] = useState(false);

    // Anc Date
    const showDatePicker = () => {
        setDatePickerVisibility(true);
        Keyboard.dismiss();
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        setancDate(moment(date).format("DD-MM-YYYY"));
        setTimeout(() => {
            hideDatePicker();
        }, 250);
    };

    // death Date
    const showDatePicker1 = () => {
        setDatePickerVisibility1(true);
        Keyboard.dismiss();
    };

    const hideDatePicker1 = () => {
        setDatePickerVisibility1(false);
    };

    const handleConfirm1 = (date) => {
        setDeathDate(moment(date).format("DD-MM-YYYY"));
        setTimeout(() => {
            hideDatePicker1();
        }, 250);
    };

    const navigation = useNavigation();

    const isConnected = useIsConnected();
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: true,
            title: "Add User",
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

    useEffect(() => {
        if (rchId !== null && healhProviderName !== null && ashaName !== null && deathDate !== null && ancSite !== null && placeName !== null && ancDate !== null && weightPW !== null && causeOfDeath !== null || maternalDeath !== null) {
            setdisableBtn(false)
        } else {
            setdisableBtn(true)
        }
    }, [rchId, healhProviderName, ashaName, deathDate, ancSite, placeName, ancDate, weightPW, causeOfDeath, maternalDeath])



    const healthProvidersList = [
        { key: 'C Lavanya(143147)', value: 'C Lavanya(143147)' },
    ]
    const ashaList = [

        { key: 'D Vasantha(122210)', value: 'D Vasantha(122210)' },
    ]
    const ancList = [

        { key: 'Primary Health Centre', value: 'Primary Health Centre' },
    ]
    const placesList = [

        { key: 'Atmakur (Anantapur)', value: 'Atmakur (Anantapur)' },
    ]
    const weightsList = [

        { key: '55', value: '55' },
        { key: '56', value: '56' },
        { key: '57', value: '57' },
    ]
    const maternalDeathList = [

        { key: 'Yes', value: 'Yes' },
        { key: 'No', value: 'No' },
    ]
    const causeOfDeathList = [

        { key: 'Eclampsia', value: 'A. Eclampsia' },
        { key: 'B. Haemorrahge', value: 'B. Haemorrahge' },
        { key: 'High Fever', value: 'High Fever' },
        { key: 'Abortion', value: 'Abortion' },
        { key: 'Any Other', value: 'Any Other' },
    ]


    const _retrieveData = async () => {

        try {
            const data = await AsyncStorage.getItem('anclist');
            return data;

        } catch (error) {
            // Error retrieving data
        }
    };

    const clearStorage = async () => {
        try {
            await AsyncStorage.clear();
        }
        catch (exception) {
        }
    }

    const _storeData = async (data) => {
        var getData = await _retrieveData().then(res => { return res });

        if (getData !== null) {
            const arrData = [...JSON.parse(getData), data]
            try {
                await AsyncStorage.setItem('anclist', JSON.stringify(arrData));
                Alert.alert('Success', 'Record added successfully', [
                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                ]);

            } catch (error) {
                // Error saving data
            }
        } else {
            try {
                const arr = [data];
                await AsyncStorage.setItem('anclist', JSON.stringify(arr));
                Alert.alert('Success', 'Record added successfully', [
                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                ]);
            } catch (error) {
                // Error saving data
            }
        }



    };

    /** Uncomment for real time usage   */

    // if (isConnected) {
    //     const saveToS3 = async () => await _retrieveData().then(async (res) => {
    //         if (res !== null) {
    //             await handleSaveToS3(res, "anclist")
    //             clearStorage();
    //         }
    //     });

    //     saveToS3();

    // }

    const resetForm = () => {
        // rchIdRef.current.clear();
        setrchId(null);
        sethealhProviderName(null);
        setashaName(null);
        setDeathDate(null);
        setancSite(null);
        setplaceName(null);
        setancDate(null);
        setweightPW(null);
        setmaternalDeath(null);
        setcauseOfDeath(null);

    }

    const handleSaveToS3 = async (jsonData, filename) => {

        var s3 = new AWS.S3();
        var params = {
            Bucket: "frontend-poc-mch",
            Key: `${filename}${new Date()}${new Date().getUTCMilliseconds()}` + ".json",
            Body: jsonData
        }
        await s3.putObject(params, function (err, data) {
            if (err) {
                console.log(err, err.stack);
                Alert.alert('Error', 'Error while saving', [
                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                ]);
            } else {
                console.log("Put to s3 should have worked: " + JSON.stringify(data));

                Alert.alert('success', 'The record have be saved successfully', [
                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                ]);
            }
        });

    }

    const addDetails = () => {


        let obj = {}

        obj.rch_id_no = rchId;
        obj.health_provider_name = healhProviderName;
        obj.asha_name = ashaName;
        obj.site_of_ANC_done = ancSite;
        obj.place_name = placeName;
        obj.ANC_date = ancDate;
        obj.weight_of_PW = weightPW;
        obj.maternal_Death = maternalDeath;
        obj.death_date = deathDate;
        obj.probable_cause_of_death = causeOfDeath;

        console.log(obj);

        setrchList(current => [...current, obj]);


        /** Uncomment for real time usage   */
        // if (!isConnected) {
        //     console.log("offline");
        //     _storeData(obj);
        // } else {
        //     console.log("online");
        //     const jsonOutput = JSON.stringify([obj]);
        //     handleSaveToS3(jsonOutput, `anclist`)
        // }

        _storeData(obj);

        resetForm();


    }

    const handlematernalDeath = (val) => {
        setmaternalDeath(val);
        if (val === "Yes") {
            setmaternalStatus(true)
        } else {
            setmaternalStatus(false)
        }
    }

    const hanldecauseOfDeath = (val) => {
        setcauseOfDeath(val);
        if (val === "Any Other") {
            setOtherCause(true)
        } else {
            setOtherCause(false)
        }
    }

    const customButton = (onConfirm) => (
        <Button
            onPress={onConfirm}
            style={{ container: { width: '80%', marginHorizontal: '3%' }, text: { fontSize: 20 } }}
            primary
            text={'save'}
            title='save'
        />
    )

    return (
        <>
            <ScrollView style={{ flexDirection: "column" }}>
                <View style={{ margin: 20, gap: 20 }}>
                    <View>
                        <Text>RCH ID No:</Text>
                        <TextInput value={rchId} style={styles.textField} onChangeText={value => setrchId(value)} />
                    </View>
                    <View>
                        <Text>Health Provider Name</Text>
                        <Dropdown
                            style={styles.textField}
                            data={healthProvidersList}
                            labelField="value"
                            valueField="value"
                            placeholder="Select option"
                            value={healhProviderName}
                            onChange={item => {
                                sethealhProviderName(item.value);
                            }}
                        />
                    </View>
                    <View>
                        <Text>Asha Name</Text>
                        <Dropdown
                            style={styles.textField}
                            data={ashaList}
                            labelField="value"
                            valueField="value"
                            placeholder="Select option"
                            value={ashaName}
                            onChange={item => {
                                setashaName(item.value);
                            }}
                        />
                    </View>
                    <View>
                        <Text>Site of ANC done</Text>
                        <View>
                            <Dropdown
                                style={styles.textField}
                                data={ancList}
                                labelField="value"
                                valueField="value"
                                placeholder="Select option"
                                value={ancSite}
                                onChange={item => {
                                    setancSite(item.value);
                                }}
                            />
                        </View>
                    </View>
                    <View>
                        <Text>Place Name</Text>
                        <View>
                            <Dropdown
                                style={styles.textField}
                                data={placesList}
                                labelField="value"
                                valueField="value"
                                placeholder="Select option"
                                value={placeName}
                                onChange={item => {
                                    setplaceName(item.value);
                                }}
                            />
                        </View>
                    </View>
                    <View>
                        <Text>ANC Date</Text>
                        <DateTimePickerModal
                            isVisible={isDatePickerVisible}
                            mode="date"
                            onConfirm={handleConfirm}
                            onCancel={hideDatePicker}
                        />
                        <View style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "row" }}>
                            <TextInput
                                style={styles.textField}
                                value={ancDate ? ancDate : ""}
                                placeholder='Select Date'
                                onPressIn={showDatePicker}
                            />
                            <AntDesign name="calendar" size={32} color="black" onPress={showDatePicker} style={{ position: "absolute", right: 10 }} />
                        </View>
                    </View>
                    <View>
                        <Text>Weight of PW</Text>
                        <View>
                            <Dropdown
                                style={styles.textField}
                                data={weightsList}
                                labelField="value"
                                valueField="value"
                                placeholder="Select option"
                                value={weightPW}
                                onChange={item => {
                                    setweightPW(item.value);
                                }}
                            />
                        </View>
                    </View>
                    <View>
                        <Text>Maternal Death</Text>
                        <Dropdown
                            style={styles.textField}
                            data={maternalDeathList}
                            labelField="value"
                            valueField="value"
                            placeholder="Select option"
                            value={maternalDeath}
                            onChange={item => {
                                handlematernalDeath(item.value);
                            }}
                        />
                    </View>

                    {maternalStatus && (
                        <>
                            <View>
                                <Text>Death Date</Text>
                                {/* <DatePicker
                                    style={styles.textField}
                                    input={true}
                                    customStyles={{
                                        placeholderText: {
                                            fontSize: 16,
                                            flexDirection: "row",
                                            alignItems: "center",
                                            marginRight: "auto",

                                        }, // placeHolder style
                                        headerStyle: {
                                            backgroundColor: "#003580"
                                        },			// title container style
                                        headerMarkTitle: {
                                            display: "none"
                                        }, // title mark style 
                                        headerDateTitle: {
                                            fontSize: 18
                                        }, // title Date style
                                        contentInput: {
                                            paddingHorizontal: 10,
                                            height: 40,
                                            flexDirection: "row",
                                            textAlign: "left",
                                        }, //content text container style
                                        contentText: {
                                            fontSize: 16,
                                            alignItems: "center",
                                            marginRight: "auto"
                                        }, //after selected text Style
                                    }} // optional 
                                    allowFontScaling={false} // optional
                                    placeholder={'Select Date'}
                                    markText="Save"
                                    customButton={(onConfirm) => customButton(onConfirm)}
                                    onConfirm={(date) => setDeathDate(date)}
                                    outFormat="DD-MM-YYYY"
                                /> */}
                                <DateTimePickerModal
                                    isVisible={isDatePickerVisible1}
                                    mode="date"
                                    onConfirm={handleConfirm1}
                                    onCancel={hideDatePicker1}
                                />
                                <View style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "row" }}>
                                    <TextInput
                                        style={styles.textField}
                                        value={deathDate ? deathDate : ""}
                                        placeholder='Select Date'
                                        onPressIn={showDatePicker1}
                                    />
                                    <AntDesign name="calendar" size={32} color="black" onPress={showDatePicker1} style={{ position: "absolute", right: 10 }} />
                                </View>

                            </View>
                            <View>
                                <Text>Probable cause of death</Text>
                                <Dropdown
                                    style={styles.textField}
                                    data={causeOfDeathList}
                                    labelField="value"
                                    valueField="value"
                                    placeholder="Select option"
                                    value={causeOfDeath}
                                    onChange={item => {
                                        setcauseOfDeath(item.value);
                                    }}
                                />
                            </View>
                        </>
                    )}
                </View>

            </ScrollView >

            <View style={{ marginTop: "auto", padding: 20, backgroundColor: "#eee", flexDirection: "row" }}>
                <Pressable style={{ padding: 20, alignItems: "center", marginRight: 10, backgroundColor: disableBtn ? '#607D8B' : '#003580' }} onPress={addDetails} disabled={disableBtn}>
                    <Text style={{ color: "#fff" }}>Submit</Text>
                </Pressable>
                <Pressable style={{ padding: 20, backgroundColor: "#003580", alignItems: "center", marginRight: 10 }} onPress={resetForm}>
                    <Text style={{ color: "#fff" }}>Reset</Text>
                </Pressable>
                {/* <Pressable style={{ padding: 20, backgroundColor: "#003580", alignItems: "center" }} onPress={clearStorage}>
                    <Text style={{ color: "#fff" }}>Remove</Text>
                </Pressable> */}
                {isConnected ? (
                    <Entypo name="cloud" size={24} color="black" />
                ) : (
                    <Ionicons name="cloud-offline" size={24} color="black" />
                )}
            </View>
        </>

    )
}

export default AddDetails

const styles = StyleSheet.create({
    textField: {
        paddingHorizontal: 10,
        paddingVertical: 15,
        borderWidth: 1,
        marginTop: 5,
        borderRadius: 0,
        width: "100%"
    },
    dropdown: {
        margin: 16,
        height: 50,
        borderBottomColor: 'gray',
        borderBottomWidth: 0.5,
    },
    icon: {
        marginRight: 5,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
})