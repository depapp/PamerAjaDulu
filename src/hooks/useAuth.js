import { useState, useEffect } from "react"
import firebase from "../firebase/index"

export default function useAuth() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const unsuscribe = firebase.auth.onAuthStateChanged(user => {
      if (user) {
        setUser(user)
      } else {
        setUser(null)
      }
    })

    return () => unsuscribe()
  }, [])

  return user
}
