import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import {
  CompositeNavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useLayoutEffect } from "react";
import { View } from "react-native";
import DeliveryCard from "../components/DeliveryCard";
import { RootStackParamList } from "../navigator/RootNavigator";
import { TabStackParamsList } from "../navigator/TabNavigator";

// type Props = {
//   order: Order;
// };
export type OrdersScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabStackParamsList, "Orders">,
  NativeStackNavigationProp<RootStackParamList>
>;
type OrderScreenRouteProp = RouteProp<RootStackParamList, "Order">;

const OrderScreen = () => {
  const navigation = useNavigation<OrdersScreenNavigationProp>();
  const {
    params: { order },
  } = useRoute<OrderScreenRouteProp>();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitle: "Deliveries",
      headerTitle: order.trackingItems.customer.name,
      headerTitleStyle: { color: "black" },
      headerTintColor: "#eb6a7c",
    });
  }, [order]);
  return (
    <View className="-mt-2">
      <DeliveryCard order={order} fullWidth={true} />
    </View>
  );
};

export default OrderScreen;
