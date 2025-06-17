// Cookie Game
const cookieGrid = document.getElementById('cookie-grid')
const gameMessage = document.getElementById('game-message')
const nextButton = document.getElementById('next-game-btn')
const afterMessage = document.getElementById('after-msg')

let poisonedIndex = Math.floor(Math.random() * 10)
let score = 0
let gameOver = false

for (let i = 0; i < 10; i++) {
  const img = document.createElement('img')
  img.src = 'cookie.png'
  img.classList.add('cookie')
  img.dataset.index = i

  const randX = Math.floor(Math.random() * 80) + 5
  const randY = Math.floor(Math.random() * 80) + 5
  img.style.left = `${randX}%`
  img.style.top = `${randY}%`

  img.addEventListener('click', () => {
    if (gameOver || img.dataset.eaten === 'true') return
    const idx = parseInt(img.dataset.index)
    if (idx === poisonedIndex) {
      document.body.classList.add('poisoned')
      gameMessage.textContent = `You have been poisoned You died Score ${score}/9`
      gameOver = true
      document.querySelectorAll('.cookie').forEach(el => el.remove())
      nextButton.style.display = 'inline-block'
      afterMessage.style.display = 'block'
    } else {
      score++
      img.dataset.eaten = 'true'
      img.remove()
      const nom = document.createElement('div')
      nom.textContent = 'nom nom nom'
      nom.classList.add('nom-text')
      nom.style.left = img.style.left
      nom.style.top = img.style.top
      cookieGrid.appendChild(nom)
      setTimeout(() => nom.remove(), 1500)
      if (score === 9) {
        gameMessage.textContent = `Perfect You ate all the safe cookies Score ${score}/9`
        gameOver = true
        nextButton.style.display = 'inline-block'
        afterMessage.style.display = 'block'
      }
    }
  })

  cookieGrid.appendChild(img)
}

// Whack‑a‑mole
const alexFaces = ['alex1.jpg','alex2.jpg','alex3.jpg','alex4.jpg']
const nicoFaces = ['IMG_6659.jpg','IMG_6830.jpg','IMG_7171.jpg']

const whackArea = document.getElementById('whack-area')
const startBtn = document.getElementById('start-whack-btn')
const msgBox = document.getElementById('whack-message')
const scoreBox = document.getElementById('whack-score')
const nextWhackBtn = document.getElementById('whack-next-btn')

let total=0, hits=0, penalties=0, startTime, gameInterval, gameActive=false

startBtn.addEventListener('click', () => {
  startBtn.style.display='none'
  scoreBox.style.display='none'
  nextWhackBtn.style.display='none'
  msgBox.textContent='Game starting in 3 2 1 GO'
  whackArea.innerHTML=''
  total=hits=penalties=0
  gameActive=true
  setTimeout(() => {
    if(!gameActive) return
    msgBox.textContent='Whack the Alexes Avoid hitting Nico'
    startTime=Date.now()
    gameInterval=setInterval(spawnImage,1500)
    setTimeout(endGame,30000)
  },3000)
})

function spawnImage() {
  if(!gameActive) return
  const elapsed=(Date.now()-startTime)/1000
  const interval=elapsed>20?600:1500
  clearInterval(gameInterval)
  gameInterval=setInterval(spawnImage,Math.max(interval-elapsed*20,300))
  const isNico=Math.random()<0.2
  const src=isNico?nicoFaces[Math.floor(Math.random()*nicoFaces.length)]:alexFaces[Math.floor(Math.random()*alexFaces.length)]
  const img=document.createElement('img')
  img.src=src
  img.classList.add('whack-img')
  const x=Math.random()*85, y=Math.random()*85
  img.style.left=`${x}%`
  img.style.top=`${y}%`
  whackArea.appendChild(img)
  total++
  img.addEventListener('click', () => {
    if(!gameActive) return
    if(isNico) { penalties++; showText('Ouch',x,y,'#FF4444') }
    else { hits++; showText('Whack',x,y,'#44FF44') }
    img.remove()
  })
  setTimeout(() => { if(whackArea.contains(img)) img.remove() }, elapsed>20?randomTime(800,1500):randomTime(1500,2500))
}

function randomTime(min,max){return Math.floor(Math.random()*(max-min))+min}
function showText(txt,x,y,color){
  const t=document.createElement('div'); t.className='whack-text'; t.style.left=`${x}%`; t.style.top=`${y}%`; t.style.color=color; t.textContent=txt; whackArea.appendChild(t); setTimeout(() => { if(whackArea.contains(t)) t.remove() },1500)
}

