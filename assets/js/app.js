/* carousel */
const carousel = [...document.querySelectorAll('.carousel img')]
let carouselImgIndex = 0

const changeCarousel = () => {
  carousel[carouselImgIndex].classList.toggle('active')

  if(carouselImgIndex >= carousel.length - 1){
    carouselImgIndex = 0
  } else{
    carouselImgIndex++
  }

  carousel[carouselImgIndex].classList.toggle('active')
}

setInterval(() => {
  changeCarousel()
}, 5000)

/* toggle music player and playlist navigation */
/** music player **/
/*** open ***/
const musicPlayer = document.querySelector('.music-player')

/*** drag to open ***/
let touchStart = 0
let touchmove = 0
musicPlayer.addEventListener('touchstart', (e) => {
  touchStart = e.touches[0].pageY
})
musicPlayer.addEventListener('touchmove', (e) => {
  touchmove = e.touches[0].pageY
  if(touchStart > touchmove){
    musicPlayer.classList.add('active')
  }
})

/*** double click to open ***/
let doubleClick = 1

musicPlayer.addEventListener('click', () => {
  if(doubleClick >= 2){
    musicPlayer.classList.add('active')
    doubleClick = 1
    return
  }
  doubleClick++
  setTimeout(() => {
    doubleClick = 1
  }, 250)
})
/*** close ***/
const musicPlayerBackBtn = document.querySelector('.music-player .back-btn')

musicPlayerBackBtn.addEventListener('click', () => {
  musicPlayer.classList.remove('active')
})

/** toggle playlist **/
/*** open ***/
const currentPlaylist = document.querySelector('.current-playlist')
const playlistBtn = document.querySelector('.music-player .nav-btn')

playlistBtn.addEventListener('click', () => {
  currentPlaylist.classList.add('active')
})
/*** close ***/
const playlistBackBtn = document.querySelector('.current-playlist .back-btn')

playlistBackBtn.addEventListener('click', () => {
  currentPlaylist.classList.remove('active')
})

/* playlist */
const queueList = document.querySelector('.queue-list')

/** mount playlist **/
songs.forEach((item, i) => {
  let active = (i == 0)? 'active' : ''
  queueList.innerHTML += `
  <div class="queue ${active}">
    <div class="queue-cover">
        <img src="${item['cover']}" alt="" />
        <i class="fas fa-pause"></i>
    </div>
    <p class="name">${item['name']}</p>
  </div>
  `
})

/* audio */
/** audio properties **/
let currentMusic = 0

const music = document.querySelector('#audio-source')
const seekBar = document.querySelector('.music-seek-bar')
const songName = document.querySelector('.current-song-name')
const artistName = document.querySelector('.artist-name')
const coverImage = document.querySelector('.music-cover')
const currentTime = document.querySelector('.current-time')
const duration = document.querySelector('.duration')

/** button **/
const repeatBtn = document.querySelector('.music-player-controls span.fa-redo')
const backwardBtn = document.querySelector('.music-player-controls i.fa-backward')
const playBtn = document.querySelector('.music-player-controls i.fa-play')
const pauseBtn = document.querySelector('.music-player-controls i.fa-pause')
const forwardBtn = document.querySelector('.music-player-controls i.fa-forward')
const volumeBtn = document.querySelector('.music-player-controls span.fa-volume-up')
const volumeSlider = document.querySelector('.music-player-controls .volume-slider')

/** playlist **/
const queue = [...document.querySelectorAll('.queue')]

/** events **/
/*** play event ***/
playBtn.addEventListener('click', () => {
  music.play()
  playBtn.classList.remove('active')
  pauseBtn.classList.add('active')
})
/*** pause event ***/
pauseBtn.addEventListener('click', () => {
  music.pause()
  pauseBtn.classList.remove('active')
  playBtn.classList.add('active')
})
/*** seekbar ***/
setInterval(() => {
  seekBar.value = music.currentTime
  currentTime.innerHTML = formatTime(music.currentTime)
  if(Math.floor(music.currentTime) == Math.floor(seekBar.max)){
    if(repeatBtn.className.includes('active')){
      setMusic(currentMusic)
      playBtn.click()
    }
    else{
      forwardBtn.click()
    }
  }
}, 500)

seekBar.addEventListener('change', () =>{
  music.currentTime = seekBar.value
})
/*** forward button ***/
forwardBtn.addEventListener('click', () => {
  if(currentMusic >= songs.length - 1){
    currentMusic = 0
  } else{
    currentMusic++
  }

  setMusic(currentMusic)
  playBtn.click()
})
/*** forward button ***/
backwardBtn.addEventListener('click', () => {
  if(currentMusic <= 0){
    currentMusic = songs.length - 1
  } else{
    currentMusic--
  }

  setMusic(currentMusic)
  playBtn.click()
})
/*** repeat button ***/
repeatBtn.addEventListener('click', () => {
  repeatBtn.classList.toggle('active')
})
/*** volume control ***/
volumeBtn.addEventListener('click', () => {
  volumeBtn.classList.toggle('active')
  volumeSlider.classList.toggle('active')
})

volumeSlider.addEventListener('input', () => {
  music.volume = volumeSlider.value
})
/*** set music ***/
const setMusic = (i) => {
  seekBar.value = 0
  let song = songs[i]
  currentMusic = i
  music.src = song.path
  songName.innerHTML = song.name
  artistName.innerHTML = song.artist
  coverImage.src = song.cover

  setTimeout(() => {
    seekBar.max = music.duration
    duration.innerHTML = formatTime(music.duration)
  }, 300)
  currentTime.innerHTML = '00:00'
  queue.forEach(item => item.classList.remove('active'))
  queue[currentMusic].classList.add('active')
}
/*** format music duration 00:00 ***/
const formatTime = (time) => {
  let min = Math.floor(time / 60)

  if(min < 10){
      min = `0` + min
  }

  let sec = Math.floor(time % 60)

  if(sec < 10){
      sec = `0` + sec
  }

  return `${min}:${sec}`
}

/* playlist events */
queue.forEach((item, i) => {
  item.addEventListener('click', () => {
    setMusic(i)
    playBtn.click()
  })
})

/* start playlist music*/
setMusic(0)