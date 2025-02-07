import { ProsConsDiscusserResponse } from "../../interfaces"

export const prosConsDiscusserUseCase = async(prompt: string) => {
  try {
    const response = await fetch(`http://localhost:3000/gpt/pros-cons-discusser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({prompt})
    })

    if(!response.ok) throw new Error('No se pudo realizar la corrección')

    const {resp} = await response.json() as ProsConsDiscusserResponse;
    const {content} = resp

    return {
      ok: true,
      content
    }

  } catch(error) {
    return {
      ok: false,
      content: 'No se pudo Realizar la comparativa'
    }
  }
}