const express = require('express')
const app = express()
const port = process.env.PORT || 3400

app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
  res.render('home')
})

app.get('/leader', (req, res) => {
  res.render('leader')
})

app.get('/food', (req, res) => {
  score = 0
  res.render('food')
})

app.get('/food/:number/:points', (req, res) => {
  const questionNum = req.params['number']
  const points = +req.params['points']

  if (questionNum < 6) {
    res.render(`food${questionNum}`, { totalScore: points })
  } else if (questionNum == 6) {
    res.render('end', { totalScore: points })
  }
})

app.get('/geo', (req, res) => {
  score = 0
  res.render('geo')
})

app.get('/geo/:number/:points', (req, res) => {
  const questionNum = req.params['number']
  const points = +req.params['points']

  if (questionNum < 6) {
    res.render(`geo${questionNum}`, { totalScore: points })
  } else if (questionNum == 6) {
    res.render('end', { totalScore: points })
  }
})

app.get('/science', (req, res) => {
  score = 0
  res.render('science')
})

app.get('/science/:number/:points', (req, res) => {
  const questionNum = req.params['number']
  const points = +req.params['points']

  if (questionNum < 6) {
    res.render(`science${questionNum}`, { totalScore: points })
  } else if (questionNum == 6) {
    res.render('end', { totalScore: points })
  }
})

app.get('/yes/:category/:num/:score', (req, res) => {
  const questionCategory = req.params['category']
  const questionNumber = +req.params['num']
  const points = +req.params['score']

  if (questionNumber == 5) {
    res.render('correct', {
      topic: questionCategory,
      number: questionNumber,
      totalScore: points + 1,
    })
  }
  if (questionCategory == 'geo' && questionNumber < 5) {
    res.render('correct', {
      topic: questionCategory,
      number: questionNumber,
      totalScore: points + 1,
    })
  } else if (questionCategory == 'science' && questionNumber < 5) {
    res.render('correct', {
      topic: questionCategory,
      number: questionNumber,
      totalScore: points + 1,
    })
  } else if (questionCategory == 'food' && questionNumber < 5) {
    res.render('correct', {
      topic: questionCategory,
      number: questionNumber,
      totalScore: points + 1,
    })
  }
})

app.get('/no/:category/:num/:score', (req, res) => {
  const questionCategory = req.params['category']
  const questionNumber = +req.params['num']
  const points = +req.params['score']

  if (questionNumber == 5) {
    res.render('wrong', {
      topic: questionCategory,
      number: questionNumber,
      totalScore: points,
    })
  }

  if (questionCategory == 'geo' && questionNumber < 5) {
    score = points
    res.render('wrong', {
      topic: questionCategory,
      number: questionNumber,
      totalScore: points,
    })
  } else if (questionCategory == 'science' && questionNumber < 5) {
    score = points
    res.render('wrong', {
      topic: questionCategory,
      number: questionNumber,
      totalScore: points,
    })
  } else if (questionCategory == 'food' && questionNumber < 5) {
    score = points
    res.render('wrong', {
      topic: questionCategory,
      number: questionNumber,
      totalScore: points,
    })
  }
})

//`${}
//template literal or template string
//came from ES6
app.listen(port, () => {
  console.log(`listening on port ${port}`)
})
