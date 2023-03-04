import { Card, Divider, Icon } from "@rneui/themed";
import React from "react";
import { Text, View } from "react-native";
import { Marker } from "react-native-maps";
import MapView from "react-native-maps";

type Props = {
  order: Order;
  fullWidth?: boolean;
};

const DeliveryCard = ({ order, fullWidth }: Props) => {
  return (
    <Card
      containerStyle={{
        borderRadius: fullWidth ? 0 : 8,
        marginVertical: fullWidth ? 0 : 8,
        margin: fullWidth ? 0 : 10,
        padding: 0,
        paddingTop: 16,
        shadowColor: "black",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        backgroundColor: fullWidth ? "#eb6a7c" : "#59c1cc",
      }}
    >
      <View style={fullWidth && { height: "100%" }}>
        <Icon name="box" type="entypo" size={50} color="white" />
        <View className="items-start p-3 -mt-3">
          <View className="mx-auto">
            <Text className="text-white uppercase text-center font-bold">
              {order.carrier} - {order.trackingId}
            </Text>
            <Text className="text-lg text-center font-bold text-white">
              Expected Delivery:{" "}
              {new Date(order.createdAt).toLocaleDateString()}
            </Text>
            <Divider color="white" />
          </View>
          <View className="mx-auto pb-5">
            <Text className="text-base text-center font-bold text-white mt-5">
              Adress
            </Text>
            <Text className="text-sm text-center text-white">
              {order.Address}, {order.City}
            </Text>
            <Text className="text-sm italic text-white text-center">
              Shipping Cost: ${order.shippingCost}
            </Text>
          </View>
        </View>

        <Divider color="white" />

        <View className="p-5">
          {order.trackingItems.items.map((item) => (
            <View
              key={item.item_id}
              className="flex-row justify-between items-center"
            >
              <Text className="text-sm italic text-white">{item.name}</Text>
              <Text className="text-white text-xl">x {item.quantity}</Text>
            </View>
          ))}
        </View>
        <MapView
          initialRegion={{
            latitude: order.Lat,
            longitude: order.Lng,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
          // className="w-full h-52"
          style={[
            { width: "100%" },
            { flexGrow: 1 },
            !fullWidth && { height: 200 },
          ]}
        >
          {order.Lat && order.Lng && (
            <Marker
              coordinate={{
                latitude: order.Lat,
                longitude: order.Lng,
              }}
              title="Delivery Location"
              description={order.Address}
              identifier="destionation"
            />
          )}
        </MapView>
      </View>
    </Card>
  );
};

export default DeliveryCard;
