let map = L.map('map', {
    center: [7.099412, -73.124577],
    zoom: 13
});
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);
document.getElementById('map').style.width = '500px'
document.getElementById('map').style.height = '500px'

$.ajax({
    dataType: 'json',
    url: 'api/bicicletas',
    success: function(result) {
        console.log(result);
        result.bicicletas.forEach(function (bici) {
            L.marker(bici.ubicacion, {
                title: bici.id,
            }).addTo(map)
        })
    }
})