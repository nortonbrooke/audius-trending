import Image from "next/image"
import styles from "./Track.module.css"
import { useCallback, useState } from "react"

export type TrackT = {
  id: string
  title: string
  favorite_count: number
  genre: string
  mood: string
  artwork: {
    "150x150": string
  }
  user: {
    name: string
  }
}

export function Track({
  track,
  position,
  onlyFavorites,
}: {
  track: TrackT
  position: number
  onlyFavorites: boolean
}) {
  const [isFavorite, setIsFavorite] = useState(false)
  const [favoriteCount, setIsFavoriteCount] = useState(track.favorite_count)

  if (onlyFavorites && !isFavorite) {
    return null
  }

  return (
    <div className={styles.track} key={track.id}>
      <div>
        <b>#{position}</b>
      </div>
      <div>
        <img
          className={styles.artwork}
          src={track.artwork["150x150"]}
          height={150}
          width={150}
          alt={`${track.title} artwork`}
        />
      </div>
      <div className={styles.info}>
        <div>
          <b>{track.title}</b>
        </div>
        <div>{track.user.name}</div>
        <div>
          {track.genre} {track.mood && <span>• {track.mood}</span>}
        </div>
      </div>
      <div>
        <div className={styles.favorites}>
          <button
            onClick={() => {
              if (isFavorite) {
                setIsFavorite(false)
                setIsFavoriteCount(favoriteCount - 1)
              } else {
                setIsFavorite(true)
                setIsFavoriteCount(favoriteCount + 1)
              }
            }}
          >
            {isFavorite ? (
              <Image
                src={"/heart-filled.png"}
                width={25}
                height={25}
                alt="heart"
              />
            ) : (
              <Image src={"/heart.png"} width={25} height={25} alt="heart" />
            )}
          </button>
          <div>{favoriteCount}</div>
        </div>
      </div>
    </div>
  )
}
