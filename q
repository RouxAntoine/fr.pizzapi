curl "https://www.dominos.fr/dynamicstoresearchapi/getstores/30/lyon"



%7B%22countryCode%22%3A%22FR%22%2C%22storeNo%22%3A31740%2C%22name%22%3A%22LYON%208%20-%20LUMI%C3%88RE%20MONPLAISIR%22%2C%22state%22%3A%22FR%22%2C%22onlineOrdering%22%3Atrue%2C%22postalcode%22%3A69008%7D
%7B%22countryCode%22%3A%22FR%22%2C%22storeNo%22%3A31740%2C%22name%22%3A%22LYON+8+-+LUMI%C3%88RE+MONPLAISIR%22%2C%22state%22%3A%22FR%22%2C%22onlineOrdering%22%3Atrue%2C%22postalcode%22%3A69008%7D

curl https://www.dominos.fr/la-carte -H 'Cookie: preferredStore=%7B%22countryCode%22:%22FR%22,%22storeNo%22:31740,%22name%22:%22LYON%208%20-%20LUMI%C3%88RE%20MONPLAISIR%22,%22state%22:%22FR%22,%22onlineOrdering%22:true,%22postalcode%22:69008%7D' | grep product-price

curl https://www.dominos.fr/la-carte -H 'Cookie: preferredStore=%7B%22countryCode%22:%22FR%22,%22storeNo%22:31740,%22name%22:%22LYON%208%20-%20LUMI%C3%88RE%20MONPLAISIR%22,%22state%22:%22FR%22,%22onlineOrdering%22:true,%22postalcode%22:69008%7D' | grep product-price
cookie required 
{"countryCode":"FR","storeNo":31740,"name":"LYON 8 - LUMIÈRE MONPLAISIR","state":"FR","onlineOrdering":true,"postalcode":69008}

