const express = require('express')
const session = require('express-session')
const app = express()
const port = process.env.PORT || 3400

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'))

app.use(
  session({
    secret: 'EBJGF83KEN',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
)

let valid_users = [
  { name: 'sue', password: 'sue' },
  { name: 'joe', password: 'joe' },
  { name: 'sam', password: 'sam' },
]

app.get('/', (req, res) => {
  let user = ''
  let punct = ''
  let invalid_login = ''

  var params = req.query

  invalid_login = params.reason || ''
  console.log('invalid login,', invalid_login)
  if (req.session && req.session.username) {
    user = req.session.username
    punct = ','
  }
  res.render('index', {
    my_user: user,
    punct: punct,
    invalid_login: invalid_login,
  })
})

app.post('/login', (req, res) => {
  const user = req.body.username
  const pass = req.body.password

  const found_user = valid_users.find(
    (usr) => usr.name == user && usr.password == pass
  )

  if (found_user) {
    req.session.username = user
    res.redirect('/home')
  } else {
    req.session.destroy()
    res.redirect('/?reason=invalid_user')
  }
})

app.get('/logout', (req, res) => {
  req.session.destroy()
  res.redirect('/')
})

app.get('/signup', (req, res) => {
  var params = req.query
  success = params.success
  console.log('success', success)
  res.render('signup', { password_redo: success })
})

app.post('/signup', (req, res) => {
  const user = req.body.username
  const pass = req.body.password
  const pass2 = req.body.password2

  if (pass == pass2) {
    console.log('Passwords match')
    valid_users.push({
      name: user,
      password: pass,
    })
    console.log('valid users', valid_users)
    res.redirect('/?success=yes')
  } else {
    console.log('Password mismatch')
    res.redirect('/signup?success=no')
  }
})

app.get('/home', (req, res) => {
  if (req.session && req.session.username) {
    res.render('home', { user: req.session.username })
  } else {
    res.redirect('/')
  }
})

app.get('/leader', (req, res) => {
  if (req.session && req.session.username) {
    res.render('leader')
  } else {
    res.redirect('/')
  }
})

app.get('/food', (req, res) => {
  score = 0
  if (req.session && req.session.username) {
    res.render('food')
  } else {
    res.redirect('/')
  }
})

app.get('/food/:number/:points', (req, res) => {
  const questionNum = req.params['number']
  const points = +req.params['points']

  if (req.session && req.session.username) {
    if (questionNum < 6) {
      res.render(`food${questionNum}`, { totalScore: points })
    } else if (questionNum == 6) {
      res.render('end', { totalScore: points })
    }
  } else {
    res.redirect('/')
  }
})

app.get('/geo', (req, res) => {
  score = 0
  if (req.session && req.session.username) {
    res.render('geo')
  } else {
    res.redirect('/')
  }
})

app.get('/geo/:number/:points', (req, res) => {
  const questionNum = req.params['number']
  const points = +req.params['points']

  if (req.session && req.session.username) {
    if (questionNum < 6) {
      res.render(`geo${questionNum}`, { totalScore: points })
    } else if (questionNum == 6) {
      res.render('end', { totalScore: points })
    }
  } else {
    res.redirect('/')
  }
})

app.get('/science', (req, res) => {
  score = 0
  if (req.session && req.session.username) {
    res.render('science')
  } else {
    res.redirect('/')
  }
})

app.get('/science/:number/:points', (req, res) => {
  const questionNum = req.params['number']
  const points = +req.params['points']

  if (req.session && req.session.username) {
    if (questionNum < 6) {
      res.render(`science${questionNum}`, { totalScore: points })
    } else if (questionNum == 6) {
      res.render('end', { totalScore: points })
    }
  } else {
    res.redirect('/')
  }
})

app.get('/yes/:category/:num/:score', (req, res) => {
  const questionCategory = req.params['category']
  const questionNumber = +req.params['num']
  const points = +req.params['score']

  if (req.session && req.session.username) {
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
  } else {
    res.redirect('/')
  }
})

app.get('/no/:category/:num/:score', (req, res) => {
  const questionCategory = req.params['category']
  const questionNumber = +req.params['num']
  const points = +req.params['score']

  if (req.session && req.session.username) {
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
  } else {
    res.redirect('/')
  }
})

//`${}
//template literal or template string
//came from ES6
app.listen(port, () => {
  console.log(`listening on port ${port}`)
})
