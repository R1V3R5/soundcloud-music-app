import $ from 'jquery';
import _ from 'lodash';

var baseURL = 'https://api.soundcloud.com';

var clientID = 'client_id=2a333b1aa27e6f8d8d042869169ddf94';

function resultTmpl(data) {
  if (data.artwork_url === null) {
    data.artwork_url = "http://u.sera.to/users/40/306540/avatar_mid_1332880124.jpeg"
  }
  var template = `
		<div class="result-grid">
			<div class="avatar">
				<img src="${data.artwork_url}">
			</div>
			<div class="title">
				<a href="${data.stream_url}?${clientID}" class="play-me"><h5>${data.title}</h5></a>
			</div>
			<div class="band">
				<h5>${data.user.username}</h5>
			</div>
		</div>`
  $('.search-results').append(template)
};


function streamTmpl(data) {
  var audioTmpl = `
  	<audio src="${data}" autobuffer autoloop loop controls autoplay></audio>
  `
  $('.now-playing').html(audioTmpl)
};


function clickMe() {
  $('.play-me').on('click', function(event) {
    event.preventDefault();
    streamTmpl(event.delegateTarget.href);
  })
};

$('.search-button').on('click', function(event) {
  event.preventDefault();
  var q = $('.search-param').val();
  // console.log(q);
  $.ajax({
    url: `${baseURL}/tracks?${clientID}&q=${q}`
  }).then(function(response) {
    console.log(response);
    response.forEach(function(item) {
      resultTmpl(item);
    })
    clickMe();
  })

});







// <a href="${data.stream_url}?${clientID}" class="play-me"><h5>${data.title}</h5></a>