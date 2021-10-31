const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: "Peristiwa masuknya zat atau komponen lainnya ke dalam lingkungan perairan sehingga mutu air terganggu disebut pencemaran...",
        choice1: "tanah",
        choice2: "air",
        choice3: "udara",
        choice4: "suara",
        answer: 2,
    },
    {
        question: "Berikut jenis-jenis pencemaran yang benar kecuali...",
        choice1: "pencemaran udara",
        choice2: "pencemaran air",
        choice3: "pencemaran tanah",
        choice4:"pencemaran pabrik",
        answer: 4,
    },
    {
        question: "Contoh polusi udara yang terjadi secara alami adalah ...",
        choice1: "kebakaran hutan",
        choice2: "gas dari aktifitas gunung berapi",
        choice3: "pembakaran sampah",
        choice4: "asap dari kendaraan bermotor",
        answer: 2,
    },  
    {
        question: "Kegiatan manusia apa saja yang dapat mencemari lingkungan...",
        choice1: "penggunaan transportasi, asap industri, membuang sampah sembarangan ",
        choice2: "pariwisata, memancing ,membuang sampah sembarangan",
        choice3: "belajar, membuang sampah pada tempatnya, reboisasi",
        choice4: "reboisasi, sistem tebang pilih, menggunakan air dengan bijak",
        answer: 1,
    },  
    {
        question: "Kehadiran satu atau lebih substansi fisik, kimia, atau biologi di atmosfer dalam jumlah yang dapat membahayakan Kesehatan manusia, hewan, dan tumbuhan, serta mengganggu estetika dan kenyaman atau, merusak properti disebut pencemaran...",
        choice1: "udara",
        choice2: "air",
        choice3: "tanah",
        choice4: "suara",
        answer: 1,
    },
    {
        question: "Keadaan dimana adanya berbagai bahan substansi kimia yang masuk ke dalam lapisan tanah sehingga merubah struktur dan lingkungan di dalam tanah disebut pencemaran...",
        choice1: "udara",
        choice2: "air",
        choice3: "tanah",
        choice4: "suara",
        answer: 3,
    },
    {
        question: "Berikut jenis penyakit yang disebabkan oleh pencemaran udara adalah ...",
        choice1: "asma, bronkitis, ISPA",
        choice2: "mual, pusing, diare",
        choice3: "penyakit kulit, kanker, asma",
        choice4: "diare, bronkitis, gangguan pernapasan ",
        answer: 1,
    },
    {
        question: "Berikut penyakit yang disebabkan oleh pencemaran air adalah ...",
        choice1: "bronkitis",
        choice2: "asma",
        choice3: "kerusakan hati",
        choice4: "diare",
        answer: 4,
    },
    {
        question: "Berikut jawaban yang tepat tentang menjaga lingkungan dari pencemaran adalah ...",
        choice1: "membuang sampah sembarangan",
        choice2: "menggunakan pestisida secara berlebihan",
        choice3: "mencemari sungai",
        choice4: "membuang sampah pada tempatnya",
        answer: 4,
    },
    {
        question: "apa dampak dari pencemaran lingkungan bagi hewan?",
        choice1: "kehilangan habitat aslinya",
        choice2: "kehilangan sumber makanan",
        choice3: "mudah terkena penyakit",
        choice4: "jawaban betul semua",
        answer: 4,
    }  
]

const SCORE_POINTS = 10
const MAX_QUESTIONS = 10

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
    
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()