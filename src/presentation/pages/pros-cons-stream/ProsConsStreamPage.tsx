import { useState } from "react"
import { AiMessages } from "../../components/chat-bubbles/AiMessages";
import { MyMessage } from "../../components/chat-bubbles/MyMessage";
import { TextMessageBox } from "../../components/chat-input-box/TextMessageBox";
import { TypingLoader } from "../../components/loaders/TypingLoader";
import { prosConsDiscusserStreamUseCase } from "../../../core/use-cases";


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

    await prosConsDiscusserStreamUseCase(text);
    
    setIsloading(false);

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
                <AiMessages text="Esto es del AI" key={index}/>
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

