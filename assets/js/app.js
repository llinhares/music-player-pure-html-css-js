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

/* toggle music player */
/** open **/
const musicPlayer = document.querySelector('.music-player')

/** drag to open **/
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

/** double click to open **/
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
/** close **/
const musicPlayerBackBtn = document.querySelector('.music-player .back-btn')

musicPlayerBackBtn.addEventListener('click', () => {
  musicPlayer.classList.remove('active')
})

/* toggle playlist */
/** open **/
const currentPlaylist = document.querySelector('.current-playlist')
const playlistBtn = document.querySelector('.music-player .nav-btn')

playlistBtn.addEventListener('click', () => {
  currentPlaylist.classList.add('active')
})
/** close **/
const playlistBackBtn = document.querySelector('.current-playlist .back-btn')

playlistBackBtn.addEventListener('click', () => {
  currentPlaylist.classList.remove('active')
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

/** events **/
/*** play event ***/
playBtn.addEventListener('click', () => {
  playBtn.classList.remove('active')
  pauseBtn.classList.add('active')
})
/*** pause event ***/
pauseBtn.addEventListener('click', () => {
  pauseBtn.classList.remove('active')
  playBtn.classList.add('active')
})