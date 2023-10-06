const brush = document.querySelector('#brushItem')
const eraser = document.querySelector('#eraserItem')
const brushWidth = document.querySelector('#brush-width')
const brushColor = document.querySelector('#color-picker')
const brushText = brushColor.previousElementSibling // عنوان انتخاب‌کننده رنگ
const clearBtn = document.querySelector('#clearBtn')
const saveBtn = document.querySelector('#saveBtn')
const paintBoard = document.querySelector('#paint-board')
const ctx = paintBoard.getContext('2d')

let isDrowing = false
let currentWidth = 5
let currenColor = ""

const fillRect = ()=>{
  ctx.fillRect(0,0,paintBoard.width,paintBoard.height)
}

addEventListener('load',()=>{
  paintBoard.width = paintBoard.offsetWidth
  paintBoard.height = paintBoard.offsetHeight
  
  // پس زمینه به رنگ سفید باشه تا موقع ذخیره کردن دردسر نشه
  ctx.fillStyle = 'white'
  fillRect()
})

paintBoard.addEventListener('mousedown',()=>{
  isDrowing = true
  ctx.beginPath() // هربار نقطه شروع رو مبدا میگیره
  ctx.lineWidth = currentWidth
})
paintBoard.addEventListener("mousemove",(e)=>{
  if(!isDrowing) return
  ctx.lineTo(e.offsetX , e.offsetY) // مختصات رو میگیره
  ctx.strokeStyle = currenColor // تنظیم رنگ
  ctx.stroke() // ترسیم میکنه
})
paintBoard.addEventListener('mouseup',()=>{
  isDrowing = false
})

brush.addEventListener('click',()=>{
  currenColor = brushColor.value // از ورودی مقدار رنگ رو میگیره
  brush.classList.add('activeTab')
  eraser.classList.remove('activeTab')
})
brushWidth.addEventListener('change',()=>{
  currentWidth = brushWidth.value
})

brushColor.addEventListener('change',()=>{
  currenColor = brushColor.value
  brushText.style.color = currenColor
})

eraser.addEventListener('click',()=>{
  currenColor = "white" // رنگ پاک‌کن مسلما سفیده
  eraser.classList.add('activeTab')
  brush.classList.remove('activeTab')
})

clearBtn.addEventListener('click',fillRect)

saveBtn.addEventListener('click',()=>{
  const link = document.createElement('a')
  link.download = `${Date.now()}.jpg`
  link.href = paintBoard.toDataURL()
  link.click()
})