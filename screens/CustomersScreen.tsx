import { useQuery } from "@apollo/client";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import {
  CompositeNavigationProp,
  useNavigation,
} from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Input } from "@rneui/themed";
import React, { useLayoutEffect, useState } from "react";
import { Image, ScrollView, StyleSheet } from "react-native";
import CustomerCard from "../components/CustomerCard";
import { GET_CUSTOMERS } from "../graphql/queries";
import { RootStackParamList } from "../navigator/RootNavigator";
import { TabStackParamsList } from "../navigator/TabNavigator";

export type CostumersScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabStackParamsList, "Customers">,
  NativeStackNavigationProp<RootStackParamList>
>;
const CustomersScreen = () => {
  const navigation = useNavigation<CostumersScreenNavigationProp>();
  const [input, setInput] = useState<string>("");
  const { loading, error, data } = useQuery(GET_CUSTOMERS);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  return (
    <ScrollView className="bg-[#59c1cc]">
      <Image
        source={{ uri: "https://links.papareact.com/3jc" }}
        className="w-full h-64"
      />
      <Input
        containerStyle={styles.input}
        className="bg-white pt-5 pb-0 px-10"
        placeholder="Search customer"
        onChangeText={setInput}
        value={input}
      />
      {data?.getCustomers
        ?.filter((customer: CustomerList) =>
          customer.value.name.includes(input)
        )
        .map(({ name: ID, value: { email, name } }: CustomerResponse) => (
          <CustomerCard key={ID} email={email} name={name} userId={ID} />
        ))}
    </ScrollView>
  );
};

export default CustomersScreen;

const styles = StyleSheet.create({
  input: {
    backgroundColor: "white",
    paddingTop: 20,
    paddingBottom: 0,
    paddingHorizontal: 40,
  },
});
