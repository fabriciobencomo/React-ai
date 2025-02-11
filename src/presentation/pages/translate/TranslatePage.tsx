import { useState } from "react"
import { AiMessages } from "../../components/chat-bubbles/AiMessages";
import { MyMessage } from "../../components/chat-bubbles/MyMessage";
import { TypingLoader } from "../../components/loaders/TypingLoader";
import { TextMessageBoxSelect } from '../../components/chat-input-box/TextMessageBoxSelect';
import { translateUseCase } from "../../../core/use-cases";


interface Message {
  text: string;
  isGpt: boolean;
}


const languages = [
  { id: "alemán", text: "Alemán" },
  { id: "árabe", text: "Árabe" },
  { id: "bengalí", text: "Bengalí" },
  { id: "francés", text: "Francés" },
  { id: "hindi", text: "Hindi" },
  { id: "inglés", text: "Inglés" },
  { id: "japonés", text: "Japonés" },
  { id: "mandarín", text: "Mandarín" },
  { id: "portugués", text: "Portugués" },
  { id: "ruso", text: "Ruso" },
];

export const TranslatePage = () => {

  const [isLoading, setIsloading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([])

  
  const handlePost = async(text: string, selectedOption: string) => {
    setIsloading(true);

    const newMessage = `traduce "${text}" al idioma ${selectedOption}`

    setMessages((prev) => [...prev, {text: newMessage, isGpt: false}]);

    const {content, ok} = await translateUseCase(text, selectedOption)

    if(!ok) {
      setMessages((prev) =>  [...prev, {text: 'No se pudo realizar la Traduccion', isGpt: true}])
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
          <AiMessages text="Que Quieres Traducir hoy?" />

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
      <TextMessageBoxSelect onSendMessage={handlePost} placeholder="Escribe aqui lo que pienses" options={languages}/>
    </div>
  )
}
