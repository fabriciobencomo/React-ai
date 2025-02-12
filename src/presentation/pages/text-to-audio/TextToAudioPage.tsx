import { useState } from "react"
import { AiMessages } from "../../components/chat-bubbles/AiMessages";
import { AiMessageAudio } from "../../components/chat-bubbles/AiMessageAudio";
import { MyMessage } from "../../components/chat-bubbles/MyMessage";
import { TextMessageBox } from "../../components/chat-input-box/TextMessageBox";
import { TypingLoader } from "../../components/loaders/TypingLoader";
import { TextMessageBoxSelect } from "../../components/chat-input-box/TextMessageBoxSelect";
import { textToAudioUseCase } from "../../../core/use-cases";


const disclaimer = `## Que Audio Quieres Generar
* Todo el audio es generado es por AI
`
const voices = [
  { id: "nova", text: "Nova" },
  { id: "alloy", text: "Alloy" },
  { id: "echo", text: "Echo" },
  { id: "fable", text: "Fable" },
  { id: "onyx", text: "Onyx" },
  { id: "shimmer", text: "Shimmer" },
]

interface TextMessage {
  text: string;
  isGpt: boolean;
  type: 'text'
}

interface AudioMessage {
  text: string;
  isGpt: boolean;
  audio: string;
  type: 'audio'
}

type Message = TextMessage | AudioMessage

export const TextToAudioPage = () => {

  const [isLoading, setIsloading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([])

  
  const handlePost = async(text: string, selectedVoice: string) => {
    setIsloading(true);
    setMessages((prev) => [...prev, {text: text, isGpt: false, type: 'text'}]);

    const {ok, message, audioUrl} = await textToAudioUseCase(text, selectedVoice)
    
    setIsloading(false);
    
    if(!ok) return;

    setMessages((prev) => [...prev, {text:`${selectedVoice} - ${message}` , isGpt: false, type: 'audio', audio:audioUrl!}])

  }

  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          {/* Bienvenido */}
          <AiMessages text={disclaimer} />

          {
            messages.map((message, index) => (
              message.isGpt 
              ?
              (
                message.type === 'audio'
                ? (
                  <AiMessageAudio 
                    key={index}
                    text={message.text}
                    audio={message.audio}
                  />
                )
                :
                (
                  <AiMessages 
                    key={index}
                    text={message.text}
                  />
                )
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
      <TextMessageBoxSelect onSendMessage={handlePost} placeholder="Escribe aqui lo que pienses" options={voices}/>
    </div>
  )
}
