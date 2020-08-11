import React, { useState, useCallback, useEffect } from "react";
import { GiftedChat } from "react-native-gifted-chat";

export default function ChatScreen() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: "Hello developer",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "React Native",
          avatar: "https://placeimg.com/140/140/any",
        },
      },
    ]);
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
  }, []);

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: 1,
      }}
    />
  );
}
// import React, { useEffect } from "react";
// import { View, Text } from "react-native";
// import firebase from "firebase";
// const ChatScreen = (props) => {
//   const { name } = props.route.params;
//   useEffect(() => {
//     var firebaseConfig = {
//       apiKey: "AIzaSyDmMJqExNxZyjrLXOfcCWwCoUyEddtG4oI",
//       authDomain: "chat-app-e45ee.firebaseapp.com",
//       databaseURL: "https://chat-app-e45ee.firebaseio.com",
//       projectId: "chat-app-e45ee",
//       storageBucket: "chat-app-e45ee.appspot.com",
//       messagingSenderId: "1039426524742",
//       appId: "1:1039426524742:web:52aad1ee0d83790b575c47",
//       measurementId: "G-T2DM9JDL2J",
//     };
//     if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);

//     var database = firebase.database();
//     return firebase
//       .database()
//       .ref("/messages")
//       .once("value")
//       .then(function (snapshot) {
//         console.log(snapshot.val());
//       });
//   }, []);

//   return (
//     <View>
//       <Text>{name}</Text>
//     </View>
//   );
// };

// export default ChatScreen;
