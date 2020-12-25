$(".rslides").responsiveSlides({
  timeout: 10000,
  pager: true
});

document.querySelectorAll(".rellax").forEach(el => {
  const rellax = new Rellax(el, {
    relativeToWrapper: true,
    wrapper: el.parentElement
  });

  let timeout
  let refresh = rellax.refresh.bind(rellax)
  window.addEventListener("scroll", () => { // fix to init
    if (timeout) {
      window.cancelAnimationFrame(timeout);
    }

    timeout = window.requestAnimationFrame(refresh)
  })
})

emailjs.init("user_LEgiaWs1gtVC3S8Xaky9c")

var defaultThemeColors = Survey
  .StylesManager
  .ThemeColors["default"]
defaultThemeColors["$main-color"] = "#FF6760";
defaultThemeColors["$main-hover-color"] = "#6fe06f";
defaultThemeColors["$text-color"] = "#4a4a4a";

defaultThemeColors["$header-background-color"] = "transparent";
defaultThemeColors["$body-background-color"] = "transparent";
defaultThemeColors["$body-container-background-color"] = "transparent";

Survey
    .StylesManager
    .applyTheme();

var surveyJSON = {
"title": "Would you like to hire me?",
"completedHtml": "<h2>Thank you for your interest.</h2>\n\n<p class=\"huge\">I will contact you with the next two business days</p>",
"pages": [
{
 "name": "page1",
 "elements": [
  {
   "type": "comment",
   "name": "projectDescription",
   "title": "Tell me about about your project",
   "isRequired": true
  },
  {
   "type": "radiogroup",
   "name": "projectDuration",
   "title": "What is the expected duration of the project?",
   "choices": [
    {
     "value": "item1",
     "text": "This is a short term project / side gig"
    },
    {
     "value": "item2",
     "text": "Long term with part time commitment"
    },
    {
     "value": "item3",
     "text": "It is a full time work"
    }
   ],
   "hasOther": true
  },
  {
   "type": "text",
   "name": "email",
   "title": "Your contact email?",
   "isRequired": true,
   "inputType": "email",
  },
  {
   "type": "text",
   "name": "name",
   "title": "Your name or company name?"
  }
 ]
}
],
"showTitle": false,
"completeText": "Send",
"showQuestionNumbers": "off",
//  "showProgressBar": "bottom",
//  "goNextPageAutomatic": true,
//  "questionsOnPageMode": "questionPerPage"
}

const survey = new Survey.Model(surveyJSON)

$("#surveyContainer").Survey({
  model: survey,
  onComplete: function({data}, options) {
    options.showDataSaving('Sending...');
    emailjs.send('service_4hobwsw', 'template_6iuub8h', data)
      .then(function(response) {
        options.showDataSavingSuccess('');
      }, function(error) {
        options.showDataSavingError('Oops, something went wrong.');
      })
  },
});