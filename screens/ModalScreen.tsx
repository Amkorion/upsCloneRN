import { View, Text, TouchableOpacity, FlatList } from "react-native";
import React from "react";
import { Icon } from "@rneui/themed";
import {
  CompositeNavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigator/RootNavigator";
import { TabStackParamsList } from "../navigator/TabNavigator";
import useCustomerOrders from "../hooks/useCustomerOrders";
import DeliveryCard from "../components/DeliveryCard";

type ModalScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabStackParamsList>,
  NativeStackNavigationProp<RootStackParamList, "MyModal">
>;

type ModalScreenRootProp = RouteProp<RootStackParamList, "MyModal">;

const ModalScreen = () => {
  const navigation = useNavigation<ModalScreenNavigationProp>();
  const {
    params: { name, userId },
  } = useRoute<ModalScreenRootProp>();
  const { loading, error, orders } = useCustomerOrders(userId);
  return (
    <View>
      <TouchableOpacity
        onPress={navigation.goBack}
        className="absolute top-5 right-5 z-10"
      >
        <Icon name="closecircle" type="antdesign" />
      </TouchableOpacity>
      <View className="mt-2">
        <View className="py-5 border-b border-[#59c1cc]">
          <Text className="text-center text-xl font-bold text-[#59c1cc]">
            {name}
          </Text>
          <Text className="text-center italic text-sm">Deliveries</Text>
        </View>
      </View>
      <FlatList
        contentContainerStyle={{ paddingBottom: 200 }}
        data={orders}
        keyExtractor={(order) => order.trackingId}
        renderItem={({ item: order }) => <DeliveryCard order={order} />}
      />
    </View>
  );
};

export default ModalScreen;
