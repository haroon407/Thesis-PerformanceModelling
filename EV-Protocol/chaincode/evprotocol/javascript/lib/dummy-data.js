/*
 * Dummy Data (random generated arrays by : Array.from({length: 40}, () => Math.floor(Math.random() * 40));)
 */
'use strict';

const electricVehicles = [
    {
        color: 'blue',
        manufacturer: 'BMW',
        model: 'i3',
        chargingLevel: '1',
        connector: 'Type-F-(Schuko)',
        owner: 'John',
        postalCode: 81375,
        city: 'Munich'
    },
    {
        color: 'red',
        manufacturer: 'BMW',
        model: 'i3',
        chargingLevel: '2',
        connector: 'Type-2',
        owner: 'Tom',
        postalCode: 81377,
        city: 'Munich'
    },
    {
        color: 'green',
        manufacturer: 'BMW',
        model: 'i8',
        chargingLevel: '3',
        connector: 'Combo-CCS',
        owner: 'Jerry',
        postalCode: 81374,
        city: 'Munich'
    },
    {
        color: 'yellow',
        manufacturer: 'BMW',
        model: 'i8',
        chargingLevel: '3',
        connector: 'Combo-CCS',
        owner: 'Phillip',
        postalCode: 81379,
        city: 'Munich'
    },
    {
        color: 'black',
        manufacturer: 'BMW',
        model: 'i3',
        chargingLevel: '2',
        connector: 'Type-2',
        owner: 'Carlos',
        postalCode: 81372,
        city: 'Munich'
    },
    {
        color: 'white',
        manufacturer: 'BMW',
        model: 'i3',
        chargingLevel: '1',
        connector: 'Type-F-(Schuko)',
        owner: 'Bernard',
        postalCode: 81369,
        city: 'Munich'
    },
    {
        color: 'grey',
        manufacturer: 'BMW',
        model: 'i3',
        chargingLevel: '2',
        connector: 'Type-2',
        owner: 'Max',
        postalCode: 81381,
        city: 'Munich'
    },
    {
        color: 'orange',
        manufacturer: 'BMW',
        model: 'i3',
        chargingLevel: '1',
        connector: 'Type-F-(Schuko)',
        owner: 'Markus',
        postalCode: 81374,
        city: 'Munich'
    },
    {
        color: 'white',
        manufacturer: 'BMW',
        model: 'i8',
        chargingLevel: '1',
        connector: 'Type-F-(Schuko)',
        owner: 'Sammy',
        postalCode: 81382,
        city: 'Munich'
    },
    {
        color: 'brown',
        manufacturer: 'BMW',
        model: 'i8',
        chargingLevel: '3',
        connector: 'Combo-CCS',
        owner: 'Darren',
        postalCode: 81375,
        city: 'Munich'
    },
];
// DummyData for complexity functions
const string1 = "v"; //1
const string3 = "wqQ"; //3
const string5 = "VE6bQ"; //5
const string8 = "QrGxmViQ"; //8
const string10 = "4rm9bLB56r"; //10
const string11 = "7Gl4bQB23ef"; //11

//DummyData
const chargeProviders = [
    {
        name: 'BavariaChargers',
        credit: 100
    },
    {
        name: 'GeneralChargers',
        credit: 300
    }
]

module.exports = { electricVehicles: electricVehicles, chargeProviders: chargeProviders, string1: string1, string3: string3, string5: string5, string8: string8, string10: string10, string11: string11 };