import React, { useEffect } from 'react'
import { useFirestoreCreate } from 'hooks/useFirestoreCreate'

export const CreateData = () => {
  const { CreateDocument } = useFirestoreCreate('tests');
  useEffect(()=> {
    CreateDocument({
      name: 'Tokyo',
      content: 'Japan',
      tag: ['밥', '요리']
    });
  },[])

  return (
    <div>CreateData</div>
  )
}