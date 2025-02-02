import { AiMessages } from "../../components/chat-bubbles/AiMessages"
import { MyMessage } from "../../components/chat-bubbles/MyMessage"

export const OrthographyPage = () => {
  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          {/* Bienvenido */}
          <AiMessages text="Hola, Puedo ayudar Con tus Correciones" />
          <MyMessage text="Hola Mundo"/>
        </div>
      </div>
    </div>
  )
}
