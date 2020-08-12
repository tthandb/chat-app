import React, { useState, useCallback, useEffect } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import firebase from "firebase";
import { FIREBASE_CONFIG } from "../utils/Config";

export default function ChatScreen(props) {
	const { name } = props.route.params;
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
				const newArr = [];
				Object.keys(snapshot.val()).map((key, _index) => {
					newArr.push(snapshot.val()[key]);
				});
				setMessages(newArr);
			} catch (e) {
				console.error(e);
			}
		})();
	}, []);
	const onSend = useCallback((messages = []) => {
		setMessages(previousMessages =>
			GiftedChat.prepend(previousMessages, messages)
		);
	}, []);

	return (
		<GiftedChat
			messages={messages}
			onSend={messages => onSend(messages)}
			user={{
				_id: 1,
				name,
				avatar: "https://scontent.fhan2-6.fna.fbcdn.net/v/t1.0-9/p720x720/117288766_759339111469302_5142526103278490_o.jpg?_nc_cat=100&_nc_sid=07e735&_nc_ohc=CDWHSDU_PpgAX8wGRqj&_nc_ht=scontent.fhan2-6.fna&_nc_tp=6&oh=ccc0e344ec0f2cde62723a5f889aa56d&oe=5F58A4B5"
			}}
			inverted={false}
			showUserAvatar={true}
			showAvatarForEveryMessage={true}
		/>
	);
}
