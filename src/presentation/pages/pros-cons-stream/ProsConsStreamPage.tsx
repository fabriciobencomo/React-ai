import { useState } from "react"
import { AiMessages } from "../../components/chat-bubbles/AiMessages";
import { MyMessage } from "../../components/chat-bubbles/MyMessage";
import { TextMessageBox } from "../../components/chat-input-box/TextMessageBox";
import { TypingLoader } from "../../components/loaders/TypingLoader";
import { prosConsDiscusserStreamGeneratorUseCase } from "../../../core/use-cases";


interface Message {
  text: string;
  isGpt: boolean;
}


export const ProsConsStreamPage = () => {

  const [isLoading, setIsloading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([])

  
  const handlePost = async(text: string) => {
    setIsloading(true);
    setMessages((prev) => [...prev, {text: text, isGpt: false}]);

    const stream = await prosConsDiscusserStreamGeneratorUseCase(text);
    setIsloading(false);
    setMessages((messages) => [...messages, {text: '', isGpt: true}])

    for await(const text of stream) {
      setMessages((messages) => {
        const newMessages = [...messages]
        newMessages[newMessages.length - 1].text = text
        return newMessages
      })
    }
    

  }

  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          {/* Bienvenido */}
            <AiMessages text="¿Qué deseas comparar?" key="welcome-message" />
          {
            messages.map((message, index) => (
              message.isGpt 
              ?
              (
                <AiMessages text={message.text} key={index}/>
              )
              :
              (
                <MyMessage key={index} text={message.text} />
              )
            ))
          }

          {
            isLoading && (
              <div className="col-start-1 col-end-12 fade-in">
                <TypingLoader />
              </div>
            )

          }
          
        </div>


      </div>
      <TextMessageBox onSendMessage={handlePost} placeholder="Escribe aqui lo que pienses" disableCorrections/>
    </div>
  )
}
