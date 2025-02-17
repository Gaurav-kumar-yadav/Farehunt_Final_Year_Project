mapboxgl.accessToken =
  "pk.eyJ1IjoibmloYWFsMTkwMyIsImEiOiJjbTFzdm00d3AwOWNyMmlzNmM2c3R5eGdpIn0.PV0B6e3t_BgfQyKyoE-vGw"

navigator.geolocation.getCurrentPosition(successLocation, errorLocation, {
  enableHighAccuracy: true
})

function successLocation(position) {
  setupMap([position.coords.longitude, position.coords.latitude])
}

function errorLocation() {
  setupMap([-2.24, 53.48])
}

function setupMap(center) {
  const map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/streets-v11",
    center: center,
    zoom: 15
  })

  const nav = new mapboxgl.NavigationControl()
  map.addControl(nav)

  var directions = new MapboxDirections({
    accessToken: mapboxgl.accessToken,
    unit: 'metric'
  })
   
  map.addControl(directions, "top-left")
}
/*export function getSelectedLocations() {
    return new Promise((resolve) => {
      const selectedLocations = { pickup: null, dropoff: null };
  
      // Add markers when the user clicks on the map
      map.on('click', (e) => {
        const coords = [e.lngLat.lng, e.lngLat.lat];
  
        if (!selectedLocations.pickup) {
          selectedLocations.pickup = { longitude: coords[0], latitude: coords[1] };
          new mapboxgl.Marker({ color: 'blue' }).setLngLat(coords).addTo(map);
        } else if (!selectedLocations.dropoff) {
          selectedLocations.dropoff = { longitude: coords[0], latitude: coords[1] };
          new mapboxgl.Marker({ color: 'purble' }).setLngLat(coords).addTo(map);
          resolve(selectedLocations); // Both pickup and dropoff set
        }
      });
    });
  }*/
    function getSelectedLocations(map) {
        return new Promise((resolve) => {
          const selectedLocations = { pickup: null, dropoff: null };
      
          // Listen for clicks on the map to set pickup and dropoff points
          map.on("click", (e) => {
            const coords = [e.lngLat.lng, e.lngLat.lat];
      
            if (!selectedLocations.pickup) {
              // Set pickup location
              selectedLocations.pickup = { longitude: coords[0], latitude: coords[1] };
              new mapboxgl.Marker({ color: "blue" })
                .setLngLat(coords)
                .addTo(map)
                .setPopup(new mapboxgl.Popup().setHTML("Pickup Location"))
                .togglePopup();
            } else if (!selectedLocations.dropoff) {
              // Set dropoff location
              selectedLocations.dropoff = { longitude: coords[0], latitude: coords[1] };
              new mapboxgl.Marker({ color: "red" })
                .setLngLat(coords)
                .addTo(map)
                .setPopup(new mapboxgl.Popup().setHTML("Dropoff Location"))
                .togglePopup();
      
              // Both locations set, resolve the promise
              resolve(selectedLocations);
            }
          });
        });
      }
      