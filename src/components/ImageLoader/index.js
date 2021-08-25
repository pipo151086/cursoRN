import React, {useState, useEffect, useRef} from 'react';
import {View, TouchableOpacity, Image, Dimensions} from 'react-native';
import {Button} from 'react-native-elements';
import Carousel from 'react-native-snap-carousel';
import ImagePicker from 'react-native-image-crop-picker';
import {Text} from 'native-base';
import localization from '../../localization/';
import styles from './styles';
import {Icon} from 'native-base';

const ImageLoader = ({
  code,
  name,
  desc,
  required,
  numRequired,
  numMaxImg,
  loadImages,
  data,
}) => {
  const [images, setImages] = useState([]);

  const [countLoadedImages, setCountLoadedImages] = useState(0);

  useEffect(() => {
    const tmpLoadedImages = images.filter(f => f.loaded);

    if (tmpLoadedImages.length > 0) {
      setCountLoadedImages(tmpLoadedImages.length);
    } else {
      setCountLoadedImages(0);
    }
  }, [images]);

  useEffect(() => {
    if (countLoadedImages >= numRequired) {
      const paramImg = {
        code: code,
        images: images,
      };
      loadImages(paramImg);
    }
  }, [countLoadedImages]);

  useEffect(() => {
    if (data) {
      setImages(data);
    } else {
      const imagesWithIcons = [...Array(numMaxImg).keys()].map((e, i) => {
        return {
          name: code + (numMaxImg > 1 ? '_' + (i + 1) : ''),
          desc: desc,
          preview: require('!/icons/report-icon.png'),
        };
      });

      setImages(imagesWithIcons);
    }
  }, [code, desc, numMaxImg, data]);

  const _renderItem = ({item}) => {
    return (
      <TouchableOpacity onPress={() => lauchImagePicker(item)}>
        <View style={[styles.imageContainer]}>
          <View style={{top: 0, maxHeight: 200}}>
            {item.loaded ? (
              <Image
                style={styles.imgStyle}
                source={item.loaded ? {uri: item.uri} : item.preview}
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

  const lauchImagePicker = item => {
    ImagePicker.openPicker({
      multiple: true,
      mediaType: 'photo',
      compressImageQuality: 0.8,
    }).then(selectedImages => {
      if (selectedImages.length <= numMaxImg) {
        let newArray = [];

        for (let i = 0; i < images.length; i++) {
          let newImage = images[i];

          const currentImg = selectedImages[i];

          if (!currentImg) {
            newArray.push(images[i]);
            continue;
          }

          newImage.loaded = true;

          newImage.uri = currentImg.path;
          newImage.type = currentImg.mime;

          const ext = /[.]/.exec(currentImg.path)
            ? /[^.]+$/.exec(currentImg.path)
            : undefined;

          newImage.fileName = images[i].name + '.' + ext;
          newArray.push(newImage);
        }
        setImages(newArray);
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

  const carouselRef = useRef(null);

  useEffect(() => {
    carouselRef.current.snapToItem(0);
  }, []);

  const countLabel0 = 'Obligatorio ' + numRequired;

  const countLabel = +countLoadedImages + '/' + numMaxImg;

  const newColor =
    countLoadedImages >= numRequired
      ? styles.completedIndicatorColor
      : styles.uncompletedIndicatorColor;

  return (
    <View style={{backgroundColor: 'transparent'}}>
      {countLoadedImages < numRequired && (
        <View style={styles.row}>
          <Text style={{...styles.indicatorTextTwo, color: 'red'}}>
            {countLabel0}
          </Text>
        </View>
      )}
      <View style={styles.row}>
        <Text style={{...styles.indicatorText, color: newColor}}>
          {countLabel}
        </Text>
        {countLoadedImages >= numRequired && (
          <Icon
            type="FontAwesome5"
            name="trash"
            style={{color: 'black', marginLeft: 20, fontSize: 20}}
            onPress={() => {
              const imagesWithIcons = [...Array(numMaxImg).keys()].map(
                (e, i) => {
                  return {
                    name: code + (numMaxImg > 1 ? '_' + (i + 1) : ''),
                    desc: desc,
                    preview: require('!/icons/report-icon.png'),
                  };
                },
              );

              setImages(imagesWithIcons);
            }}
          />
        )}
      </View>
      <Carousel
        ref={carouselRef}
        data={images}
        renderItem={_renderItem}
        sliderWidth={Dimensions.get('window').width - 20} //20 por el padding del form
        itemWidth={Dimensions.get('window').width / 2}
        layout={'default'}
      />
    </View>
  );
};
export default ImageLoader;
