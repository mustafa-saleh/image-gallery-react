/**@jsx jsx */
import {jsx} from '@emotion/react'

import React from 'react'
import {Card as PhotoCard, Button, FullSpinner} from 'components/lib'
import {
  Modal,
  ModalContents,
  ModalOpenButton,
  ModalDismissButton,
} from 'components/modal'
import * as colors from 'styles/colors'
import * as mq from 'styles/media-queries'

const serverURI = process.env.REACT_APP_SERVER_URL

const styles = {
  gallery: {
    display: 'flex',
    flexDirection: 'column',
    h3: {
      color: colors.text,
      letterSpacing: '1px',
      fontSize: '1rem',
      marginBottom: '1em',
    },
    pre: {
      margin: '0',
      whiteSpace: 'break-spaces',
      color: colors.danger,
    },
    img: {
      maxWidth: '100%',
      height: 'auto',
    },
  },
  photoGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gridGap: '0.75rem',
    color: colors.gray80,
    fontSize: '0.9rem',
    cursor: 'pointer',
    [mq.small]: {
      gridTemplateColumns: '1fr 1fr',
    },
    [mq.mini]: {
      gridTemplateColumns: '1fr',
    },
  },
}

const RenderPhotoGrid = ({images, handleSelect}) => {
  if (images && images.length)
    return (
      <div css={styles.photoGrid}>
        {images.map(image => (
          <PhotoCard key={image.id}>
            <ModalOpenButton>
              <img
                width="100%"
                src={`${serverURI}/${image.path}`}
                alt={`${serverURI}/${image.path}`}
                onClick={() => handleSelect(image)}
              />
            </ModalOpenButton>
          </PhotoCard>
        ))}
      </div>
    )
  else return <pre>PHOTO GALLERY IS EMPTY, PLEASE ADD SOME IMAGES</pre>
}

const Gallery = ({images, error, status, deleteImage}) => {
  const [src, setSrc] = React.useState(null)

  return (
    <section css={styles.gallery}>
      <Modal>
        <h3>PHOTO GALLERY</h3>
        {status === 'LOADING' ? (
          <FullSpinner />
        ) : error && (status === 'REJECTED' || status === 'REJECTED_DL') ? (
          <pre>{error}</pre>
        ) : (
          <RenderPhotoGrid images={images} handleSelect={val => setSrc(val)} />
        )}
        <ModalContents variant="large" aria-label="gallery image">
          <PhotoCard css={{marginBottom: '1em'}}>
            <img
              src={`${serverURI}/${src?.path}`}
              alt={`${serverURI}/${src?.path}`}
              style={{maxWidth: '100%', height: 'auto'}}
            />
          </PhotoCard>
          <ModalDismissButton>
            <Button variant="primary" onClick={() => deleteImage(src.id)}>
              Delete
            </Button>
          </ModalDismissButton>
        </ModalContents>
      </Modal>
    </section>
  )
}

export default Gallery
