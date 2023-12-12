import React, { useEffect } from 'react'
import { useFirestoreUpdate } from 'hooks/useFirestoreUpdate';

export const UpdateData = () => {
  const { UpdateField } = useFirestoreUpdate('tests');
  useEffect(()=> {
      UpdateField('8TgJehQAo8iF5MBDKsqj', 
      {
        country: 'USArorasdo',
      });
  }, [])
  return (
    <div>GetData</div>
  )
}