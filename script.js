// Initalized variables

let songIndex = 0;
let audioElement = new Audio('statics/songs/khaasHai.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgessBar');
let playingGif = document.getElementById("playingGif");
let songItems = Array.from(document.getElementsByClassName('songItem'));
let currentSongName = document.getElementById('currentSongName');

let songs = [
    { songName: "Khaas Hai", filePath: "statics/songs/khaasHai.mp3", coverPath: "statics/cover/khaasHai.jpg" },
    { songName: "Arjan Vailly", filePath: "statics/songs/arjanVailly.mp3", coverPath: "statics/cover/arjanVailly.jpg" },
    { songName: "Maan Meri Jaan", filePath: "statics/songs/maanMeriJaan.mp3", coverPath: "statics/cover/maanMeriJaan.jpg" },
    { songName: "Tere Pyaar Mein", filePath: "statics/songs/terePyaarMein.mp3", coverPath: "statics/cover/terePyaarMein.jpg" },
    { songName: "Still Rolling", filePath: "statics/songs/stillRolling.mp3", coverPath: "statics/cover/stillRolling.jpg" },
    { songName: "Saari Duniyan Jaala Denge", filePath: "statics/songs/saariDuniyan.mp3", coverPath: "statics/cover/saariDuniyan.jpg" },
    { songName: "Cheques", filePath: "statics/songs/cheques.mp3", coverPath: "statics/cover/cheques.jpeg" },
    { songName: "Raataan Lambiyan", filePath: "statics/songs/raataanLambiyan.mp3", coverPath: "statics/cover/raataanLambiyan.jpg" },

];


songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerHTML = songs[i].songName;
});


// play and pause music 
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        playingGif.style.opacity = 1;


        return;
    }
    audioElement.pause();
    masterPlay.classList.remove('fa-pause-circle');
    masterPlay.classList.add('fa-play-circle');
    playingGif.style.opacity = 0;
    makeAllPlay();
})


// Listening Events 
audioElement.addEventListener('timeupdate', () => {
    var progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
});


myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 100;
});


const makeAllPlay = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
};


Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        makeAllPlay();

        songIndex = parseInt(e.target.id);

        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');

        audioElement.src = songs[songIndex].filePath;
        audioElement.currentTime = 0;

        // change currentsong name 
        currentSongName.innerText = songs[songIndex].songName;

        // toggle masterplay button
        var event = new Event("click");
        masterPlay.dispatchEvent(event);

    })
})


document.getElementById('next').addEventListener('click', (element) => {
    if (songIndex >= songs.length)
        songIndex = 0;
    else
        songIndex += 1;


    //for next song
    audioElement.src = songs[songIndex].filePath;
    audioElement.currentTime = 0;

    // change currentsong name 
    currentSongName.innerText = songs[songIndex].songName;

    // toggle masterplay button
    var event = new Event("click");
    masterPlay.dispatchEvent(event);
});

document.getElementById('previous').addEventListener('click', (element) => {
    if (songIndex <= 0)
        songIndex = 0;
    else
        songIndex -= 1;


    //for next song
    audioElement.src = songs[songIndex].filePath;
    audioElement.currentTime = 0;

    // change currentsong name 
    currentSongName.innerText = songs[songIndex].songName;

    // toggle masterplay button
    var event = new Event("click");
    masterPlay.dispatchEvent(event);
});
