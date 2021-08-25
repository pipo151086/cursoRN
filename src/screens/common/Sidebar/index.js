import React, { useContext } from 'react';
import { Image } from 'react-native';
import { Content, Text, Icon, ListItem, View } from 'native-base';
import { Grid, Col } from 'react-native-easy-grid';
import styles from './style';
import { AppContext } from '../../../providers/common';
import { updateContext } from '../../../database/common/dbHandler';
import localization from '../../../localization';
import moment from 'moment';
import _ from 'lodash';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { Button } from 'react-native-elements';
import { signout } from '../../../communication/common/security'

const cerrarIcon = require('!/icons/CERRAR-32.png');
const logoIcon = require('!/logo-inicio.jpg');

const SideBar = ({ navigation }) => {
  const { globalSession, setGlobalSession, profileTransactions, changeInitialView, notifCont } = useContext(AppContext);
  const dummyMenu = false;
  const transactions =
    profileTransactions && profileTransactions[0]
      ? _.orderBy(
        profileTransactions[0].transactions.filter(
          tr => tr.level === 'SCREEN',
        ),
        ['order'],
        ['asc'],
      )
      : [];

  return (
    <DrawerContentScrollView
      style={styles.drawer}
      scrollEnabled={false}
      contentContainerStyle={{ flex: 1 }}>
      <View style={styles.logoContainer}>
        <Image style={styles.logoIcon} source={logoIcon} />
      </View>
      <Content style={{ ...styles.drawerContent }}>
        <ListItem
          button
          key={22}
          onPress={() => {
            navigation.navigate("NotifInbox", { fromNavBar: true });
          }}
          iconLeft
          style={styles.links}>
          <Icon
            type={"FontAwesome5"}
            name={"bell"}
            size={30}
            style={styles.image}
          />
          {notifCont > 0 ?
            (<View style={{ ...styles.badge, paddingHorizontal: notifCont < 10 ? 2 : 0 }}><Text style={styles.badgeText}>{notifCont}</Text></View>) : <></>
          }
          <Text style={styles.linkText}>{"Notificaciones"}</Text>
        </ListItem>


        {
          transactions.map((item, inx) => {
            const iconSplit = item.icon.split('|');
            return (
              <ListItem
                button
                key={inx}
                onPress={() => {
                  navigation.navigate(item.routeLink, {
                    fromNavBar: true,
                  });
                }}
                iconLeft
                style={styles.links}>
                <Icon
                  type={iconSplit[0]}
                  name={iconSplit[1]}
                  size={30}
                  style={styles.image}
                />
                <Text style={styles.linkText}>{item.description}</Text>
              </ListItem>
            );
          })
        }
        

        {dummyMenu &&
          <>
            <ListItem
              button
              key={20}
              onPress={() => {
                navigation.navigate("Schedule", {
                  fromNavBar: true,
                });
              }}
              iconLeft
              style={styles.links}>
              <Icon
                type={"FontAwesome5"}
                name={"calendar"}
                size={30}
                style={styles.image}
              />
              <Text style={styles.linkText}>{"Agenda"}</Text>
            </ListItem>

            <ListItem
              button
              key={22}
              onPress={() => {
                navigation.navigate("DevPortfolio", {
                  fromNavBar: true,
                });
              }}
              iconLeft
              style={styles.links}>
              <Icon
                type={"FontAwesome5"}
                name={"tasks"}
                size={30}
                style={styles.image}
              />
              <Text style={styles.linkText}>{"Buzón Punta"}</Text>
            </ListItem>
          </>
        }
      </Content>
      <View style={styles.logoutContainer}>
        <View style={styles.logoutbtn} foregroundColor={'white'}>
          <Grid>
            <Col style={{ width: '40%' }}>
              <Text
                note
                style={{
                  color: 'black',
                  textAlignVertical: 'center',
                }}>
                {globalSession?.session &&
                  globalSession?.session.jwt &&
                  globalSession?.session.jwt.claims &&
                  globalSession?.session.jwt.claims.simpleName}
              </Text>
            </Col>
            <Col style={{ width: '60%' }}>
              <Button
                onPress={async () => {
                  let resSignOut = await signout();
                  if (!resSignOut.state) {
                    navigation.closeDrawer();
                    return showToast(resSignOut.message);
                  }
                  await updateContext({
                    context: '{}',
                    lastTimeAccessed: moment(new Date()).format(
                      'YYYY-MM-DD h:mm:ss',
                    ),
                  });
                  navigation.closeDrawer();
                  setGlobalSession(undefined);
                  changeInitialView(undefined);
                }}
                title={localization['common.sidebar.logout']}
                buttonStyle={styles.buttonStyleSignout}
                titleStyle={styles.titleStyleSignout}
                type="outline"
                icon={<Image style={styles.imageSignout} source={cerrarIcon} />}
              />
            </Col>
          </Grid>
        </View>
      </View>
    </DrawerContentScrollView>
  );
};

export default SideBar;
