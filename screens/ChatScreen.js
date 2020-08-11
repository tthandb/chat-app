import React, { useState, useCallback, useEffect } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import firebase from "firebase";
import { FIREBASE_CONFIG } from "../utils/Config";

export default function ChatScreen() {
	const [messages, setMessages] = useState([]);
	const firebaseConfig = FIREBASE_CONFIG;
	if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
	const messagesRef = firebase.database().ref("/messages");

	useEffect(() => {
		(async () => {
			try {
				const snapshot = await messagesRef
					.limitToLast(20)
					.once("value");
				console.log("Snapshot: ", snapshot.val());
				const newArr = [];
				Object.keys(snapshot.val()).map((key, _index) => {
					newArr.push(snapshot.val()[key]);
				});
				setMessages(newArr);
				messagesRef.on("child_added", data => {
				console.log("data add to db", data.key, data.val());
				});
			} catch (e) {
				console.error(e);
			}
		})();
	}, []);
	useEffect(() => {
		console.log("messages: ", messages);
	}, [messages]);
	const onSend = useCallback((messages = []) => {
		console.log("new message: ", messages[0]);
		const newMessage = messagesRef.push();
		newMessage.set(messages[0]);
		setMessages(previousMessages =>
			GiftedChat.append(previousMessages, messages)
		);
	}, []);

	return (
		<GiftedChat
			messages={messages}
			onSend={messages => onSend(messages)}
			user={{
				_id: 1
			}}
			inverted={false}
		/>
	);
}
