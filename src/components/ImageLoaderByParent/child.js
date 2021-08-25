import React, { useState, useEffect, useRef } from 'react';
import { View, TouchableOpacity, Image, Dimensions } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import ImagePicker from 'react-native-image-crop-picker';
import { Text } from 'native-base';
import localization from '../../localization/';
import styles from './styles';
import { Icon } from 'native-base';
import { Picker } from 'native-base';
import { Divider } from 'react-native-elements';
import _ from 'lodash';

const Child = ({ parent, child, removeChild, brothers, setChildren }) => {
    const [selectedValue, setSelectedValue] = useState(child.value);
    const [docDescripcion, setDocDescripcion] = useState(child.desc);
    const [docTypeCombo, setDocTypeCombo] = useState(parent?.childrenTypes);
    const [countChildLoadedImages, setCountChildLoadedImages] = useState(0);
    const [childImages, setChildImages] = useState(child.images);
    const carouselRef = useRef(null);
    const id = child.id;
    const numMaxImg = parent.numeroMaximoImagenes;
    const numRequired = parent.numeroHijosObligatorios;
    const countLabel = +countChildLoadedImages + ' Imágenes' //+ '/' + numMaxImg;
    const newColor =
        countChildLoadedImages >= numRequired
            ? styles.completedIndicatorColor
            : styles.uncompletedIndicatorColor;

    useEffect(() => {
        if (carouselRef?.current) carouselRef.current.snapToItem(0);
        setSelectedValue(child.value);
    }, []);

    useEffect(() => {
        const tmpLoadedImages = childImages.filter(f => f.loaded);
        let tmpBrothers = brothers.map(el => {
            if (el.id == id && parent.codigoTipoDocumento == el.parent) {
                el.images = tmpLoadedImages
                el.ok = tmpLoadedImages.length >= numRequired
            }
            return el;
        });
        setChildren([...tmpBrothers])
        setCountChildLoadedImages(tmpLoadedImages.length);
    }, [childImages]);

    const displayDocDescription = (selectedValue) => {
        let selectedDoc = parent.children.find(childDoc => childDoc.CodigoDocumento === selectedValue);
        selectedDoc
            ? setDocDescripcion(selectedDoc.DescripcionDocumento)
            : setDocDescripcion(undefined);
    }

    const updateCombo = () => {
        let resultCombo = _.differenceBy(parent.childrenTypes, brothers, 'value');
        resultCombo.push({ label: selectedValue, value: selectedValue })
        setDocTypeCombo(resultCombo);
    }

    useEffect(updateCombo, [brothers]);

    useEffect(() => {
        updateCombo();
        let tmpBrothers = brothers.map(el => {
            if (el.id == id) {
                el.value = selectedValue;
                el.label = selectedValue;
                el.CodigoDocumento = selectedValue;
            }
            return el;
        });
        setChildren([...tmpBrothers])
        displayDocDescription(selectedValue);
        setSelectedValue(selectedValue);
    }, [selectedValue]);

    const lauchImagePicker = item => {
        ImagePicker.openPicker({
            multiple: true,
            mediaType: 'photo',
            compressImageQuality: 0.8,
        }).then(selectedImages => {
            if (selectedImages.length <= numMaxImg) {
                let newArray = [];
                for (let i = 0; i < childImages.length; i++) {
                    let newImage = childImages[i];
                    const currentImg = selectedImages[i];
                    if (!currentImg) {
                        newArray.push(childImages[i]);
                        continue;
                    }
                    newImage.loaded = true;
                    newImage.uri = currentImg.path;
                    newImage.type = currentImg.mime;
                    const ext = /[.]/.exec(currentImg.path)
                        ? /[^.]+$/.exec(currentImg.path)
                        : undefined;
                    newImage.fileName = childImages[i].name + '.' + ext;
                    newImage.parent = parent.TipoDocumento;
                    newArray.push(newImage);
                }
                setChildImages(newArray);
            } else {
                global.props.displayAlert(
                    'Alerta',
                    'Favor seleccione máximo ' +
                    numMaxImg +
                    (numMaxImg > 1 ? ' imágenes' : ' imagen'),
                );
            }
        });
    };


    const _renderItem = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => lauchImagePicker(item)}>
                <View style={[styles.imageContainer]}>
                    <View style={{ top: 0, maxHeight: 200 }}>
                        {item.loaded ? (
                            <Image
                                style={styles.imgStyle}
                                source={item.loaded ? { uri: item.uri } : item.preview}
                                resizeMode={'contain'}
                            />
                        ) : (
                                <Icon
                                    type="FontAwesome5"
                                    name="camera"
                                    style={styles.styledIcon}
                                />
                            )}
                    </View>
                </View>
                <View>
                    <Text />
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={{ ...styles.fullItem }}>
            <View style={{ ...styles.row }}>
                <Text style={{ ...styles.listLabel, width: 65 }}>
                    {localization['psp.lblDocumento']}
                </Text>
                <Picker
                    selectedValue={selectedValue}
                    style={{
                        ...styles.normalTextColor,
                        //width: Dimensions.get('window').width - 65 - 40,
                        flex: 1,
                        paddingTop: 10,
                        height: 34,
                    }}
                    onValueChange={(itemValue, itemIndex) => {
                        setSelectedValue(
                            itemValue ? itemValue : parent.childrenTypes[0].value,
                        );
                    }}>
                    <Picker.Item label={'Seleccione'} value={undefined} />
                    {docTypeCombo && docTypeCombo.length > 0 && docTypeCombo.map((el, index) => (
                        <Picker.Item key={index}
                            label={el.label}
                            value={el.value}
                        />
                    ))}
                </Picker>
                {!child.isMandatory &&
                    <TouchableOpacity
                        style={{ ...styles.roundRemoveBtnStyle }}
                        onPress={() => { removeChild(child) }}
                    >
                        <Text style={styles.roundBtnText}>-</Text>
                    </TouchableOpacity>
                }
            </View>
            {selectedValue && (
                <>
                    <View style={styles.row}>
                        <Text
                            style={{ ...styles.indicatorText, color: newColor, fontSize: 13 }}>
                            {countLabel}
                        </Text>
                        {countChildLoadedImages >= numRequired && (
                            <Icon
                                type="FontAwesome5"
                                name="trash"
                                style={{ color: 'black', marginLeft: 20, fontSize: 20 }}
                                onPress={() => {
                                    const imagesWithIcons = [...Array(numMaxImg).keys()].map(
                                        (e, i) => {
                                            return {
                                                //name: selectedValue + (numMaxImg > 1 ? '_' + (i + 1) : ''),
                                                //desc: docDescripcion,
                                                loaded: false,
                                                preview: require('!/icons/report-icon.png'),
                                            };
                                        },
                                    );
                                    setChildImages(imagesWithIcons);
                                }}
                            />
                        )}
                    </View>
                    <Carousel
                        ref={carouselRef}
                        data={childImages}
                        renderItem={_renderItem}
                        //sliderWidth={Dimensions.get('window').width} //20 por el padding del form
                        sliderWidth={Dimensions.get('window').width} //20 por el padding del form
                        itemWidth={Dimensions.get('window').width / 2}
                    />
                </>
            )}
            <Text style={{ ...styles.normalTextColor, fontSize: 13 }}>{docDescripcion}</Text>
            <Divider style={styles.styledDevider} />
        </View>
    )
}

export default Child;