
            
            
            mapboxgl.accessToken =mapToken;
            const map = new mapboxgl.Map({
                container: 'map', // container ID
                center: listing.geometry.coordinates, // starting position [lng, lat]. Note that lat must be set between -90 and 90
                zoom: 9 // starting zoom
            });
        

            const marker2 = new mapboxgl.Marker({ color: 'black', rotation: 45 })
                .setLngLat(listing.geometry.coordinates)
                .setPopup(
                    new mapboxgl.Popup({offset: 25}).setHTML(
                        
                    `<h5>${listing.location}</h5><p>this is the to place to visit</P>`
                ))
                .addTo(map);