function endGame() {
  gameActive=false
  clearInterval(gameInterval)
  whackArea.innerHTML=''
  const finalScore=Math.max(0,hits-penalties)
  const accuracy=total?Math.round((hits/(hits+penalties))*100):0
  let msg=`GAME OVER Alexes Hit ${hits} Nicos Hit ${penalties} Final Score ${finalScore} Accuracy ${accuracy}%`
  if(accuracy>=90) msg+=' Perfect You know how to protect Nico'
  else if(accuracy>=70) msg+=' Good job Just be more careful with Nico'
  else msg+=' Maybe you need more practice telling us apart'
  scoreBox.innerHTML=msg
  scoreBox.style.display='block'
  nextWhackBtn.style.display='inline-block'
  startBtn.style.display='inline-block'
  startBtn.textContent='Play Again'
}

// Dress‑up
const clothingCategories=['underwear','shirt','pants','socks','shoes','sunglasses','hat','necklace','earrings','watch']
const accessoryCategories=['sunglasses','hat','necklace','earrings','watch']
let currentCategory=0, selectedClothing={}

document.addEventListener('DOMContentLoaded', () => showCategory(0))

function showCategory(idx) {
  document.querySelectorAll('.clothing-category').forEach(cat => cat.style.display='none')
  if(idx>=clothingCategories.length){ finishDressup(); return }
  const name=clothingCategories[idx]
  let div=document.getElementById(`category-${name}`)
  if(!div){ div=createCategoryDiv(name); document.querySelector('.clothing-selection').appendChild(div) }
  div.style.display='block'
  currentCategory=idx
}

function createCategoryDiv(name){
  const div=document.createElement('div'); div.className='clothing-category'; div.id=`category-${name}`
  const title=document.createElement('div'); title.className='category-title'; title.textContent=name.charAt(0).toUpperCase()+name.slice(1)
  div.appendChild(title)
  const opts=document.createElement('div'); opts.className='clothing-options'
  for(let i=1;i<=4;i++){
    const opt=document.createElement('div'); opt.className='clothing-option'; opt.dataset.type=name; opt.dataset.item=i
    const img=document.createElement('img'); img.src=`${name}${i}.jpg`; img.alt=`${name} ${i}`; opt.appendChild(img)
    opt.addEventListener('click',()=>selectClothing(name,i,opt))
    opts.appendChild(opt)
  }
  if(accessoryCategories.includes(name)){
    const noneOpt=document.createElement('div'); noneOpt.className='clothing-option'; noneOpt.dataset.type=name; noneOpt.dataset.item='none'
    const noneX=document.createElement('div'); noneX.className='none-option'; noneX.textContent='✕'; noneOpt.appendChild(noneX)
    noneOpt.addEventListener('click',()=>selectClothing(name,'none',noneOpt))
    opts.appendChild(noneOpt)
  }
  div.appendChild(opts)
  return div
}

function selectClothing(type,item,el){
  document.querySelectorAll(`[data-type="${type}"]`).forEach(e=>e.classList.remove('selected'))
  el.classList.add('selected')
  selectedClothing[type]=item
  addClothingToFigure(type,item)
  setTimeout(()=>showCategory(currentCategory+1),800)
}

function addClothingToFigure(type,item){
  const exist=document.querySelector(`.clothing-item.${type}`)
  if(exist) exist.remove()
  if(item==='none') return
  const div=document.createElement('div'); div.className=`clothing-item ${type}`
  const img=document.createElement('img'); img.src=`${type}${item}.jpg`; img.alt=`${type} ${item}`; div.appendChild(img)
  document.querySelector('.body').appendChild(div)
  setTimeout(()=>div.classList.add('visible'),100)
}

function finishDressup(){
  document.querySelector('.clothing-selection').style.display='none'
  const fig=document.getElementById('boyfriend-figure'); fig.classList.add('center','dancing')
  setTimeout(()=>{ document.getElementById('final-message').classList.add('visible'); setTimeout(()=>document.querySelector('.final-buttons').classList.add('visible'),1000) },2000)
}

function restartDressup(){
  currentCategory=0; selectedClothing={}
  const fig=document.getElementById('boyfriend-figure'); fig.classList.remove('center','dancing')
  document.querySelectorAll('.clothing-item').forEach(i=>i.remove())
  document.querySelector('.clothing-selection').style.display='block'
  document.getElementById('final-message').classList.remove('visible')
  document.querySelector('.final-buttons').classList.remove('visible')
  document.querySelectorAll('.clothing-option').forEach(o=>o.classList.remove('selected'))
  showCategory(0)
}