fetch('https://randomuser.me/api/?results=52')
  .then(response => response.json())
  .then(data => {
    // $('#selected-student').hide();
    dataToStudentItems(data.results);
    $('#selected-student').hide();
    
  })
  .then(() => {
    for (let i = 0; i < $('.student-item').length; i++) {
      if (i > 6) {
        $($('.student-item')[i]).hide();
      }
    }
    paginate($('.student-item').length);
    $($(".pagination li a")[0]).addClass('active')
    
  })
  .then(() => {
    $modal = $('#selected-student');
    $('.student-list').on('click', e => {

      if (e.target.className == 'more') {
        $modal.show();
        // $('#selected-student').append($studentCard);
        const more = e.target.nextElementSibling

        const moreData = {
          name: more.children[0].innerText,
          email: more.children[1].innerText,
          phone: more.children[2].innerText,
          address: more.children[3].innerText,
          dob: more.children[4].innerText,
          joined: more.children[5].innerText,
          img: more.children[6].innerText
        }

        $modal.append($(createMoreCard(moreData)));
      }
      $modal.on('click', e => {
        if(e.target.className == 'close'|| e.target.id == 'selected-student') {
          $modal.hide();
          $modal.empty();
        }
      });
    })
  })
  .catch(err => {
    console.log(err);
  });

const dataToStudentItems = (data) => {
  data.map(({name, email, phone, location, dob, registered, picture}) => {
    $('.student-list').append(
      $(`<li class="student-item cf">
      <div class="student-details">
        <img class="avatar" src="${picture.large}"/>
        <div class="info">
          <h3>${name.first} ${name.last}</h3>
          <span class="email">${email}</span>
        </div>
      </div>
      <button class="more">More...</button>
      <div id="more" style="display: none">
        <div class="more-name">${name.first} ${name.last}</div>
        <div class="more-email">${email}</div>
        <div class="more-phone">${phone}</div>
        <div class="more-location">${location.street.number} ${location.street.name}, ${location.city}, ${location.state}</div>
        <div class="more-dob">${formDate(dob.date)}</div>
        <div class="more-joined">${formDate(registered.date)}</div>
        <div class="more-img">${picture.large}</div>
      </div>
      <div class="joined-details">
        <span class="date">${formDate(registered.date)}</span>
      </div>
    </li>`)
    )
  })
}

const paginate = (itemTotal) => {
  let numOfButtons = Math.ceil(itemTotal / 7);
  for (let i = 0; i < numOfButtons; i++) {
    $('.pagination').append($(`<li><a href="#">${i + 1}</a></li>`));
  }
  $('.pagination').on('click', (e) => {
    if (e.target.tagName == "A") {
      displayStudents(e.target.innerText)
      highlightActive(e.target);
    }
  })
}

const displayStudents = (pageNum) => {
  let max = pageNum * 7 - 1;
  let min = (pageNum - 1) * 7;
  for (let i = 0; i < $('.student-item').length; i++) {
    if (i <= max && i >= min) {
      $($('.student-item')[i]).show();
    } else {
      $($('.student-item')[i]).hide();
    }
  }
}

const formDate = (date) => {
  const dateString = date.substring(0, 10)
  const yyyy = dateString.substring(0, 4);
  const mm = dateString.substring(5, 7);
  const dd = dateString.substring(8, 10)
  return (`${mm}/${dd}/${yyyy}`);
}

const highlightActive = (selectedButton) => {
  $('.pagination li a').removeClass('active');
  $(selectedButton).addClass('active');
}


//student details modalVVVVVVVVVVVVVVV

const createMoreCard = ({
  name,
  email,
  phone,
  address,
  dob,
  joined,
  img
}) => {

  return $(`
  <div class="card">
    <img class="avatar" src="${img}">
    <h3 class="name">${name}</h3>
    <span class="email">${email}</span>
    <table class="details">
      <tr><td>Phone: </td><td>${phone}</td></tr>
      <tr><td>Adress: </td><td>${address}</td></tr>
      <tr><td>Birthday: </td><td>${dob}</td></tr>
      <!-- joined -->
      <tr><td>Joined: </td><td>${joined}</td></tr>
    </table>
    <div class="close">Close</div>
  </div>
  `)
}


/////////////////////////////////
//  // things to finish
// done // page link active toggle
// done //styling the more button
// done //on click of more button, show the modal (style it)
// done //make the list collapsible on smaller screens