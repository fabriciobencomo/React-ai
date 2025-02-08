
export async function* prosConsDiscusserStreamGeneratorUseCase(prompt: string) {
  try {
    const response = await fetch(`http://localhost:3000/gpt/pros-cons-discusser-stream`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({prompt})
      //todo: abortSignal
    })

    if(!response.ok) throw new Error('No se pudo realizar la corrección')

    const reader = response.body?.getReader();

 
    if(!reader) {
      console.log('no se pudo generar el reader')
      return null
    }

    const decoder = new TextDecoder();
    
    let text = ''

    while(true) {
      const {value, done} = await reader.read();
      if(done) {
        break;
      }
      const decodeChunk = decoder.decode(value, {stream: true});
      text += decodeChunk;
      yield text
    }

  } catch(error) {
    return {
      ok: false,
      content: 'No se pudo Realizar la comparativa'
    }
  }
}