let track_art = document.querySelector('.track-art');
let track_name = document.querySelector('.track-name');
let track_artist = document.querySelector('.track-artist');
let playpause_btn = document.querySelector('.playpause-track');
let next_btn = document.querySelector('.next-track');
let prev_btn = document.querySelector('.prev-track');
let seek_slider = document.querySelector('.seek_slider');
let volume_slider = document.querySelector('.volume_slider');
let curr_time = document.querySelector('.current-time');
let total_duration = document.querySelector('.total-duration');
let randomIcon = document.querySelector('.fa-random');
let curr_track = document.createElement('audio');
let track_index = 0;
let isPlaying = false;
let isRandom = false;
let updateTimer;

// Array of the Music List
const music_list = [
{
    img : 'images/on-and-on.jpg',
    name : 'On and On',
    artist : 'Cartoon, Daniel Levi, Jéja',
    music : 'music/on and on.mp3'
},
{
    img : 'images/mortals.jpg',
    name : 'Mortals',
    artist : 'Warriyo, Laura Brehm',
    music : 'music/mortals.mp3'
},
{
    img : 'images/royalty.jpg',
    name : 'Royalty',
    artist : 'Egzod, Maestro Chives, Neoni',
    music : 'music/royalty.mp3'
}
];

// Function to load audio tracks
loadTrack(track_index);

function loadTrack(track_index){
    clearInterval(updateTimer);
    reset();

    curr_track.src = music_list[track_index].music;
    curr_track.load();

    track_art.style.backgroundImage = "url(" + music_list[track_index].img + ")";
    track_name.textContent = music_list[track_index].name;
    track_artist.textContent = music_list[track_index].artist;

    updateTimer = setInterval(setUpdate, 1000);

    curr_track.addEventListener('ended', nextTrack);
}

// Function to Reset the UI of the application into the Original State
function reset(){
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
}

// Function to toggle Random track mode
function randomTrack(){
    isRandom ? pauseRandom() : playRandom();
}

// Function to Play random tracks
function playRandom(){
    isRandom = true;
    randomIcon.classList.add('active');
}

// Function to Diasble random tracks
function pauseRandom(){
    isRandom = false;
    randomIcon.classList.remove('active');
}

// Function to repeat the current track
function repeatTrack(){
    let current_index = track_index;
    loadTrack(current_index);
    playTrack();
}

// Functions to toggle play/pause state of the current track
function playpauseTrack(){
    isPlaying ? pauseTrack() : playTrack();
}

// Function to play the current track
function playTrack(){
    curr_track.play();
    isPlaying = true;
    playpause_btn.innerHTML = '<i class="fa-solid fa-pause fa-2xl"></i>';
    playpause_btn.classList.remove('play');
    playpause_btn.classList.add('pause');
}

// Function to pause the current track
function pauseTrack(){
    curr_track.pause();
    isPlaying = false;
    playpause_btn.innerHTML = '<i class="fa-solid fa-play fa-2xl"></i>';
    playpause_btn.classList.remove('pause');
    playpause_btn.classList.add('play');
}

// Function to play the next track
function nextTrack(){
    if(track_index < music_list.length - 1 && isRandom === false){
        track_index += 1;
    }else if(track_index < music_list.length - 1 && isRandom === true){
        let random_index = Number.parseInt(Math.random() * music_list.length);
        track_index = random_index;
    }else{
        track_index = 0;
    }
    loadTrack(track_index);
    playTrack();
}

// Function to play the previous track
function prevTrack(){
    if(track_index > 0){
        track_index -= 1;
    }else{
        track_index = music_list.length -1;
    }
    loadTrack(track_index);
    playTrack();
}

// Function to seek the current track
function seekTo(){
    let seekto = curr_track.duration * (seek_slider.value / 100);
    curr_track.currentTime = seekto;
}

// Function to set the volume of the current track
function setVolume(){
    curr_track.volume = volume_slider.value / 100;
}

// Update the UI with the current track's progress
function setUpdate(){
    let seekPosition = 0;
    if(!isNaN(curr_track.duration)){
        seekPosition = curr_track.currentTime * (100 / curr_track.duration);
        seek_slider.value = seekPosition;

        let currentMinutes = Math.floor(curr_track.currentTime / 60);
        let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(curr_track.duration / 60);
        let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

        if(currentSeconds < 10) {currentSeconds = "0" + currentSeconds; }
        if(durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
        if(currentMinutes < 10) {currentMinutes = "0" + currentMinutes; }
        if(durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

        curr_time.textContent = currentMinutes + ":" + currentSeconds;
        total_duration.textContent = durationMinutes + ":" + durationSeconds;
    }
}

// Event Listeners for the Keyboard controls of the players
document.addEventListener('keydown', function(event) {
    switch (event.key) {
      case 'k':
        playpauseTrack();
        break;
      case 'ArrowRight':
        nextTrack();
        break;
      case 'ArrowLeft':
        prevTrack();
        break;
      case 'ArrowUp':
        volume_slider.value += 10;
        setVolume();
        break;
      case 'ArrowDown':
        volume_slider.value -= 10;
        setVolume();
        break;
      default:
        break;
    }
  });