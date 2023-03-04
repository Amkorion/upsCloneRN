import { useNavigation } from "@react-navigation/native";
import { Card, Icon } from "@rneui/themed";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import useCustomerOrders from "../hooks/useCustomerOrders";
import { CostumersScreenNavigationProp } from "../screens/CustomersScreen";

type Props = {
  userId: string;
  name: string;
  email: string;
};

const CustomerCard = ({ userId, name, email }: Props) => {
  const { loading, error, orders } = useCustomerOrders(userId);
  const navigation = useNavigation<CostumersScreenNavigationProp>();
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("MyModal", { name: name, userId: userId })
      }
    >
      <Card
        containerStyle={{
          padding: 20,
          borderRadius: 8,
        }}
      >
        <View>
          <View className="flex-row justify-between">
            <View>
              <Text className="font-bold text-2xl">{name}</Text>
              <Text className="text-sm text-[#59c1cc]">ID: {userId}</Text>
            </View>

            <View className="flex-row items-center justify-end">
              <Text className="text-[#59c1cc]">
                {loading ? "Loading..." : `${orders.length} x`}
              </Text>
              <Icon
                style={{ marginLeft: "auto", marginBottom: 20 }}
                name="box"
                type="entypo"
                size={50}
                color="#59c1cc"
              />
            </View>
          </View>
        </View>
        <Card.Divider />
        <Text>{email}</Text>
      </Card>
    </TouchableOpacity>
  );
};

export default CustomerCard;
