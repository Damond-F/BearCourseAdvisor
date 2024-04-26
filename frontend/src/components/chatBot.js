import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css'
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator} from '@chatscope/chat-ui-kit-react'
import { useState } from 'react'
import React from 'react'
import '../Styles/chatbot.css'

// const OPENAI_KEY = process.env.REACT_APP_OPEN_AI_KEY;
const OPENAI_KEY = "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"
console.log("hhkjkjh")
console.log(OPENAI_KEY)

function ChatBot() {
    const [typing, setTyping] = useState(false)
    const [messages, setMessages] = useState([
        {
            message: "Hi",
            sender: "ChatGPT"
        }
    ])

    const handleSend = async (message) => {
        const newMessage = {
            message: message,
            sender: "user",
            direction: "outgoing"
        }

        const newMessages = [...messages, newMessage]

        setMessages(newMessages)
        setTyping(true)

        await processMessageToGPT(newMessages)

    }

    async function processMessageToGPT(chatMessages) {
        let apiMessages = chatMessages.map((messageObject) => {
            let role = " "
            if (messageObject.sender == "ChatGPT") {
                role = "assistant"
            } else {
                role = "user"
            }
            return { role : role, content: messageObject.message}
        })

        const systemMessage = {
            role: "system",
            content: "Speak like a helpful school tutor advising students on cs courses"
        }

        const apiRequestBody = {
            "model": "gpt-3.5-turbo",
            "messages": [
                systemMessage,
                ...apiMessages
            ]
        }

        await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + OPENAI_KEY,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(apiRequestBody)
        }).then((data) => {
            return data.json()
        }).then((data) => {
            console.log(data)
            setMessages(
                [...chatMessages, {
                    message: data.choices[0].message.content,
                    sender: "ChatGPT",
                    direction: "incoming"
                }]
            )
            setTyping(false)
        })
    }

    return(
        <div style={{ 
            height: '500px',
            maxWidth: '600px',
            display: 'grid',
            transform: 'scale(0.8)',
            transformOrigin: 'center top',
            border: '2px solid #ccc',
            borderRadius: '5px'}}>
            <ChatContainer>
                <MessageList
                scrollBehavior='smooth'
                TypingIndicator={typing ? <TypingIndicator content="Thinking..."></TypingIndicator> : null}
                >
                    {messages.map((message, i) => {
                        return <Message key={i} model={message}/>
                    })}
                </MessageList>
                <MessageInput placeholder='type message here' onSend={handleSend}/>
            </ChatContainer>
        </div>
    )
}

export default ChatBot