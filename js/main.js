var quizname = 'History of The United Kingdom';

var allQuestions = [{
  question: 'Which country did Britain fight in the War of Jenkins\'s Ear?',
  choices: ['Russia', 'Armenia', 'France', 'Spain'],
  correctAnswer: 3
}, {
  question: 'What was the better known name of Charles I, the King of the Franks, who united most of Western Europe during the Middle Ages?',
  choices: ['Wifebeater', 'Dragon', 'Charlemagne', 'The Handsome'],
  correctAnswer: 2
}, {
  question: 'What was the largest naval battle of the First World War?',
  choices: ['Jutland', 'Waren', 'Växjö', 'Mayenne'],
  correctAnswer: 0
}, {
  question: 'In which year was Abraham Lincoln assassinated?',
  choices: ['1870', '1865', '1860', '1867'],
  correctAnswer: 1
}, {
  question: 'Omdurman, as in the Battle of Omdurman, is today a suburb of which African city?',
  choices: ['El Obeid', 'Khartoum', 'Batouri', 'Bafia'],
  correctAnswer: 1
}, {
  question: 'In which military campaign did Lewis Halliday and Basil Guy win Victoria Crosses in 1900?',
  choices: ['Tirah Campaign', 'Basuto War', 'The Boxer Rebellion', 'Sudan Campaign'],
  correctAnswer: 2
}, {
  question: 'Who led a band of abolitionists that seized the federal arsenal at Harpers Ferry, Virginia, in October 1859?',
  choices: ['John Brown', 'Trussel Box', 'Baylor, Robert William', 'Anderson, Osborne Perry'],
  correctAnswer: 0
}, {
  question: 'Name the second wife of Henry VIII?',
  choices: ['Catherine of Aragon', 'Catherine Parr', 'Jane Seymour', 'Anne Boleyn'],
  correctAnswer: 3
}, {
  question: 'In which century did Italian friar Thomas Aquinas live?',
  choices: ['Thirteenth', 'Seventeen', 'Fithteen', 'Sixteen'],
  correctAnswer: 0
}, {
  question: 'Which English philosopher, regarded as one of the most influential of Enlightenment thinkers, was known as the Father of Classical Liberalism?',
  choices: ['Roger Bacon', 'John Locke', 'Francis Bacon', 'Jeremy Bentham'],
  correctAnswer: 1
}];

var progression = 0;
var score       = 0;

function addQuestion(question) {
  var cn = 0;

  function addChoice(choice) {
    var input = $('<label />').append($('<input>').attr({
      'type' : 'radio',
      'name' : 'choices',
      'id'   : 'choice' + cn,
      'value': cn
    })).html(function(i, html) {
      return html + '<strong>' + choice + '</strong>';
    });

    var div   = $('<div />').addClass('radio').append(input);
    // switch .choices to .main if to roll back
    $('.main .col-md-12').append(div);
  }

  var div = $('<div />').addClass('col-md-12').append($('<h2 />')
              .html(question.question));
  $('.main').prepend(div);

  // experimental delete if not working
  // $('.main').append($('<div />').addClass('container choices'));

  question.choices.forEach(function(e) {
    addChoice(e);
    cn++;
  });

  $('.main .col-md-12').addClass('text-left');
}

function intro() {
  // Show quiz name in the header
  $('.quizname').html('<strong>' + quizname + '</strong>' + '<br/><small> Quiz </small>');
  $('.quizname').addClass('text-center');

  // Ask user if he is ready to do quiz
  var div = $('<div />').addClass('col-md-12').append($('<h2 />')
              .html('Are you ready to take ' + '<strong>' + quizname + '</strong>' + '<br/>Quiz?'));
  $('.main').append(div);

  $('.main').append($('<button />').attr({
    'type': 'button',
    'class': 'btn btn-success yeah'
  }).text('Yeah!'));

  var pg = $('<div />').addClass('progress').append($('<div />').addClass('progress-bar progress-bar-success')
            .attr({
              'role': 'progressbar',
              'aria-valuenow': '0',
              'aria-valuemin': '0',
              'aria-valuemax': '100',
              'style': 'width: 0%'
            }));
  $('.jumbotron').after(pg);
  $('.progress').hide().fadeIn(300);

}

function start() {
  var choice = ~~$('input:checked').val();
  score += choice === allQuestions[progression].correctAnswer ? 10 : 0;
  $('.progress-bar-success').css({
    'width' : score + '%'
  });
  // console.log('progression: ', progression);
  // console.log('score: ', score);
  // console.log('correct answer: ', allQuestions[progression].correctAnswer);
  // console.log('my answer: ', choice);
  progression++;
  if (!(progression < allQuestions.length)) outro();
  else {
    $('.main .col-md-12').fadeOut(300);
    $('.main .col-md-12').remove();
    addQuestion(allQuestions[progression]);
    $('.main .col-md-12').hide().fadeIn(300);
  }
}

function outro() {
  $('.main .col-md-12').fadeOut(300);
  $('.main .col-md-12').remove();
  var div = $('<div />').addClass('col-md-12').append([$('<h2 />')
              .html('Thanks for taking ' + '<strong>' + quizname + '</strong>' + '<br/>Quiz.'),
              $('<p />').html('Your Score is ' + score)]);
  $('.main').prepend(div);
  $('.next').remove();
}

$(document).ready(function() {
  intro();
  $('.yeah').on('click', function() {
    $('.yeah').fadeOut(300);
    $('.yeah').remove();

    $('.main').append($('<button />').attr({
      'type': 'button',
      'class': 'btn btn-success next'
    }).text('Next'));

    $('.main .col-md-12').fadeOut(300);
    $('.main .col-md-12').remove();
    addQuestion(allQuestions[progression]);
    $('.main .col-md-12').hide().fadeIn(300);

    $('.next').on('click', function() {
      start();
    });
  });
});
