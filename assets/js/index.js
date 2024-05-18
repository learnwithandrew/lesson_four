document.addEventListener('DOMContentLoaded', () => {
    let carContainer = document.getElementById('car-cards');
    let carModal = document.getElementById('myModal');
    let carForm = document.getElementById('carSubmit-form');
    let carFormImage = document.getElementById('car-image');
    let carFormName = document.getElementById('car-name');
    let carFormDetails = document.getElementById('car-details');


    let displayCars = () => {
        fetch('http://localhost:3000/cars')
            .then(response => response.json())
            .then((data) => {
                data.map((car) => {
                    let carCard = document.createElement('div');
                    carCard.classList.add('card');
                    carCard.innerHTML = `
                    <img src="${car.carImage}" alt="${car.carName}" />
                    <h5>${car.carName}</h5>
                  `;

                    let pickItem = () => {
                        let carClose = document.getElementById('modal-close');
                        let modalInfo = document.getElementById('modal-info');
                        let openCarModal = () => {
                            carModal.style.display = "block";
                            modalInfo.innerHTML = `
                            <div class="image-container">
                                <img src="${car.carImage}" alt="${car.carName}" />
                            </div>
                            <div class="car-information">
                                <h5>${car.carName}</h5>
                                <p>${car.carDetails}</p>
                            </div>
                            <div class="modify-buttons" id="modify-buttons">
                                <button type="btn button" class="delete-button" id="delete-button" data-id=${car.id}>Delete</button>&nbsp;
                                <button type="btn button" class="edit-button" data-bs-toggle="modal"
                                    data-bs-target="#updateCarForm" id="edit-button">Edit</button>
                            </div>
                            `;
                        }
                        let closeCarModal = () => {
                            carModal.style.display = "none";
                        }
                        carCard.addEventListener('click', openCarModal);
                        carClose.addEventListener('click', closeCarModal);
                    }
                    pickItem(car.id)
                    carContainer.appendChild(carCard)
                });
            })
    }

    let carPostForm = (e) => {
        e.preventDefault();

        const carName = carFormName.value;
        const carImage = carFormImage.value;
        const carDetails = carFormDetails.value;

        const newCarItem = {
            carName,
            carImage,
            carDetails
        }

        fetch('http://localhost:3000/cars', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newCarItem)
        }).then(reponse => reponse)
    }

    carModal.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-button')) {
            const id = e.target.dataset.id
            carDeleteForm(id)
        }
    })

    let carDeleteForm = (id) => {
        fetch(`http://localhost:3000/cars/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': "application/type"
            }
        })
    }



    carForm.addEventListener('submit', carPostForm)
    displayCars();

})