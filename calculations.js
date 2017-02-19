

angular
	.module('calculator', [])
	.controller('carpetMeasureController', [carpetMeasureController]);


function carpetMeasureController(){
	vm = this;
	
	vm.finalCost = 0;
	vm.homeAddress = "";
	vm.carpetCost = 0;
	vm.plankCost = 0;
	vm.tileCost = 0;
	vm.sheetVinylCost = 0;
	vm.sendToCurrentWorkBench = sendToCurrentWorkBench;
	vm.roomNewName = "";
	vm.checked;
	vm.addAClosetToRoomInWorkBench = addAClosetToRoomInWorkBench;
	vm.saveRoomFromWorkBench = saveRoomFromWorkBench;
	vm.removeRowFromSavedRooms = removeRowFromSavedRooms;
	vm.sendToWorkBenchForUpdates = sendToWorkBenchForUpdates;
	vm.stairCarpet = 0;
	vm.stairPlank = 0;
	vm.stairTile = 0;
	vm.stairVinyl = 0;
	vm.calculateStairCarpet = calculateStairCarpet;
	vm.calculateStairPlank = calculateStairPlank;
	vm.calculateStairTile = calculateStairTile;
	vm.calculateStairVinyl = calculateStairVinyl;
	vm.roomCarpet = 0;
	vm.roomPlank = 0;
	vm.roomTile = 0;
	vm.roomVinyl = 0;
	vm.calculateRoomCarpet = calculateRoomCarpet;
	vm.calculateRoomPlank = calculateRoomPlank;
	vm.calculateRoomTile = calculateRoomPlank;
	vm.calculateRoomVinyl = calculateRoomPlank;
	vm.carpetAmount = 0;
	vm.plankAmount = 0;
	vm.tileAmount = 0;
	vm.vinylAmount = 0;
	vm.getFinalCost = getFinalCost;
	vm.floorType = 0;



	var  alertion = document.getElementById("alertion");

	/***** ARRAYS *****/

	vm.selectRoom = [
		{
			roomName: "Bedroom", floorType: 0, sysf: true, roomType: 0, used: 1
		},
		{
			roomName: "Bathroom", floorType: 0, sysf: true, roomType: 1, used: 1
		},
		{
			roomName: "Kitchen", floorType: 0, sysf: true, roomType: 2, used: 1
		},
		{
			roomName: "Living Room", floorType: 0, sysf: true, roomType: 3, used: 1
		},
		{
			roomName: "Stairs", floorType: 0, sysf: true, roomType: 4, used: 1
		},
		{
			roomName: "Hallway", floorType: 0, sysf: true, roomType: 5, used: 1
		},
		{
			roomName: "Dining Room", floorType: 0, sysf: true, roomType: 6, used: 1
		},
		{
			roomName: "Laundry Room", floorType: 0, sysf: true, roomType: 7, used: 1
		},
		{
			roomName: "Family/Great Room", floorType: 0, sysf: true, roomType: 8, used: 1
		}
	]

	vm.options = [
		{
			option: "Carpet", type: 0
		},
		{
			option: "Plank", type: 1
		},
		{
			option: "Tile", type: 2
		},
		{
			option: "Sheet Vinyl", type: 3
		}
	]

	vm.currentInWorkBench = []
	vm.savedRooms = []

	// this roomType parameter is the roomType from vm.selectRoom

	function sendToCurrentWorkBench(roomType, floorType, name){
		var i;
		var sysf;
		if(floorType == 0){
			sysf = true;
		}else{
			sysf = false;
		}
		if(vm.currentInWorkBench.length < 1){

			for(i = 0; i < vm.selectRoom.length; i++){
				if(roomType == vm.selectRoom[i].roomType){
					if(name == null){
						if(roomType == 4){
							vm.currentInWorkBench.push(
								{
									active: false, roomName: vm.selectRoom[i].roomName + " " + vm.selectRoom[i].used, floorType: floorType, sysf: sysf, roomType: roomType, steps: 0, width: 0, height: 0.83, depth: 0.92 
								}
							)
							vm.selectRoom[i].used += 1;
						}else{
							vm.currentInWorkBench.push(
								{
									active: false, roomName: vm.selectRoom[i].roomName + " " + vm.selectRoom[i].used, floorType: floorType, sysf: sysf, roomType: roomType, width1: 0, height1: 0, width2: 0, height2: 0 
								}
							)
							vm.selectRoom[i].used += 1;
						}
					}
				}
			}
			if(roomType == 9){
				vm.currentInWorkBench.push(
					{
						active: false, roomName: name, floorType: floorType, sysf: sysf, roomType: roomType, width1: 0, height1: 0, width2: 0, height2: 0 
					}
				)
			}
		}else{
			alertion.innerHTML = "Please finish the room in the workbench";
		}
		vm.roomNewName = "";
	}

	function addAClosetToRoomInWorkBench(name, sysf, floorType, roomType){
		vm.savedRooms.push(
			{
				active: false, roomName: name, floorType: floorType, sysf: sysf, roomType: roomType, width1: 0, height1: 0, width2: 0, height2: 0
			}
		)
		alertion.innerHTML = "";
	}

	function saveRoomFromWorkBench(name, sysf, floorType, roomType, index, steps, width, height, width2, height2, depth){
		vm.currentInWorkBench.splice(index, 1);

		if(floorType === 0){
			if(roomType == 4){
				vm.savedRooms.push(
					{
						active: false, roomName: name, floorType: floorType, sysf: sysf, roomType: roomType, steps: steps, width: width, height: height, depth: depth, CAmount: round((steps * width * height * depth) / 9, 1), PAmount: 0, TAmount: 0, VAmount: 0
					}
				)
			}else{
				vm.savedRooms.push(
					{
						active: false, roomName: name, floorType: floorType, sysf: sysf, roomType: roomType, width1: width, height1: height, width2: width2, height2: height2, CAmount: round(((width * height) + (height2 * width2)) / 9, 1) , PAmount: 0, TAmount: 0, VAmount: 0
					}
				)
			}
		}else if(floorType === 1){
			if(roomType === 4){
				vm.savedRooms.push(
					{
						active: false, roomName: name, floorType: floorType, sysf: sysf, roomType: roomType, steps: steps, width: width, height: height, depth: depth, CAmount:0, PAmount: steps * width * height * depth, TAmount: 0, VAmount: 0
					}
				)
			}else{
				vm.savedRooms.push(
					{
						active: false, roomName: name, floorType: floorType, sysf: sysf, roomType: roomType, width1: width, height1: height, width2: width2, height2: height2, CAmount: 0, PAmount: (width * height) + (height2 * width2), TAmount: 0, VAmount: 0
					}
				)
			}
		}else if(floorType === 2){
			if(roomType === 4){
				vm.savedRooms.push(
					{
						active: false, roomName: name, floorType: floorType, sysf: sysf, roomType: roomType, steps: steps, width: width, height: height, depth: depth, CAmount:0, PAmount: 0, TAmount: steps * width * height * depth, VAmount: 0
					}
				)
			}else{
				vm.savedRooms.push(
					{
						active: false, roomName: name, floorType: floorType, sysf: sysf, roomType: roomType, width1: width, height1: height, width2: width2, height2: height2, CAmount: 0, PAmount: 0, TAmount: (width * height) + (height2 * width2), VAmount: 0
					}
				)
			}
		}else if(floorType === 3){
			if(roomType === 4){
				vm.savedRooms.push(
					{
						active: false, roomName: name, floorType: floorType, sysf: sysf, roomType: roomType, steps: steps, width: width, height: height, depth: depth, CAmount:0, PAmount: 0, TAmount: 0, VAmount: steps * width * height * depth
					}
				)
			}else{
				vm.savedRooms.push(
					{
						active: false, roomName: name, floorType: floorType, sysf: sysf, roomType: roomType, width1: width, height1: height, width2: width2, height2: height2, CAmount: 0, PAmount: 0, TAmount: 0, VAmount: (width * height) + (height2 * width2)
					}
				)
			}
		}

		if(floorType === 0){
			if(roomType ===4){
				vm.calculateStairCarpet(steps, width, height, depth);
			}else{
				vm.calculateRoomCarpet(width, height, width2, height2);
			}
		}else if(floorType === 1){
			if(roomType ===4){
				vm.calculateStairPlank(steps, width, height, depth);
			}else{
				vm.calculateRoomPlank(width, height, width2, height2);
			}
		}else if(floorType === 2){
			if(roomType ===4){
				vm.calculateStairTile(steps, width, height, depth);
			}else{
				vm.calculateRoomTile(width, height, width2, height2);
			}
		}else if(floorType === 4){
			if(roomType ===4){
				vm.calculateStairVinyl(steps, width, height, depth);
			}else{
				vm.calculateRoomVinyl(width, height, width2, height2);
			}
		}

		alertion.innerHTML = "";
	}

	function removeRowFromSavedRooms(index){
		var i;
		for(i = 0; i < vm.selectRoom.length; i++){
			if(vm.selectRoom[i].roomType === vm.savedRooms[index].roomType){
				vm.selectRoom[i].used -= 1;
			}
		}
		vm.carpetAmount -= vm.savedRooms[index].CAmount;
		vm.plankAmount -= vm.savedRooms[index].PAmount;
		vm.vinylAmount -= vm.savedRooms[index].VAmount;
		vm.tileAmount -= vm.savedRooms[index].TAmount;
		vm.savedRooms.splice(index, 1);
	}

	function sendToWorkBenchForUpdates(index, name, sysf, floorType, roomType, Camount, Pamount, Tamount, Vamount){
		if(vm.currentInWorkBench.length < 1){
			if(vm.savedRooms[index].roomType === 4){
				vm.currentInWorkBench.push(
					{
						active: true, roomName: name, floorType: floorType, sysf: sysf, roomType: roomType, steps: vm.savedRooms[index].steps, width: vm.savedRooms[index].width, height: vm.savedRooms[index].height, depth: vm.savedRooms[index].depth
					}
				)
			}else{
				vm.currentInWorkBench.push(
					{
						active: true, roomName: name, floorType: floorType, sysf: sysf, roomType: roomType, width1: vm.savedRooms[index].width1, height1: vm.savedRooms[index].height1, width2: vm.savedRooms[index].width2, height2: vm.savedRooms[index].height2
					}
				)
			}
			vm.savedRooms.splice(index, 1);
			if(floorType === 0){
				vm.carpetAmount -= Camount;
				vm.getFinalCost();
			}else if(floorType === 1){
				vm.plankAmount -= Pamount;
				vm.getFinalCost();
			}else if(floorType === 2){
				vm.tileAmount -= Tamount;
				vm.getFinalCost();
			}else if(floorType === 3){
				vm.vinylAmount -= Vamount;
				vm.getFinalCost();
			}
		}else{
			alertion.innerHTML = "Please finish the room in the workBench.";
		}
	}

	function calculateStairCarpet(s1, w1, h1, d1){
		vm.stairCarpet = round((s1 * w1 * h1 * d1) / 9, 1);
		
		vm.carpetAmount += round(vm.stairCarpet, 1);

		vm.getFinalCost();
	}

	function calculateStairPlank(s1, w1, h1, d1){
		vm.stairPlank = round(s1 * w1 * h1 * d1, 1);

		vm.plankAmount += round(vm.stairPlank, 1);

		vm.getFinalCost();
	}

	function calculateStairTile(s1, w1, h1, d1){
		vm.stairTile = round(s1 * w1 * h1 * d1, 1);

		vm.tileAmount += round(vm.stairTile, 1);

		vm.getFinalCost();
	}

	function calculateStairVinyl(s1, w1, h1, d1){
		vm.stairVinyl = round(s1 * w1 * h1 * d1, 1);

		vm.vinylAmount += round(vm.stairVinyl, 1);

		vm.getFinalCost();
	}

	function calculateRoomCarpet(w1, h1, w2, h2){
		var amount = 0;

		vm.stairVinyl = round(w1 * h1, 1);
		vm.stairTile = round(w2 * h2, 1);

		vm.roomCarpet =  (vm.stairVinyl + vm.stairTile) / 9;
		
		vm.carpetAmount += round((vm.roomCarpet + vm.stairCarpet), 1);

		vm.getFinalCost();
	}

	function calculateRoomPlank(w1, h1, w2, h2){
		vm.stairVinyl = round(w1 * h1, 1);
		vm.stairCarpet = round(w2 * h2, 1);

		vm.roomPlank =  (vm.stairVinyl + vm.stairCarpet);

		vm.plankAmount += round((vm.roomPlank + vm.stairPlank), 1);

		vm.getFinalCost();
	}

	function calculateRoomTile(w1, h1, w2, h2){
		vm.stairVinyl = round(w1 * h1, 1);
		vm.stairCarpet = round(w2 * h2, 1);

		vm.roomTile =  (vm.stairVinyl + vm.stairCarpet);

		vm.tileAmount += round((vm.roomTile + vm.stairTile), 1);

		vm.getFinalCost();
	}

	function calculateRoomVinyl(w1, h1, w2, h2){
		vm.stairtile = round(w1 * h1, 1);
		vm.stairCarpet = round(w2 * h2, 1);

		vm.roomVinyl =  (vm.stairtile + vm.stairCarpet);

		vm.vinylAmount += round((vm.roomVinyl + vm.stairVinyl), 1);

		vm.getFinalCost();
	}

	function getFinalCost(){
		vm.finalCost = 0;
		var CSubtotal = vm.carpetAmount * vm.carpetCost;
		var PSubtotal = vm.plankAmount * vm.plankCost;
		var TSubtotal = vm.tileAmount * vm.tileCost;
		var VSubtotal = vm.vinylAmount * vm.sheetVinylCost;

		vm.finalCost = round(CSubtotal + PSubtotal + TSubtotal + VSubtotal, 2);
	}

	function round(value, decimals) {
  		return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
	}

}
		