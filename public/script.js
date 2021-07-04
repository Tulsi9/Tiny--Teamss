const socket = io('/');
const videoGrid = document.getElementById('video-grid');
const myVideo=document.createElement('video');
const showChat = document.querySelector("#showChat");
myVideo.muted=true;
showChat.addEventListener("click", () => {
  document.querySelector(".main__right").style.display = "flex";
  document.querySelector(".main__right").style.flex = "1";
  document.querySelector(".main__left").style.display = "none";
  document.querySelector(".header__back").style.display = "block";
});
const myPeers={}
var peer = new Peer(undefined,{
    path:'/peerjs',
    host:'/',
    port:'443'

});
alert('Welcome to Tiny-teams!');
let  username = prompt("Enter username");

let myVideoStream

navigator.mediaDevices.getUserMedia({
    video:true,
    audio:true
}).then(stream=>{
    myVideoStream=stream;
    addVideoStream(myVideo,stream);

    peer.on('call',call=>{
        call.answer(stream)
        const video=document.createElement('video')
        call.on('stream',userVideoStream =>{
            addVideoStream(video,userVideoStream)
        })
    })
   socket.on('user-connected',(userId)=>{
    connectToNewUser(userId,stream);
})

let text = $('input')


$('html').keydown((e)=>{
    if(e.which == 13 && text.val().length !=0){
        socket.emit('message',text.val());
        text.val('')
    }
});

socket.on('createMessage',message => {
  $('.messages').append(`<li class="message"><b>${username}</b><br/>${message}</li>`) ;
  scrollToBottom()
})
})

peer.on('open',id=>{
    socket.emit('join-room',ROOM_ID,id);
 
})
socket.on('user-disconnected', userId => {
  if (myPeers[userId]) myPeers[userId].close()
})



const connectToNewUser=(userId,stream)=>{
   const  call =peer.call(userId,stream)
   const video=document.createElement('video')
   call.on('stream',userVideoStream => {
      addVideoStream(video,userVideoStream)
   })
   call.on('close', () => {
    video.remove()
  })

  myPeers[userId] = call
}



const addVideoStream = (video,stream)=>{
    video.srcObject= stream;
    video.addEventListener('loadedmetadata',()=>{
        video.play();
    })
    videoGrid.append(video);
}

const scrollToBottom=() =>{
    let d=$('.main_chat_window');
    d.scrollTop(d.prop("scrollHeigth"));
}
const inviteButton = document.querySelector("#inviteButton");
const muteButton = document.querySelector("#muteButton");
const stopVideo = document.querySelector("#stopVideo");
muteButton.addEventListener("click", () => {
  const enabled = myVideoStream.getAudioTracks()[0].enabled;
  if (enabled) {
    myVideoStream.getAudioTracks()[0].enabled = false;
    html = `<i class="fas fa-microphone-slash"></i>`;
    muteButton.classList.toggle("background__red");
    muteButton.innerHTML = html;
  } else {
    myVideoStream.getAudioTracks()[0].enabled = true;
    html = `<i class="fas fa-microphone"></i>`;
    muteButton.classList.toggle("background__red");
    muteButton.innerHTML = html;
  }
});

  stopVideo.addEventListener("click", () => {
    const enabled = myVideoStream.getVideoTracks()[0].enabled;
    if (enabled) {
      myVideoStream.getVideoTracks()[0].enabled = false;
      html = `<i class="fas fa-video-slash"></i>`;
      stopVideo.classList.toggle("background__red");
      stopVideo.innerHTML = html;
    } else {
      myVideoStream.getVideoTracks()[0].enabled = true;
      html = `<i class="fas fa-video"></i>`;
      stopVideo.classList.toggle("background__red");
      stopVideo.innerHTML = html;
    }
  });
  inviteButton.addEventListener("click", (e) => {
  prompt(
    "Copy this link and send it to people you want to meet with",
    window.location.href
  );
});

socket.on("createMessage", (message, userName) => {
  messages.innerHTML =
    messages.innerHTML +
    `<div class="message">
        <b><i class="far fa-user-circle"></i> <span> ${
          userName === user ? "me" : userName
        }</span> </b>
        <span>${message}</span>
    </div>`;
});