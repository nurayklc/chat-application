import firebase from 'firebase';
import { useEffect, useState } from 'react';

const FileShow = (collection) => {
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    const unsub = firebase.firestore().collection(collection)
      .orderBy('createdAt', 'asc')
      .onSnapshot(snap => {
        let documents = [];
        snap.forEach(doc => {
          documents.push({...doc.data(), id: doc.id});
        });
        setDocs(documents);
      });

    return () => unsub();
    // this is a cleanup function that react will run when
    // a component using the hook unmounts
  }, [collection]);

  return { docs };
}

export default FileShow;