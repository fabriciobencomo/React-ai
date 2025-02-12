import { useState } from "react"
import { AiMessages } from "../../components/chat-bubbles/AiMessages";
import { MyMessage } from "../../components/chat-bubbles/MyMessage";
import { TypingLoader } from "../../components/loaders/TypingLoader";
import { TextMessageBoxFile } from "../../components/chat-input-box/TextMessageBoxFile";
import { AudioToTextUseCase } from "../../../core/use-cases";



interface Message {
  text: string;
  isGpt: boolean;
}


export const AudioToTextPage = () => {

  const [isLoading, setIsloading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([])

  
  const handlePost = async(text: string, audioFile: File) => {
    setIsloading(true);
    setMessages((prev) => [...prev, {text: text, isGpt: false}]);

    const resp = await AudioToTextUseCase(text, audioFile)

    if(!resp) {
      console.log(resp)
      return
    }

    const gptMessage = `
    ## Transcripcion: 
    __Duracion:__ ${Math.round(resp.duration)}
    ### El texto es:
    ${resp.text}
    `

    setMessages((prev) => [...prev, {text: gptMessage, isGpt: true}])

    for(const segment of resp.segments) {
      const segmentMessage = `
      __De ${Math.round(segment.start)} a ${Math.round(segment.end)} segundos: ___
      ${segment.text}
      `
      setMessages((prev) => [
        ...prev,
        {text: segmentMessage, isGpt: true}
      ])
    }
    
    setIsloading(false);

  }

  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          {/* Bienvenido */}
          <AiMessages text="Hola, Que Audio Quieres Transcribir Hoy?" />

          {
            messages.map((message, index) => (
              message.isGpt 
              ?
              (
                <AiMessages text={message.text} key={index}/>
              )
              :
              (
                <MyMessage key={index} text={message.text === '' ? 'Transcribe El audio' : message.text} />
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
      <TextMessageBoxFile onSendMessage={handlePost} placeholder="Escribe aqui lo que pienses" disableCorrections accept="audio/*"/>
    </div>
  )
}
