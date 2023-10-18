import React, { useEffect } from 'react'
import { useFirestoreRead } from 'hooks/useFirestoreRead'

export const ReadData = () => {
  const { ReadAllDocument } = useFirestoreRead('tests');
  const { ReadDocument } = useFirestoreRead('tests');
  const { ReadField } = useFirestoreRead('tests');
  useEffect(()=> {
    const fetchData = async () => {
      // const response = await ReadAllDocument();
      // const response = await ReadDocument('jw9u1EMfNQNqTM8spycZ');
      const response = await ReadField('tag', '!=', []);
      console.log(response);
    }
    fetchData();
  }, [])
  return (
    <div>GetData</div>
  )
}