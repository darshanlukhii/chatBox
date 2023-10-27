import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from 'react-native';

import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';

import {images} from '../../assets';
import {colors} from '../../utils/colors';
import {strings} from '../../utils/string';
import Header from '../../components/Header';
import Felids from '../../components/Felids';
import {fontSize, hp, wp} from '../../utils/constant';
import LineConstant from '../../components/LineConstant';
import LinearButton from '../../components/LinearButton';

const Login = () => {
  const {navigate} = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      if (email.length > 0 && password.length > 0) {
        await auth()
          .signInWithEmailAndPassword(email, password)
          .then(() => navigate('Home'));
      } else Alert.alert('Enter the All Data');
    } catch (err) {
      console.log(err.message);
      setMessage(err.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header source={images.back} />
      <View style={styles.headerStyle}>
        <Text style={styles.loinTextStyle}>{strings.log_in_chatBox}</Text>
        <Text style={styles.welcomeMessage}>{strings.welcomeLine}</Text>
      </View>
      <View style={styles.loginIconView}>
        <Image style={styles.loginIconStyle} source={images.facebook} />
        <Image style={styles.loginIconStyle} source={images.gPay} />
        <Image style={styles.loginIconStyle} source={images.apple} />
      </View>
      <LineConstant label={strings.or} />
      <Felids
        label={strings.your_email}
        onChangeText={text => {
          setEmail(text);
        }}
        autoCapitalize={false}
      />
      <Felids
        label={strings.password}
        onChangeText={text => {
          setPassword(text);
        }}
        secureTextEntry
        autoCapitalize={false}
      />
      <View style={styles.downStyle}>
        <LinearButton label={strings.log_in} onPress={handleLogin} />
        <TouchableOpacity
          style={styles.forgotView}
          onPress={() => {
            navigate('SignUp');
          }}>
          <Text style={styles.forgotStyle}>{strings.forgot_password}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerStyle: {marginTop: hp(50)},
  downStyle: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  forgotView: {
    alignSelf: 'center',
    marginTop: hp(16),
    marginBottom: hp(10),
  },
  forgotStyle: {
    color: colors.textColor,
    fontFamily: 'Poppins-Regular',
    fontSize: fontSize(11),
  },
  loginIconView: {
    width: wp(184),
    height: hp(48),
    alignSelf: 'center',
    marginTop: hp(36),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  loginIconStyle: {
    height: hp(36),
    width: wp(46),
  },
  welcomeMessage: {
    fontFamily: 'Poppins-Regular',
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: fontSize(12),
    color: '#797C7B',
    marginTop: hp(19),
  },
  loinTextStyle: {
    fontFamily: 'Poppins-Bold',
    alignSelf: 'center',
    fontSize: fontSize(17),
    color: colors.textColor,
  },
  container: {
    flex: 1,
    backgroundColor: colors.backGroundColor,
  },
});

export default Login;