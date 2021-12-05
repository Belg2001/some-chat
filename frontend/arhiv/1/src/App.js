import React, {Component} from 'react';
import SockJsClient from 'react-stomp';
import './App.css';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import './css/MessageStyle.css';
import NameComponent from "./components/NameComponent";
import "./styles.css";
import Fetch from "json-fetch";

class App extends Component {
    chatContainer = React.createRef();

    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            typedMessage: "",
            name: "",
            needtoscroll: false,
            is_just_connected: true,
        }
    }

    setName = (name) => {
        console.log(name);
        this.setState({name: name});
    };

    sendMessage = () => {
        this.clientRef.sendMessage('/app/user-all', JSON.stringify({
            name: this.state.name,
            message: this.state.typedMessage
        }));
        this.setState({needtoscroll: true})
    };

    scrollToMyRef = () => {
        const scroll =
          this.chatContainer.current.scrollHeight -
          this.chatContainer.current.clientHeight;
        this.chatContainer.current.scrollTo(0, scroll);
      };

    // componentWillMount() {
    //     Fetch("http://localhost:8000/some-chat/app/history", {
    //         method: "GET"
    //     }).then((response) => {
    //         console.log("AAAAAAAAAAAAAAAAAAAAA");
    //         console.log(response.body);
    //         // this.setState({ messages: response.body });
    //     });
    // }

    displayMessages = () => {
        return (
            <div ref={this.chatContainer} className="Chat">
                {this.state.messages.map(msg => {
                    return (
                        <div className="Mes">
                            {this.state.name == msg.name ?
                                <div>
                                    <p className="title1">{msg.name}, {(new Date(msg.time)).toUTCString()} : </p><br/>
                                    <p>{msg.message}</p>
                                </div> :
                                <div>
                                    <p className="title2">{msg.name}, {(new Date(msg.time)).toUTCString()} : </p><br/>
                                    <p>{msg.message}</p>
                                </div>
                            }
                        </div>
                        )
                    }
                )
                }
            </div>
        );
    };

    render() {
        return (
            <div>
                <NameComponent setName={this.setName}/>
                <div className="align-center">
                    <h1>Some-Chat</h1>
                    <br/><br/>
                </div>
                <div className="align-center">
                    User : <p className="title1"> {this.state.name}</p>
                </div>
                <div className="align-center">
                    {this.displayMessages()}
                </div>
                <div className="align-center">
                    <br/><br/>
                    <table>
                        <tr>
                            <td>
                                <TextField id="outlined-basic" label="Enter Message to Send" variant="outlined"
                                           onChange={(event) => {
                                               this.setState({typedMessage: event.target.value});
                                           }}/>
                            </td>
                            <td>
                                <Button variant="contained" color="primary"
                                        onClick={this.sendMessage}>Send</Button>
                            </td>
                        </tr>
                    </table>
                </div>
                <br/><br/>
                <SockJsClient url='http://localhost:8000/some-chat'
                              topics={['/topic/user']}
                              onConnect={() => {
                                  this.clientRef.sendMessage('/app/history', JSON.stringify({}));
                                  console.log("Connected");
                                  this.setState({is_just_connected: true})
                              }}
                              onDisconnect={() => {
                                  console.log("Disconnected");
                              }}
                              onMessage={(msg) => {

                                  var jobs = this.state.messages;
                                  console.log(typeof msg)
                                  if (Array.isArray(msg))
                                  {
                                      if (!this.state.is_just_connected)
                                      {
                                          return;
                                      }
                                      console.log("in array logic")
                                      console.log(msg)
                                      jobs = msg
                                  }
                                  else {
                                      console.log("in object logic")
                                      console.log(msg)
                                      jobs.push(msg);
                                  }
                                  this.setState({messages: jobs, is_just_connected: false});
                                  console.log(this.state);                                  
                                  if (this.state.needtoscroll) {
                                      this.scrollToMyRef();
                                      this.setState({needtoscroll: false})
                                    }
                              }}
                              ref={(client) => {
                                  this.clientRef = client
                              }}/>
            </div>
        )
    }
}

export default App;