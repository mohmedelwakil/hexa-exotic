const API_URL = "http://localhost:3000/api/cars";
const container = document.getElementById('cars-container');

async function loadCars() {
    try {
        const response = await fetch(API_URL);
        const json = await response.json();
        const cars = json.data;

        if (!cars || cars.length === 0) {
            container.innerHTML = `
                <div class="col-span-full text-center py-10">
                    <h3 class="text-xl font-bold text-gray-600">No cars available.</h3>
                </div>`;
            return;
        }

        container.innerHTML = '';

        cars.forEach(car => {
            const imageSrc = car.image_url ? `http://localhost:3000${car.image_url}` : './assets/hero2.jpg';

            const carHTML = `
                <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow flex flex-col">
                    <div class="relative h-48 bg-gray-200">
                        <img src="${imageSrc}" alt="${car.make} ${car.model}" class="w-full h-full object-cover">
                    </div>
                    
                    <div class="p-5 flex flex-col flex-grow">
                        <h3 class="text-lg font-bold text-gray-900 mb-2">${car.make} ${car.model}</h3>
                        
                        <ul class="text-xs text-gray-600 space-y-1 mb-4 flex-grow">
                            <li class="flex items-center">
                                <span class="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></span>
                                Year: ${car.year}
                            </li>
                            <li class="flex items-center">
                                <span class="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></span>
                                Price: $${car.price.toLocaleString()}
                            </li>
                        </ul>
                        
                        <div class="mt-auto">
                            <p class="text-xl font-bold text-gray-900 mb-3">$${car.price.toLocaleString()}</p>
                            
                            <button onclick="window.location.href='cardetails.html?id=${car.id}'" 
                                class="w-full text-white text-sm font-semibold py-2 rounded transition-colors"
                                style="background-color: #950045; cursor: pointer; border:none; padding:10px;">
                                View Details
                            </button>
                        </div>
                    </div>
                </div>
            `;
            container.innerHTML += carHTML;
        });

    } catch (error) {
        console.error("Error fetching cars:", error);
        container.innerHTML = `<p class="text-red-500 text-center">Server is not running!</p>`;
    }
}

loadCars();