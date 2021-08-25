import React, { useState, useRef } from 'react';
import Modal from 'react-native-modal';
import { Text, View } from 'native-base';
import styles from './styles';
import localization from '../../../localization';
import { Divider } from 'react-native-elements';
import { Button } from 'react-native-elements';
import { Image } from 'react-native';
import { MarkAsDeleted, MarkAsRead } from '../../../communication/notification';

const ModalNotifAct = ({ notifModalVisible, setNotifModalVisible, currNotif, updateInbox }) => {
    const [scrollOffset, setScrollOffset] = useState(null);

    const _handleScrollTo = (event) => {
        setScrollOffset(event.y)
    };

    return (<Modal
        testID={'modal'}
        isVisible={notifModalVisible}
        swipeDirection={['down']}
        scrollTo={_handleScrollTo}
        scrollOffset={scrollOffset}
        onBackdropPress={() => { setNotifModalVisible(false) }}
        style={{
            justifyContent: 'flex-end',
            margin: 0,
        }}
        onModalWillShow={async () => {
            if (!currNotif.isRead) {
                await MarkAsRead(currNotif.idPushInbox);
                await updateInbox();
            }
        }}
    >
        <View>
            <Text style={styles.modalTitle}>{currNotif.tittle}</Text>
            <View style={{ backgroundColor: "white" }}>
                <View>
                    <Text style={{ ...styles.MessageNotif, padding: 10 }}>{`${currNotif.message}\n`}</Text>
                    {currNotif.messageDetail && currNotif.messageDetail.length > 0 &&
                        <Text style={{ ...styles.MessageNotif, padding: 10 }}>{`${currNotif.messageDetail}\n`}</Text>
                    }
                    <Text style={{ ...styles.timeDeltaS, padding: 10, ...styles.centeredText }}>{currNotif.dateShow}</Text>
                </View>
                <Divider style={{ ...styles.styledDevider, width: "97%", ...styles.centeredText }} />

                <View style={{ ...styles.centeredText, padding: 10 }} >
                    <Button
                        onPress={async () => {
                            await MarkAsDeleted(currNotif.idPushInbox);
                            await updateInbox();
                            setNotifModalVisible(false);
                        }}
                        buttonStyle={{
                            backgroundColor: 'white',
                            borderTopColor: '#2196f3',
                            borderColor: '#2196f3',
                            borderWidth: 2,
                            height: 35,
                            margin: 0,
                            ...styles.centeredText,
                            padding: 20
                        }}
                        title={localization['psp.tltBtnBorrarNotif']}
                        titleStyle={{
                            color: '#2196f3',
                            fontSize: 18,
                        }}
                        icon={
                            <Image
                                style={{
                                    marginRight: 10,
                                    height: 25,
                                    width: 25,
                                    left: 0

                                }}
                                source={require("!/icons/CANCELAR-32.png")}
                            />
                        }
                    />
                </View>

            </View>
        </View>
    </Modal>)
}
export default ModalNotifAct;