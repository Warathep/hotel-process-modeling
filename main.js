// Include fs module
const fs = require('fs')

/*-----------class blueprint-----------*/

class Command {
  constructor(name, params) {
    this.name = name
    this.params = params
  }
}

/*-----------main() function for operation-----------*/

function main() {
  const filename = 'input.txt'
  const commands = getCommandsFromFileName(filename)

/*-----------Starting parameters-----------*/
  
  var keycard = [];
  var allroomInHotel = [];
  
  var countRoom = 0;
  var allBooking = [];
  var remainRoom = [];

  var allCheckout = [];


/*-----------Access to the function-----------*/

  commands.forEach(command => {

    switch (command.name) {

/*-----------Case 1: Create the room size in a hotel-----------*/

      case 'create_hotel':
        const [floor, roomPerFloor] = command.params;
        const hotel = { floor, roomPerFloor };

        for (let i = 1; i <= hotel.floor; i++) {
          let createdroomPerFloor = [];

          for (let j = 1; j <= hotel.roomPerFloor; j++) {
            let rmNum = i + '0' + j;
            createdroomPerFloor.push(rmNum);
          }
          allroomInHotel.push(createdroomPerFloor);
        }

        for (let i = 0; i < allroomInHotel.length; i++) {
          for (let j = 0; j < allroomInHotel[i].length; j++) {
            remainRoom.push(allroomInHotel[i][j]);
          }
        }

        countRoom = remainRoom.length;

        for (let i = 1; i <= countRoom; i++) {
          keycard.push(i);
        }

        console.log(
          `Hotel created with ${hotel.floor} floor(s), ${hotel.roomPerFloor} room(s) per floor.`
        )

        return

/*-----------Case 2: Booking for the guest-----------*/

        case 'book':
          const [roomNum, guestName, guestAge] = command.params;
          const book = { roomNum, guestName, guestAge };

          if (allBooking.length == 0) {

            const givenKeycard = keycard.shift();

            book.gkeycard = givenKeycard;

            allBooking.push(book);

            const index = remainRoom.indexOf(book.roomNum.toString());
            if (index > -1) { // only splice array when item is found
              remainRoom.splice(index, 1); // 2nd parameter means remove one item only
            }

            console.log(
              `Room ${book.roomNum} is booked by ${book.guestName} with keycard number ${givenKeycard}.`
            );

          } else {

            if (allBooking.length < countRoom) {

              let allRoomNumNow = [];
              for (let b = 0; b < allBooking.length; b++) {
                allRoomNumNow.push(allBooking[b].roomNum);
              }
              
              const isThatRoom = allRoomNumNow.find(element => element == book.roomNum);

              if (book.roomNum == isThatRoom) {

                const findIsThatRoom = (element) => element == isThatRoom;
                const isThatRoomIndex = allRoomNumNow.findIndex(findIsThatRoom);

                console.log(
                  `Cannot book room ${book.roomNum} for ${book.guestName}, The room is currently booked by ${allBooking[isThatRoomIndex].guestName}.`
                  );

              } else {
                const givenKeycard = keycard.shift();

                book.gkeycard = givenKeycard;

                allBooking.push(book);

                const index = remainRoom.indexOf(book.roomNum.toString());
                if (index > -1) { // only splice array when item is found
                  remainRoom.splice(index, 1); // 2nd parameter means remove one item only
                }

                console.log(
                  `Room ${book.roomNum} is booked by ${book.guestName} with keycard number ${givenKeycard}.`
                );

              }

            } else {
              console.log(
                `No more available room for the guests.`
              );
            }

          }

          return

/*-----------Case 3: Check available rooms-----------*/

        case 'list_available_rooms':
          
          lar = [];
          
          for (let elements of remainRoom) {
            lar.push(elements);
          }

          console.log(lar);

          return

/*-----------Case 4: Check out rooms-----------*/

        case 'checkout':
          const [keycardNum, guestName4] = command.params;
          const checkOut = { keycardNum, guestName4 };

          let gkeycardAllBooking = []
          for (let i = 0; i < allBooking.length; i++) {
            gkeycardAllBooking.push(allBooking[i].gkeycard);
          }

          const index = gkeycardAllBooking.indexOf(checkOut.keycardNum);

          if (checkOut.guestName4 == allBooking[index].guestName) {

            allCheckout.push(allBooking[index]);

            if (index > -1) {
              allBooking.splice(index, 1);
            }

            keycard.push(allCheckout[allCheckout.length - 1].gkeycard)
            keycard.sort((a, b) => a - b);

            remainRoom.push(allCheckout[allCheckout.length - 1].roomNum);

            console.log(
              `Room ${allCheckout[allCheckout.length - 1].roomNum} is checkout.`
            );

          } else {

            console.log(
              `Only ${allBooking[index].guestName} can checkout with keycard number ${checkOut.keycardNum}.`
            );

          }

          return

/*-----------Case 5: Check list of the guests in hotel-----------*/

        case 'list_guest':

          let lg = [];

          for (let elements of allBooking) {
            lg.push(elements.guestName);
          }

          console.log(lg);

          return

/*-----------Case 6: Check list of the guests in hotel-----------*/

        case 'get_guest_in_room':

          const [roomNum6] = command.params;
          const getGuestInRoom = { roomNum6 };

          let guestAllBooking = [];

          for (let i = 0; i < allBooking.length; i++) {
              guestAllBooking.push(allBooking[i].roomNum);
          }

          const index6 = guestAllBooking.indexOf(getGuestInRoom.roomNum6);

          console.log(allBooking[index6].guestName);

          return

/*-----------Case 7: Check list of the guests in hotel-----------*/

        case 'list_guest_by_age':

          const [logic, guestAge7] = command.params;
          const listGuestByAge = { logic,  guestAge7 };

          let guestAgeAllBooking = [];
          
          for (let i = 0; i < allBooking.length; i++) {
            guestAgeAllBooking.push(allBooking[i].guestAge);
          }

          var math_it_up = {
            '<': function (x, y) { return x < y },
            '<=': function (x, y) { return x <= y },
            '>': function (x, y) { return x > y },
            '>=': function (x, y) { return x >= y }
          };
          
          let result7 = guestAgeAllBooking.filter(checkAdult);

          function checkAdult(age) {
            return math_it_up[listGuestByAge.logic](age, listGuestByAge.guestAge7);
          }

          let listGuestwithCondition = [];

          for (let i = 0; i < result7.length; i++) {
            let index7 = guestAgeAllBooking.indexOf(result7[i]);
            listGuestwithCondition.push(allBooking[index7].guestName);
          }

          console.log(listGuestwithCondition);
          

          return

/*-----------Case 8: Check list of the guests by floor-----------*/

        case 'list_guest_by_floor':

          const [floorGuest] = command.params;
          const listGuestByFloor = { floorGuest };
          
          let selectedFloor = allroomInHotel[listGuestByFloor.floorGuest - 1];
          
          let guestOnThatFloor = [];

          for (let i = 0; i < allBooking.length; i++) {
            found = selectedFloor.find(element => element == allBooking[i].roomNum);

            if( typeof found !== 'undefined' ) {
              guestOnThatFloor.push(parseInt(found, 10));
            }
            
          }

          let guestFloorAllBooking = [];

          for (let i = 0; i < allBooking.length; i++) {
              guestFloorAllBooking.push(allBooking[i].roomNum);

          }

          
          let listGuestFloorwithCondition = [];

          for (let i = 0; i < guestOnThatFloor.length; i++) {
            let index8 = guestFloorAllBooking.indexOf(guestOnThatFloor[i]);
            listGuestFloorwithCondition.push(allBooking[index8].guestName)

          }

          console.log(listGuestFloorwithCondition);

          return

/*-----------Case 9: Checkout list of the guests by floor-----------*/

        case 'checkout_guest_by_floor':

          const [floorCheckout] = command.params;
          const checkoutGuestByFloor = { floorCheckout };

          let selectedCheckoutFloor = allroomInHotel[checkoutGuestByFloor.floorCheckout - 1];

          let checkoutOnThatFloor = [];

          for (let i = 0; i < allBooking.length; i++) {
            found = selectedCheckoutFloor.find(element => element == allBooking[i].roomNum);
            if( typeof found !== 'undefined' ) {
              checkoutOnThatFloor.push(parseInt(found, 10));
            }          
          }

          let checkoutFloorAllBooking = []
          for (let i = 0; i < allBooking.length; i++) {
              checkoutFloorAllBooking.push(allBooking[i].roomNum);
          }

          let listCheckoutFloorwithCondition = [];

          for (let i = 0; i < checkoutOnThatFloor.length; i++) {
            let index9 = checkoutFloorAllBooking.indexOf(checkoutOnThatFloor[i]);
            listCheckoutFloorwithCondition.push(allBooking[index9].roomNum);
            allCheckout.push(allBooking[index9]);

            keycard.push(allCheckout[allCheckout.length - 1].gkeycard)
            keycard.sort((a, b) => a - b);

            remainRoom.push(allCheckout[allCheckout.length - 1].roomNum);

          }

          for (let i = checkoutOnThatFloor.length - 1; i >= 0; i--) {
            let indexx = checkoutFloorAllBooking.indexOf(checkoutOnThatFloor[i]);

            if (indexx > -1) {
              allBooking.splice(indexx, 1);
            }

          }

          console.log(
            `Room ${listCheckoutFloorwithCondition} are checkout.`
          );

          return

/*-----------Case 10: Checkout list of the guests by floor-----------*/

        case 'book_by_floor':

          const [guestFloor, guestName10, guestAge10] = command.params;
          const bookFloor = { guestFloor, guestName10, guestAge10 };

          let selectedBookFloor = allroomInHotel[bookFloor.guestFloor - 1];

          let bookOnThatFloor = [];

          for (let i = 0; i < allCheckout.length; i++) {
            found = selectedBookFloor.find(element => element == allCheckout[i].roomNum);
            if( typeof found !== 'undefined' ) {
              bookOnThatFloor.push(parseInt(found, 10));
            }          
          }

          if (bookOnThatFloor.length == selectedBookFloor.length) {
            bookOnThatFloor.sort((a,b) => a-b);

            let keycardOnThatFloor = [];

            for (let i = 0; i < bookOnThatFloor.length; i++) {
              keycardOnThatFloor.push(keycard[i]);
            
            }

            console.log(
              `Room ${bookOnThatFloor} are booked with keycard number ${keycardOnThatFloor}.`
            );

          } else {

            console.log(
              `Cannot book floor ${bookFloor.guestFloor} for ${bookFloor.guestName10}.`
            );

          }

          return

/*-----------Out of cases: Booking for the guest-----------*/

      default:
        return
    }
  })
}

/*-----------Separate the data from input.txt-----------*/

function getCommandsFromFileName(fileName) {
  const file = fs.readFileSync(fileName, 'utf-8')

  return file
    .split('\n')
    .map(line => line.split(' '))
    .map(
      ([commandName, ...params]) =>
        new Command(
          commandName,
          params.map(param => {
            const parsedParam = parseInt(param, 10)

            return Number.isNaN(parsedParam) ? param : parsedParam
          })
        )
    )
}

/*-----------Operate the main() function-----------*/

main()