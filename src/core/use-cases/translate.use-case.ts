import {  TranslateResponse } from "../../interfaces"

export const translateUseCase = async(prompt: string, lang: string) => {
  try {
    const response = await fetch(`http://localhost:3000/gpt/traducciones`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({prompt, lang})
    })

    if(!response.ok) throw new Error('No se pudo realizar la traduccion')

    const resp = await response.json() as TranslateResponse;


    return {
      ok: true,
      ...resp
    }

  } catch(error) {
    return {
      ok: false,
      content: 'No se pudo Realizar la comparativa'
    }
  }
}