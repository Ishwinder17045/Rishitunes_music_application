console.log("Welcome to RishiTunes");

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

// Songs array with unique file paths and covers
let songs = [
    {songName: "Born to Shine", filePath: "songs/1.mp3", coverPath: "covers/1.png"},
    {songName: "Jugni", filePath: "songs/2.mp3", coverPath: "covers/2.jpg"},
    {songName: "Kinni Kinni", filePath: "songs/3.mp3", coverPath: "covers/3.jpg"},
    {songName: "Lover", filePath: "songs/4.mp3", coverPath: "covers/4.jpg"},
    {songName: "Hass Hass", filePath: "songs/5.mp3", coverPath: "covers/5.jpg"},
    {songName: "Naina", filePath: "songs/6.mp3", coverPath: "covers/6.jpg"},
    {songName: "Case", filePath: "songs/7.mp3", coverPath: "covers/7.jpg"},
    {songName: "G.O.A.T.", filePath: "songs/8.mp3", coverPath: "covers/8.jpg"},
    {songName: "Champagne", filePath: "songs/9.mp3", coverPath: "covers/9.jpg"},
    {songName: "Chauffeur", filePath: "songs/10.mp3", coverPath: "covers/10.jpg"},
];

// Update song list with images and names
songItems.forEach((element, i) => { 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
});

// Handle play/pause click for the master play button
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
});

// Listen to audio element's time update to update the progress bar smoothly
audioElement.addEventListener('timeupdate', () => {
    if (!audioElement.paused) {
        let progress = (audioElement.currentTime / audioElement.duration) * 100;
        myProgressBar.value = progress;
    }
});

// Seek bar change event for jumping to a specific time in the song
myProgressBar.addEventListener('input', () => {
    audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 100;
});

// Reset all play buttons to the play state
const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    });
};

// Play specific song when song item is clicked
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element, i) => {
    element.addEventListener('click', (e) => {
        // Check if the song clicked is already playing
        if (songIndex === i && !audioElement.paused) {
            // If the song is playing, pause it
            audioElement.pause();
            element.classList.remove('fa-pause-circle');
            element.classList.add('fa-play-circle');
            gif.style.opacity = 0;
            masterPlay.classList.remove('fa-pause-circle');
            masterPlay.classList.add('fa-play-circle');
        } else {
            // If it's a new song, play it
            makeAllPlays(); // Reset all icons
            songIndex = i;
            audioElement.src = songs[songIndex].filePath;
            masterSongName.innerText = songs[songIndex].songName;
            audioElement.currentTime = 0;  // Ensure progress bar starts from 0
            myProgressBar.value = 0;  // Reset progress bar to 0
            audioElement.play();
            element.classList.remove('fa-play-circle');
            element.classList.add('fa-pause-circle');
            gif.style.opacity = 1;
            masterPlay.classList.remove('fa-play-circle');
            masterPlay.classList.add('fa-pause-circle');
        }
    });
});

// Handle next song button click
document.getElementById('next').addEventListener('click', () => {
    songIndex = (songIndex >= songs.length - 1) ? 0 : songIndex + 1;  // Loop back to the first song
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;  // Ensure progress bar starts from 0
    myProgressBar.value = 0;  // Reset progress bar to 0
    audioElement.play();
    
    makeAllPlays();  // Reset all play icons
    document.getElementById(songIndex).classList.remove('fa-play-circle');
    document.getElementById(songIndex).classList.add('fa-pause-circle');
    
    gif.style.opacity = 1;  // Show the animation again
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');  // Update the play/pause button
});

// Handle previous song button click
document.getElementById('previous').addEventListener('click', () => {
    songIndex = (songIndex <= 0) ? songs.length - 1 : songIndex - 1;  // Loop back to the last song
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;  // Ensure progress bar starts from 0
    myProgressBar.value = 0;  // Reset progress bar to 0
    audioElement.play();
    
    makeAllPlays();  // Reset all play icons
    document.getElementById(songIndex).classList.remove('fa-play-circle');
    document.getElementById(songIndex).classList.add('fa-pause-circle');
    
    gif.style.opacity = 1;  // Show the animation again
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');  // Update the play/pause button
});

// Stop the animation when the song finishes 
audioElement.addEventListener('ended', () => {
    gif.style.opacity = 0;  // Stop the animation when the song ends
    masterPlay.classList.remove('fa-pause-circle');
    masterPlay.classList.add('fa-play-circle');  // Reset the play button
    
    // Move to the next song
    songIndex = (songIndex >= songs.length - 1) ? 0 : songIndex + 1;  // Loop to the next song
    audioElement.src = songs[songIndex].filePath;  // Update to the new song's file
    masterSongName.innerText = songs[songIndex].songName;  // Update the song name
    audioElement.currentTime = 0;  // Start from the beginning
    myProgressBar.value = 0;  // Reset progress bar to 0
    audioElement.play();  // Play the next song
    gif.style.opacity = 1;  // Show the animation again
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');  // Update the play/pause button
});
