//Let's use the fs package for this.
const fs = require('fs');

/*This code will grab every single file in the models except for index
and export it using the filename. We take out the ".js" extension
for convenience.*/

fs.readdirSync(__dirname).forEach(file => {
    if(file !== 'index.js') {
        const filename = file.replace('.js', '');
        module.exports[filename] = require('./' + file);
    }
});