import { useEffect, useState } from 'react'

const Form = () => {
  // const [memeImage, setMemeImage] = useState('https://i.imgflip.com/1bhk.jpg')

  const [meme, setMeme] = useState({
    topText: '',
    bottomText: '',
    randomImage: 'https://i.imgflip.com/1bhk.jpg',
  })

  const [allMemes, setAllMemes] = useState([])

  useEffect(() => {
    const fetchApi = async () => {
      const res = await fetch('https://api.imgflip.com/get_memes')
      const data = await res.json()
      setAllMemes(data.data.memes)
    }
    fetchApi()
  }, [])

  const getMemeImage = () => {
    const randomNumber = Math.floor(Math.random() * allMemes.length)
    setMeme({
      ...meme,
      randomImage: allMemes[randomNumber].url,
    })
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setMeme((prevMeme) => ({
      ...prevMeme,
      [name]: value,
    }))
  }

  return (
    <div className='form'>
      <div className='inputs'>
        <input
          className='form-control'
          name='topText'
          value={meme.topText}
          type='text'
          placeholder='shut up'
          onChange={handleChange}
        />
        <input
          className='form-control'
          name='bottomText'
          value={meme.bottomText}
          type='text'
          placeholder='and take my money'
          onChange={handleChange}
        />
      </div>
      <button className='btn' onClick={getMemeImage}>
        Get a new Meme Image 🖼
      </button>
      <div className='meme'>
        <img src={meme.randomImage} alt='memeImage' className='memeImage' />
        <h2 className='meme-text top-text'>{meme.topText}</h2>
        <h2 className='meme-text bottom-text'>{meme.bottomText}</h2>
      </div>
    </div>
  )
}

export default Form
