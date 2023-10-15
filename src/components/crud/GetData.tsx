import React, { useEffect } from 'react'
import { useFirestoreGet } from 'hooks/useFirestoreGet'

export const GetData = () => {
  const { SearchAllField } = useFirestoreGet('tests');
  const { SearchField } = useFirestoreGet('tests');
  const { SearchDocument } = useFirestoreGet('tests');
  useEffect(()=> {
    const fetchData = async () => {
      // const response = await SearchAllField();
      const response = await SearchField('tag', '!=', []);
      // const response = await SearchDocument('jw9u1EMfNQNqTM8spycZ');
      console.log(response);
    }
    fetchData();
  }, [])
  return (
    <div>GetData</div>
  )
}

export default GetData