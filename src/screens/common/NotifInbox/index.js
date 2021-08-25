import React, { useContext, useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text, Icon } from 'native-base';
import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view';
import { NavigationView, dateFormat } from 'odc-mobile-common';
import styles from './styles';
import { AppContext } from '../../../providers/common';
import moment from 'moment';
import { Divider } from 'react-native-elements';
import ModalNotifAct from './modalNotifAction'
import { GetInbox } from '../../../communication/notification';

const NotifInbox = ({ navigation }) => {
    const { setNotifCont, notifInbox, setNotifInboxFull } = useContext(AppContext);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [notifModalVisible, setNotifModalVisible] = useState(false);
    const [currNotif, setCurrNotif] = useState({});

    const renderItem = ({ item }) => {
        let notifTime = moment(item.dateTime);
        let rightNow = moment();
        let deltaMinutes = rightNow.diff(notifTime, "seconds");
        let duration = moment.duration(deltaMinutes, 'seconds');
        item.days = duration.days();
        item.hours = duration.hours();
        item.weeks = duration.weeks();
        item.minutes = duration.minutes();
        item.seconds = duration.seconds();
        item.color = item.isRead ? "white" : "#E8F5FD";
        item.icon = "bell";
        item.dateShow = notifTime.format(`${dateFormat} HH:mm`);
        switch (item.businessTopic) {
            case "ASESORVENTA": item.icon = "briefcase"; break;
            case "ANAFISICO": item.icon = "house-user"; break;
        }

        return (
            <SwipeRow leftOpenValue={0} rightOpenValue={0}>
                <View />
                <TouchableOpacity
                    onPress={async () => {
                        setCurrNotif(item);
                        setNotifModalVisible(true)
                    }}
                    activeOpacity={0.5}
                >
                    <View style={{ flexDirection: "row", backgroundColor: item.color }}>
                        <View style={{ width: 70, ...styles.centeredText }}>
                            <View style={{
                                ...styles.centeredText, backgroundColor: "gray",
                                padding: 8,
                                borderRadius: 100
                            }}>
                                <Icon
                                    type={"FontAwesome5"}
                                    name={item.icon}
                                    style={{ ...styles.image, fontSize: 20, width: 25, ...styles.centeredText, }}
                                />
                            </View>
                        </View>
                        <View style={{ flex: 1 }}>
                            <View style={{ paddingRight: 10 }}>
                                <Text style={{ ...styles.titleNotif }}>{`${item.tittle}: `}</Text>
                                {/*<Text numberOfLines={3} style={{ ...styles.MessageNotif, }}>{`${item.message}Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknowi.`}</Text>*/}
                                <Text numberOfLines={3} style={{ ...styles.MessageNotif, }}>{`${item.message}`}</Text>
                                <Text style={{ ...styles.timeDeltaS }}>
                                    {item.weeks > 0 && `${item.weeks}s `}
                                    {item.days > 0 && `${item.days}d `}
                                    {item.hours > 0 && `${item.hours}h `}
                                    {item.minutes > 0 && `${item.minutes}m `}
                                    {item.minutes == 0 && item.seconds > 0 && `< 1m `}
                                </Text>
                            </View>
                        </View>
                    </View>
                    <Divider style={{ ...styles.styledDevider, width: "97%", ...styles.centeredText }} />
                </TouchableOpacity>
            </SwipeRow >
        );
    };

    const updateInbox = async () => {
        let resInbox = await GetInbox();
        if (resInbox.state)
            setNotifInboxFull(resInbox.data);
    }

    const renderSectionHeader = ({ section }) => <Text style={{ ...styles.ListTittle, padding: 20 }}>{section.title}</Text>;

    return (<NavigationView navigation={navigation} style={styles.styledView}>
        {<>
            <SwipeListView
                style={styles.fullItem}
                sections={notifInbox}
                renderSectionHeader={renderSectionHeader}
                //data={notifInbox}
                stickyHeaderIndices={[]}
                showsVerticalScrollIndicator={true}
                renderItem={renderItem}
                keyExtractor={item => (item.idPushInbox.toString())}
                leftOpenValue={0} //75
                rightOpenValue={0} //minus75
                refreshing={isRefreshing}
                useSectionList={true}
                onRefresh={async () => await updateInbox()}
            />

            <ModalNotifAct
                notifModalVisible={notifModalVisible}
                setNotifModalVisible={setNotifModalVisible}
                currNotif={currNotif}
                setNotifInboxFull={setNotifInboxFull}
                setNotifCont={setNotifCont}
                notifInbox={notifInbox}
                updateInbox={updateInbox} />
        </>
        }</NavigationView>)
}

export default NotifInbox;