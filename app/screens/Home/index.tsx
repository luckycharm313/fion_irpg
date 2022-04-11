import React, {useState, useEffect} from 'react';
import { SafeAreaView, View, PermissionsAndroid, Platform, Alert} from 'react-native';
import { ActivityIndicator, Colors } from 'react-native-paper';
import Pdf from 'react-native-pdf';
import RNFetchBlob from 'react-native-blob-util';
import { useStore } from 'app/store';
import { PDF_URL, getFileExtention } from 'app/lib';

import styles from './styles';

const Home: React.FC = () => {
  const localURL = useStore(state => state.localURL);
  const setLocalURL = useStore(state => state.setLocalURL);
  
  const [isLoading, setIsLoading] = useState(false);
  const [source, setSource] = useState('');

  useEffect(() => {
    if(localURL.length === 0) {
      checkPermission();
    } else {
      setSource(localURL);
    }
  }, []);

  const checkPermission = async () => {
    
    // Function to check the platform
    // If Platform is Android then check for permissions.

    if (Platform.OS === 'ios') {
      downloadFile();
    } else {
      try {
        
        const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          // Start downloading
          downloadFile();
          console.log('Storage Permission Granted.');
        } else {
          // If permission denied then show alert
          Alert.alert('Error','Storage Permission Not Granted');
        }
      } catch (err) {
        // To handle permission related exception
        console.log("++++"+err);
      }
    }
  };

  const downloadFile = () => {
    setIsLoading(true);
    // Get today's date to add the time suffix in filename
    let date = new Date();
    // Function to get extention of the file url
    let file_ext = getFileExtention(PDF_URL);
   
    let file_ext_str = '';
    if(file_ext) file_ext_str = '.' + file_ext[0];
   
    // config: To get response by passing the downloading related options
    // fs: Root directory path to download
    const { config, fs } = RNFetchBlob;
    let RootDir = fs.dirs.PictureDir;
    let options = {
      fileCache: true,
      addAndroidDownloads: {
        path:
          RootDir+
          '/file_' + 
          Math.floor(date.getTime() + date.getSeconds() / 2) +
          file_ext_str,
        description: 'downloading file...',
        notification: true,
        // useDownloadManager works with Android only
        useDownloadManager: true,   
      },
    };
    config(options)
      .fetch('GET', PDF_URL)
      .then(res => {
        // Alert after successful downloading
        console.log('res -> ', res.path());
        setSource(res.path());
        setLocalURL(res.path());
        setIsLoading(false);
      }).catch(error => {
        setIsLoading(false);
        console.log("++++"+error);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      {
        isLoading ?
        <View style={styles.indicator}>
          <ActivityIndicator animating={true} color={Colors.red800} />
        </View>
        :
        <Pdf
          source={{uri: source}}
          onLoadComplete={(numberOfPages,filePath) => {
              console.log(`Number of pages: ${numberOfPages}`);
          }}
          onError={(error) => {
              console.log(error);
          }}
          style={styles.pdf}/>
      }
      
    </SafeAreaView>
  );
};

export default Home;
