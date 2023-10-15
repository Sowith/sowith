import React, { useEffect } from 'react'
import { useFirestoreRead } from 'hooks/useFirestoreRead'

export const ReadData = () => {
  const { ReadAllField } = useFirestoreRead('tests');
  const { ReadField } = useFirestoreRead('tests');
  const { ReadDocument } = useFirestoreRead('tests');
  useEffect(()=> {
    const fetchData = async () => {
      // const response = await ReadAllField();
      const response = await ReadField('tag', '!=', []);
      // const response = await ReadDocument('jw9u1EMfNQNqTM8spycZ');
      console.log(response);
    }
    fetchData();
  }, [])
  return (
    <div>GetData</div>
  )
}