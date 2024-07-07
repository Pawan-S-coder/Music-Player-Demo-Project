const songs = [
    { id: 1, name: "Song1", artist: "Artist1", img: "image/song1.jpeg", genre: "Rock", source: "music/Song1.mp3" },
    { id: 2, name: "Song2", artist: "Artist2", img: "image/song2.jpeg", genre: "Pop", source: "music/song2.mp3" },
    { id: 3, name: "song3", artist: "Artist3", img: "image/song3.jpeg", genre: "Hip-hop", source: "music/song3.mp3" },
    { id: 4, name: "song4", artist: "Artist4", img: "image/song4.jpeg", genre: "Pop", source: "music/song4.mp3" },
    { id: 5, name: "song5", artist: "Artist5", img: "image/song5.jpeg", genre: "Hip-hop", source: "music/song5.mp3" },
    // Add more songs here
];

document.addEventListener('DOMContentLoaded',()=>{
   
    function toggleTheme() {
        document.body.classList.toggle('dark-mode');
    }
    const toggle= document.getElementById('toggle');
    toggle.addEventListener('click',toggleTheme);

    // rendering all songs 

    function showSongs(genre = "all") {
        const allSongsDiv = document.getElementById('allSongs');
        allSongsDiv.innerHTML = '';
    
        const filteredSongs = genre === "all" ? songs : songs.filter(song => song.genre === genre);
    
        filteredSongs.forEach(song => {
            const songItem = document.createElement('li');
            songItem.classList.add('songItem');
            songItem.innerHTML = `
                <img src="${song.img}" alt="${song.name}">
                <h5>${song.name} <br><div class="subtitle">${song.artist}</div></h5>
                <button onclick="renderCurrentSong(${song.id})">Play</button>
                <button onclick="addToPlaylist(${song.id})">Add to Playlist</button>
            `;
            allSongsDiv.appendChild(songItem);
        });
    }
    
// add event listener in genere options

document.getElementById('genreSelect').addEventListener('change', (event) => {
    showSongs(event.target.value);
});
// song card section for current selected song
let currentIndex = 0;

function renderCurrentSong(id) {
    const song = songs.find(song => song.id === id);
    document.getElementById('currentSongImg').src = song.img;
    document.getElementById('currentSongName').innerText = song.name;
    document.getElementById('currentSongArtist').innerText = song.artist;

    const audio = new Audio(song.source);
    audio.play();

    currentIndex = songs.indexOf(song);
}

function previousSong() {
    currentIndex = (currentIndex - 1 + songs.length) % songs.length;
    renderCurrentSong(songs[currentIndex].id);
    audio.play();
}
document.getElementById('prev').addEventListener('click',previousSong);

function nextSong() {
    currentIndex = (currentIndex + 1) % songs.length;
    renderCurrentSong(songs[currentIndex].id);
    audio.play();
}
document.getElementById('nextSong').addEventListener('click',nextSong);

//  add to the playlist function
let playlist = [];

function addToPlaylist(id) {
    const song = songs.find(song => song.id === id);
    if (!playlist.includes(song)) {
        playlist.push(song);
    }
}
// create playlist function
function createPlaylist(name) {
    const newPlaylist = { name, songs: [] };
    playlists.push(newPlaylist);
    updatePlaylistUI();
}

function updatePlaylistUI() {
    const playlistDiv = document.getElementById('playlists');
    playlistDiv.innerHTML = '';
    playlists.forEach(playlist => {
        const playlistItem = document.createElement('div');
        playlistItem.innerHTML = `
            <h4>${playlist.name}</h4>
            <button onclick="renderPlaylistSongs('${playlist.name}')">View Songs</button>
        `;
        playlistDiv.appendChild(playlistItem);
    });
}

// render playlist songs
function renderPlaylistSongs(name) {
    const playlist = playlists.find(pl => pl.name === name);
    const playlistSongsDiv = document.getElementById('playlistSongs');
    playlistSongsDiv.innerHTML = '';

    playlist.songs.forEach(song => {
        const songItem = document.createElement('li');
        songItem.classList.add('songItem');
        songItem.innerHTML = `
            <img src="${song.img}" alt="${song.name}">
            <h5>${song.name} <br><div class="subtitle">${song.artist}</div></h5>
        `;
        playlistSongsDiv.appendChild(songItem);
    });
}



})

















