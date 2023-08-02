
export const kelvinToCelsius = (kelvin: number) => {
    // Check if the input is a valid number
    if (typeof kelvin !== 'number' || isNaN(kelvin)) {
        console.error("Invalid input. Please provide a valid number.");
    }
    
    // Convert Kelvin to Celsius
    const celsius = kelvin - 273.15;
    
    return Math.round(celsius * 10) / 10;
}
