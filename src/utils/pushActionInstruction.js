
import _ from 'lodash';
import navigationService from './navigationService'

const EjecuteInstruction = (notifProps) => {
    const { instructions, tittle, message } = notifProps;
    const { navigation } = navigationService;
    try {
        let instArr = JSON.parse(instructions);
        if (instArr.length > 1)
            instArr = _.orderBy(instArr, ['order'], ['asc']);
        instArr.forEach(inst => {
            switch (inst.instructionType) {
                case 0: //REDIRECT
                    if (inst.aditionalData && inst.aditionalData.length > 5)
                        return navigation.navigate(inst.aditionalData);
                    else
                        return navigation.navigate("NotifInbox");
                    break;
            }
        });

    }
    catch (ex) {

    }
}

export default EjecuteInstruction;