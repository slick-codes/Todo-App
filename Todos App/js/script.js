	

	const input = document.querySelector('#input')
	const output = document.querySelector('.todoDisplay')
	const addTodo = document.querySelector('#addTodo')
	const clearBtn = document.querySelector('#clearAllTodo')
	const left = document.querySelector('.todoDetails')

	let todoArray
	let saveToStorage = () => localStorage.setItem('data', JSON.stringify(todoArray))

	localStorage.length == 0 || localStorage.data == 'undefined' ? todoArray = [] : todoArray = JSON.parse(localStorage.getItem('data'))


		function displayElements(){
			for(i=0; i<todoArray.length; i++){
					output.innerHTML += `<div class="todoComponents"> 
											<input type="checkbox" class="check">
											<div class="text-holder">
												<span>${todoArray[i].todo} <p>${todoArray[i].dateCreated}</p></span>
											</div>
											<button onclick='deleteData(${i})'>Delete</button>
										</div>`
				}
			}
		displayElements()

	let check = document.querySelectorAll('.check')
	let num = 0

		function showCheckedItems(){
		 todoArray.forEach((element, index)=> {
				if(element.isDone == true){
				check[index].click()

				}
			})
		}
		showCheckedItems()

		function setNewData(item, isDone) {
			if(input.value != '' && input.value != null ){
				let obj = {todo: input.value, isDone: false, dateCreated: dates()}
				todoArray.unshift(obj)
				saveToStorage()
				output.innerHTML = ''
				input.value = ''
				displayElements()
				
				details()

			}else{
				console.log('errors')
			}
			

		}

		function deleteData(x, y=1){
			todoArray.splice(x, y)
			saveToStorage()
				output.innerHTML = ''
				displayElements()
				// showCheckedItems()
				details()

		}

		function deleteAll(){
			todoArray.splice(0, todoArray.length)
			saveToStorage()
				output.innerHTML = ''
				displayElements()
				details()

		}

		function details(){
			let checkedItems = 0
				check.forEach(element => {
				  if(element.checked == true){
				    checkedItems++
				  }
				})
			let pendingItems = todoArray.length - checkedItems

			left.innerHTML = `<span id='totalItems'>${todoArray.length} Items</span>
								<span>${checkedItems} Checked</span>
								<span>${pendingItems} Pending</span>`

		}
		details()

	addTodo.onclick = setNewData

	clearBtn.onclick = deleteAll

		function validCheck(){
			for(let i=0; i<check.length; i++){
				if(check[i].checked == true){
					todoArray[i].isDone = true
					saveToStorage()
				}else{
					todoArray[i].isDone = false
					saveToStorage()
				}
			}
		}

		function dates() {
			let date = new Date(),
			 day = date.getDate(),
			 month = date.getMonth() + 1,
			 year = date.getFullYear()
			 return(`${day}/ ${month}/ ${year}`)
		}

	for(let i=0; i<check.length; i++){
		check[i].onclick = ()=>{
			validCheck()
			details()
		}
	}


	document.addEventListener('keydown', (event) => {
	  if(event.key == 'Enter'){
	  	setNewData()
	  }
	}, false);

	// setInterval(()=>{
	// 	for(let i=0; i<todoArray.length; i++){
	// 		if(todoArray[i].isDone == true){
	// 			todoArray.splice(i, 1)
	// 			saveToStorage()
	// 			output.innerHTML = ''
	// 			displayElements()
	// 		}
	// 	}
	// }, '5000')