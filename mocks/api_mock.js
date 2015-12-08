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
    }
}

module.exports = apiServerMock;