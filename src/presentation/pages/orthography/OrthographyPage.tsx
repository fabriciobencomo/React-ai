import { useState } from "react"
import { AiMessages } from "../../components/chat-bubbles/AiMessages"
import { MyMessage } from "../../components/chat-bubbles/MyMessage"
import { TextMessageBox } from "../../components/chat-input-box/TextMessageBox"
import { TypingLoader } from "../../components/loaders/TypingLoader"
import {AiOrthographyMessages} from '../../components/chat-bubbles/AiOrthographyMessages'
import { orthographyUseCase } from "../../../core/use-cases/orthography.use-case"

interface Message {
  text: string;
  isGpt: boolean;
  info?: {
    userScore: number;
    errors: string[];
    message: string;
  }
}


export const OrthographyPage = () => {

  const [isLoading, setIsloading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([])

  
  const handlePost = async(text: string) => {
    setIsloading(true);
    setMessages((prev) => [...prev, {text: text, isGpt: false}]);
    
    const {ok, message, userScore, errors} = await orthographyUseCase(text);

    if(!ok) {
      setMessages((prev) =>  [...prev, {text: 'No se pudo realizar la corrección', isGpt: true}])
    }else {
      setMessages((prev) => [...prev, {
        text: message,
        isGpt: true,
        info: {errors, message,  userScore}
      }])
    }

    setIsloading(false);

  }

  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          {/* Bienvenido */}
          <AiMessages text="Hola, Puedo ayudar Con tus Correciones" />

          {
            messages.map((message, index) => (
              message.isGpt 
              ?
              (
                <AiOrthographyMessages {...message.info!} key={index}/>
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
