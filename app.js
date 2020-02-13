import Database from './core/database';
import Express from './core/server';

(async function() {
  await new Database().initialize();
  new Express().start();
})();