const startBtn = document.querySelector('#start-btn')
const nextBtn = document.querySelector('#next-btn')
const field = document.querySelector('.field')
const container = document.querySelector('.container')
const levelDisplay = document.querySelector('#level-display')
const livesDisplay = document.querySelector('#lives')
const levelChoose = document.querySelector('#level-choose')
let gameIsPaused = true
let currentLevel = 0
let lives = 3
const gameOver = () => {
    if (!gameIsPaused) {
        --lives
        if (lives <= 0){
            alert ('You LOST!')
            currentLevel = 0
            lives = 3
        }
        fill()
        gameIsPaused = true
    }
}
const nextLevel = (e) => {
    if (!gameIsPaused) {
        e.stopPropagation()
        gameIsPaused = true
        currentLevel++
        field.textContent = `Level ${currentLevel} \n finished!`
        field.style.background = 'url("../images/field bg.png") center/cover'
        nextBtn.hidden = false
        startBtn.disabled = true
    }
}

const levelOne = [
    [2, 1, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 1, 3],
]
const levelTwo = [
    [0, 0, 0, 0, 1, 1, 1, 2],
    [0, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 0],
    [3, 1, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
]
const levelThree = [
    [0, 0, 0, 0, 0, 0, 3, 0],
    [0, 0, 0, 0, 0, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 1, 1],
    [0, 0, 0, 0, 0, 0, 0, 1],
    [2, 1, 1, 1, 1, 1, 1, 1],
    [0, 0, 0, 1, 1, 0, 0, 0],
    [0, 0, 0, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
]
const levelFour = [
    [0, 0, 0, 2, 1, 1, 1, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
    [0, 1, 1, 1, 0, 0, 0, 1, 0, 0],
    [3, 1, 0, 1, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 1, 1, 1, 1, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
]
const levelFive = [
    [0, 0, 0, 3, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 1, 1, 1, 1, 0, 0, 0, 2],
    [0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
    [0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
    [0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
    [0, 0, 1, 1, 1, 1, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 1, 1, 1, 1, 1],
]
const levels = {
    0: levelOne,
    1: levelTwo,
    2: levelThree,
    3: levelFour,
    4: levelFive
}

setRed = (box) => {
    box.classList.add('red')
    box.addEventListener('mouseover', gameOver)
}
setGreen = (box) => {
    box.classList.add('green')
    box.addEventListener('mouseover', (e) => {
        e.stopPropagation()
        box.classList.add('green')
    })
}
setStart = (box) => {
    box.classList.add('yellow')
    box.textContent = 'Start'
    box.addEventListener('mouseover', (e) => {
        e.stopPropagation()
        container.addEventListener('mouseover', gameOver, {once: true})
        document.querySelector('.finish').addEventListener('mouseover', nextLevel)
    })
}
field.style.whiteSpace = 'pre'
setFinish = (box) => {
    box.classList.add('yellow', 'finish')
    box.textContent = 'Finish'
}
const fill = () => {
    field.innerHTML = ''
    livesDisplay.textContent = `Lives: ${lives}`
    startBtn.disabled = false
    field.style.background = 'rgba(86,214,218,0.94)'
    levelDisplay.textContent = `Current level: ${currentLevel + 1}`
    levels[currentLevel].forEach(row => {
        row.forEach(item => {
            const box = document.createElement('div')
            const sizeX = `${100 / levels[currentLevel].length}%`
            const sizeY = `${100 / levels[currentLevel].length}%`
            box.style.width = sizeX
            box.style.height = sizeY
            if(levelChoose.value === '1' || levelChoose.value === '3'){
                box.classList.add('square')
            }

            if (item === 0) {
                setRed(box)
            } else if (item === 1) {
                setGreen(box)
            } else if (item === 2) {
                setStart(box)
            } else if (item === 3) {
                setFinish(box)
            }
            field.append(box)
        })
    })
}
fill()

startBtn.addEventListener('click', () => {
    gameIsPaused = false
    Array.from(field.children).forEach(box => {
        box.classList.remove('red')
        box.classList.remove('green')
    })
})

nextBtn.addEventListener('click', () => {
    fill()
    nextBtn.hidden = true
})

levelChoose.addEventListener('change', () => {
    Array.from(field.children).forEach(box => {
        if (levelChoose.value === '1'){
            box.classList.add('square')
            field.style.cursor = 'default'
        } else if (levelChoose.value === '2'){
            box.classList.remove('square')
            field.style.cursor = 'default'
        } else if (levelChoose.value === '3'){
            box.classList.add('square')
            field.style.cursor = 'none'
        } else if (levelChoose.value === '4'){
            box.classList.remove('square')
            field.style.cursor = 'none'
        }
    })
})