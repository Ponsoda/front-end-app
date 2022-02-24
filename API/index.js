const express = require('express');
const app = express();
const PORT = 8080;


app.use(express.json())

app.listen(
	PORT,
	()=>console.log(`it is alive in port http://localhost:${PORT}`)

)
app.get('/locations', (req, res) => {
	res.status(200).send(
		{ "type": "FeatureCollection",
  			"features": [
    		{"type": "Feature",
      		"geometry": {"type": "Point", "coordinates": [-0.274722, 38.660833]},
     		"properties": {"name": "Aitana", "alt": 1557, "desc": "La sierra de Aitana es un conjunto montañoso que forma parte del sistema Prebético, en su extremo más oriental dentro de la península ibérica."}
      		},
			{"type":"Feature",
			"geometry": {"type":"Point", "coordinates": [-0.488333,38.758333]},
			"properties" : {"name" : "Montcabrer", "alt": 1390,"desc" : "El Montcabrer es la cima más alta de la Sierra de Mariola."}
			},
			{"type":"Feature",
			"geometry": {"type":"Point", "coordinates": [-0.195833,38.597222]},
			"properties" : {"name" : "Puig Campana", "alt": 1408,"desc" : "El Puig Campana es una montaña que forma parte de las Cordilleras Prebéticas de la provincia de Alicante, en el sureste de la península ibérica."}
			},
			{"type":"Feature",
			"geometry": {"type":"Point", "coordinates": [-0.251985,38.717199]},
			"properties" : {"name" : "Serrella", "alt": 1385,"desc" : "La sierra de Serrella se localiza al norte de la provincia de Alicante."}
			},
			{"type":"Feature",
			"geometry": {"type":"Point", "coordinates": [ -0.437518,38.624685]},
			"properties" : {"name" : "Els Plans", "alt": 1330,"desc" : "La sierra de Els Plans está situada al norte de Alicante, entre Alcoy, Torremanzanas y Benifallim."}
			}
			]
		}
	)	
});

