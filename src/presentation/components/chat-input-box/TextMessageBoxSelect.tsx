import { FormEvent, useState } from "react";

interface Props {
  onSendMessage: (message:string, selectedVoice: string) => void;
  placeholder?: string;
  disableCorrections?: boolean;
  options: Option[];
}

interface Option {
  id: string;
  text:string;
}

export const TextMessageBoxSelect = ({ onSendMessage, placeholder, disableCorrections, options } : Props) => {

  const [message, setMessage] = useState('')
  const [selectedOption, setSelectedOption] = useState<string>('')
  
  const handleSendMessage = (event: FormEvent<HTMLFormElement>) => {

    event.preventDefault(); 

    if(message.trim().length == 0) return
    if(selectedOption === '') return


    onSendMessage(message,selectedOption)
    setMessage('')
  }

  return (
    <form onSubmit={handleSendMessage} className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4">
      <div className="flex-grow">
        <div className="flex">
          <input type="text" 
            autoFocus name="message" 
            className="w-full border rounded-xl text-gray-800 focus:outline-none focus:border-indigo-300 pl-4 h-10"
            placeholder={placeholder}
            autoCorrect={disableCorrections ? 'off' : 'on'}
            autoComplete={disableCorrections ? 'off' : 'on'}
            spellCheck={disableCorrections ? 'true': 'false'}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <select name="select" className="w-2/5 ml-5 border rounded-xl text-gray-800 focus:outline-none focus:border-indigo-300 pl-4 h-10" value={selectedOption} onChange={e => setSelectedOption(e.target.value)} >
            <option value='frances'>Seleccione</option>
            {
              options.map(({id,text}) => (
                <option value={id} key={id}>{text}</option>
              ))
            }
          </select>
        </div>
      </div>
      <div className="ml-4">
        <button className="btn-primary">
          <span className="mr-2">Enviar</span>
          <i className="fa-regular fa-paper-plane"></i>
        </button>
      </div>
    </form>
  );
}
