import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function addRoom(input_name) {
  await prisma.room.create({data: {name: input_name}})
}

export async function getRooms() {
  const rooms = await prisma.room.findMany()
  prisma.$disconnect();
  return rooms;
}

export async function getRoomByID(id){
  const room = await prisma.room.findMany({where: {id: id}})
  prisma.$disconnect();
  return room;
}

export async function deleteRoom(input_id) {
  await prisma.room.delete({where: {id: input_id}})
  prisma.$disconnect();
}

export async function addItem(input_name, input_room_id, input_state) {
  await prisma.item.create({data: {name: input_name, room_id: input_room_id, state: input_state}})
  prisma.$disconnect();
}

export async function getItemsInRoom(room_id) {
  const items = await prisma.item.findMany({
    where: { room_id: room_id },
  });
  prisma.$disconnect();
  return items;
}

export async function deleteItem(item_id) {
  await prisma.item.delete({
    where: {
      id: item_id
    }
  })
  prisma.$disconnect();
}

export async function deleteAllItemInRoom(in_room_id) {
  await prisma.item.deleteMany({where: {room_id: in_room_id}})
  prisma.$disconnect();
}