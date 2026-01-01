import { KeyboardTypeOptions, TextInput } from "react-native";
import { StyledText } from "./StyledText";

type Props = {
  className?: string;
  placeholder?: string;
  value: string;
  keyboardType?: KeyboardTypeOptions;
  onChangeText: (text: string) => void;
  multiline?: boolean;
  error?: string;
  autoComplete?:
    | "additional-name"
    | "address-line1"
    | "address-line2"
    | "birthdate-day"
    | "birthdate-full"
    | "birthdate-month"
    | "birthdate-year"
    | "cc-csc"
    | "cc-exp"
    | "cc-exp-day"
    | "cc-exp-month"
    | "cc-exp-year"
    | "cc-number"
    | "cc-name"
    | "cc-given-name"
    | "cc-middle-name"
    | "cc-family-name"
    | "cc-type"
    | "country"
    | "current-password"
    | "email"
    | "family-name"
    | "gender"
    | "given-name"
    | "honorific-prefix"
    | "honorific-suffix"
    | "name"
    | "name-family"
    | "name-given"
    | "name-middle"
    | "name-middle-initial"
    | "name-prefix"
    | "name-suffix"
    | "new-password"
    | "nickname"
    | "one-time-code"
    | "organization"
    | "organization-title"
    | "password"
    | "password-new"
    | "postal-address"
    | "postal-address-country"
    | "postal-address-extended"
    | "postal-address-extended-postal-code"
    | "postal-address-locality"
    | "postal-address-region"
    | "postal-code"
    | "street-address"
    | "sms-otp"
    | "tel"
    | "tel-country-code"
    | "tel-national"
    | "tel-device"
    | "url"
    | "username"
    | "username-new"
    | "off"
    | undefined;
};

export const InputField = ({
  value,
  placeholder,
  keyboardType,
  autoComplete,
  onChangeText,
  className,
  error,
  multiline = false,
}: Props) => {
  return (
    <>
      <TextInput
        className={`input-field ${className}`}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        autoCapitalize="sentences"
        autoComplete={autoComplete}
        multiline={multiline}
        numberOfLines={multiline ? 5 : undefined}
        style={multiline ? { height: 150 } : undefined}
      ></TextInput>

      {error && <StyledText className="text-red-500">{error}</StyledText>}
    </>
  );
};
