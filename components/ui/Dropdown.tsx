import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

type Props = {
  data: { label: string; value: string }[];
  onSelect: (value: string) => void;
};

export const DropdownComponent = ({ data, onSelect }: Props) => {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const renderItem = (item: { label: string; value: string }) => {
    return (
      <View style={styles.item}>
        <Text style={styles.selectedTextStyle}>{item.label}</Text>
      </View>
    );
  };

  return (
    <View>
      <Dropdown
        containerStyle={styles.container}
        style={[styles.dropdown]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        itemContainerStyle={styles.itemContainer}
        fontFamily="Nunito"
        data={data}
        maxHeight={300}
        labelField="label"
        valueField="value"
        renderItem={renderItem}
        placeholder={!isFocus ? 'Select topic' : '...'}
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          setValue(item.value);
          onSelect(item.value);
          setIsFocus(false);
        }}
        activeColor="#E5E5E5"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F2F2F2',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#0f172a',
  },
  dropdown: {
    height: 60,
    borderColor: '#0f172a',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#F2F2F2',
    paddingHorizontal: 16,
  },
  label: {
    display: 'none',
  },
  placeholderStyle: {
    fontSize: 16,
    fontFamily: 'Nunito',
    color: '#0f172a',
    fontWeight: 'semibold',
  },
  selectedTextStyle: {
    fontSize: 16,
    fontFamily: 'Nunito',
    color: '#0f172a',
    fontWeight: 'semibold',
  },
  itemContainer: {
    borderRadius: 12,
  },
  item: {
    padding: 16,
  },
});
