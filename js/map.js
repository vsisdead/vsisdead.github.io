    var coordinates = {lat: 53.923098, lng: 27.551303},
    
        map = new google.maps.Map(document.getElementById('maper'), {
            center: coordinates,
            disableDefaultUI: true,
            scrollwheel: false
        });