import { StyleSheet, Text, View, Platform, TextInput, Image, Pressable, Alert, ScrollView, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { LoginStackParamList } from '../../navigation/LoginStack';
import Background from '../../components/background/Background';
import { BG_LOGIN, ICON_CALENDAR, ICON_EYE, ICON_EYE_CLOSE, LOGO } from '../../../assets';
import DateTimePicker from '@react-native-community/datetimepicker';
import Header from '../../components/header/Header';
import { COLORS, FONT_FAMILY } from '../../themes/theme';
import LinearGradient from 'react-native-linear-gradient';


type PropsType = NativeStackScreenProps<LoginStackParamList, 'RegisterScreen'>;

const RegisterScreen: React.FC<PropsType> = (props) => {
  const { navigation } = props;
  const [date, setDate] = useState(new Date()); // date là giá trị ngày tháng năm mà người dùng chọn
  const [show, setShow] = useState(false); // show là giá trị boolean để hiện modal calendar
  const [text, setText] = useState(''); // text là giá trị ngày tháng năm mà người dùng chọn
  const [valuePassword, setValuePassword] = useState(""); // valuePassword là giá trị mật khẩu mà người dùng nhập
  const [isActiceEye, setIsActiceEye] = useState(false); // isActiceEye là giá trị boolean để hiện icon mở mắt hoặc đóng mắt
  const [valuePhone, setValuePhone] = useState(""); // value là giá trị số điện thoại mà người dùng nhập

  const handleIconPress = () => {
    setIsActiceEye(!isActiceEye);
  }
  const handleInputChangePassword = (textPass: string) => {
    setValuePassword(textPass);
  }
  const handleInputChangePhoneNumber = (textPhone: string) => {
    setValuePhone(textPhone);
  }
  const onChange = (event: any, selectedDate: Date | undefined) => {
    const currentMode = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentMode);

    let tempDate = new Date(currentMode);
    let fDay = tempDate.getDate() + "/" + (tempDate.getMonth() + 1) + "/" + tempDate.getFullYear();
    setText(fDay);
    console.log(fDay);
  };

  const showMode = (currentMode: any) => {
    setShow(true);
  };


  const goScreenOTP = async (
    phoneNumber: string
  ) => {
    navigation.navigate("OTPScreen", { phoneNumber: valuePhone, type: false });
  };

  return (
    <Background source={BG_LOGIN}>
      <ScrollView style={styles.container}>
        <Header
          iconLeft={LOGO}
          styleIconLeft={{ width: 80, height: 80, marginTop: 60 }}
        />
        <View style={styles.containerChidren}>
          <Text style={styles.title}>Đăng Ký</Text>
          <Text style={styles.titleMini}>Họ và  tên</Text>
          <TextInput
            style={styles.input}
            placeholder="Nhập họ và tên"
          />
          <View style={styles.viewCenter}>
            <View style={styles.viewLeft}>
              <Text style={styles.titleMini}>Số điện thoại</Text>
              <TextInput
                value={valuePhone}
                onChangeText={(valuePhone) => handleInputChangePhoneNumber(valuePhone)}
                style={styles.input}
                placeholder="Số điện thoại"
                keyboardType="numeric"
              />
            </View>
            <View style={styles.viewRight}>
              <Text style={styles.titleMini}>Email</Text>
              <TextInput
                style={styles.input}
                placeholder="abc123@gmail.com"
                keyboardType='email-address'
              />
            </View>
          </View>
          <Text style={styles.titleMini}>Ngày, tháng, năm sinh</Text>
          <View style={styles.viewOld}>
            <TextInput
              value={text}
              style={styles.input}
              placeholder="DD/MM/YYYY"
            />
            <Pressable onPress={() => showMode('date')}>
              <Image source={ICON_CALENDAR} style={styles.iconCalendar} />
            </Pressable>
            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={"date"}
                display="calendar"
                onChange={onChange}
              />
            )}
          </View>
          <Text style={styles.titleMini}>Mật khẩu</Text>
          <View style={styles.viewOld}>
            <TextInput
              style={styles.input}
              placeholder="Nhập mật khẩu"
              onChangeText={(valuePassword) => handleInputChangePassword(valuePassword)}
              value={valuePassword}
              secureTextEntry={!isActiceEye} // khi isActiceEye = true thì hiện mật khẩu, false thì ẩn mật khẩu
            />
            <Pressable onPress={handleIconPress}>
              <Image source={isActiceEye ? ICON_EYE : ICON_EYE_CLOSE} style={styles.iconEye} />
              {/* khi isActiceEye = true thì hiện icon mở mắt, false thì hiện icon đóng mắt */}
            </Pressable>
          </View>
          <LinearGradient
            colors={['#E14058', '#4461F2']}
            start={{ x: 1, y: 0 }}
            end={{ x: 0, y: 0 }}
            style={styles.btnLinear}
          >
            <Pressable
              onPress={() => goScreenOTP(valuePhone)}>
              <Text style={styles.titlebtn}>Đăng Ký</Text>
            </Pressable>
          </LinearGradient>
          <View style={styles.viewBottom}>
            <Text style={styles.titleBottom}>Bạn đã có tài khoản? </Text>
            <Pressable onPress={() => navigation.navigate('LoginScreen')}>
              <Text style={styles.titleLogin}>Đăng nhập</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </Background>
  );
};

export default RegisterScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerChidren: {
    flex: 1,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontFamily: "Exo2-Bold",
    color: 'black',
    textAlign: 'center',
    marginTop: 40,
    marginBottom: 60,
  },
  titleMini: {
    fontSize: 16,
    fontFamily: "Exo2-SemiBold",
    color: COLORS.Black,
    marginBottom: 8,
  },
  input: {
    height: 50,
    width: '100%',
    backgroundColor: COLORS.White,
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 15,
    fontFamily: FONT_FAMILY.exo2_regular,
    color: "black",
    marginBottom: 20,
  },
  viewCenter: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  viewLeft: {
    width: '48%',
  },
  viewRight: {
    width: '48%',
  },
  button: {
    marginTop: 40,
    marginHorizontal: 20,
  },
  viewOld: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconCalendar: {
    width: 20,
    height: 20,
    position: 'absolute',
    right: 20,
    top: -20
  },
  iconEye: {
    width: 25,
    height: 25,
    position: 'absolute',
    right: 20,
    top: -22
  },
  btnLinear: {
    width: '90%',
    height: 55,
    paddingVertical: 14,
    borderRadius: 24,
    backgroundColor: '#4461F2',
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
    marginHorizontal: 20,
  },
  titlebtn: {
    fontSize: 18,
    letterSpacing: -0.2,
    lineHeight: 25.2,
    fontFamily: "Exo2-Bold",
    color: 'white',
    textAlign: "center",
  },
  viewBottom: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: Dimensions.get('window').height / 2.5,
    marginBottom: 20,
    alignItems: 'center',
    width: '100%',
  },
  titleBottom: {
    fontSize: 20,
    fontFamily: "Exo2-Regular",
    color: COLORS.Black,
    textAlign: "center",
  },
  titleLogin: {
    fontSize: 20,
    fontFamily: "Exo2-Bold",
    color: COLORS.MainBlue,
    textAlign: "center",
  },
})