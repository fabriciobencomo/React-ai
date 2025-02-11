
export const prosConsDiscusserStreamUseCase = async(prompt: string, abortSignal: AbortSignal) => {
  try {
    const response = await fetch(`http://localhost:3000/gpt/pros-cons-discusser-stream`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({prompt}),
      signal: abortSignal
    })

    if(!response.ok) throw new Error('No se pudo realizar la corrección')

    const reader = response.body?.getReader();

    return reader
    

  } catch(error) {
    return {
      ok: false,
      content: 'No se pudo Realizar la comparativa'
    }
  }
}