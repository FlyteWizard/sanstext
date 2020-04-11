// Global
let userStreamer = "";

// Connect to Twitch Chat
ComfyJS.onChat = (user, message, flags, self, extra) => {
  // Add Message to Vue Data
  chat.messages.push({ 
    username: user,
    usernameColor: extra.userColor,
    message: message
  })

  // Only Store 15 Messages
  if (chat.messages.length > 15) {
    // Remove the First Message
    chat.messages.splice(0, 1);
  }
}

// Vue chat-message
Vue.component('chat-message', {
  props: [
    'messages',
  ],
  data: function (props) {
    // isColourWhite
    if (props.messages.usernameColor === "#FFFFFF") {
      return {
        isColourWhite: true
      }
    } else {
      return {
        isColourWhite: false
      }
    }
  },
  template: '\
    <div class="col-12 card">\
      <div class="card-body">\
        <h2 v-if="!isColourWhite" v-bind:style="{ color: messages.usernameColor }">\
          {{ messages.username }}\
        </h2>\
        <h2 v-else>\
          {{ messages.username }}\
        </h2>\
        <p>{{ messages.message }}</p>\
      </div>\
    </div>\
  '
})

// Chat Data
let chat = new Vue({
  el: '#chat',
  data: {
    messages: [
      {
        username: 'FlyteWizard',
        usernameColor: '#FF69B4',
        message: 'Welcome to SansText! A simple Twitch Chat App.'
      }
    ]
  }
})

// Streamer Data
let streamer = new Vue({
  el: '#streamer',
  data: {
    streamer: ''
  }
})

// setStreamer
let setStreamer = () => {
  // Disconnect from Streamers Chat
  if ( userStreamer ) {
    ComfyJS.Disconnect();
  }

  // Remove All Messages
  chat.messages.splice(0);

  // Set Streamer
  userStreamer = streamer.streamer;

  // Connect to Streamers Chat
  ComfyJS.Init(userStreamer);
}

// Prevents Form Refresh On Submit
// Keyboard Submit
document.getElementById('streamer').addEventListener('keypress', function (event) {
  if (event.keyCode == 13) {
    event.preventDefault();
    document.getElementById("setStreamerFunction").click();
  }
});
