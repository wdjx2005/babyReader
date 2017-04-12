'use strict';

import Realm from 'realm';

class Recording extends Realm.Object {}
Recording.schema = {
    name: 'Recording',
    properties: {
        name: 'string',
        formattedName: 'string',
        type: 'string',
        path: 'string'
    },
};

export default new Realm({schema: [Recording], schemaVersion: 5});