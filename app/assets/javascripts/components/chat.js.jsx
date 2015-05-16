/** @jsx React.DOM */

window.loadChatBox = function(msgs) {
  
  
  /* DEFINE THE FLUXXOR STORE */
  var FluxMixin = Fluxxor.FluxMixin(React);
  var StoreWatchMixin = Fluxxor.StoreWatchMixin;
  var fluxChatBoxStore = {};
 
  fluxChatBoxStore.constants = {
    ADD_MSG: "ADD_MSG",
  };
  
  fluxChatBoxStore.store = Fluxxor.createStore({
    initialize: function(options) {
      /* We'll have msgs */
      this.msgs = options.msgs || [];
      
      /* Those chats can be added or removed */
      this.bindActions(fluxChatBoxStore.constants.ADD_MSG, this.onAddMsg);
    },
    getState: function() {
      /* If someone asks the store what the msgs are, show them */
     
      return {
        msgs: this.msgs,
      };
    },
    
    onAddMsg: function(payload) {
      /* Update the model if a msg is added */
      this.msgs.push(payload);
      if (this.msgs.length >= 7) {
        this.msgs.shift();
      }

      this.emit("change")
    },
   });
  
  fluxChatBoxStore.actions = {
    addMsg: function(msg_body, user_id, user_fname, msg_id, created_at) {
      /* First, update the model by calling the function above */
      this.dispatch(fluxChatBoxStore.constants.ADD_MSG, {
        id: msg_id,
        body: msg_body,
        user_id: user_id,
        user_fname: user_fname,
        created_at: created_at.toString().substring(0,10) + ' ' + created_at.toString().substring(15,21)
      });
     
      // Post to backend to create a new message
      // For example
      // $.ajax({
      //   type: "POST",
      //   url: "/message",
      //   data: {
      //     body: msg_body,
      //     user_id: user_id
      //   },
      //   success: function() {
      //     // 
      //   },
      //   failure: function() {
          
      //   }
    }
    
  };
  
  /* Initalize the Fluxxor store when needed */
  fluxChatBoxStore.init = function(msgs) {
    var tempStore = {
      ChatBoxStore: new fluxChatBoxStore.store({
        msgs: msgs
      })
    };
    fluxChatBoxStore.flux = new Fluxxor.Flux(tempStore, fluxChatBoxStore.actions);
  }
  
  /* DEFINE REACT COMPONENTS */

  var Msg = React.createClass({
    render: function() {
     
      return (
        <div className="message_body" style={{width: '100%', height:'auto'}}>
          <p dangerouslySetInnerHTML={{__html: this.props.children}} />
          <br />
          <p className="invitee-name"> {this.props.author} <i className="fa fa-comment"></i> <span className="pull-right"> @ {this.props.created_at} </span> </p>
          
          <hr />
        </div>
      );
    }
  });

  var MsgList = React.createClass({
    render: function() {
      var msgNodes = this.props.msgs.map(function (msg) {
        return (
          <Msg author={msg.user_fname} created_at={msg.created_at} key={msg.body}>
            {msg.body}
          </Msg>
         
        );
      });
      return (
        <div className="msgList">
          {msgNodes}
        </div>
      );
    }
  });

  var MsgForm = React.createClass({
    handleSubmit: function(e) {
      e.preventDefault();
      var user_id = 10
      var user_fname = 'Hsin'
      var text = React.findDOMNode(this.refs.body).value.trim();
      var time = new Date();
      var id = 0
      if (!text) {
        return;
      }
      this.props.onMsgSubmit({body: text, user_id: user_id, user_fname: user_fname, id: id, created_at: time.toString()});
     // React.findDOMNode(this.refs.author).value = '';
      React.findDOMNode(this.refs.body).value = '';
      return;
    },
    render: function() {
      return (
        <div>
        <textarea placeholder="Compose your message here..." ref="body"></textarea>
        <button className="btn-primary" onClick={this.handleSubmit} > <i className="fa fa-comments fa-lg"></i></button>
        </div>
      );
    }
  });
    
   var ChatBox = React.createClass({
     mixins: [FluxMixin, StoreWatchMixin("ChatBoxStore")],

    getStateFromFlux: function() {
      var flux = this.getFlux();
      return {
        msgs: flux.store("ChatBoxStore").getState().msgs
      };
    },
    handleMsgSubmit: function(msg) {
     
      this.getFlux().actions.addMsg(msg.body, msg.user_id, msg.user_fname, msg.id, msg.created_at)
    },

    render: function() {
      var props = this.props;
      return (
        <div className="chatBox">
          
          <MsgList msgs={this.state.msgs} flux={props.flux} />
          <MsgForm onMsgSubmit={this.handleMsgSubmit} number_msgs={this.state.msgs.length} flux={props.flux} />
        </div>
      );
    }
  });
  
  
  /* LOAD FLUXXOR STORE AND RENDER REACT COMPONENTS TO THE PAGE */
  
  fluxChatBoxStore.init(msgs);
  React.render(<ChatBox flux={fluxChatBoxStore.flux} />, 
    document.getElementById('message_box'));
}