# DansTonPass (Npm Project)
# Comment l'utiliser ? 
```js
const DansTonPass = require('danstonpass')('./MySuperCodeQR.png')
DansTonPass.then((pass_infos) => {
    console.log(pass_infos);
})
````
# Fonctions : 
- GetBirthday
- GetName,
- GetTG,
- GetDateOfVaccination,
- GetVersion,
- GetCO,
- GetDN,
- GetMA,
- GetVP,
- GetCI,
- GetMP,
- GetIS,
- GetSD,
- HowMany,
- allInfo
# DansTonPass OG Project
https://github.com/borisflesch/dans-ton-pass
## Demo

![Demo DansTonPass](https://github.com/borisflesch/dans-ton-pass/blob/main/static/demo.jpg?raw=true "Demo DansTonPass")

## Online access

https://danstonpass.fr


## Docker

```
$> docker build -t dans-ton-pass .
$> docker run -it -d -p 5599:5000 --name dans-ton-pass dans-ton-pass
```

## Run development server (Nuxt)

```
$> yarn install
$> yarn dev
```
