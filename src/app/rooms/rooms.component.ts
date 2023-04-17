import { formatDate } from '@angular/common';
import { Component, DoCheck, OnChanges } from '@angular/core';
import {Room, RoomList} from './rooms'

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})

export class RoomsComponent implements DoCheck {
  ngDoCheck(){
    console.log('DoCheck');
  }
  hotelName = 'Amadeus';
  hideRooms = false;

  roomList: RoomList[] = [];
  rooms: Room = {
    availableRooms: this.roomList.length,
    bookedRooms: 0
  }

  toggle() {
    this.hideRooms =!this.hideRooms;
  }
  lodge(){
    const foundIndex = this.roomList.findIndex(room => room.occupied === false);
    if(foundIndex>=0){
      this.rooms.availableRooms -= 1;
      this.rooms.bookedRooms += 1;
      this.roomList[foundIndex].occupied = true;
      this.roomList.sort((a,b) => (a.occupied < b.occupied) ? -1 : ((b.occupied < a.occupied) ? 1 : (a.roomNumber < b.roomNumber)? -0.5 : 0.5));
    }
  }
  dislodge(){
    const foundIndex = this.roomList.findIndex(room => room.occupied === true);
    if(foundIndex>=0){
      this.rooms.availableRooms += 1;
      this.rooms.bookedRooms -= 1;
      this.roomList[foundIndex].occupied = false;
      this.roomList.sort((a,b) => (a.occupied < b.occupied) ? -1 : ((b.occupied < a.occupied) ? 1 : (a.roomNumber < b.roomNumber)? -0.5 : 0.5));
    }  
  }
  setCheckInDate(checkIn:string, roomNumber: number)
  {
    const foundIndex = this.roomList.findIndex(room => room.roomNumber === roomNumber);
    this.roomList[foundIndex].checkInTime = new Date(checkIn);
  }
  setCheckOutDate(checkOut:string, roomNumber: number)
  {
    const foundIndex = this.roomList.findIndex(room => room.roomNumber === roomNumber);
    this.roomList[foundIndex].checkOutTime = new Date(checkOut);
  }

  ngOnInit() {
    this.roomList = [{
      occupied: false,
      roomNumber: 1,
      roomType : 'Apartment',
      amenities : ['kettle', 'bathrooms', 'balcony', 'bathrobes'],
      price: 100,
      photos: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688',
      checkInTime: new Date('01-01-2023') ,
      checkOutTime: new Date ('01-05-2023'),
      rating: 4.3
    },
    {
      occupied: false,
      roomNumber: 2,
      roomType : 'Deluxe room',
      amenities : ['kettle', 'bathrooms', 'balcony', 'bathrobes'],
      price: 300,
      photos: 'https://images.unsplash.com/photo-1591088398332-8a7791972843',
      checkInTime: new Date('01-04-2023') ,
      checkOutTime: new Date ('02-04-2023'),
      rating: 4.6
    },
    {
      occupied: false,
      roomNumber: 3,
      roomType : 'B&B',
      amenities : ['kettle', 'bathrooms', 'balcony', 'bathrobes'],
      price: 50,
      photos: 'https://images.unsplash.com/photo-1451153378752-16ef2b36ad05',
      checkInTime: new Date('01-04-2023') ,
      checkOutTime: new Date ('02-04-2023'),
      rating: 3.3567
    },
    {
      occupied: false,
      roomNumber: 4,
      roomType : 'Private Suite',
      amenities : ['kettle', 'bathrooms', 'bathrobes', 'bedsheets'],
      price: 300,
      photos: 'https://images.unsplash.com/photo-1504624720567-64a41aa25d70',
      checkInTime: new Date('03-04-2023') ,
      checkOutTime: new Date ('05-04-2023'),
      rating: 2.567
    }
  ]
  this.rooms = {
    availableRooms: this.roomList.length,
    bookedRooms: 0
  }
  }

  selectRoom(room: RoomList) {
    console.log(room);
  }

  available(availableRooms: number){
    this.rooms.availableRooms = availableRooms;
  }

  booked(bookedRooms: number){
    this.rooms.bookedRooms = bookedRooms;
  }


  addRoom(){
    const foundIndex = this.roomList.findIndex(room => room.roomNumber === 5);
    if (foundIndex != -1) {
      return
    }
    const room: RoomList = {
      occupied: true,
      roomNumber: 2,
      roomType: 'Private Suite',
      amenities: ['kitchen','bed','bathroom'],
      price: 500,
      photos: 'https://images.unsplash.com/flagged/photo-1556438758-8d49568ce18e',
      checkInTime: new Date('03-04-2023') ,
      checkOutTime: new Date ('05-04-2023'),
      rating: 2.80
    }
    this.roomList = [...this.roomList, room];
    this.rooms.bookedRooms +=1;
    this.roomList.sort((a,b) => (a.occupied < b.occupied) ? -1 : ((b.occupied < a.occupied) ? 1 : (a.roomNumber < b.roomNumber)? -0.5 : 0.5));
  }
}
