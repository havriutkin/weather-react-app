module.exports = {
    parseWeather: (response) => {
        const code = response.current.condition.code;
        const time = response.current.is_day ? 'day' : 'night';
        let icon;
        try {
            icon = require(`./img/weather/${time}/${code}.png`);
        } catch (error) {
            icon = require('./img/weather/day/0.png');
        }

        const weather = {
            temp_f: response.current.temp_f,
            temp_c: response.current.temp_c,
            text: response.current.condition.text,
            icon: icon,
            location: response.location.name
        }

        return weather
    }
}

