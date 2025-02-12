
export const textToAudioUseCase = async(prompt: string, voice: string) => {
  try {
    const resp = await fetch(`http://localhost:3000/gpt/ortography-check`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({prompt, voice})
    })

    if(!resp.ok) throw new Error('No se pudo crear El audio')

    const audioFile = await resp.blob();
    const audioUrl = URL.createObjectURL(audioFile)

    return {
      ok: true,
      message: prompt,
      audioUrl
    }

  } catch(error) {
    return {
      ok: false,
      message: 'No se pudo Crear el audio'
    }
  }
}