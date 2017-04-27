'use strict';

import Realm from 'realm';

class Recording extends Realm.Object {}
Recording.schema = {
    name: 'Recording',
    primaryKey: 'formattedName',
    properties: {
        name: 'string',
        formattedName: 'string',
        path: 'string',
        type: 'string'
    },
};

export default new Realm({schema: [Recording], schemaVersion: 8});