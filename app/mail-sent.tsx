import ChevronLeftIcon from '@/components/icons/ChevronLeft';
import { ActionButton, Page, StyledText } from '@/components/ui';
import { ErrorCode } from '@/domain/enums/error.enum';
import { ApiErrorResponse } from '@/domain/types/error';
import { AxiosError } from 'axios';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Platform, PlatformIOSStatic, Pressable, View } from 'react-native';
import { OtpInput } from 'react-native-otp-entry';
import { useSession } from '@/context/authContext';

export default function MailSent() {
  const [isLoading, setIsLoading] = useState(false);
  const [otp, setOtp] = useState('');
  const [otpIsInvalid, setOtpIsInvalid] = useState(false);
  const { email } = useLocalSearchParams<{ email: string }>();
  const { login } = useSession();
  const router = useRouter();

  const isTablet = () => {
    if (Platform.OS === 'ios') {
      const platformIOS = Platform as PlatformIOSStatic;
      return platformIOS.isPad;
    }

    return false;
  };

  const handleLogin = (otp: string) => {
    setIsLoading(true);

    login({ email, otp })
      .then(() => {
        router.dismissAll();
        router.replace('/(tabs)');
      })
      .catch((err: AxiosError) => {
        const errorResponse = err.response?.data as ApiErrorResponse;

        if (errorResponse.code === ErrorCode.OtpInvalid) {
          setOtpIsInvalid(true);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Page safeAreaTop>
      <Pressable onPress={() => router.back()}>
        <View className="w-11 h-11 bg-white rounded-xl mb-4 flex items-center justify-center">
          <ChevronLeftIcon width={15} color="#000000" />
        </View>
      </Pressable>

      <View className="grow">
        <StyledText className="text-4xl font-bold mb-4" weight="black">
          Email sent
        </StyledText>
        <StyledText className="text-lg mb-8 text-slate-500">
          We have sent you an email with a login link. Please check your inbox.
        </StyledText>

        <OtpInput
          numberOfDigits={6}
          focusColor="green"
          autoFocus
          hideStick={true}
          blurOnFilled
          type="numeric"
          focusStickBlinkingDuration={500}
          onFilled={text => handleLogin(text)}
          onTextChange={text => {
            setOtp(text);
            setOtpIsInvalid(false);
          }}
          textInputProps={{
            accessibilityLabel: 'One-Time Password',
            autoComplete: 'one-time-code',
          }}
          textProps={{
            accessibilityRole: 'text',
            accessibilityLabel: 'OTP digit',
            allowFontScaling: false,
          }}
          theme={{
            pinCodeContainerStyle: {
              height: isTablet() ? 100 : 44,
              width: isTablet() ? 100 : 44,
              borderWidth: 2,
              borderRadius: 12,
              backgroundColor: 'white',
            },
            pinCodeTextStyle: {
              fontFamily: 'Nunito',
              fontSize: 20,
              fontWeight: 'bold',
              color: 'black',
            },
            focusStickStyle: {
              width: 20,
              height: 20,
              backgroundColor: '#32675e',
            },
            focusedPinCodeContainerStyle: { borderColor: '#32675e' },
            placeholderTextStyle: { fontSize: 20, color: 'gray' },
            filledPinCodeContainerStyle: {
              borderColor: otpIsInvalid ? 'red' : '#32675e',
            },
            disabledPinCodeContainerStyle: { borderColor: 'gray' },
          }}
        />

        <View className="mt-auto">
          <ActionButton
            isLoading={isLoading}
            disabled={isLoading}
            onPress={() => handleLogin(otp)}
            text="Login"
            size="large"
          />
          <StyledText className="text-center text-xs text-gray-600 mt-2">
            The email has been sent to your {email}
          </StyledText>
        </View>
      </View>
    </Page>
  );
}
