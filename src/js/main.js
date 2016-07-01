import $ from 'jquery';
import _ from 'lodash';

var baseURL = 'https://api.soundcloud.com';

var clientID = 'client_id=2a333b1aa27e6f8d8d042869169ddf94';

function resultTmpl(data) {
  if (data.artwork_url === null) {
    data.artwork_url = "https://pbs.twimg.com/profile_images/2577267058/avatar.jpg"
  }
  var template = `
		<div class="result-grid">
			<div class="avatar">
				<a href="${data.stream_url}?${clientID}" class="play-me" title="${data.title}"><img src="${data.artwork_url}"></a>
			</div>
			<div class="title">
				<a href="${data.stream_url}?${clientID}" class="play-me" title="${data.title}"><h5>${data.title}</h5></a>
			</div>
			<div class="band">
				<h5>${data.user.username}</h5>
			</div>
		</div>`
    // console.log(template)
  return template;
};


function streamTmpl(data, title) {
  var audioTmpl = `
  	<audio src="${data}" autobuffer autoloop loop controls autoplay></audio>
  	<h2 class="nowPlaying">Now playing: ${title}</h2>`
  $('.now-playing').html(audioTmpl)
};


function clickMe() {
  $('.play-me').on('click', function(event) {
    event.preventDefault();
    console.log(event)
    streamTmpl(event.delegateTarget.href, event.delegateTarget.title);
  })
};
var resultsHTML;

$('.search-button').on('click', function(event) {
  event.preventDefault();
  var q = $('.search-param').val();
  // console.log(q);
  $.ajax({
    url: `${baseURL}/tracks?${clientID}&q=${q}`
  }).then(function(response) {
    console.log(response);
    resultsHTML = response.map(resultTmpl)
    // console.log(resultsHTML)
    $('.search-results').html(resultsHTML)
    $('.now-playing').empty()
    clickMe();
  })

});







// <a href="${data.stream_url}?${clientID}" class="play-me"><h5>${data.title}</h5></a>