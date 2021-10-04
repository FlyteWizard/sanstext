// Global
let userStreamer = '';

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

  // Scroll to Bottom
  chatMessage = document.querySelector('#chat');
  chatMessage.scrollTop = chatMessage.scrollHeight;
}

// Vue chat-message
Vue.component('chat-message', {
  props: [
    'messages',
  ],
  data: function (props) {
    // isColourWhite
    if (props.messages.usernameColor === '#FFFFFF') {
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
        usernameColor: '#7D3CFF',
        message: 'Welcome to SansText! A simple Twitch Chat App.'
      },
      {
        username: 'Dominique',
        usernameColor: '#01D7F9',
        message: 'Set a Streamer to connect to Twitch Chat.'
      },
      {
        username: 'Flyte',
        usernameColor: '#FDCC42',
        message: 'Explore the project on GitHub: https://github.com/FlyteWizard/sanstext'
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
    // Remove UserStreamer
    localStorage.removeItem(userStreamer);
    // Disconnect from Twitch Chat
    ComfyJS.Disconnect();
  }

  // Remove All Messages
  chat.messages.splice(0);

  // Set Streamer
  userStreamer = streamer.streamer;
  
  // Set UserStreamer
  localStorage.setItem('userStreamer', userStreamer);

  // Connect to Streamers Chat
  ComfyJS.Init(userStreamer);
}

// Refresh with Connected Streamer
if (localStorage.getItem('userStreamer')) {
  // Get Streamer
  userStreamer = localStorage.getItem('userStreamer');

  // Remove All Messages
  chat.messages.splice(0);

  // Set Streamer
  streamer.streamer = userStreamer;

  // Connect to Streamers Chat
  ComfyJS.Init(userStreamer);
}

// Prevents Form Refresh On Submit
// Keyboard Submit
document.getElementById('streamer').addEventListener('keypress', function (event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    document.getElementById('setStreamerFunction').click();
  }
});
