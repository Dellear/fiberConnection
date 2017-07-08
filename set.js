/**
 * Created by 51375 on 2017/7/8.
 */

let fs = require('fs');
let basepath = 'src/components/';
let moment = require('moment');
let cptName = process.argv.splice(2)[0];
let path = cptName.split('/');
let name = path[path.length - 1];
let writes = [`${name}.js`, `${name}.html`, `${name}.less`, `index.js`];
let reads = [`${basepath}cptTemp/index.js`, `${basepath}cptTemp/cptTemp.js`];
let file = [];


let exists = function () {
    return new Promise((res, rej) => {
        (async function () {
            for (let a of path) {
                console.log(a)
                fs.existsSync(basepath + a) ? basepath = `${basepath}${a}/` : await mkdir(a);
            }
            res(basepath);
        })()
    })
}
let mkdir = function (a) {
    return new Promise((res, rej) => {
        fs.mkdir(basepath + a, (err) => {
            if (err) rej(err);
            basepath = `${basepath}${a}/`
            res(basepath);
        });
    })
}
let readFile = function () {
    return new Promise((res) => {
        for (let a of reads) {
            let text = fs.readFileSync(a).toString();
            text = text.replace(/time/g, moment().format('YYYY/MM/DD'))
                .replace(/temp/g, name);
            file.push(text)
        }
        res(file);
    })
}
let writeFile = function (file) {
    return new Promise((res, rej) => {
        (async function () {
            for (let a of writes) {
                await fs.writeFile(`${basepath}${a}`,
                    a == writes[3] ? file[0] : a == writes[0] ? file[1] : '', (err) => {
                        if (err) rej(err)
                    })
            }
            res('succ');
        })()
    })
}
async function creatCpt() {
    try {
        await exists();
        await readFile()
        await writeFile(await readFile());
    }
    catch (err) {
        console.error(err);
    }
}
creatCpt();