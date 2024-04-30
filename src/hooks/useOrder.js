import { useState, useEffect, useContext } from "react"
import { FirebaseContext } from "../firebase/index"

const useOrder = order => {
  const [loading, setLoading] = useState(false)
  const [currentOrder, setCurrentOrder] = useState(order)
  const [products, setProducts] = useState([])
  const { firebase } = useContext(FirebaseContext)

  useEffect(() => {
    const getProducts = () => {
      setLoading(true)

      firebase.db
        .collection("products")
        .orderBy(currentOrder, "desc")
        .onSnapshot(handleSnapshot)
    }
    getProducts()
  }, [currentOrder])

  function handleSnapshot(snapshot) {
    const products = snapshot.docs.map(doc => {
      return {
        id: doc.id,
        ...doc.data(),
      }
    })
    setProducts(products)
    setLoading(false)
  }

  return { products, setOrder: setCurrentOrder, loading }
}

export default useOrder
