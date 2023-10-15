module.exports = {
    parseWeather: (response) => {
        const weather = {
            temp_f: response.current.temp_f,
            temp_c: response.current.temp_c,
            text: response.current.condition.text,
            icon: response.current.condition.icon,
            location: response.location.name
        }

        return weather
    }
}

