import React, { useEffect } from 'react'
import { useFirestoreAdd } from 'hooks/useFirestoreAdd'

export const CreateData = () => {
  const { addDocument } = useFirestoreAdd('tests');
  useEffect(()=> {
    addDocument({
      name: 'Tokyo',
      content: 'Japan',
      tag: ['밥', '요리']
    });
  },[])

  return (
    <div>CreateData</div>
  )
}