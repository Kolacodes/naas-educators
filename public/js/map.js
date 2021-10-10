function initMap() {
  // Map Options
  var options = {
    zoom:8,
    // center: {lat:19.4326,lng:-99.1332}
    center: {lat:6.465422,lng:-3.406448}

  }

  // New Map
  var map = new google.maps.Map(document.getElementById('map'), options);

  // Listen for click on map
  google.maps.event.addListener(map, 'click', function(e) {
    // Add Marker
    addMarker({coords:e.latLng});
  })

  // Create an array of markers
  var markers = [
    {
      // coords:{lat:19.4150,lng:-99.1774},
      coords:{lat:6.615356, lng:-3.323782},
      content: '<h1>Le Condesa, MX</h1>'
    }
  ]
  // Loop through markers
  for(var i = 0; i< markers.length;i++){
    // Add Marker 
    addMarker(markers[i]);
  }

  // Add Marker Function
  function addMarker(props) {
    var marker = new google.maps.Marker({
      position: props.coords,
      map: map,
      // icon: props.iconImage
    });

    // Check for custom icon
    if(props.iconImage){
      // Set icon image
      marker.setIcon(props.iconImage);
    }

    // Check for content
    if(props.content){
      var infoWindow = new google.maps.InfoWindow({
        content: props.content
      });

      marker.addListener('click', function(){
        infoWindow.open(map, marker);
      });
    }
  }

}









// Google map practice 
  
{/* <script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyD_QO_h3NDGxYTNn3Tcwj8LEe5tvzpBafs&callback=initMap"></script> */}

{/* <style type="text/css"> */}
/* Set the size of the div element that contains the map */
// #map {
// height: 400px;
/* The height is 400 pixels */
// width: 100%;
/* The width is the width of the web page */
// }
// </style>
{/* <script> */}
// Initialize and add the map
// function initMap() {
// The location of Uluru
// const uluru = { lat: -25.344, lng: 131.036 };
// The map, centered at Uluru
// const map = new google.maps.Map(document.getElementById("map"), {
  // zoom: 4,
  // center: uluru,
// });
// The marker, positioned at Uluru
// const marker = new google.maps.Marker({
  // position: uluru,
  // map: map,
// });
// }
// </script>

// <!--The div element for the map -->
// <!-- <div id="map" class="my-0"></div> -->

