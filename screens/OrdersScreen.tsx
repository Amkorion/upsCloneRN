import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import {
  CompositeNavigationProp,
  useNavigation,
} from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Button, Image } from "@rneui/themed";
import React, { useLayoutEffect, useState } from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import OrderCard from "../components/OrderCard";
import useOrders from "../hooks/useOrders";
import { RootStackParamList } from "../navigator/RootNavigator";
import { TabStackParamsList } from "../navigator/TabNavigator";

export type OrdersScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabStackParamsList, "Orders">,
  NativeStackNavigationProp<RootStackParamList>
>;

const OrdersScreen = () => {
  const navigation = useNavigation<OrdersScreenNavigationProp>();
  const { loading, error, orders } = useOrders();
  const [ascending, setAscending] = useState<boolean>(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
      tabBarLabel: ({ focused, color }) => (
        <Text style={{ color: focused ? "#eb6a7c" : color, fontSize: 10 }}>
          Orders
        </Text>
      ),
    });
  }, []);
  return (
    <ScrollView className="bg-[#eb6a7c]">
      <Image
        source={{ uri: "https://links.papareact.com/m51" }}
        containerStyle={{ width: "100%", height: 256 }}
        PlaceholderContent={<ActivityIndicator />}
      />
      <View>
        <Button
          color="pink"
          titleStyle={{ color: "gray", fontWeight: "400" }}
          style={{ paddingVertical: 8, paddingHorizontal: 20 }}
          onPress={() => setAscending(!ascending)}
        >
          {ascending ? "Showing: Oldest first" : "Showing: Most Recent Firts"}
        </Button>
        {orders
          ?.sort((a, b) => {
            if (ascending) {
              return new Date(a.createdAt) > new Date(b.createdAt) ? 1 : -1;
            } else {
              return new Date(a.createdAt) < new Date(b.createdAt) ? 1 : -1;
            }
          })
          .map((order) => (
            <OrderCard key={order.trackingId} item={order} />
          ))}
      </View>
    </ScrollView>
  );
};

export default OrdersScreen;
