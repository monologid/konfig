import fs from 'fs';
import yaml from 'js-yaml';

const CONFIG = yaml.safeLoad(fs.readFileSync(process.env.CONFIG || `${__dirname}/../config.yaml`, 'utf-8'));

export default CONFIG;