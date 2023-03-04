import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Card, Icon } from "@rneui/themed";
import {
  CompositeNavigationProp,
  useNavigation,
} from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigator/RootNavigator";
import { TabStackParamsList } from "../navigator/TabNavigator";

type Props = {
  item: Order;
};
export type OrdersScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabStackParamsList, "Orders">,
  NativeStackNavigationProp<RootStackParamList>
>;

const OrderCard = ({ item }: Props) => {
  const navigation = useNavigation<OrdersScreenNavigationProp>();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("Order", { order: item })}
    >
      <Card
        containerStyle={{
          paddingHorizontal: 20,
          borderRadius: 8,
        }}
      >
        <View className="flex-row justify-between items-center">
          <View>
            <Icon
              name="truck-delivery"
              type="material-community"
              color="#eb6a7c"
            />
            <Text style={{ fontSize: 8 }}>
              {new Date(item.createdAt).toDateString()}
            </Text>
          </View>
          <View className="">
            <Text className="text-gray-400" style={{ fontSize: 10 }}>
              {item.carrier}-{item.trackingId}
            </Text>
            <Text className="text-gray-500 text-xl">
              {item.trackingItems.customer.name}
            </Text>
          </View>
          <View className="flex-row items-center">
            <Text className="text-[#eb6a7c] text-sm">
              {item.trackingItems.items.length} x
            </Text>
            <Icon name="box" type="feather" style={{ marginLeft: 8 }} />
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );
};

export default OrderCard;
