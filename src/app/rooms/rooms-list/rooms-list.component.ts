import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RoomList } from '../rooms';

@Component({
  selector: 'app-rooms-list',
  templateUrl: './rooms-list.component.html',
  styleUrls: ['./rooms-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoomsListComponent implements OnInit {

  @Input() rooms: RoomList[] = [];
  @Input() availableRooms: number = 0;
  @Input() bookedRooms: number = 0;

  @Output() selectedRoom = new EventEmitter<RoomList>();
  @Output() available = new EventEmitter<number>();
  @Output() booked = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
    
  }
  ocuppy(roomNumber: number){
    const foundIndex = this.rooms.findIndex(room => room.roomNumber === roomNumber);
    this.rooms[foundIndex].occupied = true;
    this.rooms.sort((a,b) => (a.occupied < b.occupied) ? -1 : ((b.occupied < a.occupied) ? 1 : (a.roomNumber < b.roomNumber)? -0.5 : 0.5));
    this.availableRooms -= 1;
    this.bookedRooms += 1;
    this.available.emit(this.availableRooms);
    this.booked.emit(this.bookedRooms);
  }
  unocuppy(roomNumber: number){
    const foundIndex = this.rooms.findIndex(room => room.roomNumber === roomNumber);
    this.rooms[foundIndex].occupied = false;
    this.rooms.sort((a,b) => (a.occupied < b.occupied) ? -1 : ((b.occupied < a.occupied) ? 1 : (a.roomNumber < b.roomNumber)? -0.5 : 0.5));
    this.availableRooms += 1;
    this.bookedRooms -= 1;
    this.available.emit(this.availableRooms);
    this.booked.emit(this.bookedRooms);
  }
  setCheckInDate(checkIn:string, roomNumber: number)
  {
    const foundIndex = this.rooms.findIndex(room => room.roomNumber === roomNumber);
    this.rooms[foundIndex].checkInTime = new Date(checkIn);
  }
  setCheckOutDate(checkOut:string, roomNumber: number)
  {
    const foundIndex = this.rooms.findIndex(room => room.roomNumber === roomNumber);
    this.rooms[foundIndex].checkOutTime = new Date(checkOut);
  }

  selectRoom(room: RoomList){
    this.selectedRoom.emit(room);
  }

}

