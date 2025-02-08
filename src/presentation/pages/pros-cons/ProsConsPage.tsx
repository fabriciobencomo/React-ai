import { useState } from "react"
import { AiMessages } from "../../components/chat-bubbles/AiMessages";
import { MyMessage } from "../../components/chat-bubbles/MyMessage";
import { TypingLoader } from "../../components/loaders/TypingLoader";
import { TextMessageBox } from "../../components/chat-input-box/TextMessageBox";
import { prosConsDiscusserUseCase } from "../../../core/use-cases/pros-cons-discusser.use-case";

interface Message {
  text: string;
  isGpt: boolean
}


export const ProsConsPage = () => {   
  
    const [isLoading, setIsloading] = useState(false);
    const [messages, setMessages] = useState<Message[]>([])
  
    
    const handlePost = async(text: string) => {
      setIsloading(true);
      setMessages((prev) => [...prev, {text: text, isGpt: false}]);

      const {ok, content} = await prosConsDiscusserUseCase(text);

      if(!ok) {
        setMessages((prev) =>  [...prev, {text: 'No se pudo Realizar la comparativa', isGpt: true}])
      }else {
        setMessages((prev) => [...prev, {
          text: content,
          isGpt: true,
        }])
      }
      
      setIsloading(false);
  
    }
  
    return (
      <div className="chat-container">
        <div className="chat-messages">
          <div className="grid grid-cols-12 gap-y-2">
            {/* Bienvenido */}
            <AiMessages text="Hola, puedo ayudarte con las comparaciones que quieras hacer" />
  
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
