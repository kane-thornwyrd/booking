import React, { useState, useEffect, useRef } from 'react'
import classNames from 'classnames'
import ContentLoader from 'react-content-loader'
import { withStyles } from '@material-ui/core/styles'

import If from './If'

const styles = theme => ({
  notLoaded: {
    display: 'none',
  },
})

export default withStyles(styles)(props => {
  const targetEl = useRef(null)
  const [loaded, setLoaded] = useState(false)
  let intersectionObserver

  useEffect(() => {
    const imgEl = targetEl.current.getElementsByTagName('img')[0]
    const options = {
      rootMargin: '0px',
      threshold: [0, 0.25, 0.5, 0.75, 1],
    }
    intersectionObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !imgEl.src) imgEl.src = props.source
      })
    }, options)
    intersectionObserver.observe(targetEl.current)
  }, [])

  return (
    <div ref={targetEl}>
      <If is={!loaded}>
        <ContentLoader
          height={props.height}
          width={props.width}
          speed={2}
          primaryColor="#f3f3f3"
          secondaryColor="#ecebeb"
          style={{ height: props.height, width: props.width }}
        />
      </If>
      <img
        alt={props.alt}
        onLoad={() => setLoaded(!loaded)}
        className={classNames({
          [props.classes.notLoaded]: !loaded,
        })}
        style={{ height: props.height, width: props.width }}
      />
    </div>
  )
})
