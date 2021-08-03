/**@jsx jsx */
import {jsx} from '@emotion/react'

import React from 'react'
import Gallery from 'sections/gallery'
import {client} from 'utils/api-client'
import {reduceError} from 'utils/tools'
import {UploadToGallery} from 'sections/upload'
import {useAuth} from 'context/auth-context'

const styles = {
  main: {
    display: 'grid',
    flexDirection: 'column',
    gridTemplateColumns: '1fr',
    gridRowGap: '3em',
  },
}

const Main = () => {
  const {token} = useAuth()
  const [state, setState] = React.useState({
    images: null,
    error: null,
    status: 'IDLE',
  })

  React.useEffect(() => {
    setState({status: 'LOADING'})
    client('gallery', {token})
      .then(({data: images}) => setState({images, status: 'RESOLVED'}))
      .catch(error => {
        setState({error: reduceError(error), status: 'REJECTED'})
      })
  }, [token])

  function handleSubmit(body) {
    setState({images: state.images, status: 'UPLOADING'})
    client('gallery', {
      body,
      token,
      method: 'POST',
      isMultipart: true,
    })
      .then(({data: image}) => {
        setState({images: [image, ...state.images], status: 'RESOLVED_UP'})
      })
      .catch(err => {
        setState({...state, error: reduceError(err), status: 'REJECTED_UP'})
      })
  }

  function deleteImage(id) {
    setState({images: state.images, status: 'LOADING'})
    client(`gallery/${id}`, {
      token,
      method: 'DELETE',
    })
      .then(({data}) => {
        const images = state.images.filter(img => img.id !== id)
        setState({images, status: 'RESOLVED_DL'})
      })
      .catch(err =>
        setState({
          images: state.images,
          error: reduceError(err),
          status: 'REJECTED_DL',
        }),
      )
  }

  function resetError() {
    setState({...state, error: null})
  }

  return (
    <main css={styles.main}>
      <UploadToGallery
        status={state.status}
        error={state.error}
        resetError={resetError}
        handleSubmit={handleSubmit}
      />
      <Gallery
        images={state.images}
        error={state.error}
        status={state.status}
        deleteImage={deleteImage}
      />
    </main>
  )
}

export default Main
