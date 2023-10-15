import React, { useEffect } from 'react'
import { useFirestoreDelete } from 'hooks/useFirestoreDelete'

export const DeleteData = () => {
  const { DeleteDocument } = useFirestoreDelete("tests");
  const { DeleteField } = useFirestoreDelete("tests");
  useEffect(()=> {
    // DeleteDocument('8TgJehQAo8iF5MBDKsqj');
    DeleteField('Z7Ojx0Nd88iZzj1CtfPg', 'tag', '양리단길')
}, [])
  return (
    <div>DeleteData</div>
  )
}
