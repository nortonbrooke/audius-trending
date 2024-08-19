"use client"

import styles from "./page.module.css"
import { useEffect, useState } from "react"
import { Track, TrackT } from "./components/Track"
import { Toggle } from "./components/Toggle"

enum Genre {
  All = "All",
  Electronic = "Electronic",
  HipHopRap = "Hip-Hop/Rap",
}

export default function Home() {
  const [trending, setTrending] = useState<TrackT[]>([])
  const [filteredTrending, setFilteredTrending] = useState<TrackT[]>([])

  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  const [selectedGenre, setSelectedGenre] = useState(Genre.All)
  const [search, setSearch] = useState("")
  const [favoritesOnly, setFavoritesOnly] = useState(false)

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const response = await fetch(
          "https://discoveryprovider.audius.co/v1/tracks/trending"
        )
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`)
        }

        const result = await response.json()
        console.log(result)
        setTrending(result.data)
        setFilteredTrending(result.data)
        setIsLoading(false)
      } catch (error: any) {
        setError("Oops there was a problem ")
        setIsLoading(false)
      }
    }

    fetchTrending()
  }, [])

  useEffect(() => {
    let filtered
    if (selectedGenre === Genre.All) {
      filtered = [...trending]
    } else {
      filtered = trending.filter((track) => track.genre === selectedGenre)
    }

    if (search) {
      filtered = filtered.filter((track) =>
        track.title.toLowerCase().includes(search.toLowerCase())
      )
    }

    setFilteredTrending(filtered)
  }, [selectedGenre, search])

  if (isLoading) {
    return (
      <main className={styles.main}>
        <div className={styles.centered}>
          <h2>Loading...</h2>
        </div>
      </main>
    )
  }

  if (error) {
    return (
      <main className={styles.main}>
        <div className={styles.centered}>
          <h2>{error}</h2>
        </div>
      </main>
    )
  }

  return (
    <main className={styles.main}>
      <div className={styles.content}>
        <header className={styles.header}>
          <h1>TRENDING</h1>
          <div className={styles.filterBar}>
            <div className={styles.search}>
              <input
                placeholder="Search..."
                onChange={(e) => {
                  setSearch(e.target.value)
                }}
              />
            </div>
            <div className={styles.filters}>
              <button
                className={selectedGenre === Genre.All ? styles.selected : ""}
                onClick={() => {
                  setSelectedGenre(Genre.All)
                }}
              >
                All Genres
              </button>
              <button
                className={
                  selectedGenre === Genre.Electronic ? styles.selected : ""
                }
                onClick={() => {
                  setSelectedGenre(Genre.Electronic)
                }}
              >
                {Genre.Electronic}
              </button>
              <button
                className={
                  selectedGenre === Genre.HipHopRap ? styles.selected : ""
                }
                onClick={() => {
                  setSelectedGenre(Genre.HipHopRap)
                }}
              >
                {Genre.HipHopRap}
              </button>
            </div>
          </div>
          <div>
            <Toggle
              label="My Favorites"
              onChange={(on) => {
                setFavoritesOnly(on)
              }}
            />
          </div>
        </header>
        {filteredTrending.map((track, index) => (
          <Track
            track={track}
            position={index + 1}
            onlyFavorites={favoritesOnly}
          />
        ))}
        {filteredTrending.length === 0 && <h2>No results</h2>}
      </div>
    </main>
  )
}
