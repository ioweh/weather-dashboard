
export const kelvinToCelsius = (kelvin) => {
    // Check if the input is a valid number
    if (typeof kelvin !== 'number' || isNaN(kelvin)) {
        return "Invalid input. Please provide a valid number.";
    }
    
    // Convert Kelvin to Celsius
    const celsius = kelvin - 273.15;
    
    return celsius.toFixed(1);
}
