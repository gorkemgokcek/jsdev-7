$(document).ready(function() {
    let usersData = [];

    $('#loadProfiles').on('click', function() {
        $.ajax({
            url: 'https://randomuser.me/api/?results=10',
            dataType: 'json',
            success: function(data) {
                usersData = data.results;

                $('.profiles').empty();

                data.results.forEach((user, index) => {
                    const card = $(`
                        <div class="card" data-index="${index}">
                            <img src="${user.picture.large}" alt="${user.name.first}">
                            <h3>${user.name.first} ${user.name.last}</h3>
                            <p><strong>Email:</strong></p>
                            <p class="email">${user.email}</p>
                            <p>${user.location.country}</p>
                        </div>
                    `);

                    card.on('click', function() {
                        const u = usersData[$(this).data('index')];
                        $.fancybox.open({
                            src: `
                                <div class="fancybox-content">
                                    <h2>${u.name.first} ${u.name.last}</h2>
                                    <img src="${u.picture.large}" style="width:120px; border-radius:50%; margin:10px 0;">
                                    <p><strong>Email:</strong> ${u.email}</p>
                                    <p><strong>Phone:</strong> ${u.phone}</p>
                                    <p><strong>Country:</strong> ${u.location.country}</p>
                                </div>
                            `,
                            type: 'html'
                        });
                    });

                 $('.profiles').append(card.hide().delay(index * 100).slideDown(400));


                });

                updateSlider(data.results);
            }
        });
    });

    function updateSlider(users) {
        const slider = $('.slider');
        slider.empty();

        users.forEach(user => {
            slider.append(`
                <div class="card">
                    <img src="${user.picture.medium}" alt="${user.name.first}">
                    <h3>${user.name.first}</h3>
                </div>
            `);
        });

        if (slider.hasClass('slick-initialized')) {
            slider.slick('unslick');
        }

        slider.slick({
            slidesToShow: 6,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 2000,
            arrows: true,
            dots: true,
            centerMode: true,
            variableWidth: false
        });
    }
});
