import React, { useEffect, useState } from 'react';
import './home.css';
import '@fortawesome/free-solid-svg-icons'
import Layout from '../../components/Layout/layout';
import { useDispatch, useSelector } from 'react-redux';
import firebase from 'firebase';
import { getRealtimeUsers, updateMessage, getRealtimeConversations } from '../../actions/userActions'
import fileShow from './fileShow'

const User = (props) => {


  const {user, onClick} = props;

  return (
    <div onClick={() => onClick(user)} className="displayName">
        <div className="displayPic">
          <img src="https://i.tmgrup.com.tr/gq/img/920x615/17-06/22/user_male_circle_filled1600.png" alt="profile image" />
        </div>
        <div style={{ display: 'flex', flex: 1, justifyContent: 'space-between', margin: '0 10px'}}>
          <span style={{fontWeight: 500}}>{user.firstName} {user.lastName}</span>
          <span className={user.isOnline ? `onlineStatus` : `onlineStatus off`}></span>
        </div>
    </div>
  );
}

const HomePage = (props) => {

  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const user = useSelector(state => state.user);
  const [chatStarted, setChatStarted] = useState(false);
  const [chatUser, setChatUser] = useState('');
  const [message, setMessage] = useState('');
  const [userUid, setUserUid] = useState(null);
  const [fileUrl ,setFileUrl] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedImg, setSelectedImg] = useState(null);
  const [fileExtension, setfileExtension] = useState(null);
  let unsubscribe;

  useEffect(() => {

    unsubscribe = dispatch(getRealtimeUsers(auth.uid))
    .then(unsubscribe => {
      return unsubscribe;
    })
    .catch(error => {
      console.log(error);
    })
  }, []);

  //console.log(user);

  //componentWillUnmount
  useEffect(() => {
    return () => {
      //cleanup
      unsubscribe.then(f => f()).catch(error => console.log(error));

    }
  }, []);


  const initChat = (user) => {

    setChatStarted(true)
    setChatUser(`${user.firstName} ${user.lastName}`)
    setUserUid(user.uid);
    dispatch(getRealtimeConversations({ uid_1: auth.uid, uid_2: user.uid }));
   
  }

  const submitMessage = (e) => {

    const msgObj = {
      user_uid_1: auth.uid,
      user_uid_2: userUid,
      message
    }

    if(message !== "" ){
      dispatch(updateMessage(msgObj))
      .then(() => {
        setMessage('')
      });
    }
  }

  const onFileChange = async (e) => {
    const collectionRef = firebase.firestore().collection('images');
    const timestamp = firebase.firestore.FieldValue.serverTimestamp;
    const file = e.target.files[0]
    const storageRef = firebase.storage().ref()
    const fileRef = storageRef.child(file.name)
    await fileRef.put(file)  
    const createdAt = timestamp();
    const fileUrl = await fileRef.getDownloadURL(); 
    await collectionRef.add({ fileUrl, createdAt , auth, userUid});
    var fileExtension = file.name.split('.').pop(); 
    setfileExtension(fileExtension)
    setFileUrl(fileUrl)
  }

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    var userBackup =[];
    for(var i=0;i<user.users.length;i++){
      userBackup[i]=user.users[i]
    
      for(i=0;i<user.users.length;i++){  
          if(user.users[i].firstName[0] === e.target.value){
            user.users[0]=user.users[i]
            user.users[i]=userBackup[0]
          }
      }
    }
  };

  const ImageGrid = ({ setSelectedImg }) => {
    const { docs } = fileShow('images');
    return (
      <div className="img-grid">
        {docs.map(doc => (
          <div className="img-res">
              <img style={{width:'300px'}} src={doc.fileUrl}
              />   
          </div>
        ))}
      </div>
    )
  }


  return (
    <Layout>
      <section className="container">

        <div className="listOfUsers">
        <input
          className="search"
          type="search"
          placeholder="Search"
          value={searchTerm}
          onChange={handleChange}
        />   
        
          {
            user.users.length > 0 ?
            user.users.map(user => {
              return (
                <User 
                  onClick={initChat}
                  key={user.uid} 
                  user={user} 
                  />
              );
            }) : null
          }
          <ul>
         
        </ul>
        </div>

        <div className="chatArea">
            <div className="chatHeader"> 
            {
              chatStarted ? "Hi say 👋 "+  chatUser : ''  
            }
            
            </div>
            <div className="messageSections">
                {
                  chatStarted ? 
                  user.conversations.map(con =>
                    <div style={{ textAlign: con.user_uid_1 === auth.uid ? 'right' : 'left' }}>
                      <pre className="messageStyle" >{con.message}</pre>
                    </div> 
                    )
                  : null
                } 
                
                <div>
                { 
                user.conversations.map(con =>
                    <div style={{ display: con.user_uid_1 === auth.uid && con.user_uid_2 === userUid ? '-moz-initial' : 'none', textAlign: con.user_uid_1 === auth.uid ? 'right' : 'left' }}>
                      <ImageGrid setSelectedImg={setSelectedImg}/>
                      { selectedImg }
                      <div 
                      style={{display: fileUrl !== null && fileExtension !== 'jpg' || con.user_uid_2 === userUid ? '-moz-initial' : 'none' }}>
                        <a href={fileUrl} download >
                          <button>Download</button>
                        </a>
                      </div>
                    </div>
                )
                }
                </div>
            </div>
            {
              chatStarted ? 
              <div className="chatControls">
                  <input 
                  type="file" 
                  style={{ width:'80px', height:'80px', background:'#e2e0e0'}}  
                  onChange={onFileChange}>
                  </input>
                <input  
                  className="box"
                  type="text" 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Write Message..."
                />
                <button disabled={message.length<1} className="send" onClick={submitMessage}>Send</button>
            </div> : null
            }
            
        </div>
    </section>
  </Layout>
  );
}

export default HomePage;