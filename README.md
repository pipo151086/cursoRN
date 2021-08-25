## Suite App

### Comandos para Depurar App

#### En el caso de modificar odc-mobile-common
```bash

cd .. && cd odc-mobile-common && npm unpublish odc-mobile-common -f && npm publish && cd.. && cd odc-psp && yarn add odc-mobile-common && react-native run-android
```

#### Modificación solo App
```bash
react-native run-android
```

### Comandos para generar APK

#### Generar APK release

```bash
react-native run-android --variant=release
```

#### Generar APK debug

```bash
npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res
cd android
gradlew assembleDebug

```

#### **Nota: Ruta APK generado \android\app\build\outputs\apk\release\app-release.apk

#### Generar APK para subir a la tienda
```bash
cd android
./gradlew bundleRelease
```

#### Documentación Oficial
[Publishing to Google Play Store](https://facebook.github.io/react-native/docs/signed-apk-android)
