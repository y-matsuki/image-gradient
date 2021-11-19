import React from 'react'
import type { NextPage } from 'next'
import styles from '../styles/Home.module.scss'
import { useDropzone } from 'react-dropzone'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage } from '@fortawesome/free-solid-svg-icons'

interface Color {
  color: {
    red: number
    green: number
    blue: number
    alpha: number | null
  },
  score: number
  pixelFraction: number
}

const Home: NextPage = () => {
  const [file, setFile] = React.useState(null);
  const [colors, setColors] = React.useState<Color[]>([]);
  const onDrop = React.useCallback(acceptedFiles => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
    } else {
      setFile(null);
    }
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  React.useEffect(() => {
    if (file) {
      const data = new FormData()
      data.append("file", file)
      fetch(`/api/hello`, {
        method: "POST",
        body: data,
      }).then(async (result) => {
        const resp = await result.json();
        setColors(resp.colors)
      }).catch((err) => {
        console.log(err.message);
      });
    } else {
      setColors([]);
    }
  }, [file]);

  const gradient = colors
    .map(({ color }) => {
      return `rgba(${color.red},${color.green},${color.blue},${color.alpha || 1})`
    })
    .join(', ');

  return (
    <div className={styles.container}>
      <div
        className={styles.gradient}
        style={{ background: `linear-gradient(45deg, ${gradient})` }}
      >
        {file ?
          <img src={URL.createObjectURL(file)} className={styles.image} /> :
          <div {...getRootProps()} className={styles.file}>
            <input {...getInputProps()} />
            <div className={styles.text}>
              <FontAwesomeIcon icon={faImage} size={'4x'} />
              {
                isDragActive ?
                  <p>ここにファイルをドロップ...</p> :
                  <p>ここにファイルをドラッグ...</p>
              }
            </div>
          </div>
        }
      </div>
    </div>
  )
}

export default Home;
