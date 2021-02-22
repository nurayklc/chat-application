import React from 'react'
import './VideoChat.css'
import 'firebase/database'

export default class VideoChat extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isLoggedIn: false,
      userToCall: null,
      username: null
    }
  }

  onLoginClicked = async () => {
    await this.props.onLogin(this.state.username)
    this.setState({
      isLoggedIn: true
    })
  }

  onStartCallClicked = () => {
    this.props.startCall(this.state.username, this.state.userToCall)
  }

  renderVideos = () => {
    return <div className={('videos', { active: this.state.isLoggedIn })}>
      <div>
      <br/>
        <label>{this.state.username}</label>
        <br/>
        <video ref={this.props.setLocalVideoRef} autoPlay playsInline></video>
      </div>
      <div>
        <label>{this.props.connectedUser}</label>
        <br/>
        <video ref={this.props.setRemoteVideoRef} autoPlay playsInline></video>
      </div>

    </div>
  }

  renderForms = () => {
    return this.state.isLoggedIn
      ? <div key='a' className='form'>
        <input value={this.state.userToCall} type="text" onChange={e => this.setState({ userToCall: e.target.value })} />
        <button onClick={this.onStartCallClicked} id="call-btn" className="btn btn-primary">Call</button>

      </div>
      : <div key='b' className='form'>
        <input value={this.state.username} type="text" onChange={e => this.setState({ username: e.target.value })} />

        <button onClick={this.onLoginClicked} id="login-btn" className="btn btn-primary">Join</button>

      </div>
  }

  renderLeave = () =>{
    return this.state.isLoggedIn
      ?
      <div key='a' className='form'>
        <button onClick={()=>{window.location.replace('/')}} id="leave-btn" className="btn btn-primary">Leave</button>
      </div>
      : null
  }

  render () {
    return <section id="container">
      {this.props.connectedUser ? this.renderLeave() : this.renderForms()}

      {this.renderVideos()}

    </section>
  }
}