import { AudioToTextResponse } from "../../interfaces";

export const AudioToTextUseCase = async(prompt: string, audioFile: File) => {
  try {

    const formData = new FormData();
    formData.append('file', audioFile)
    if(prompt){
      formData.append('prompt', prompt)
    }



    const resp = await fetch(`http://localhost:3000/gpt/audio-to-text`, {
      method: 'POST',
      body: formData
    })


    const data = await resp.json() as AudioToTextResponse;

    return data

    // return {
    //   ok: true,
    //   ...data
    // }

  } catch(error) {
    return {
      ok: false,
      message: 'No se pudo realizar la transcripcion'
    }
  }
}