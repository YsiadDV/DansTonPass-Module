const QRReader = require('qrcode-reader'),
    fs = require('fs'),
    jimp = require('jimp'),
    pako = require('pako'),
    base45 = require('base45'),
    cbor = require('cbor');

function removePrefix(text) {
    return text.replace("HC1:", "");
}

function base45decode(data) {
    return base45.decode(data);
}

function zlibDecompress(data) {
    return pako.inflate(data);
}

function getJson(data) {
    let decoded = cbor.decodeAllSync(data)
    decoded = cbor.decodeAllSync(decoded[0].value[2])
    return decoded[0].get(-260).get(1);
}




module.exports = async function run(code) {
    const img = await jimp.read(fs.readFileSync(code));
    const qr = new QRReader();
    const value = await new Promise((resolve, reject) => {
        qr.callback = (err, v) => err != null ? reject(err) : resolve(v);
        qr.decode(img.bitmap);
    });
    const withoutPrefix = removePrefix(value.result)
    const base45Decoded = base45decode(withoutPrefix)
    const Decompressed = zlibDecompress(base45Decoded)
    var allInfo = () => {
        return getJson(Decompressed)
    }
    const GetBirthday = () => {
        return allInfo.dob
    }
    const GetName = () => {
        return allInfo.nam
    }
    const GetVersion = () => {
        return allInfo.ver
    }
    const GetDateOfVaccination = () => {
        return allInfo().v[0].dt
    }
    const GetCO = () => {
        return allInfo().v[0].co
    }
    const GetDN = () => {
        return allInfo().v[0].dn
    }
    const GetMA = () => {
        return allInfo().v[0].ma
    }
    const GetVP = () => {
        return allInfo().v[0].vp
    }
    const GetCI = () => {
        return allInfo().v[0].ci
    }
    const GetMP = () => {
        return allInfo().v[0].mp
    }
    const GetIS = () => {
        return allInfo().v[0].is
    }
    const GetSD = () => {
        return allInfo().v[0].sd
    }
    const GetTG = () => {
        return allInfo().v[0].tg
    }
    const HowMany = () => {
        return allInfo().v[1] ? 'Two' : 'One injection'
    }
    return {
        GetBirthday,
        GetName,
        GetTG,
        GetDateOfVaccination,
        GetVersion,
        GetCO,
        GetDN,
        GetMA,
        GetVP,
        GetCI,
        GetMP,
        GetIS,
        GetSD,
        GetTG,
        HowMany,
        allInfo
    }
}