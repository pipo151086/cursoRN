import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text } from 'native-base';
import styles from './styles';
import { useFocusEffect } from '@react-navigation/native';
import Child from './child'
import _ from 'lodash';

const ImageLoader = ({ parent, setParametrosImagenes, parametrosImagenes }) => {

  const [children, setChildren] = useState([]);
  const [newChildVisible, setNewChildVisible] = useState(true);
  const [idChildCounter, setIdChildCounter] = useState(0);
  const countLabel0 = 'Mín. ' + parent.numeroHijosObligatorios;

  useFocusEffect(
    React.useCallback(() => {
      let tmpChildren = [];
      let tmpIdCounter = idChildCounter;
      for (let i = 0; i < parent.numeroHijosObligatorios; i++) {
        if (parent.children[i]) {
          let newChild = {
            id: tmpIdCounter,
            parent: parent.codigoTipoDocumento,
            loaded: false,
            isMandatory: true,
            images: [],
            value: parent.children[i].CodigoDocumento,
            label: parent.children[i].DescripcionTipoDocumento,
          }
          let numeroImagenesDoc = parent.numeroMaximoImagenes;//TODO ARREGLAR CON PARAMETRO DE OTORGAMIENTO
          for (let a = 0; a < numeroImagenesDoc; a++) {
            newChild.images.push({
              codigoImagen: "CLI.ImagenDocumento." + parent.TipoDocumento,
              loaded: false,
              name: "CLI.ImagenDocumento." + parent.TipoDocumento,
            })
          }
          tmpIdCounter = tmpIdCounter + 1
          tmpChildren.push(newChild);
        }
      }
      setIdChildCounter(tmpIdCounter);
      setChildren(tmpChildren);
    }, []),
  );

  useEffect(() => {
    updateParentStatus()
    if (children.length >= parent.childrenTypes.length)
      setNewChildVisible(false)
    else
      setNewChildVisible(true)
  }, [children])

  const updateParentStatus = () => {
    if (children && children.length > 0) {
      let parentOK = !_.some(children, itm => itm.ok === false);
      let tmpParamsImages = parametrosImagenes.map(itm => {
        if (itm.codigoTipoDocumento === parent.codigoTipoDocumento) {
          itm.ok = parentOK;
          itm.children = children;
        }
        return itm;
      });
      setParametrosImagenes(tmpParamsImages);
    }
  }

  const _removeChild = (chToRemove) => {
    let tmpChildren = children?.filter(itm => itm.value !== chToRemove.value && chToRemove.isMandatory === false);
    setChildren([...tmpChildren])
    let newId = idChildCounter - 1;
    setIdChildCounter(newId);
  }

  const _newChild = () => {
    let resToInsert = _.difference(parent.childrenTypes.map(itm => itm.value), children.map(itm => itm.value));
    let images = [];
    let numeroImagenesDoc = parent.numeroMaximoImagenes;
    for (let a = 0; a < numeroImagenesDoc; a++) {
      images.push({
        codigoImagen: "CLI.ImagenDocumento." + parent.TipoDocumento,
        loaded: false,
        name: "CLI.ImagenDocumento." + parent.TipoDocumento,
      })
    }
    children.push(
      {
        ...parent.childrenTypes.find(itm => itm.value === resToInsert[0]),
        loaded: false,
        isMandatory: false,
        images: images,
        id: idChildCounter
      })
    setChildren([...children]);
    let newId = idChildCounter + 1;
    setIdChildCounter(newId);
  }


  return (
    <View style={{ backgroundColor: 'transparent', ...styles.viewItem }}>
      <View style={{ flexDirection: 'row' }}>
        {newChildVisible &&
          <TouchableOpacity
            style={styles.roundNewBtnStyle}
            onPress={_newChild}
          >
            <Text style={styles.roundBtnText}>+</Text>
          </TouchableOpacity>
        }

        <Text style={{ ...styles.normalTextColor, fontWeight: 'bold', flexDirection: 'row' }}>{parent.DescripcionTipoDocumento + ' '}
          {children && children.filter(c => c.loaded === true).length < parent.numeroHijosObligatorios && (
            <Text style={{
              ...styles.indicatorTextTwo,
              color: 'red',
              fontSize: 13,
              fontWeight: 'normal'
            }}>
              {`(${countLabel0})`}
            </Text>
          )}
        </Text>

      </View>
      {children.map((child, key) => {
        return <Child
          key={key}
          parent={parent}
          child={child}
          removeChild={_removeChild}
          brothers={children}
          setChildren={setChildren}
        />
      })}
    </View >
  );
};
export default ImageLoader;

