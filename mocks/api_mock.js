var apiServerMock = {
    garbage : {
        validDates : ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche']
    },
    wifi : {
        valid : {
            "_id" : "5643f595f684183c399bc45e",
            "id" : "60",
            "name" : "ZAP - Cégep de Sherbrooke (17)",
            "description" : "",
            "civic_number" : "475",
            "street_name" : "rue du Cégep",
            "city" : "Sherbrooke",
            "province" : "Quebec",
            "country" : "J1E 4K1",
            "postal_code" : "J1E 4K1",
            "public_phone_number" : "(819) 564-6350<br/><a href=http://www.cegepsherbro",
            "public_email" : "",
            "latitude" : "45.409022",
            "longitude" : "-71.883414"
        },
        new : {
            "id" : "1000",
            "name" : "A new wifi access point",
            "description" : "",
            "civic_number" : "1000",
            "street_name" : "blv de l'universite",
            "city" : "Sherbrooke",
            "province" : "Quebec",
            "country" : "J1E 4K1",
            "postal_code" : "J1E 4K1",
            "public_phone_number" : "555-555-5555",
            "public_email" : "",
            "latitude" : "46.409022",
            "longitude" : "-72.883414"
        }
    },
    restaurant: {
        valid : {
            "_id" : "56663daf29fa10b105164e48",
            "ID" : 131.0000000000000000,
            "Nom" : "An Phú - Restaurant vietnamien",
            "SiteWeb" : "",
            "NumeroCivique" : "1105",
            "Rue" : "King Est",
            "CodePostal" : "J1G1E5",
            "Arrondissement" : "De Jacques-Cartier",
            "Ville" : "Sherbrooke",
            "Latitude" : "45.4080776",
            "Longitude" : "-71.86472400000002",
            "NumeroTelephone" : "8195691445",
            "Categories" : "7",
            "Offres" : "0",
            "EchellePrix" : 3.0000000000000000,
            "DescriptionCourte" : "Pour une cuisine vietnamienne authentique goûteuse et exquise, le restaurant An Phú est un incontournable.",
            "FichierImage" : "http://www.destinationsherbrooke.com/partenaires/1586/images/an_hu3.jpg",
            "Distance" : -1
        },
        new : {
            "ID" : 1000.0000000000000000,
            "Nom" : "A new restaurant",
            "SiteWeb" : "",
            "NumeroCivique" : "1000",
            "Rue" : "King Est",
            "CodePostal" : "J1G1E5",
            "Arrondissement" : "De Jacques-Cartier",
            "Ville" : "Sherbrooke",
            "Latitude" : "45.4080776",
            "Longitude" : "-71.86472400000002",
            "NumeroTelephone" : "8195691445",
            "Categories" : "4",
            "Offres" : "0",
            "EchellePrix" : 3.0000000000000000,
            "DescriptionCourte" : "Lorem",
            "FichierImage" : "http://tests/image.jpg",
            "Distance" : -1
        }
    }
}

module.exports = apiServerMock;