export interface Room {
    availableRooms: number;
    bookedRooms: number;
}

export interface RoomList {
    occupied: boolean;
    roomNumber: number;
    roomType: string;
    amenities: string[];
    price: number;
    photos: string;
    checkInTime: Date;
    checkOutTime: Date;
    rating: number;
}