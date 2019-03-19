const mongoose = require('mongoose')
mongoose.Promise = require('bluebird')
const { dbUri } = require('../config/environment')
const Mechanic = require('../models/mechanic')
const User = require('../models/user')
const Service = require('../models/service')
const Booking = require('../models/booking')

const userIds = [
  '5c0968f5dc8e460b1e53f07b',
  '5c0968f8dc8e460b1e53f07c',
  '5c0968f9dc8e460b1e53f07d'
]

const mechanicIds = [
  '5c0968f9dc8e460b1e53f07e',
  '5c0968f9dc8e460b1e53f07f',
  '5c0968f9dc8e460b1e53f080'
]

const serviceIds = [
  '5c0968fadc8e460b1e53f081',
  '5c0968fadc8e460b1e53f082',
  '5c0968fadc8e460b1e53f083',
  '5c0968fcdc8e460b1e53f087',
  '5c0968fcdc8e460b1e53f088',
  '5c0968fcdc8e460b1e53f089',
  '5c0968ffdc8e460b1e53f08a',
  '5c096900dc8e460b1e53f08b'
]

// const bookingIds = [
//   '5c0968fbdc8e460b1e53f084',
//   '5c0968fbdc8e460b1e53f085',
//   '5c0968fbdc8e460b1e53f086',
//   '5c096901dc8e460b1e53f08c',
//   '5c096901dc8e460b1e53f07d',
//   '5be9860fcb16d525543ceda1',
//   '5be9860fcb16d525543ceda2',
//   '5be9860fcb16d525543ceda3',
//   '5be9860fcb16d525543ceda4',
//   '5be9860fcb16d525543ceda5',
//   '5be9860fcb16d525543ceda6'
// ]

const userData = [
  {
    _id: userIds[0],
    username: 'TabRivers',
    name: 'Tabitha Rivers',
    email: 'tab@email.com',
    phoneNumber: '+44 3069 990190',
    password: 'pass',
    photo: 'https://randomuser.me/api/portraits/women/1.jpg'
  }, {
    _id: userIds[1],
    username: 'AmonAtletics',
    name: 'Amon Hayes',
    email: 'amon@email.com',
    phoneNumber: '+44 3069 990191',
    password: 'pass',
    photo: 'https://randomuser.me/api/portraits/men/1.jpg'
  }, {
    _id: userIds[2],
    username: 'ChanChan',
    name: 'Katie Chan',
    email: 'chan@email.com',
    phoneNumber: '+44 3069 990192',
    password: 'pass',
    photo: 'https://randomuser.me/api/portraits/women/2.jpg'
  }
]

const mechanicData = [
  {
    _id: mechanicIds[0],
    username: 'Steve @ Shoredich Cycles',
    email: 'steve@email.com',
    phoneNumber: '+44 3069 994192',
    password: 'pass',
    photo: 'https://randomuser.me/api/portraits/men/2.jpg',
    location: {
      lat: '51.524353',
      lng: '-0.076683'
    }
  }, {
    _id: mechanicIds[1],
    username: 'Mechanic Mike',
    email: 'mike@email.com',
    phoneNumber: '+44 3059 994192',
    password: 'pass',
    photo: 'https://randomuser.me/api/portraits/men/3.jpg',
    location: {
      lat: '51.524353',
      lng: '-0.076683'
    }
  }, {
    _id: mechanicIds[2],
    username: 'Bridget\'s Bikes',
    email: 'bridget@email.com',
    phoneNumber: '+44 1059 994192',
    password: 'pass',
    photo: 'https://randomuser.me/api/portraits/women/5.jpg',
    location: {
      lat: '51.524353',
      lng: '-0.076683'
    }
  }
]

const serviceData = [{
  _id: serviceIds[0],
  name: 'Gold Service',
  description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  price: 120,
  mechanic: mechanicIds[0]
}, {
  _id: serviceIds[1],
  name: 'Silver Service',
  description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  price: 60,
  mechanic: mechanicIds[0]
}, {
  _id: serviceIds[2],
  name: 'Bronze Service',
  description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  price: 40,
  mechanic: mechanicIds[0]
}, {
  _id: serviceIds[3],
  name: 'Wheel Build',
  description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  price: 50,
  mechanic: mechanicIds[1]
}, {
  _id: serviceIds[4],
  name: 'Bike Fitting',
  description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  price: 100,
  mechanic: mechanicIds[1]
}, {
  _id: serviceIds[5],
  name: 'Race Set-up',
  description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  price: 120,
  mechanic: mechanicIds[1]
}, {
  _id: serviceIds[6],
  name: 'Puncture Repair (price per tyre)',
  description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  price: 6,
  mechanic: mechanicIds[2]
}, {
  _id: serviceIds[7],
  name: 'Replace drivechain',
  description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  price: 35,
  mechanic: mechanicIds[2]
}]

const bookingData = [{
  service: serviceIds[0],
  customer: userIds[0],
  extraFees: [{
    description: 'New chain',
    price: 34.99
  }, {
    description: 'Gear cable and outer',
    price: 3.95
  }],
  accepted: true,
  completed: true,
  collected: false
}]

mongoose.connect(dbUri, (err, db) => {
  db.dropDatabase()
  Service.create(serviceData).then(services => {
    console.log(`${services.length} services created`)
  })
  Mechanic.create(mechanicData).then(mechanics => {
    console.log(`${mechanics.length} mechanics created`)
  })
  User.create(userData).then(users => {
    console.log(`${users.length} users created`)
  })
  Booking.create(bookingData).then(booking => {
    console.log((`${booking.length} bookings created`))
  })
    .catch(err => console.log(err))
    .finally(() => mongoose.connection.close())
})
