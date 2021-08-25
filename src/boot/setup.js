import React, { useRef, useState, useEffect, useContext } from 'react';
import { StyleProvider } from 'native-base';
import App from './AppNavigator';
import getTheme from '../theme/components';
import variables from '../theme/variables/commonColor';
import { AppProvider, PspProvider, DialogProvider, DialogConsumer } from '../providers';
import { RootSiblingParent } from 'react-native-root-siblings';
import { showToast } from 'odc-mobile-common';
import { AppContext } from '../providers/common';

const BootSetup = () => {
  try {
    return (
      <RootSiblingParent>
        <AppProvider>
          <StyleProvider style={getTheme(variables)}>
            <PspProvider>
              <DialogProvider>
                <DialogConsumer>
                  {funcs => {
                    global.props = { ...funcs };
                    return <App {...funcs} />;
                  }}
                </DialogConsumer>
              </DialogProvider>
            </PspProvider>
          </StyleProvider>
        </AppProvider>
      </RootSiblingParent>
    );
  } catch (error) {
    if (error) showToast(error.toString());
  }
};
export default BootSetup;
