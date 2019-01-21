import React, { useState, useEffect } from 'react'

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min)) + min

/**
 * Transform a text into an array of css animated letters
 * @param  {String} text
 * @param  {String} textColor
 * @param  {String} shadowColor
 * @param  {Node}   styleSheet  reference to the injected css
 * @return {Array}              of css animated letters
 */
const renderLetters = ({ text, textColor, shadowColor, styleSheet, timingFunctions }) => {
  let keyframes = `
    @keyframes fading {
      from {
        color: rgba(255,255,255,0);
        text-shadow: 0 0 .5em ${shadowColor};
      }
      to {
        color: ${textColor};
        text-shadow: 0 0 .1em ${shadowColor};
      }
    }
  `

  styleSheet && styleSheet.insertRule(keyframes, styleSheet.cssRules.length)

  return Array.from(text, (letter, i) => {
    const time = getRandomInt(30, 60) / 10
    const timingFunction = timingFunctions[getRandomInt(0, 5)]
    const animationStyle = { animation: `fading ${time}s ${timingFunction} 0s infinite alternate` }
    return <span key={i} className={'char' + i} style={animationStyle}>
        {letter}
      </span>
  })
}

const FadingText = props => {
  const tagName = props.tagName || 'span'

  const timingFunctions = props.timingFunctions || ['linear', 'ease-in', 'ease-out', 'ease-in-out', 'ease']

  const [styleSheet, setStyleSheet] = useState(null)
  const [textColor, setTextColor] = useState(props.textColor || '#000')
  const [shadowColor, setShadowColor] = useState(props.shadowColor || '#000')

  let style
  useEffect(() => {
    style = document.createElement('style')
    style.appendChild(document.createTextNode(''))
    document.head.appendChild(style)
    setStyleSheet(style.sheet)
    return () => document.head.removeChild(style)
  }, [])

  return React.createElement(tagName, { ...props }, renderLetters({
      text: props.children,
      textColor,
      shadowColor,
      styleSheet,
      timingFunctions,
    }))
}

export default FadingText
