import { useEffect } from 'react'
import { useAppDispatch } from '../app/hooks'
import { idling } from '../features/posts/postsSlice'

const useIdlingPostSlice = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(idling())
  }, [dispatch])
}

export default useIdlingPostSlice
