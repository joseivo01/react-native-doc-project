import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';

import ImageViewer from './components/ImageViewer';
import Button from './components/Button';
import IconButton from './components/IconButton';
import CircleButton from './components/CircleButton';


const PlaceholderImage = require('./assets/images/background-image.png')
// Parte que eu parei.
// https://docs.expo.dev/tutorial/create-a-modal/#create-an-emoji-picker-modal
export default function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [showAppOptions, setShowAppOptions] = useState(false);

  const onRest = () => {
    setShowAppOptions(false);
  };
  const onAddSticker = () => {
    // wew will implement this later
  };
  const onSaveImageAsync = async() => {
    // we will implement this later
  };

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      setShowAppOptions(true);
    } else {
      alert('You did not select any image.');
    }
  };
  
  return (
    <View style={styles.container}>
      <View style={ styles.imageContainer}>
      <Text style ={{color: '#fff', alignSelf: 'center', marginBottom: 15}}>
        Image below show a trail on beach
      </Text>
        {/* no placeholderImageSource abaixo voçe precisa exibir uma imagem padrao */}
        <ImageViewer 
        placeholderImageSource={PlaceholderImage}
        selectedImage={selectedImage}
        />
      <StatusBar style="auto"/>
      </View>
      {/* Se estiver selcionado uma imagem o primeiro botao vai sumir */}
      {showAppOptions ?(
        <View style={styles.optionsContainer} >
          <View style={styles.optionsRow}>
            <IconButton icon='refresh' label='Reset' onPress={onRest} />
            <CircleButton onPress={onAddSticker} />
            <IconButton icon='save-alt' label='Save' onPress={onSaveImageAsync}/>
          </View>
        </View>
      ):( 
      <View styles={styles.footerContainer}>
        <Button theme="primary" label='Choose a photo' onPress={pickImageAsync}/>
        <Button label='Use this photo' onPress={() => setShowAppOptions(true)}/>
      </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
  },
  imageContainer:{
    flex: 1,
    paddingTop: 58
  },
  footerContainer:{
    flex: 1/3,
    alignItems: 'center',
  },
  optionsContainer:{
    position: 'absolute',
    bottom: 80,
  }
  ,
  optionsRow: {
    alignItems: 'center',
    flexDirection: 'row'
  },
});