{
	"ContentEncoding": null,
	"ContentType": null,
	"Data": [{
		"CountryCode": null,
		"StoreNo": 31892,
		"Name": "LYON 1 / LYON 2 NORD",
		"FullName": "LYON 1 / LYON 2 NORD (FR)",
		"PhoneNo": "04 72 04 23 23",
		"StoreMessage": null,
		"Description": null,
		"DefaultLanguage": null,
		"TimeZoneName": null,
		"Address": {
			"UnitNo": null,
			"StreetNo": null,
			"StreetName": "7 RUE DUBOIS",
			"Suburb": "LYON",
			"State": "FR",
			"PostalCode": "69002",
			"FullAddress": null
		},
		"ServiceMethods": {
			"Pickup": true,
			"Delivery": true,
			"DineIn": false,
			"Message": null
		},
		"OrderingMethods": {
			"Online": true,
			"WebSite": true
		},
		"GeoCoordinates": {
			"Longitude": 4.83306,
			"Latitude": 45.7638
		},
		"OpeningHours": null,
		"Closures": null,
		"OrderTracking": null,
		"PickupLeadTime": 0,
		"DeliveryLeadTime": 0,
		"PriceInfo": null,
		"RegionCode": null,
		"PulseConfig": null
	}, {
		"CountryCode": null,
		"StoreNo": 31911,
		"Name": "LYON 2 SUD",
		"FullName": "LYON 2 SUD (FR)",
		"PhoneNo": "04 72 75 69 69",
		"StoreMessage": null,
		"Description": null,
		"DefaultLanguage": null,
		"TimeZoneName": null,
		"Address": {
			"UnitNo": null,
			"StreetNo": null,
			"StreetName": "13 COURS SUCHET",
			"Suburb": "LYON",
			"State": "FR",
			"PostalCode": "69002",
			"FullAddress": null
		},
		"ServiceMethods": {
			"Pickup": true,
			"Delivery": true,
			"DineIn": false,
			"Message": null
		},
		"OrderingMethods": {
			"Online": true,
			"WebSite": true
		},
		"GeoCoordinates": {
			"Longitude": 4.82343,
			"Latitude": 45.7472
		},
		"OpeningHours": null,
		"Closures": null,
		"OrderTracking": null,
		"PickupLeadTime": 0,
		"DeliveryLeadTime": 0,
		"PriceInfo": null,
		"RegionCode": null,
		"PulseConfig": null
	}, {
		"CountryCode": null,
		"StoreNo": 31773,
		"Name": "LYON 3 OUEST",
		"FullName": "LYON 3 OUEST (FR)",
		"PhoneNo": "04 72 12 12 12",
		"StoreMessage": null,
		"Description": null,
		"DefaultLanguage": null,
		"TimeZoneName": null,
		"Address": {
			"UnitNo": null,
			"StreetNo": null,
			"StreetName": "256 RUE PAUL BERT",
			"Suburb": "LYON",
			"State": "FR",
			"PostalCode": "69003",
			"FullAddress": null
		},
		"ServiceMethods": {
			"Pickup": true,
			"Delivery": true,
			"DineIn": false,
			"Message": null
		},
		"OrderingMethods": {
			"Online": true,
			"WebSite": true
		},
		"GeoCoordinates": {
			"Longitude": 4.86838,
			"Latitude": 45.7566
		},
		"OpeningHours": null,
		"Closures": null,
		"OrderTracking": null,
		"PickupLeadTime": 0,
		"DeliveryLeadTime": 0,
		"PriceInfo": null,
		"RegionCode": null,
		"PulseConfig": null
	}, {
		"CountryCode": null,
		"StoreNo": 31872,
		"Name": "LYON 4 - CALUIRE",
		"FullName": "LYON 4 - CALUIRE (FR)",
		"PhoneNo": "04 37 92 01 01",
		"StoreMessage": null,
		"Description": null,
		"DefaultLanguage": null,
		"TimeZoneName": null,
		"Address": {
			"UnitNo": null,
			"StreetNo": null,
			"StreetName": "7 RUE DES MARGNOLLES",
			"Suburb": "CALUIRE-ET-CUIRE",
			"State": "FR",
			"PostalCode": "69300",
			"FullAddress": null
		},
		"ServiceMethods": {
			"Pickup": true,
			"Delivery": true,
			"DineIn": false,
			"Message": null
		},
		"OrderingMethods": {
			"Online": true,
			"WebSite": true
		},
		"GeoCoordinates": {
			"Longitude": 4.83369,
			"Latitude": 45.7824
		},
		"OpeningHours": null,
		"Closures": null,
		"OrderTracking": null,
		"PickupLeadTime": 0,
		"DeliveryLeadTime": 0,
		"PriceInfo": null,
		"RegionCode": null,
		"PulseConfig": null
	}, {
		"CountryCode": null,
		"StoreNo": 31865,
		"Name": "LYON 5",
		"FullName": "LYON 5 (FR)",
		"PhoneNo": "04 78 25 07 07",
		"StoreMessage": null,
		"Description": null,
		"DefaultLanguage": null,
		"TimeZoneName": null,
		"Address": {
			"UnitNo": null,
			"StreetNo": null,
			"StreetName": "129 RUE JOLIOT CURIE",
			"Suburb": "LYON",
			"State": "FR",
			"PostalCode": "69005",
			"FullAddress": null
		},
		"ServiceMethods": {
			"Pickup": true,
			"Delivery": true,
			"DineIn": false,
			"Message": null
		},
		"OrderingMethods": {
			"Online": true,
			"WebSite": true
		},
		"GeoCoordinates": {
			"Longitude": 4.78481,
			"Latitude": 45.7544
		},
		"OpeningHours": null,
		"Closures": null,
		"OrderTracking": null,
		"PickupLeadTime": 0,
		"DeliveryLeadTime": 0,
		"PriceInfo": null,
		"RegionCode": null,
		"PulseConfig": null
	}, {
		"CountryCode": null,
		"StoreNo": 31897,
		"Name": "LYON 6",
		"FullName": "LYON 6 (FR)",
		"PhoneNo": "04 78 26 32 32",
		"StoreMessage": null,
		"Description": null,
		"DefaultLanguage": null,
		"TimeZoneName": null,
		"Address": {
			"UnitNo": null,
			"StreetNo": null,
			"StreetName": "110 RUE GARIBALDI",
			"Suburb": "LYON",
			"State": "FR",
			"PostalCode": "69006",
			"FullAddress": null
		},
		"ServiceMethods": {
			"Pickup": true,
			"Delivery": true,
			"DineIn": false,
			"Message": null
		},
		"OrderingMethods": {
			"Online": true,
			"WebSite": true
		},
		"GeoCoordinates": {
			"Longitude": 4.85065,
			"Latitude": 45.7665
		},
		"OpeningHours": null,
		"Closures": null,
		"OrderTracking": null,
		"PickupLeadTime": 0,
		"DeliveryLeadTime": 0,
		"PriceInfo": null,
		"RegionCode": null,
		"PulseConfig": null
	}, {
		"CountryCode": null,
		"StoreNo": 31760,
		"Name": "LYON 7 NORD",
		"FullName": "LYON 7 NORD (FR)",
		"PhoneNo": "04 72 71 71 72",
		"StoreMessage": null,
		"Description": null,
		"DefaultLanguage": null,
		"TimeZoneName": null,
		"Address": {
			"UnitNo": null,
			"StreetNo": null,
			"StreetName": "61 RUE CHEVREUL",
			"Suburb": "LYON",
			"State": "FR",
			"PostalCode": "69007",
			"FullAddress": null
		},
		"ServiceMethods": {
			"Pickup": true,
			"Delivery": true,
			"DineIn": false,
			"Message": null
		},
		"OrderingMethods": {
			"Online": true,
			"WebSite": true
		},
		"GeoCoordinates": {
			"Longitude": 4.84149,
			"Latitude": 45.748
		},
		"OpeningHours": null,
		"Closures": null,
		"OrderTracking": null,
		"PickupLeadTime": 0,
		"DeliveryLeadTime": 0,
		"PriceInfo": null,
		"RegionCode": null,
		"PulseConfig": null
	}, {
		"CountryCode": null,
		"StoreNo": 31947,
		"Name": "LYON 7 SUD",
		"FullName": "LYON 7 SUD (FR)",
		"PhoneNo": "04 37 37 11 11",
		"StoreMessage": null,
		"Description": null,
		"DefaultLanguage": null,
		"TimeZoneName": null,
		"Address": {
			"UnitNo": null,
			"StreetNo": null,
			"StreetName": "22-24 RUE SIMONE DE BEAUVOIR",
			"Suburb": "LYON",
			"State": "FR",
			"PostalCode": "69007",
			"FullAddress": null
		},
		"ServiceMethods": {
			"Pickup": true,
			"Delivery": true,
			"DineIn": true,
			"Message": null
		},
		"OrderingMethods": {
			"Online": true,
			"WebSite": true
		},
		"GeoCoordinates": {
			"Longitude": 4.83392,
			"Latitude": 45.7363
		},
		"OpeningHours": null,
		"Closures": null,
		"OrderTracking": null,
		"PickupLeadTime": 0,
		"DeliveryLeadTime": 0,
		"PriceInfo": null,
		"RegionCode": null,
		"PulseConfig": null
	}, {
		"CountryCode": null,
		"StoreNo": 31740,
		"Name": "LYON 8 - LUMIÈRE MONPLAISIR",
		"FullName": "LYON 8 - LUMIÈRE MONPLAISIR (FR)",
		"PhoneNo": "04 37 90 09 02",
		"StoreMessage": null,
		"Description": null,
		"DefaultLanguage": null,
		"TimeZoneName": null,
		"Address": {
			"UnitNo": null,
			"StreetNo": null,
			"StreetName": "121 AVENUE DES FRÈRES LUMIÈRES",
			"Suburb": "LYON",
			"State": "FR",
			"PostalCode": "69008",
			"FullAddress": null
		},
		"ServiceMethods": {
			"Pickup": true,
			"Delivery": true,
			"DineIn": false,
			"Message": null
		},
		"OrderingMethods": {
			"Online": true,
			"WebSite": true
		},
		"GeoCoordinates": {
			"Longitude": 4.87285,
			"Latitude": 45.7436
		},
		"OpeningHours": null,
		"Closures": null,
		"OrderTracking": null,
		"PickupLeadTime": 0,
		"DeliveryLeadTime": 0,
		"PriceInfo": null,
		"RegionCode": null,
		"PulseConfig": null
	}, {
		"CountryCode": null,
		"StoreNo": 31978,
		"Name": "LYON 8 - MERMOZ",
		"FullName": "LYON 8 - MERMOZ (FR)",
		"PhoneNo": "04 78 01 78 78",
		"StoreMessage": null,
		"Description": null,
		"DefaultLanguage": null,
		"TimeZoneName": null,
		"Address": {
			"UnitNo": null,
			"StreetNo": null,
			"StreetName": "25 AVENUE JEAN MERMOZ",
			"Suburb": "LYON",
			"State": "FR",
			"PostalCode": "69008",
			"FullAddress": null
		},
		"ServiceMethods": {
			"Pickup": true,
			"Delivery": true,
			"DineIn": false,
			"Message": null
		},
		"OrderingMethods": {
			"Online": true,
			"WebSite": true
		},
		"GeoCoordinates": {
			"Longitude": 4.866384,
			"Latitude": 45.733578
		},
		"OpeningHours": null,
		"Closures": null,
		"OrderTracking": null,
		"PickupLeadTime": 0,
		"DeliveryLeadTime": 0,
		"PriceInfo": null,
		"RegionCode": null,
		"PulseConfig": null
	}, {
		"CountryCode": null,
		"StoreNo": 31758,
		"Name": "LYON 9",
		"FullName": "LYON 9 (FR)",
		"PhoneNo": "04 78 83 00 00",
		"StoreMessage": null,
		"Description": null,
		"DefaultLanguage": null,
		"TimeZoneName": null,
		"Address": {
			"UnitNo": null,
			"StreetNo": null,
			"StreetName": "36 RUE MARIETTON",
			"Suburb": "LYON",
			"State": "FR",
			"PostalCode": "69009",
			"FullAddress": null
		},
		"ServiceMethods": {
			"Pickup": true,
			"Delivery": true,
			"DineIn": false,
			"Message": null
		},
		"OrderingMethods": {
			"Online": true,
			"WebSite": true
		},
		"GeoCoordinates": {
			"Longitude": 4.80391,
			"Latitude": 45.77555
		},
		"OpeningHours": null,
		"Closures": null,
		"OrderTracking": null,
		"PickupLeadTime": 0,
		"DeliveryLeadTime": 0,
		"PriceInfo": null,
		"RegionCode": null,
		"PulseConfig": null
	}, {
		"CountryCode": null,
		"StoreNo": 31762,
		"Name": "VILLEURBANNE - CHARPENNES",
		"FullName": "VILLEURBANNE - CHARPENNES (FR)",
		"PhoneNo": "04 78 52 00 00",
		"StoreMessage": null,
		"Description": null,
		"DefaultLanguage": null,
		"TimeZoneName": null,
		"Address": {
			"UnitNo": null,
			"StreetNo": null,
			"StreetName": "29 RUE DES CHARMETTES",
			"Suburb": "VILLEURBANNE",
			"State": "FR",
			"PostalCode": "69100",
			"FullAddress": null
		},
		"ServiceMethods": {
			"Pickup": true,
			"Delivery": true,
			"DineIn": false,
			"Message": null
		},
		"OrderingMethods": {
			"Online": true,
			"WebSite": true
		},
		"GeoCoordinates": {
			"Longitude": 4.86735,
			"Latitude": 45.7702
		},
		"OpeningHours": null,
		"Closures": null,
		"OrderTracking": null,
		"PickupLeadTime": 0,
		"DeliveryLeadTime": 0,
		"PriceInfo": null,
		"RegionCode": null,
		"PulseConfig": null
	}, {
		"CountryCode": null,
		"StoreNo": 31838,
		"Name": "VILLEURBANNE - CUSSET",
		"FullName": "VILLEURBANNE - CUSSET (FR)",
		"PhoneNo": "04 78 68 10 10",
		"StoreMessage": null,
		"Description": null,
		"DefaultLanguage": null,
		"TimeZoneName": null,
		"Address": {
			"UnitNo": null,
			"StreetNo": null,
			"StreetName": "288 COURS EMILE ZOLA",
			"Suburb": "VILLEURBANNE",
			"State": "FR",
			"PostalCode": "69100",
			"FullAddress": null
		},
		"ServiceMethods": {
			"Pickup": true,
			"Delivery": true,
			"DineIn": false,
			"Message": null
		},
		"OrderingMethods": {
			"Online": true,
			"WebSite": true
		},
		"GeoCoordinates": {
			"Longitude": 4.89289,
			"Latitude": 45.7671
		},
		"OpeningHours": null,
		"Closures": null,
		"OrderTracking": null,
		"PickupLeadTime": 0,
		"DeliveryLeadTime": 0,
		"PriceInfo": null,
		"RegionCode": null,
		"PulseConfig": null
	}],
	"JsonRequestBehavior": 0,
	"MaxJsonLength": null,
	"RecursionLimit": null
}