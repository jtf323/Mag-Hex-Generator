// mag.js

const MAGS = [
    [['00', 'Mag'],       ['01', 'Varuna'],       ['02', 'Mitra']],
    [['03', 'Surya'],     ['04', 'Vayu'],         ['05', 'Varaha']],
    [['06', 'Kama'],      ['07', 'Ushasu'],       ['08', 'Apsaras']],
    [['09', 'Kumara'],    ['0A', 'Kaitabha'],     ['0B', 'Tapas']],
    [['0C', 'Bhirava'],   ['0D', 'Kalki'],        ['0E', 'Rudra']],
    [['0F', 'Marutah'],   ['10', 'Yaksa'],        ['11', 'Sita']],
    [['12', 'Garuda'],    ['13', 'Nandin'],       ['14', 'Ashvinau']],
    [['15', 'Ribhava'],   ['16', 'Soma'],         ['17', 'Ila']],
    [['18', 'Durga'],     ['19', 'Vritra'],       ['1A', 'Namuci']],
    [['1B', 'Sumba'],     ['1C', 'Naga'],         ['1D', 'Pitri']],
    [['1E', 'Kabanda'],   ['1F', 'Ravana'],       ['20',  'Marica']],
    [['21', 'Soniti'],    ['22', 'Preta'],        ['23',  'Andhaka']],
    [['24', 'Bana'],      ['25', 'Naraka'],       ['26',  'Madhu']],
    [['27', 'Churel'],    ['28', 'RoboChao'],     ['29',  'Opa-Opa']],
    [['2A', 'Pian'],      ['2B', 'Chao'],         ['2C',  'CHU CHU']],
    [['2D', 'KAPU KAPU'], ['2E', "ANGEL'S WING"], ['2F',  "DEVIL'S WING"]], 
    [['30', 'ELENOR'],    ['31', 'MARK3'],        ['32',  'MASTER SYSTEM']],
    [['33', 'GENESIS'],   ['34', 'SEGA SATURN'],  ['35',  'DREAMCAST']],
    [['36', 'HAMBURGER'], ['37', "PANZER'S TAIL"],['38',  "DEVIL'S TAIL"]],
    [['39', 'DEVA'],      ['3A', 'RATI'],         ['3B',  'SAVITRI']],
    [['3C', 'RUKMIN'],    ['3D', 'PUSHAN'],       ['3E',  'DIWARI']],
    [['3F', 'SATO'],      ['40', 'BHIMA'],        ['41',  'NIDRA']]
];

function toHex(decimal) {
    let output = decimal.toString(16).toUpperCase();
    if (output.length === 1) {
        output = '0' + output;
    }
    return output;
}

function levelToHexBytes(level) {
    const exp = level * 100;
    const byteLevel = Math.floor(exp / 256);
    const byteExp = exp % 256;

    return [toHex(byteExp), toHex(byteLevel)];
}

function toInt(value, name) {
    const intValue = parseInt(value, 10);
    if (isNaN(intValue)) {
        console.log(`${name} value has to be an integer value.`);
        return false;
    }
    return intValue;
}

function printTable() {
    for (const mag of MAGS) {
        let line = '';
        for (const [value, name] of mag) {
            line += `${value} - ${name}`.padEnd(18);
            line += '|';
        }
        console.log(line);
    }
}

function checkMagExists(hexV) {
    return MAGS.flat().some(item => item[0] === hexV.toUpperCase());
}

async function main() {
    console.log("What mag are you building?");
    printTable();

    let mag;
    while (true) {
        const input = prompt("Input hex value: ");
        if (checkMagExists(input)) {
            mag = input.toUpperCase();
            break;
        }
        console.log("The hex value does not exist in the table");
    }

    let defLvl;
    while (true) {
        const input = prompt("Input DEF level: ");
        defLvl = toInt(input, 'DEF');
        if (defLvl !== false) {
            break;
        }
    }

    let powLvl;
    while (true) {
        const input = prompt("Input POW level: ");
        powLvl = toInt(input, 'POW');
        if (powLvl !== false) {
            break;
        }
    }

    let dexLvl;
    while (true) {
        const input = prompt("Input DEX level: ");
        dexLvl = toInt(input, 'DEX');
        if (dexLvl !== false) {
            break;
        }
    }

    let mindLvl;
    while (true) {
        const input = prompt("Input MIND level: ");
        mindLvl = toInt(input, 'MIND');
        if (mindLvl !== false) {
            break;
        }
    }

    const statList = [defLvl, powLvl, dexLvl, mindLvl];
    const levels = defLvl + powLvl + dexLvl + mindLvl;

    if (levels > 200) {
        console.log("Warning, level exceeds 200");
    }

    const bytesList = ['02', mag, toHex(levels), 'D9'];
    for (const stat of statList) {
        const [expByte, lvlByte] = levelToHexBytes(stat);
        bytesList.push(expByte);
        bytesList.push(lvlByte);
    }

    console.log("Item Code: " + bytesList.slice(0, 3).join(", "));
    console.log("Parameters: " + bytesList.slice(3).join(", "));
}

if (typeof require !== 'undefined' && require.main === module) {
    main();
}